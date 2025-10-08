"use client";
import { useState, Suspense} from "react";
import {
  Collapsible,
  CollapsibleTrigger,
  CollapsibleContent,
} from "@/app-components/ui/collapsible";
import { PlusIcon, MinusIcon } from "lucide-react";
import { RadioGroup, RadioGroupItem } from "@/app-components/ui/radio-group";
import { Label } from "@/app-components/ui/label";
import { Button } from "../ui/button";
import { useRouter, useSearchParams } from "next/navigation";
import { useModalStore } from "@/app-stores/modal";
const FilterOrderPage = ({ type }: { type?: string }) => {
  const [openSection, setOpenSection] = useState<string | null>(
    type === "sort" ? "sort" : null
  );
  const router = useRouter();
  const searchParams = useSearchParams();
  const { closeModal } = useModalStore()

  const status = [
    { label: "Pending", value: "1" },
    { label: "Approved", value: "2" },
  ];
   const payment_status = [
    { label: "Pending", value: "1" },
    { label: "Paid", value: "2" },
  ];


  const handleToggle = (section: string) => {
    setOpenSection((prev) => (prev === section ? null : section));
  };

  // helper to update query string
  const updateQuery = (key: string, value: string) => {
    const params = new URLSearchParams(searchParams.toString());
    if (value) {
      params.set(key, value);
    } else {
      params.delete(key);
    }
    router.push(`?${params.toString()}`);
  };

  const clearFilters = () => {
  const params = new URLSearchParams(searchParams.toString());

  // remove the filter keys
  ["status", "payment_status"].forEach((key) => {
    params.delete(key);
  });

  router.push(`?${params.toString()}`);
};
  return (
    <div>
      <h2 className="font-bold mb-1 uppercase">Filter By</h2>
      {/* Status */}
      <Collapsible
        open={openSection === "price"}
        onOpenChange={() => handleToggle("price")}
        className="border-b py-2"
      >
        <CollapsibleTrigger className="flex w-full justify-between py-2 font-normal cursor-pointer text-gray-900">
          Status{" "}
          {openSection === "price" ? (
            <MinusIcon className="w-4 h-4" />
          ) : (
            <PlusIcon className="w-4 h-4" />
          )}
        </CollapsibleTrigger>
        <CollapsibleContent>
          <RadioGroup
            defaultValue={searchParams.get("status") || ""}
            onValueChange={(val) => updateQuery("status", val)}
            className="space-y-2 mt-2"
          >
            {status.map((range) => (
              <div key={range.value} className="flex items-center space-x-2">
                <RadioGroupItem value={range.value} id={range.value} />
                <Label
                  htmlFor={range.value}
                  className="text-sm font-normal text-gray-900"
                >
                  {range.label}
                </Label>
              </div>
            ))}
          </RadioGroup>
        </CollapsibleContent>
      </Collapsible>

      {/* Payment Status */}
      <Collapsible
        open={openSection === "payment_status"}
        onOpenChange={() => handleToggle("payment_status")}
        className="border-b py-2"
      >
        <CollapsibleTrigger className="flex w-full justify-between py-2 font-normal cursor-pointer text-gray-900">
          Payment Status{" "}
          {openSection === "price" ? (
            <MinusIcon className="w-4 h-4" />
          ) : (
            <PlusIcon className="w-4 h-4" />
          )}
        </CollapsibleTrigger>
        <CollapsibleContent>
          <RadioGroup
            defaultValue={searchParams.get("payment_status") || ""}
            onValueChange={(val) => updateQuery("payment_status", val)}
            className="space-y-2 mt-2"
          >
            {payment_status.map((range) => (
              <div key={range.value} className="flex items-center space-x-2">
                <RadioGroupItem value={range.value} id={range.value} />
                <Label
                  htmlFor={range.value}
                  className="text-sm font-normal text-gray-900"
                >
                  {range.label}
                </Label>
              </div>
            ))}
          </RadioGroup>
        </CollapsibleContent>
      </Collapsible>
      <div>
        <Button
  variant="outline"
  onClick={clearFilters}
  className="w-full h-11 border flex items-center justify-center gap-2 text-sm uppercase rounded-none mt-4"
>
  Clear Filters
</Button>
<Button onClick={closeModal} className="w-full h-11 border bg-black text-white flex items-center justify-center gap-2 text-sm uppercase rounded-none mt-4">
        View Order
      </Button>
      </div>
      
    </div>
  );
};

export default function FilterOrder() {
  return (
    <Suspense fallback={<div className="p-4 text-gray-500">Loading Orders...</div>}>
      <FilterOrderPage />
    </Suspense>
  );
}
