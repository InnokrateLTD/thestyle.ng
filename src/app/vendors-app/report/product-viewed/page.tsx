"use client"
import { useState } from "react";
import Search from "@/app-components/search";
import { Button } from "@/app-components/ui/button";
import { Plus } from "lucide-react";
import Image from "next/image";
import { DateRange } from "react-day-picker";
import { DatePickerWithRange } from "@/app-components/ui/date-range";
const ProductViewed = () => {
    const [/*selectedDateRange*/, setSelectedDateRange] = useState<
    DateRange | undefined
  >();
    const handleSelectDateRange = (dateRange: DateRange | undefined) => {
    setSelectedDateRange(dateRange);
  };
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
          <tr className="border-b">
            <td className="py-10 px-6 text-gray-900 text-sm gap-1">
                    <Image
                      src="/footwear.jpg"
                      alt="Product"
                      className="rounded-full"
                      width={28}
                      height={28}
                    />
                    Olivia
            </td>
            <td className="py-10 px-6 text-gray-900 text-sm gap-1">
                    1
            </td>
            <td className="py-10 px-6 text-gray-500 text-sm">
              <div className="flex">
                {Array.from({ length: 5 }).map((_, i) => (
                  <svg
                    key={i}
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 24 24"
                    fill={i < 3 ? "#fdb022" : "#d1d5db"}
                    className="w-5 h-5"
                  >
                    <path d="M12 .587l3.668 7.431L24 9.753l-6 5.85 1.417 8.264L12 19.896l-7.417 3.971L6 15.603 0 9.753l8.332-1.735z" />
                  </svg>
                ))}{" "}
              </div>
            </td>
            <td className="py-10 px-6 text-gray-900 text-sm">
              20
            </td>
            <td className="py-10 px-6 text-gray-500 text-sm">₦25,000</td>
            <td className="py-10 px-6 text-gray-500 text-sm">2000</td>
            <td className="py-10 px-6 text-gray-500 text-sm">28.23%</td>
          </tr>
        </tbody>
      </table>
    </div>
  );
};
export default ProductViewed;
