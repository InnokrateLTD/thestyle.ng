"use client";
import { useState, Suspense } from "react";
import {
  Collapsible,
  CollapsibleTrigger,
  CollapsibleContent,
} from "@/components/ui/collapsible";
import { PlusIcon, MinusIcon } from "lucide-react";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Label } from "@/components/ui/label";
import { Button } from "../ui/button";
import { useCategory } from "@/api-services/product";
import { useRouter, useSearchParams } from "next/navigation";
import { useModalStore } from "@/stores/modal";
const FilterProductPage = ({ type }: { type?: string } = {}) => {
  const [openSection, setOpenSection] = useState<string | null>(
    type === "sort" ? "sort" : null
  );
  const router = useRouter();
  const searchParams = useSearchParams();
  const { closeModal } = useModalStore()
  const sizes = ["XS", "S", "M", "L", "XL", "XXL"] as const;
  const priceRanges = [
    { label: "Under ₦5,000", value: "0-5000" },
    { label: "₦5,000 - ₦10,000", value: "5000-10000" },
    { label: "₦10,000 - ₦20,000", value: "10000-20000" },
    { label: "₦20,000 - ₦50,000", value: "20000-50000" },
    { label: "₦50,000 - ₦100,000", value: "50000-100000" },
    { label: "₦100,000- ₦200,000", value: "100000-200000" },
  ];

  const { result: categories } = useCategory();

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
  ["category", "size", "price", "sort"].forEach((key) => {
    params.delete(key);
  });

  router.push(`?${params.toString()}`);
};
  return (
    <div>
      <h2 className="font-bold mb-1 uppercase">Filter By</h2>

      {/* Product type */}
      <Collapsible
        open={openSection === "productType"}
        onOpenChange={() => handleToggle("productType")}
        className="mt-8 border-b py-2"
      >
        <CollapsibleTrigger className="flex w-full justify-between py-2 font-normal cursor-pointer text-gray-900">
          Product type{" "}
          {openSection === "productType" ? (
            <MinusIcon className="w-4 h-4" />
          ) : (
            <PlusIcon className="w-4 h-4" />
          )}
        </CollapsibleTrigger>
        <CollapsibleContent>
          <RadioGroup
            defaultValue={searchParams.get("category") || ""}
            onValueChange={(val) => updateQuery("category", val)}
            className="space-y-2 mt-2"
          >
            {categories.map((item) => (
              <div key={item.id} className="flex items-center space-x-2">
                <RadioGroupItem value={item.name} id={item.id} />
                <Label
                  htmlFor={item.id}
                  className="text-sm font-normal text-gray-900"
                >
                  {item.name}
                </Label>
              </div>
            ))}
          </RadioGroup>
        </CollapsibleContent>
      </Collapsible>

      {/* Size */}
      <Collapsible
        open={openSection === "size"}
        onOpenChange={() => handleToggle("size")}
        className="border-b py-2"
      >
        <CollapsibleTrigger className="flex w-full justify-between py-2 font-normal cursor-pointer text-gray-900">
          Size{" "}
          {openSection === "size" ? (
            <MinusIcon className="w-4 h-4" />
          ) : (
            <PlusIcon className="w-4 h-4" />
          )}
        </CollapsibleTrigger>
        <CollapsibleContent>
          <RadioGroup
            defaultValue={searchParams.get("size") || ""}
            onValueChange={(val) => updateQuery("size", val)}
            className="space-y-2 mt-2"
          >
            {sizes.map((item) => (
              <div key={item} className="flex items-center space-x-2">
                <RadioGroupItem value={item} id={item} />
                <Label
                  htmlFor={item}
                  className="text-sm font-normal text-gray-900"
                >
                  {item}
                </Label>
              </div>
            ))}
          </RadioGroup>
        </CollapsibleContent>
      </Collapsible>

      {/* Price */}
      <Collapsible
        open={openSection === "price"}
        onOpenChange={() => handleToggle("price")}
        className="border-b py-2"
      >
        <CollapsibleTrigger className="flex w-full justify-between py-2 font-normal cursor-pointer text-gray-900">
          Price{" "}
          {openSection === "price" ? (
            <MinusIcon className="w-4 h-4" />
          ) : (
            <PlusIcon className="w-4 h-4" />
          )}
        </CollapsibleTrigger>
        <CollapsibleContent>
          <RadioGroup
            defaultValue={searchParams.get("price") || ""}
            onValueChange={(val) => updateQuery("price", val)}
            className="space-y-2 mt-2"
          >
            {priceRanges.map((range) => (
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

      {/* Sort */}
      <Collapsible
        open={openSection === "sort"}
        onOpenChange={() => handleToggle("sort")}
        className="border-b py-2"
      >
        <CollapsibleTrigger className="flex w-full justify-between py-2 font-normal cursor-pointer text-gray-900">
          Sort{" "}
          {openSection === "sort" ? (
            <MinusIcon className="w-4 h-4" />
          ) : (
            <PlusIcon className="w-4 h-4" />
          )}
        </CollapsibleTrigger>
        <CollapsibleContent>
          <RadioGroup
            defaultValue={searchParams.get("sort") || ""}
            onValueChange={(val) => updateQuery("sort", val)}
            className="space-y-2 mt-2"
          >
            {["Featured", "Best selling", "Latest"].map((item) => (
              <div key={item} className="flex items-center space-x-2">
                <RadioGroupItem value={item} id={item} />
                <Label
                  htmlFor={item}
                  className="text-sm font-normal text-gray-900"
                >
                  {item}
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
        View Products
      </Button>
      </div>
      
    </div>
  );
};

export default function FilterProduct() {
  return (
    <Suspense fallback={<div className="p-4 text-gray-500">Loading Orders...</div>}>
      <FilterProductPage />
    </Suspense>
  );
}
