"use client";
import { useEffect, Suspense } from "react";
import Search from "@/components/search";
import { Button } from "@/components/ui/button";
import { Plus, EllipsisVertical } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import dynamic from "next/dynamic";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { useRouter, useSearchParams } from "next/navigation";
import Image from "next/image";
import { useProducts, useCategory, deleteProduct } from "@/api-services/product";
import { useState } from "react";
import { useStylengAuthStore } from "@/stores/auth";
import { useModalStore } from "@/stores/modal";
const CSVLinkNoSSR = dynamic(() => import("react-csv").then(mod => mod.CSVLink), {
  ssr: false,
})
import { ProductResponse, ProductParams } from "@/interfaces-and-types/product";
import toast from "react-hot-toast";
const ProductPage = () => {
  const router = useRouter();
  const searchParams = useSearchParams();
  const vendorID = useStylengAuthStore((state) => state.stylengUser.id);
  const { openModal } = useModalStore();
  const { result: categories } = useCategory();
  const [query, setQuery] = useState({
    available_size: "",
    available_color: "",
    category_name: "",
    search: "",
    min_price: "",
    max_price: "",
    gender: "",
    seller_name: "",
    category: "",
    is_featured_product: false,
    is_special_offer: false,
    is_new_arrival: false,
    vendor_user_id: vendorID,
  });
  const [exports, setExport] = useState<ProductResponse[]>([]);
  const { resultIsLoading, result: products } = useProducts(query);

  const deleteAProduct = async(id: string) =>{
      try {
        const response = await deleteProduct(id);
        if (response.status === 200 || response.status === 201) {
          toast.success(response.data.msg);
        } else {
          toast.error(response?.data.msg);
        }
      } catch (error) {
        toast.error(`Error: ${error}`);
      }
    }
  const downloadAsCsv = () => {
    const exportData: ProductResponse[] = [];
    products.forEach((product) => {
      const data = {
        name: product.name,
        id: product.id,
        category_name: product.category_name,
        price: product.price,
        discounted_price: product.discounted_price,
        total_stock: product.total_stock,
        stock_status: product.stock_status,
        seller_name: product.seller_name,
        short_description: product.short_description,
        slug_id: product.slug_id,
        rating: product.rating,
        main_image: product.main_image,
        created_at: product.created_at,
      };

      exportData.push(data);
    });
    setExport(exportData);
  };
  useEffect(() => {
    if (!searchParams) return;

    const params = new URLSearchParams(searchParams);
    const newQuery: ProductParams = {};

    // category → look up ID
    const categoryName = params.get("category");
    if (categoryName) {
      const category = categories.find((c) => c.name === categoryName);
      if (category) {
        newQuery.category = category.id;
      }
    } else {
      newQuery.category = "";
    }

    // price range → split into minPrice & maxPrice
    const price = params.get("price");
    if (price) {
      const [min, max] = price.split("-").map((n) => parseInt(n, 10));
      newQuery.min_price = String(min);
      newQuery.max_price = String(max);
      // }
    } else {
      newQuery.min_price = "";
      newQuery.max_price = "";
    }

    // size
    const size = params.get("size");
    if (size) {
      newQuery.available_size = size;
    } else {
      newQuery.available_size = "";
    }

    // sort
    const sort = params.get("sort");
    if (sort && sort.toLowerCase() === "featured") {
      newQuery.is_featured_product = true;
    } else {
      newQuery.is_featured_product = false;
    }
    if (sort && sort.toLowerCase() === "latest") {
      newQuery.is_new_arrival = true;
    } else {
      newQuery.is_new_arrival = false;
    }
    if (sort && sort.toLowerCase() === "best selling") {
      newQuery.is_special_offer = true;
    } else {
      newQuery.is_special_offer = false;
    }
    // search
    const search = params.get("query");
    if (search) {
      newQuery.search = search;
    } else {
      newQuery.search = "";
    }
    // finally update your query state
    setQuery((prev) => ({
      ...prev,
      ...newQuery,
    }));
  }, [searchParams, categories]);

  useEffect(() => {
    if (exports.length > 0) {
      try {
        // setSelectedItems([])
        const downloadButton = document.getElementById("downloadAsCSV");
        if (downloadButton) {
          downloadButton.click();
        } else {
          toast.error("Unable to find download button");
        }
      // eslint-next-line-disable
      } catch (e: unknown) {
      if (e instanceof Error) {
        toast.error(`Unable to download file: ${e.message}`);
      } else {
        toast.error("Unable to download file");
      }
    }
    }
  }, [exports]);
  return (
    <div className="space-y-6 w-full">
      <div className="">
        <h2 className="text-lg font-bold uppercase">Products</h2>
        <p className="text-sm">
          Track, manage and forecast your customers and orders.
        </p>
      </div>
      <div className="w-full flex justify-between">
        <div className="flex gap-4">
          <Search placeholder="Search" />
          <Button
            className="rounded-none border border-gray-500 uppercase h-11"
            variant="outline"
            onClick={() => openModal("filter")}
          >
            <Plus /> Filter
          </Button>
        </div>
        <div className="flex gap-4">
          <CSVLinkNoSSR
            data={exports}
            filename={"Products.csv"}
            id="downloadAsCSV"
          />
          <Button
            className="rounded-none border border-gray-500 uppercase h-11"
            variant="outline"
            onClick={() => downloadAsCsv()}
          >
            <Plus /> Export CSV
          </Button>
          <Button
            onClick={() => router.push("/vendors-app/product/create")}
            className="rounded-none border border-gray-500 uppercase h-11"
            variant="default"
          >
            <Plus /> Add Products
          </Button>
        </div>
      </div>
      <table className="w-full  text-sm text-left text-gray-500 dark:text-gray-400 shadow">
        <thead className="text-xs text-gray-700 bg-grey-light">
          <tr className="border-b">
            <th scope="col" className="px-4 py-6 uppercase">
              Product
            </th>
            <th scope="col" className="px-4 py-6 uppercase">
              Product Id
            </th>
            <th scope="col" className="px-4 py-6 uppercase">
              In Stock
            </th>
            <th scope="col" className="px-4 py-6 uppercase">
              Variation
            </th>
            <th scope="col" className="px-4 py-6 uppercase">
              Price
            </th>
            <th scope="col" className="px-4 py-6 uppercase">
              Rating
            </th>
            <th scope="col" className="px-4 py-6 uppercase">
              Stock Level
            </th>
            <th scope="col" className="px-4 py-6 uppercase">
              Action
            </th>
          </tr>
        </thead>
        <tbody>
          {resultIsLoading ? (
            <tr className="border-b">
              <td
                colSpan={8}
                scope="row"
                className="px-4 py-3 text-xs font-medium text-[#3E3E3E] whitespace-nowrap  text-center"
              >
                Loading...
              </td>
            </tr>
          ) : products?.length > 0 ? (
            products?.map((product) => (
              <tr key={product.id} className="border-b">
                <td className="py-10 px-6 text-gray-900 text-sm gap-1 flex items-center">
                  <Image
                    src={product.main_image}
                    alt="Product"
                    className="rounded-full"
                    width={28}
                    height={28}
                  />
                  {product.name}
                </td>
                <td className="py-10 px-6 text-gray-900 text-sm">
                  {product.id}
                </td>
                <td className="py-10 px-6 text-gray-500 text-sm">
                  {product.total_stock}
                </td>
                <td className="py-10 px-6 text-gray-500 text-sm">
                  {product.slug_id}
                </td>
                <td className="py-10 px-6 text-gray-500 text-sm">
                  ₦{product.price}
                </td>
                <td className="py-10 px-6 text-gray-500 text-sm">
                  <div className="flex">
                    {Array.from({ length: 5 }).map((_, i) => (
                      <svg
                        key={i}
                        xmlns="http://www.w3.org/2000/svg"
                        viewBox="0 0 24 24"
                        fill={i < product.rating ? "#fdb022" : "#d1d5db"}
                        className="w-5 h-5"
                      >
                        <path d="M12 .587l3.668 7.431L24 9.753l-6 5.85 1.417 8.264L12 19.896l-7.417 3.971L6 15.603 0 9.753l8.332-1.735z" />
                      </svg>
                    ))}{" "}
                  </div>
                </td>
                <td className="py-10 px-6 text-sm">
                  {product.stock_status.toLowerCase() === "available" ? (
                    <Badge
                      variant="default"
                      className="bg-green-200 text-green-700"
                    >
                      Available
                    </Badge>
                  ) : (
                    <Badge variant="default" className="bg-red-50 text-red-700">
                      Out of Stock
                    </Badge>
                  )}
                </td>
                <td className="py-10 px-6  text-sm">
                  <DropdownMenu>
                    <DropdownMenuTrigger className="focus:outline-none cursor-pointer">
                      <EllipsisVertical className="w-4 h-4" />
                    </DropdownMenuTrigger>
                    <DropdownMenuContent className="w-20 h-auto rounded-none mt-7">
                      <DropdownMenuItem className="cursor-pointer" onClick={() => router.push(`/vendors-app/product/${product.id}/edit`)}>
                        Edit
                      </DropdownMenuItem>
                      <DropdownMenuSeparator />
                      <DropdownMenuItem onClick={() => deleteAProduct(product.id)} className="cursor-pointer">
                        Delete
                      </DropdownMenuItem>
                    </DropdownMenuContent>
                  </DropdownMenu>
                </td>
              </tr>
            ))
          ) : (
            <tr className=" text-center">
              <td
                colSpan={8}
                scope="row"
                className="px-4 w-full py-3  text-gray-400 text-sm "
              >
                <div className="flex flex-col items-center justify-center">
                  <p>No Records Found</p>
                </div>
              </td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
};
export default function Order() {
  return (
    <Suspense fallback={<div className="p-4 text-gray-500">Loading Products...</div>}>
      <ProductPage />
    </Suspense>
  );
}