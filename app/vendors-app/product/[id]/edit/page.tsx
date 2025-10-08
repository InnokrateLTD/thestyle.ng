"use client";

import { useState, useEffect } from "react";
import axios from "axios";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { HexColorPicker } from "react-colorful";
import { ProductFormData, AddProductSchema } from "@/lib/schema";
import { useForm, Controller, useFieldArray } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  Select,
  SelectTrigger,
  SelectValue,
  SelectContent,
  SelectItem,
} from "@/components/ui/select";
import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Checkbox } from "@/components/ui/checkbox";
import Image from "next/image";
import {
  useCategory,
  getSignedURL,
  editProduct,
  useSingleProduct,
} from "@/api-services/product";
import { Plus, Trash2 } from "lucide-react";
import { ImageResponse } from "@/interfaces-and-types/product";
import toast from "react-hot-toast";
import LoadingDots from "@/components/ui/loadingDots";
import { useParams, useRouter } from "next/navigation";
import Link from "next/link";

export default function AddProductPage() {
  const sizes = ["XS", "S", "M", "L", "XL", "XXL"] as const;
  const [mainImage, setMainImage] = useState<string | null>(null);
  const [thumbnails, setThumbnails] = useState<(string | null)[]>([
    null,
    null,
    null,
    null,
  ]);
  const [mainImageResponse, setMainImageResponse] =
    useState<ImageResponse | null>(null);
  const [additionalImageResponse, setAdditionalImageResponse] = useState<
    ImageResponse[]
  >([]);
  const [status, setStatus] = useState<"idle" | "loading">("idle");
  const [showPicker, setShowPicker] = useState(false);
  const [tempColor, setTempColor] = useState<string>("");
  const params = useParams();
  const router = useRouter();
  const { result: categories } = useCategory();
  const { result: product } = useSingleProduct(params?.id?.toString() ?? "");
  const {
    register,
    handleSubmit,
    reset,
    control,
    formState: { errors },
  } = useForm<ProductFormData>({
    resolver: zodResolver(AddProductSchema),
    defaultValues: {
      available_sizes: [],
      available_colors: [],
      category: "",
      stock_items: [
        {
          size: "XS",
          color: "#000000",
          stock_quantity: 0,
        },
      ],
    },
  });
  const { fields, append, remove } = useFieldArray({
    control,
    name: "stock_items",
  });
  const handleImageUpload = async (
    e: React.ChangeEvent<HTMLInputElement>,
    index?: number
  ) => {
    const file = e.target.files?.[0];
    if (!file) return;

    try {
      const signedData = await getSignedURL();
      const formData = new FormData();
      formData.append("file", file);
      formData.append("signature", signedData?.data?.data?.signature);
      formData.append("timestamp", signedData?.data?.data?.timestamp);
      formData.append("api_key", signedData?.data?.data?.api_key);
      formData.append("upload_preset", signedData?.data?.data?.upload_preset);

      const endpoint = signedData.data.data.signed_url;
      const { data } = await axios.post(endpoint, formData, {
        headers: { "Content-Type": "multipart/form-data" },
      });

      const uploaded = {
        public_id: data.public_id,
        version: data.version,
        signature: data.signature,
        url: data.secure_url,
      };

      if (index === undefined) {
        // main image
        setMainImage(uploaded.url);
        setMainImageResponse(uploaded);
      } else {
        // replace/add thumbnail
        setThumbnails((prev) => {
          const copy = [...prev];
          copy[index] = uploaded.url;
          return copy;
        });

        setAdditionalImageResponse((prev) => {
          const copy = [...prev];
          copy[index] = uploaded; // replace or insert
          return copy;
        });
      }
    } catch (err) {
      console.error("Upload failed", err);
    }
  };
  // eslint-disable-next-line
  const filterObject = <T extends Record<string, any>>(obj: T): Partial<T> => {
    return Object.fromEntries(
      // eslint-disable-next-line
      Object.entries(obj).filter(([_, value]) => {
        // remove undefined, null, empty string, or empty array
        if (value === undefined || value === null) return false;
        if (typeof value === "string" && value.trim() === "") return false;
        if (Array.isArray(value) && value.length === 0) return false;
        return true;
      })
    ) as Partial<T>;
  };
  const handleRemoveImage = (index?: number) => {
    if (index === undefined) {
      setMainImage(null);
      setMainImageResponse(null);
    } else {
      setThumbnails((prev) => {
        const copy = [...prev];
        copy[index] = null;
        return copy;
      });
      setAdditionalImageResponse((prev) => {
        const copy = [...prev];
        copy.splice(index, 1);
        return copy;
      });
    }
  };
  const onSubmit = async (data: ProductFormData) => {
    console.log(data);
    setStatus("loading");
    const x = {
      name: data.name,
      short_description: data.short_description,
      description: data.description,
      category: data.category,
      available_sizes: data.available_sizes,
      gender: data.gender,
      available_colors: data.available_colors,
      price: data.price,
      discount_type: data.discount_type,
      discount_value: data.discount_value,
      main_image: mainImageResponse,
      additional_images: additionalImageResponse,
      is_active: true,
      low_stock_threshold: data.low_stock_threshold,
      stock_items: data.stock_items,
    };
    const filteredX = filterObject(x);
    try {
      const response = await editProduct(
        params?.id?.toString() ?? "",
        filteredX
      );
      if (response.status === 200 || response.status === 201) {
        router.push("/vendors-app/product");
        toast.success("Product Edit Successful");
      } else {
        toast.error(response?.data.msg);
      }
    } catch (error) {
      toast.error(`Product Edit error: ${error}`);
    } finally {
      setStatus("idle");
    }
  };
  useEffect(() => {
    if (product) {
      reset({
        name: product.name,
        short_description: product.short_description,
        description: product.description,
        category: product.category?.id?.toString() ?? "",
        available_sizes: (product.available_sizes ?? []).filter(
          (s: string): s is "XS" | "S" | "M" | "L" | "XL" | "XXL" =>
            ["XS", "S", "M", "L", "XL", "XXL"].includes(s)
        ),
        gender: ["UNISEX", "MEN", "WOMEN"].includes(product.gender)
          ? (product.gender as "UNISEX" | "MEN" | "WOMEN")
          : "UNISEX",
        available_colors: product.available_colors ?? [],
        price: product.price,
        discount_type: ["PERCENTAGE", "FIXED"].includes(product.discount_type)
          ? (product.discount_type as "PERCENTAGE" | "FIXED")
          : undefined,
        discount_value: product.discount_value,
        low_stock_threshold: String(product.low_stock_threshold),
        stock_items:
          product.stock_items?.map((item) => ({
            size: item.size as "XS" | "S" | "M" | "L" | "XL" | "XXL",
            color: item.color,
            stock_quantity: item.stock_quantity,
          })) ?? [],
      });

      // hydrate images
      setMainImage(product.main_image ?? null);
      setThumbnails(
        product.additional_images?.map((img) => img) ?? [null, null, null, null]
      );
    }
  }, [product, reset]);

  return (
    <div className="min-h-screen  p-6">
      <div className="flex justify-between">
        <div>
          <p className="text-sm text-gray-500">
      <Link href="/vendors-app/product" className="hover:underline">
        PRODUCT LIST
      </Link>{" "}
      / <span className="font-semibold">EDIT PRODUCT</span>
    </p>
          <h1 className="text-xl font-bold text-black uppercase">
            Edit Product
          </h1>
        </div>
        <div className="flex justify-end gap-4 ">
          <Button
            onClick={handleSubmit(onSubmit)}
            type="submit"
            className="flex items-center gap-2 uppercase rounded-none w-[167px] h-11"
          >
            <Plus className="w-4 h-4" />
            {status === "loading" ? <LoadingDots /> : "Edit Product"}
          </Button>
        </div>
      </div>

      <div className="bg-white rounded-2xl pt-10">
        <form className="grid md:grid-cols-2 gap-6">
          {/* Product Information */}
          <div className="space-y-4">
            <h2 className="font-bold text-lg uppercase">Product Information</h2>
            <div className="space-y-2">
              <Label className="uppercase">Product Name</Label>
              <Input
                {...register("name")}
                className="rounded-none h-11"
                placeholder="Enter product name"
              />
              {errors.name && (
                <p className="text-xs text-red-500 mt-1">
                  {errors.name.message}
                </p>
              )}
            </div>
            <div className="space-y-2">
              <Label className="uppercase">Short Description</Label>
              <Input
                {...register("short_description")}
                className="rounded-none h-11"
                placeholder="Enter short description"
              />
              {errors.short_description && (
                <p className="text-xs text-red-500 mt-1">
                  {errors.short_description.message}
                </p>
              )}
            </div>
            <div className="space-y-2">
              <Label className="uppercase">Product Description</Label>
              <Textarea
                {...register("description")}
                className="rounded-none"
                placeholder="Enter product description"
                rows={10}
              />
              {errors.description && (
                <p className="text-xs text-red-500 mt-1">
                  {errors.description.message}
                </p>
              )}
            </div>
            <div className="space-y-2">
              <Label className="uppercase">Product Category</Label>
              <Controller
                name="category"
                control={control}
                render={({ field }) => (
                  <Select onValueChange={field.onChange} value={field.value}>
                    <SelectTrigger className="w-full rounded-none">
                      <SelectValue placeholder="Select Category" />
                    </SelectTrigger>
                    <SelectContent>
                      {categories &&
                        categories.map((category) => (
                          <SelectItem
                            key={category.id}
                            value={category.id.toString()}
                          >
                            {category.name}
                          </SelectItem>
                        ))}
                    </SelectContent>
                  </Select>
                )}
              />
              {errors.category && (
                <p className="text-xs text-red-500 mt-1">
                  {errors.category.message}
                </p>
              )}
            </div>
            <div className="space-y-6">
              {/* SIZE */}
              <div className="space-y-2">
                <Label className="text-sm font-medium">SIZE</Label>
                <p className="text-sm text-muted-foreground mb-3">
                  Select size the product is available in
                </p>

                <div className="grid grid-cols-6 gap-3">
                  {sizes.map((size) => (
                    <div
                      key={size}
                      className="flex items-center space-x-2 rounded-md border border-gray-100 p-3 hover:bg-accent hover:text-accent-foreground cursor-pointer"
                    >
                      <Controller
                        name="available_sizes"
                        control={control}
                        render={({ field }) => {
                          const isChecked = field.value?.includes(size);

                          return (
                            <Checkbox
                              id={size}
                              checked={isChecked}
                              onCheckedChange={(checked) => {
                                if (checked) {
                                  field.onChange([...field.value, size]);
                                } else {
                                  field.onChange(
                                    field.value.filter(
                                      (v: string) => v !== size
                                    )
                                  );
                                }
                              }}
                              className="rounded-full w-4 h-4 border-gray-300 data-[state=checked]:bg-primary data-[state=checked]:text-white"
                            />
                          );
                        }}
                      />

                      <Label
                        htmlFor={size}
                        className="cursor-pointer text-gray-900 font-medium text-sm"
                      >
                        {size}
                      </Label>
                    </div>
                  ))}
                </div>

                {errors.available_sizes && (
                  <p className="text-xs text-red-500 mt-1">
                    {errors.available_sizes.message}
                  </p>
                )}
              </div>

              {/* GENDER */}
              <div className="space-y-2">
                <Label className="text-sm font-medium">GENDER</Label>
                <p className="text-sm text-muted-foreground mb-3">
                  Select gender the product is available to
                </p>

                <Controller
                  name="gender"
                  control={control}
                  render={({ field }) => (
                    <RadioGroup
                      onValueChange={field.onChange}
                      value={field.value}
                      className="grid grid-cols-3 gap-3"
                    >
                      {["WOMEN", "MEN", "UNISEX"].map((gender) => (
                        <div
                          key={gender}
                          className="flex items-center space-x-2 rounded-md border border-gray-100 p-3 hover:bg-accent hover:text-accent-foreground cursor-pointer"
                        >
                          <RadioGroupItem value={gender} id={gender} />
                          <Label
                            htmlFor={gender}
                            className="cursor-pointer text-gray-900 font-medium"
                          >
                            {gender}
                          </Label>
                        </div>
                      ))}
                    </RadioGroup>
                  )}
                />

                {errors.gender && (
                  <p className="text-xs text-red-500 mt-1">
                    {errors.gender.message}
                  </p>
                )}
              </div>
            </div>

            <div className="space-y-8">
              {/* COLORS */}
              <div className="space-y-2">
                <Label className="text-sm font-medium">COLORS</Label>
                <p className="text-sm text-muted-foreground mb-3">
                  Select colors the product is available in
                </p>
                <Controller
                  name="available_colors"
                  control={control}
                  render={({ field }) => (
                    <div className="flex items-center gap-3 flex-wrap">
                      {/* Render current colors */}
                      {field.value?.map((color: string, index: number) => (
                        <div
                          key={index}
                          className="h-10 w-10 rounded border cursor-pointer"
                          style={{ backgroundColor: color }}
                          onClick={() =>
                            field.onChange(
                              field.value.filter((c: string) => c !== color)
                            )
                          }
                          title="Click to remove"
                        />
                      ))}

                      {/* Add Color Button */}
                      <div className="relative">
                        <Button
                          variant="outline"
                          type="button"
                          size="icon"
                          className="h-10 w-10"
                          onClick={() => setShowPicker(!showPicker)}
                        >
                          +
                        </Button>

                        {/* Color Picker Dropdown */}
                        {showPicker && (
                          <div className="absolute mt-2 z-50">
                            <HexColorPicker
                              color={tempColor}
                              onChange={setTempColor}
                            />
                            <div className="flex justify-between mt-2">
                              <Button
                                size="sm"
                                variant="secondary"
                                onClick={() => setShowPicker(false)}
                              >
                                Cancel
                              </Button>
                              <Button
                                size="sm"
                                onClick={() => {
                                  if (tempColor) {
                                    field.onChange([
                                      ...(field.value ?? []),
                                      tempColor,
                                    ]);
                                    setTempColor("");
                                    setShowPicker(false);
                                  }
                                }}
                                disabled={!tempColor}
                              >
                                Add
                              </Button>
                            </div>
                          </div>
                        )}
                      </div>
                    </div>
                  )}
                />

                {errors.available_colors && (
                  <p className="text-xs text-red-500 mt-1">
                    {errors.available_colors.message}
                  </p>
                )}
              </div>

              {/* PRICING */}
              <div className="space-y-2">
                <Label className="text-sm font-medium">PRICING</Label>
                <p className="text-sm text-muted-foreground mb-3">PRICE</p>
                <Input
                  {...register("price")}
                  placeholder="Enter price"
                  className="h-11 rounded-none"
                />
                {errors.price && (
                  <p className="text-xs text-red-500 mt-1">
                    {errors.price.message}
                  </p>
                )}
              </div>

              {/* DISCOUNT */}
              <div>
                <Label className="text-sm font-medium">DISCOUNT</Label>
                <p className="text-sm text-muted-foreground mb-3">
                  Select discount type that will be applied to this product
                </p>
                <div className="grid grid-cols-2 gap-2">
                  <div>
                    <Controller
                      name="discount_type"
                      control={control}
                      render={({ field }) => (
                        <Select
                          onValueChange={field.onChange}
                          value={field.value}
                        >
                          <SelectTrigger className="h-11 w-full">
                            <SelectValue placeholder="Select discount type" />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="PERCENTAGE">
                              Percentage
                            </SelectItem>
                            <SelectItem value="FIXED">Fixed</SelectItem>
                          </SelectContent>
                        </Select>
                      )}
                    />
                    {errors.discount_type && (
                      <p className="text-xs text-red-500 mt-1">
                        {errors.discount_type.message}
                      </p>
                    )}
                  </div>

                  <div>
                    <Input
                      {...register("discount_value")}
                      placeholder="Enter Discount Value"
                      className="h-11 rounded-none"
                    />
                    {errors.discount_value && (
                      <p className="text-xs text-red-500 mt-1">
                        {errors.discount_value.message}
                      </p>
                    )}
                  </div>
                </div>
              </div>
              {/* PRODUCT INVENTORY */}
              <div>
                <Label className="text-sm font-medium">PRODUCT INVENTORY</Label>
                {/* STOCK QUANTITY */}
                <div className="mt-3">
                  <p className="text-sm text-muted-foreground mb-3">
                    STOCK QUANTITY
                  </p>
                  {fields.map((field, index) => (
                    <div key={field.id} className="space-y-1">
                      <div className="grid grid-cols-[1fr_1fr_1fr_auto] gap-3 items-center">
                        {/* SIZE */}
                        <Controller
                          name={`stock_items.${index}.size`}
                          control={control}
                          render={({ field }) => (
                            <Select
                              value={field.value}
                              onValueChange={field.onChange}
                            >
                              <SelectTrigger className="w-full">
                                <SelectValue placeholder="Select size" />
                              </SelectTrigger>
                              <SelectContent>
                                {["XS", "S", "M", "L", "XL", "XXL"].map((s) => (
                                  <SelectItem key={s} value={s}>
                                    {s}
                                  </SelectItem>
                                ))}
                              </SelectContent>
                            </Select>
                          )}
                        />

                        {/* COLOR */}
                        <Controller
                          name={`stock_items.${index}.color`}
                          control={control}
                          render={({ field }) => (
                            <Input
                              type="text"
                              placeholder="#000000"
                              value={field.value}
                              onChange={field.onChange}
                            />
                          )}
                        />
                        {/* QUANTITY */}
                        <Controller
                          name={`stock_items.${index}.stock_quantity`}
                          control={control}
                          render={({ field }) => (
                            <Input
                              type="number"
                              placeholder="Quantity"
                              value={field.value}
                              onChange={(e) =>
                                field.onChange(Number(e.target.value))
                              }
                            />
                          )}
                        />
                        {/* REMOVE */}
                        <Button
                          type="button"
                          variant="outline"
                          size="icon"
                          onClick={() => remove(index)}
                        >
                          <Trash2 className="h-4 w-4" />
                        </Button>
                      </div>

                      {/* ERRORS */}
                      <div className="grid grid-cols-[1fr_1fr_1fr_auto] gap-3">
                        <p className="text-xs text-red-500">
                          {errors?.stock_items?.[index]?.size?.message}
                        </p>
                        <p className="text-xs text-red-500">
                          {errors?.stock_items?.[index]?.color?.message}
                        </p>
                        <p className="text-xs text-red-500">
                          {
                            errors?.stock_items?.[index]?.stock_quantity
                              ?.message
                          }
                        </p>
                      </div>
                    </div>
                  ))}

                  {/* ADD STOCK */}
                  <Button
                    type="button"
                    variant="outline"
                    className="mt-3"
                    onClick={() =>
                      append({ size: "XS", color: "", stock_quantity: 0 })
                    }
                  >
                    + ADD STOCK
                  </Button>
                </div>
              </div>

              {/* LOW STOCK TRIGGER */}
              <div>
                <Label className="text-sm font-medium">
                  LOW STOCK TRIGGER QUANTITY
                </Label>
                <Input
                  {...register("low_stock_threshold")}
                  placeholder="Enter quantity"
                  type="number"
                  className="mt-2 h-11 rounded-none"
                />
                {errors.low_stock_threshold && (
                  <p className="text-xs text-red-500 mt-1">
                    {errors.low_stock_threshold.message}
                  </p>
                )}
              </div>
            </div>
          </div>

          {/* Upload Section */}
          <div className="space-y-4">
            <Label className="uppercase font-bold">Upload Product Image</Label>

            {/* Main Preview */}
            <div className="h-[536px] w-[564px] bg-grey-light rounded-none flex items-center justify-center relative">
              {mainImage && (
                <button
                  type="button"
                  onClick={() => setMainImage(null)} // remove main image
                  className="absolute top-2 right-2 bg-red-500 text-white h-5 w-5 rounded-full z-10 text-xs"
                >
                  ✕
                </button>
              )}

              <Input
                type="file"
                className="hidden"
                id="main-upload"
                onChange={(e) => handleImageUpload(e, 0)}
              />
              <Label
                htmlFor="main-upload"
                className="cursor-pointer flex items-center justify-center w-full h-full"
              >
                {mainImage ? (
                  <Image
                    src={mainImage}
                    alt="Main Preview"
                    width={500}
                    height={500}
                    className="object-cover w-full h-full rounded-none"
                  />
                ) : (
                  <Image
                    src="/upload-placeholder.svg"
                    alt="Placeholder"
                    width={60}
                    height={60}
                  />
                )}
              </Label>
            </div>
            {/* Thumbnails */}
            <div className="w-[564px] grid grid-cols-4 gap-2">
              {Array.from({ length: 4 }).map((_, idx) => {
                const img = thumbnails[idx]; // get the image if it exists
                return (
                  <div
                    key={idx}
                    className={`relative w-[129px] h-[143px] rounded-none border-2 border-dashed flex items-center justify-center overflow-hidden cursor-pointer transition ${
                      img
                        ? "border-muted hover:border-blue-300"
                        : "border-muted bg-muted/30"
                    }`}
                  >
                    {img && (
                      <button
                        type="button"
                        onClick={() => handleRemoveImage(idx)}
                        className="absolute top-1 right-1 bg-red-500 text-white h-5 w-5 rounded-full z-10 text-xs"
                      >
                        ✕
                      </button>
                    )}

                    <Input
                      type="file"
                      className="hidden"
                      id={`thumb-upload-${idx}`}
                      onChange={(e) => handleImageUpload(e, idx)}
                    />
                    <Label
                      htmlFor={`thumb-upload-${idx}`}
                      className="cursor-pointer flex items-center justify-center w-full h-full"
                    >
                      {img ? (
                        <Image
                          src={img}
                          alt={`Thumbnail-${idx}`}
                          width={129}
                          height={143}
                          className="object-cover w-full h-full"
                        />
                      ) : (
                        <Image
                          src="/upload-placeholder.svg"
                          alt="Placeholder"
                          width={30}
                          height={30}
                        />
                      )}
                    </Label>
                  </div>
                );
              })}
            </div>
          </div>
        </form>
      </div>
    </div>
  );
}
