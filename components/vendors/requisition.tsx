"use client";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import Search from "@/components/search";
import { Plus } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { DateRange } from "react-day-picker";
import { DatePickerWithRange } from "@/components/ui/date-range";
import { useGetPayoutsRequest, useGetWalletBalance} from "@/api-services/store";
import { useModalStore } from "@/stores/modal";
const Requisition = () => {
  // const requisition = {
  //   amountSold: "₦5,000,000.00",
  //   deduction: "₦539,900.99",
  //   amountEarned: "₦4,539,900.99",
  //   payableBalance: "₦2,539,900.99",
  //   pendingBalance: "₦2,000,000.00",
  //   nextPaymentDate: "25th, April 2025",
  // };
  const { openModal } = useModalStore()
  const [/*selectedDateRange*/, setSelectedDateRange] = useState<
      DateRange | undefined
    >();
      const handleSelectDateRange = (dateRange: DateRange | undefined) => {
      setSelectedDateRange(dateRange);
    };
  const {result: payouts} = useGetPayoutsRequest()
  const {result: balance} = useGetWalletBalance()
  console.log(payouts, 'payouts')
  return (
    <div className="space-y-6">

    
    <div className="flex justify-between w-full">
      <div className="w-1/3 space-y-2">
        <h1 className="uppercase font-bold leading-6 ">Requisition</h1>
        <Button onClick={() => openModal('payout')} className="w-auto h-11 bg-black text-white rounded-none font-medium uppercase">
          Request Payout
        </Button>
      </div>

      <div className="w-2/3 flex justify-end">
          <div className="w-full max-w-6xl border p-4 space-y-4">
              <div className="text-lg font-bold uppercase">
                Requisition Overview
              </div>
            <div className="space-y-4">
              {/* Top Stats */}
              <div className="flex gap-4 text-sm">
                <div className="space-y-2">
                  <p className="font-normal text-gray-500">AMOUNT SOLD</p>
                  <p className="font-bold">{balance?.total_balance}</p>
                </div>

                <div className="space-y-2">
                  <p className="font-normal text-gray-500">DEDUCTION</p>
                  <p className="font-bold">{balance?.pending_balance}</p>
                </div>

                <div className="space-y-2">
                  <p className="font-normal text-gray-500">AMOUNT EARNED</p>
                  <p className="font-bold">{balance?.total_earned}</p>
                </div>

                <div className="space-y-2">
                  <p className="font-normal text-gray-500">PAYABLE BALANCE</p>
                  <p className="font-bold">{balance?.payable_balance}</p>
                </div>

                <div className="space-y-2">
                  <p className="font-normal text-gray-500">PENDING BALANCE</p>
                  <p className="font-bold">{balance?.pending_balance}</p>
                </div>
              </div>

              {/* Next Payment Notice */}
              <div className="bg-gray-100 p-3 rounded-md text-sm text-gray-700">
                Your next payment of{" "}
                <span className="font-semibold">
                  {balance?.pending_balance}
                </span>{" "}
                is on{" "}
                <span className="font-semibold">
                  {balance?.created_at}
                </span>
              </div>
            </div>
          </div>
      </div>
    </div>
    <hr />
    <div className="space-y-6 w-full">
      <div className="">
        <h2 className="text-lg font-semibold">Payment History</h2>
      </div>
      <div className="w-full flex justify-between">
        <div className="flex gap-4">
          <Search placeholder="Search" />
        </div>
        <div className="flex gap-4">
            <DatePickerWithRange onSelectDateRange={handleSelectDateRange} />
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
                    Payment Date
                  </th>
                  <th scope="col" className="px-4 py-6 uppercase">
                    Bank Details
                  </th>
                  <th scope="col" className="px-4 py-6 uppercase">
                    Amount Paid
                  </th>
                  <th scope="col" className="px-4 py-6 uppercase">
                    Status
                  </th>
                </tr>
              </thead>
              <tbody>
                
                {/* {resultIsLoading ? (
            <tr className="border-b">
              <td
                colSpan={8}
                scope="row"
                className="px-4 py-3 text-xs font-medium text-[#3E3E3E] whitespace-nowrap  text-center"
              >
                Loading...
              </td>
            </tr>
          ) : orders?.results && orders?.results?.length > 0 ? (
            orders?.results.map((order) => ( */}
                <tr key={1} className="border-b">
                  <td className="py-10 px-6 text-gray-900 text-sm flex items-center gap-1">
                    {"order.id"}
                  </td>
                  <td className="py-10 px-6 text-gray-500 text-sm">01</td>
                  <td className="py-10 px-6 text-gray-500 text-sm">
                    ₦ {"order.total"}
                  </td>

                  <td className="py-10 px-6 text-sm">
                    <Badge
                      variant="default"
                      className="bg-green-200 text-green-700"
                    >
                     active
                    </Badge>
                  </td>
                </tr>
            {/* ))
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
          )} */}
              </tbody>
            </table>
    </div>
    
    </div>
  );
};

export default Requisition;
