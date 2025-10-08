"use client"
import { useState, useEffect } from "react";
import Search from "@/app-components/search";
import { Button } from "@/app-components/ui/button";
import { Plus } from "lucide-react";
import { DateRange } from "react-day-picker";
import { DatePickerWithRange } from "@/app-components/ui/date-range";
import { useGetProductViewed } from "@/api-services/report";
import { useSearchParams } from "next/navigation";
import { ProductViewedParams } from "@/interfaces-and-types/product";
import { formatDateToYYYYMMDD } from "@/lib/utils";
const ProductViewed = () => {
    const searchParams = useSearchParams();
    const [selectedDateRange, setSelectedDateRange] = useState<
    DateRange | undefined
  >();
    const handleSelectDateRange = (dateRange: DateRange | undefined) => {
    setSelectedDateRange(dateRange);
  };

  const [query, setQuery] = useState({
    search: '',
    created_at_before: '',
    created_at_after: '',
    status: '',
    payment_status: '',
    page: 1,
    page_size: 10,
  })
  const { resultIsLoading, result: products } = useGetProductViewed(query)

  useEffect(() => {
  if (!searchParams && !selectedDateRange) return;

  const params = searchParams ? new URLSearchParams(searchParams) : null;

  const newQuery: ProductViewedParams = {
    search: params?.get("query") || "",
    page: Number(params?.get("page") || 1),
    page_size: Number(params?.get("page_size") || 10),
  };

  // handle date range
  if (selectedDateRange?.to) {
    const formattedFromDate = formatDateToYYYYMMDD(selectedDateRange.from);
    const formattedToDate = formatDateToYYYYMMDD(selectedDateRange.to);
    newQuery.created_at_before = formattedFromDate;
    newQuery.created_at_after = formattedToDate;
  } else{
      newQuery.created_at_before = '';
    newQuery.created_at_after = '';
  }

  setQuery((prev) => ({
    ...prev,
    ...newQuery,
  }));
  // eslint-disable-next-line
}, [searchParams, selectedDateRange?.to]);

  return (
    <div className="space-y-6 w-full">
      <div className="">
        <h2 className="text-lg font-bold uppercase">Reports</h2>
        <p className="text-sm">
          Track, manage and forecast your customers and orders.
        </p>
      </div>
      <h3 className="font-semobold uppercase">Product Viewed Report</h3>
      <hr />
      <div className="w-full flex justify-between">
        <div className="flex gap-4">
          <Search placeholder="Search" />
        </div>
        <div className="flex gap-4">
            <DatePickerWithRange onSelectDateRange={handleSelectDateRange} />
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
              Product
            </th>
            <th scope="col" className="px-4 py-6 uppercase">
              Product Id
            </th>
            <th scope="col" className="px-4 py-6 uppercase">
              Ratings
            </th>
            <th scope="col" className="px-4 py-6 uppercase">
              Review Count
            </th>
            <th scope="col" className="px-4 py-6 uppercase">
              Price
            </th>
            <th scope="col" className="px-4 py-6 uppercase">
              Viewed
            </th>
            <th scope="col" className="px-4 py-6 uppercase">
              Percentage
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
          <tr key={product.product_id} className="border-b">
            <td className="py-10 px-6 text-gray-900 text-sm gap-1">
                    {/* <Image
                      src="/footwear.jpg"
                      alt="Product"
                      className="rounded-full"
                      width={28}
                      height={28}
                    /> */}
                    {product.product}
            </td>
            <td className="py-10 px-6 text-gray-900 text-sm gap-1">
                    {product.product_id}
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
            <td className="py-10 px-6 text-gray-900 text-sm">
              {product.review_count}
            </td>
            <td className="py-10 px-6 text-gray-500 text-sm">₦{product.price}</td>
            <td className="py-10 px-6 text-gray-500 text-sm">{product.viewed}</td>
            <td className="py-10 px-6 text-gray-500 text-sm">{product.percentage}%</td>
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
export default ProductViewed;
