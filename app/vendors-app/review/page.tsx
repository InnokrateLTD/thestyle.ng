"use client"
import Search from "@/app-components/search";
import { useEffect, Suspense } from "react";
import { Button } from "@/app-components/ui/button";
import { Plus, EllipsisVertical } from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/app-components/ui/dropdown-menu";
import { useGetSellerReview, deleteReview} from "@/api-services/product";
import { useState } from "react";
import { useSearchParams } from "next/navigation";
import toast from "react-hot-toast";

type Query = {
  search: string
    page: number
    pageSize: number
}
const ProductPage = () => {
  const searchParams = useSearchParams();
  const [query, setQuery] = useState({
    search: '',
    page: 1,
    pageSize: 10
  })
  const {resultIsLoading, result: reviews} = useGetSellerReview(query.search, query.page, query.pageSize)
  useEffect(() => {
      if (!searchParams) return;
  
      const params = new URLSearchParams(searchParams);
      const newQuery: Query = {
  search: "",
  page: 1,
  pageSize: 10,
};
      // search
      const search = params.get("query");
      if (search) {
        newQuery.search = search;
      } else {
        newQuery.search = "";
      }
      const page = params.get("page");
      if (page) {
        newQuery.page = Number(page);
      } else {
        newQuery.page = 1;
      }
      const page_size = params.get("page_size");
      if (page_size) {
        newQuery.pageSize = Number(page_size);
      } else {
        newQuery.pageSize = 10;
      }
      setQuery((prev) => ({
        ...prev,
        ...newQuery,
      }));
    }, [searchParams, reviews]);

    const deleteAReview = async(id: string) =>{
          try {
            const response = await deleteReview(id);
            if (response.status === 200 || response.status === 201) {
              toast.success(response.data.msg);
            } else {
              toast.error(response?.data.msg);
            }
          } catch (error) {
            toast.error(`Error: ${error}`);
          }
        }
  return (
    <div className="space-y-6 w-full">
      <div className="">
        <h2 className="text-lg font-bold uppercase">Reviews & Ratings</h2>
        <p className="text-sm">
          Track, manage and forecast your customers and orders.
        </p>
      </div>
      <div className="w-full flex justify-between">
        <div className="flex gap-4">
          <Search placeholder="Search" />
          
        </div>
        <div className="flex gap-4">
            <Button
            className="rounded-none border border-gray-500 uppercase h-11"
            variant="outline"
          >
            <Plus /> Filter
          </Button>
          <Button
            className="rounded-none border border-gray-500 uppercase h-11"
            variant="default"
          >
            <Plus /> Export CSV
          </Button>
        </div>
      </div>

      <table className="w-full  text-sm text-left text-gray-500 dark:text-gray-400 shadow">
        <thead className="text-xs text-gray-700 bg-grey-light">
          <tr className="border-b">
            <th scope="col" className="px-4 py-6 uppercase">
              Name
            </th>
            <th scope="col" className="px-4 py-6 uppercase">
              Ratings
            </th>
            <th scope="col" className="px-4 py-6 uppercase">
              Product name
            </th>
            <th scope="col" className="px-4 py-6 uppercase">
              Review Text
            </th>
            <th scope="col" className="px-4 py-6 uppercase">
              Date Posted
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
          ) : reviews?.length > 0 ? (
            reviews?.map((review) => (
          <tr key={review.id} className="border-b">
            <td className="py-10 px-6 text-gray-900 text-sm flex items-center gap-1">
                    {/* <Image
                      src="/footwear.jpg"
                      alt="Product"
                      className="rounded-full"
                      width={28}
                      height={28}
                    /> */}
                    {review.name}
            </td>
            <td className="py-10 px-6 text-gray-500 text-sm">
              <div className="flex">
                {Array.from({ length: 5 }).map((_, i) => (
                  <svg
                    key={i}
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 24 24"
                    fill={i < review.rating ? "#fdb022" : "#d1d5db"}
                    className="w-5 h-5"
                  >
                    <path d="M12 .587l3.668 7.431L24 9.753l-6 5.85 1.417 8.264L12 19.896l-7.417 3.971L6 15.603 0 9.753l8.332-1.735z" />
                  </svg>
                ))}{" "}
              </div>
            </td>
            <td className="py-10 px-6 text-gray-900 text-sm">
              {review.product_name}
            </td>
            <td className="py-10 px-6 text-gray-500 text-sm">{review.review_text}</td>
        <td className="py-10 px-6 text-gray-500 text-sm">{review.date_posted}</td>
            
            <td className="py-10 px-6  text-sm">
              <DropdownMenu>
                    <DropdownMenuTrigger className="focus:outline-none cursor-pointer">
                      <EllipsisVertical className="w-4 h-4" />
                    </DropdownMenuTrigger>
                    <DropdownMenuContent className="w-20 h-auto rounded-none mt-7">
                      <DropdownMenuItem onClick={() => deleteAReview(review.id)} className="cursor-pointer">
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
export default function Product() {
  return (
    <Suspense fallback={<div className="p-4 text-gray-500">Loading Orders...</div>}>
      <ProductPage />
    </Suspense>
  );
}
