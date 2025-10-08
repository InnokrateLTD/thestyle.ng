"use client"
import Search from "@/app-components/search";
import { Button } from "@/app-components/ui/button";
import { Plus } from "lucide-react";
import Image from "next/image";
import { Badge } from "@/app-components/ui/badge";
const ProductPerformance = () => {
  return (
    <div className="space-y-6 w-full">
      <div className="">
        <h2 className="text-lg font-bold uppercase">Reports</h2>
        <p className="text-sm">
          Track, manage and forecast your customers and orders.
        </p>
      </div>
      <h3 className="font-semobold uppercase">Product Performance</h3>
      <hr />
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
              Units Sold
            </th>
            <th scope="col" className="px-4 py-6 uppercase">
              stock remaining
            </th>
            <th scope="col" className="px-4 py-6 uppercase">
              Sales Value
            </th>
            <th scope="col" className="px-4 py-6 uppercase">
             Net Earnings
            </th>
          </tr>
        </thead>
        <tbody>
          <tr className="border-b">
            <td className="py-10 px-6 text-gray-900 text-sm gap-1 flex items-center">
                    <Image
                      src="/footwear.jpg"
                      alt="Product"
                      className="rounded-full"
                      width={28}
                      height={28}
                    />
                    Olivia
                    <Badge className="bg-blue-50 text-blue-700">Best Seller</Badge>
            </td>
            <td className="py-10 px-6 text-gray-500 text-sm">
              62
            </td>
            <td className="py-10 px-6 text-gray-900 text-sm">
              1098
            </td>
            <td className="py-10 px-6 text-gray-500 text-sm">₦25,000</td>
            <td className="py-10 px-6 text-gray-500 text-sm">₦25,000</td>
            
          </tr>
        </tbody>
      </table>
    </div>
  );
};
export default ProductPerformance;
