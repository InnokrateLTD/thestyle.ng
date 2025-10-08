"use client";
import { useState } from "react";
import { Input } from "@/app-components/ui/input";
import { Button } from "@/app-components/ui/button";
import { storeInfoSchema, StoreInfoValues } from "@/lib/schema";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm, Controller } from "react-hook-form";
import toast from "react-hot-toast";
import { useStylengAuthStore } from "@/app-stores/auth";
import LoadingDots from "../ui/loadingDots";
import { useModalStore } from "@/app-stores/modal";
import {
  Select,
  SelectTrigger,
  SelectValue,
  SelectContent,
  SelectItem,
} from "@/app-components/ui/select";
import { Textarea } from "../ui/textarea";
import { addStore, useGetStore, editStore } from "@/api-services/store";

const StoreVendorInfo = () => {
  const vendor_id = useStylengAuthStore((state) => state.stylengUser.id);
  const closeModal = useModalStore((state) => state.closeModal);
  const [status, setStatus] = useState<"idle" | "loading">("idle");
  const [edit, setIsEdit] = useState(false)
  const [id, setId] = useState('')
  const { result: stores } = useGetStore();
  const {
    control,
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<StoreInfoValues>({
    resolver: zodResolver(storeInfoSchema),
    mode: "onChange",
    defaultValues: {
      country: "",
      state: "",
    },
  });
  const onSubmit = async (data: StoreInfoValues) => {
    setStatus("loading");
    const x = {
      state: data.state,
      address: data.address,
      store_name: data.store_name,
      business_name: data.business_name,
      contact_number: data.contact_number,
      store_description: data.store_description,
      country: data.country,
      city: data.city,
      zip_code: data.zip_code,
      vendor_id: vendor_id ?? "",
    };
    try {
      const response = await (edit ? editStore(id, x) : addStore(x));
      if (response.status === 200 || response.status === 201) {
        toast.success("Store Setup Successful");
        closeModal();
        if (edit) setIsEdit(false)
      } else {
        toast.error(response?.data.msg);
      }
    } catch (error) {
      console.log(error);
      toast.error(`Store Setup error: ${error}`);
    } finally {
      setStatus("idle");
    }
  };
  const handleEditSubmit = (id: string) => {
    if (stores){
    reset({
      state: stores.state,
      address: stores.address,
      store_name: stores.store_name,
      business_name: stores.business_name,
      contact_number: stores.contact_number,
      store_description: stores.store_description,
      country: stores.country,
      city: stores.city,
      zip_code: stores.zip_code,
    })
    setIsEdit(true)
    setId(id)
  }
}
  return (
    <div className="flex justify-between w-full">
      <div className="w-1/2 space-y-2">
        <h1 className="uppercase font-bold leading-6 ">Store details</h1>
       {stores && <Button onClick={() => handleEditSubmit(stores?.id)} className="w-auto h-11 bg-black text-white rounded-none font-medium uppercase">
                Edit Store Details
        </Button>} 
      </div>
      
      <div className="w-1/2 flex justify-end">
        <div className="w-full">
          {(!stores || edit) ? (
            <form className="space-y-4" onSubmit={handleSubmit(onSubmit)}>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
              <div>
                <label className="text-xs text-grey-text font-semibold block mb-1 uppercase">
                  Store name
                </label>
                <Input
                  type="text"
                  {...register("store_name")}
                  className="border border-grey-lighter rounded-none focus:outline-none h-11 text-sm"
                />
                {errors.store_name && (
                  <p className="text-xs text-red-500 mt-1">
                    {errors.store_name.message}
                  </p>
                )}
              </div>
              <div>
                <label className="text-xs text-grey-text font-semibold block mb-1 uppercase">
                  Business name
                </label>
                <Input
                  type="text"
                  {...register("business_name")}
                  className="border border-grey-lighter rounded-none focus:outline-none  h-11 text-sm"
                />
                {errors.business_name && (
                  <p className="text-xs text-red-500 mt-1">
                    {errors.business_name.message}
                  </p>
                )}
              </div>
            </div>
            <div>
              <label className="text-xs text-grey-text font-semibold block mb-1 uppercase">
                Store Description
              </label>
              <Textarea
                {...register("store_description")}
                className="rounded-none"
                placeholder="Enter Store description"
                rows={10}
              />
              {errors.store_description && (
                <p className="text-xs text-red-500 mt-1">
                  {errors.store_description.message}
                </p>
              )}
            </div>
            <div>
              <label className="text-xs text-grey-text font-semibold block mb-1 uppercase">
                Contact Number
              </label>
              <Input
                type="text"
                {...register("contact_number")}
                className="border border-grey-lighter rounded-none focus:outline-none w-full h-11 text-sm"
              />
              {errors.contact_number && (
                <p className="text-xs text-red-500 mt-1">
                  {errors.contact_number.message}
                </p>
              )}
            </div>
            <div>
              <label className="text-xs text-grey-text font-semibold block mb-1 uppercase">
                Address
              </label>
              <Input
                type="text"
                {...register("address")}
                className="border border-grey-lighter rounded-none focus:outline-none w-full h-11 text-sm"
              />
              {errors.address && (
                <p className="text-xs text-red-500 mt-1">
                  {errors.address.message}
                </p>
              )}
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
              <div>
                <label className="text-xs text-grey-text font-semibold block mb-1 uppercase">
                  Country
                </label>
                <Controller
                  name="country"
                  control={control}
                  rules={{ required: "Country is required" }}
                  render={({ field }) => (
                    <Select onValueChange={field.onChange} value={field.value}>
                      <SelectTrigger className="w-full rounded-none">
                        <SelectValue placeholder="Please select a country" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="nigeria">Nigeria</SelectItem>
                      </SelectContent>
                    </Select>
                  )}
                />
                {errors.country && (
                  <p className="text-xs text-red-500 mt-1">
                    {errors.country.message}
                  </p>
                )}
              </div>
              <div>
                <label className="text-xs text-grey-text font-semibold block mb-1 uppercase">
                  State
                </label>
                <Controller
                  name="state"
                  control={control}
                  rules={{ required: "State is required" }}
                  render={({ field }) => (
                    <Select onValueChange={field.onChange} value={field.value}>
                      <SelectTrigger className="w-full rounded-none">
                        <SelectValue placeholder="Please select a state" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="lagos">Lagos</SelectItem>
                      </SelectContent>
                    </Select>
                  )}
                />
                {errors.state && (
                  <p className="text-xs text-red-500 mt-1">
                    {errors.state.message}
                  </p>
                )}
              </div>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
              <div>
                <label className="text-xs text-grey-text font-semibold block mb-1 uppercase">
                  City
                </label>
                <Input
                  type="text"
                  {...register("city")}
                  className="border border-grey-lighter rounded-none focus:outline-none h-11 text-sm"
                />
                {errors.city && (
                  <p className="text-xs text-red-500 mt-1">
                    {errors.city.message}
                  </p>
                )}
              </div>
              <div>
                <label className="text-xs text-grey-text font-semibold block mb-1 uppercase">
                  Zip Code (optional)
                </label>
                <Input
                  type="text"
                  {...register("zip_code")}
                  className="border border-grey-lighter rounded-none focus:outline-none  h-11 text-sm"
                />
                {errors.zip_code && (
                  <p className="text-xs text-red-500 mt-1">
                    {errors.zip_code.message}
                  </p>
                )}
              </div>
            </div>
            <Button className="w-full h-11 bg-black text-white rounded-none font-medium uppercase">
              {status === "loading" ? <LoadingDots /> : edit ? 'Update': 'Save'}
            </Button>
          </form>
          ): (
            <div className="border p-3">
              <div className="space-y-4 text-sm">
                <div className="space-y-2">
                  <p className="font-semibold text-gray-500">STORE NAME</p>
                  <p className="col-span-2">{stores?.store_name}</p>
                </div>

                <div className="space-y-2">
                  <p className="font-semibold text-gray-500">BUSINESS NAME</p>
                  <p className="col-span-2">{stores?.business_name}</p>
                </div>

                <div className="space-y-2">
                  <p className="font-semibold text-gray-500">
                    STORE DESCRIPTION
                  </p>
                  <p className="col-span-2">{stores?.store_description}</p>
                </div>

                <div className="space-y-2">
                  <p className="font-semibold text-gray-500">CONTACT NUMBER</p>
                  <p className="col-span-2">{stores?.contact_number}</p>
                </div>

                <div className="space-y-2">
                  <p className="font-semibold text-gray-500">ADDRESS</p>
                  <p className="col-span-2">{stores?.address}</p>
                </div>

                <div>
                  <p className="font-semibold text-gray-500">COUNTRY</p>
                  <p className="col-span-2">{stores?.country}</p>
                </div>

                <div className="space-y-2">
                  <p className="font-semibold text-gray-500">STATE</p>
                  <p className="col-span-2">{stores?.state}</p>
                </div>

                <div className="space-y-2">
                  <p className="font-semibold text-gray-500">CITY</p>
                  <p className="col-span-2">{stores?.city}</p>
                </div>

                <div>
                  <p className="font-semibold text-gray-500">ZIP CODE</p>
                  <p className="col-span-2">{stores?.zip_code}</p>
                </div>
              </div>
          </div>
          )}
          
          
        </div>
      </div>
    </div>
  );
};

export default StoreVendorInfo;
