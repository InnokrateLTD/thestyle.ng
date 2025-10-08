"use client"
import { useState, Suspense } from "react";
import Search from "@/components/search";
import { Button } from "@/components/ui/button";
import { Plus } from "lucide-react";
import { DateRange } from "react-day-picker";
import { DatePickerWithRange } from "@/components/ui/date-range";
import { Badge } from "@/components/ui/badge";
const RefundsPage = () => {
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
      <h3 className="font-semobold uppercase">Refunds & Return Report</h3>
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
              Request ID
            </th>
            <th scope="col" className="px-4 py-6 uppercase">
              Order Id
            </th>
            <th scope="col" className="px-4 py-6 uppercase">
              Customer Name
            </th>
            <th scope="col" className="px-4 py-6 uppercase">
              Reason
            </th>
            
            <th scope="col" className="px-4 py-6 uppercase">
              Request Date
            </th>
            <th scope="col" className="px-4 py-6 uppercase">
              Amount
            </th>
            <th scope="col" className="px-4 py-6 uppercase">
              Status
            </th>
          </tr>
        </thead>
        <tbody>
          <tr className="border-b">
            <td className="py-10 px-6 text-gray-900 text-sm gap-1">
                    RQ2001
            </td>
            <td className="py-10 px-6 text-gray-900 text-sm">
              ORD1005
            </td>
            <td className="py-10 px-6 text-gray-900 text-sm">
              Adaobi James
            </td>
            <td className="py-10 px-6 text-gray-500 text-sm">Items too small</td>
            <td className="py-10 px-6 text-gray-500 text-sm">22/09/2025</td>
            <td className="py-10 px-6 text-gray-500 text-sm">₦25,000</td>
            <td className="py-10 px-6 text-gray-500 text-sm"><Badge variant="default" className="bg-green-200 text-green-700">
                Approved
              </Badge></td>
          </tr>
        </tbody>
      </table>
    </div>
  );
};

export default function Refunds() {
  return (
    <Suspense fallback={<div className="p-4 text-gray-500">Loading Refunds...</div>}>
      <RefundsPage />
    </Suspense>
  );
}
