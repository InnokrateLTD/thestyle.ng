"use client"
import { useState } from "react";
import Search from "@/app-components/search";
import { Button } from "@/app-components/ui/button";
import { Plus } from "lucide-react";
import { DateRange } from "react-day-picker";
import { DatePickerWithRange } from "@/app-components/ui/date-range";
const Sales = () => {
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
      <h3 className="font-semobold uppercase">Sales Report</h3>
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
              Date
            </th>
            <th scope="col" className="px-4 py-6 uppercase">
              No. Ordered
            </th>
            <th scope="col" className="px-4 py-6 uppercase">
              Product Sold
            </th>
            <th scope="col" className="px-4 py-6 uppercase">
              Price
            </th>
            <th scope="col" className="px-4 py-6 uppercase">
              Discount
            </th>
            <th scope="col" className="px-4 py-6 uppercase">
              Deduction
            </th>
            <th scope="col" className="px-4 py-6 uppercase">
              Total
            </th>
          </tr>
        </thead>
        <tbody>
          <tr className="border-b">
            <td className="py-10 px-6 text-gray-900 text-sm gap-1">
                    September 23, 2025
            </td>
            <td className="py-10 px-6 text-gray-900 text-sm">
              20
            </td>
            <td className="py-10 px-6 text-gray-900 text-sm">
              20
            </td>
            <td className="py-10 px-6 text-gray-500 text-sm">₦25,000</td>
            <td className="py-10 px-6 text-gray-500 text-sm">₦25,000</td>
            <td className="py-10 px-6 text-gray-500 text-sm">₦25,000</td>
            <td className="py-10 px-6 text-gray-500 text-sm">₦25,000</td>
          </tr>
        </tbody>
      </table>
    </div>
  );
};
export default Sales;
