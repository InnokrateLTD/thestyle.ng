"use client"
import { useState, useEffect, Suspense } from "react";
import Search from "@/app-components/search";
import { Button } from "@/app-components/ui/button";
import { Plus } from "lucide-react";
import { Badge } from "@/app-components/ui/badge";
import { useGetVendorOrder } from "@/api-services/order";
import { useSearchParams } from "next/navigation";
import { DateRange } from "react-day-picker";
import { DatePickerWithRange } from "@/app-components/ui/date-range";
import { formatDateToYYYYMMDD } from "@/lib/utils";
import { OrderParams } from "@/interfaces-and-types/order";
import { useModalStore } from "@/app-stores/modal";
const Order = () => {
  const { openModal } = useModalStore()
  const searchParams = useSearchParams();
      const [selectedDateRange, setSelectedDateRange] = useState<
      DateRange | undefined
    >();
      const handleSelectDateRange = (dateRange: DateRange | undefined) => {
      setSelectedDateRange(dateRange);
    };
  
    const [query, setQuery] = useState({
      search: '',
      date_from: '',
      date_to: '',
      page: 1,
      page_size: 10,
      product_id: ''
    })
    const { resultIsLoading, result: orders} = useGetVendorOrder(query)
    useEffect(() => {
      if (!searchParams && !selectedDateRange) return;
    
      const params = searchParams ? new URLSearchParams(searchParams) : null;
    
      const newQuery: OrderParams = {
        search: params?.get("query") || "",
        status: params?.get("status") || "",
        payment_status: params?.get("payment_status") || "",
        page: Number(params?.get("page") || 1),
        page_size: Number(params?.get("page_size") || 10),
      };
    
      // handle date range
      if (selectedDateRange?.to) {
        const formattedFromDate = formatDateToYYYYMMDD(selectedDateRange.from);
        const formattedToDate = formatDateToYYYYMMDD(selectedDateRange.to);
        newQuery.date_from = formattedFromDate;
        newQuery.date_to = formattedToDate;
      } else{
          newQuery.date_from = '';
        newQuery.date_to = '';
      }
    
      
      setQuery((prev) => ({
        ...prev,
        ...newQuery,
      }));
      // eslint-disable-next-line
    }, [searchParams, selectedDateRange?.to]);
  return (
    <Suspense fallback={<div>Loading...</div>}>

    
    <div className="space-y-6 w-full">
      <div className="">
        <h2 className="text-lg font-bold uppercase">Orders</h2>
        <p className="text-sm">
          Track, manage and forecast your customers and orders.
        </p>
      </div>
      <div className="w-full flex justify-between">
        <div className="flex gap-4">
          <Search placeholder="Search" />
          
        </div>
        <div className="flex gap-4">
          <DatePickerWithRange onSelectDateRange={handleSelectDateRange} />
            <Button
            onClick={() => openModal('filter-order')}
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
                    Customer Name
                  </th>
                  <th scope="col" className="px-4 py-6 uppercase">
                    Order Id
                  </th>
                  <th scope="col" className="px-4 py-6 uppercase">
                    QTY
                  </th>
                  <th scope="col" className="px-4 py-6 uppercase">
                    Total Price
                  </th>
                  <th scope="col" className="px-4 py-6 uppercase">
                    Date
                  </th>
                  <th scope="col" className="px-4 py-6 uppercase">
                    Delivery
                  </th>
                  <th scope="col" className="px-4 py-6 uppercase">
                    Status
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
          ) : orders && orders?.length > 0 ? (
            orders?.map((order) => (
                <tr key={order.id} className="border-b">
                  <td className="py-10 px-6 text-gray-900 text-sm  gap-1">
                    {order.customer_name}
                  </td>
                  <td className="py-10 px-6 text-gray-900 text-sm gap-1">
                    {order.id}
                  </td>
                  <td className="py-10 px-6 text-gray-500 text-sm">{order.items.length}</td>
                  <td className="py-10 px-6 text-gray-500 text-sm">
                    ₦ {order.items.length}
                  </td>
                  <td className="py-10 px-6 text-gray-500 text-sm">
                    {formatDateToYYYYMMDD(order.created_at)}
                  </td>
                  <td className="py-10 px-6 text-sm">
                    <Badge
                      variant="default"
                      className="bg-green-200 text-green-700"
                    >
                      {order.status}
                    </Badge>
                  </td>
                  <td className="py-10 px-6  text-sm">
                    <Badge
                      variant="default"
                      className="bg-gray-100 text-gray-700"
                    >
                      {order.delivery_status_display}
                    </Badge>
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
    </div></Suspense>
  );
};
export default Order;
