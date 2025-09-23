"use client"
import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from "@/app-components/ui/tabs";
import { cn } from "@/lib/utils";
import StoreVendorInfo from "@/app-components/vendors/storeInfo";
const StoreInfo = () => {
  return (
    <div className="space-y-6 w-full">
      <div className="">
        <h2 className="text-lg font-bold uppercase">Store Information</h2>
        <p className="text-sm">
          Track, manage and forecast your customers and orders.
        </p>
      </div>
      <hr />
      <div className="flex-1">
          <Tabs defaultValue="details" className="w-full space-y-8">
            <TabsList className="flex justify-between items-center gap-2 w-full">
              {/* Tabs on the left */}
              <div className="flex gap-2">
                {[
                  { value: "details", label: "Store Details" },
                  { value: "requisition", label: "Requisition" },
                  { value: "bank", label: "Bank Details" },
                  { value: "referral", label: "Referrals" },
                ].map((tab) => (
                  <TabsTrigger
                    key={tab.value}
                    value={tab.value}
                    className={cn(
                      "uppercase text-gray-500 border border-transparent px-3 py-2 text-sm font-medium transition-colors",
                      "data-[state=active]:text-black data-[state=active]:border-gray-300 data-[state=active]:border"
                    )}
                  >
                    {tab.label}
                  </TabsTrigger>
                ))}
              </div>
            </TabsList>

            <TabsContent value="details" className="w-full">
              <div className="flex justify-between w-full">
                <h1 className="uppercase font-bold leading-6 w-1/2">
                  Store details
                </h1>
                <div className="w-1/2 flex justify-end">
                    <StoreVendorInfo/>
                </div>
              </div>
            </TabsContent>
            <TabsContent value="requisition">
              <div className="flex justify-between w-full">
                <h1 className="uppercase font-bold leading-6 w-1/2">
                  Requisition
                </h1>
                <div className="w-1/2 flex justify-end">
                </div>
              </div>
            </TabsContent>
            <TabsContent value="bank">
              <div className="flex justify-between w-full">
                <h1 className="uppercase font-bold leading-6 w-1/2">
                  Banking Details
                </h1>
                <div className="w-1/2 flex justify-end">
                </div>
              </div>
            </TabsContent>
            <TabsContent value="referral">
              <div className="flex justify-between w-full">
                <h1 className="uppercase font-bold leading-6 w-1/2">
                  Referrals
                </h1>
                <div className="w-1/2 flex justify-end">
                </div>
              </div>
            </TabsContent>
          </Tabs>
        </div>
    </div>
  );
};
export default StoreInfo;
