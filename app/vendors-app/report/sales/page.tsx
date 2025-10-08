"use client"
import { useState, useEffect } from "react";
import Search from "@/app-components/search";
import { Button } from "@/app-components/ui/button";
import { Plus } from "lucide-react";
import { DateRange } from "react-day-picker";
import { DatePickerWithRange } from "@/app-components/ui/date-range";
import { useGetSales } from "@/api-services/report";
import { useSearchParams } from "next/navigation";
import { formatDateToYYYYMMDD } from "@/lib/utils";
import { SalesParams } from "@/interfaces-and-types/product";
const Sales = () => {
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
        page: 1,
        page_size: 10,
      })
  const { resultIsLoading, result: sales_} = useGetSales(query)

  useEffect(() => {
    if (!searchParams && !selectedDateRange) return;
  
    const params = searchParams ? new URLSearchParams(searchParams) : null;
  
    const newQuery: SalesParams = {
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
          ) : sales_?.length > 0 ? (
            sales_?.map((sale, index) => (
          <tr key={index + 1} className="border-b">
            <td className="py-10 px-6 text-gray-900 text-sm gap-1">
              {sale.date}
                    {/* September 23, 2025 */}
            </td>
            <td className="py-10 px-6 text-gray-900 text-sm">
              {sale.no_ordered}
            </td>
            <td className="py-10 px-6 text-gray-900 text-sm">
              {sale.product_sold}
            </td>
            <td className="py-10 px-6 text-gray-500 text-sm">₦{sale.price}</td>
            <td className="py-10 px-6 text-gray-500 text-sm">₦{sale.discount}</td>
            <td className="py-10 px-6 text-gray-500 text-sm">₦{sale.deduction}</td>
            <td className="py-10 px-6 text-gray-500 text-sm">₦{sale.total}</td>
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
export default Sales;
