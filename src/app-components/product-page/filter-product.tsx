"use client";

import {useState} from "react";
import { Collapsible, CollapsibleTrigger, CollapsibleContent } from "@/app-components/ui/collapsible";
import { PlusIcon, MinusIcon } from "lucide-react";
import { RadioGroup, RadioGroupItem } from "@/app-components/ui/radio-group";
import { Label } from "@/app-components/ui/label";
import { Button } from "../ui/button";

const FilterProduct = ({ type }: {type?: string}) => {
  const [openSection, setOpenSection] = useState<string | null>(type ==='sort' ? 'sort': null);

  const handleToggle = (section: string) => {
    setOpenSection((prev) => (prev === section ? null : section));
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
          Product type {openSection === "productType" ? <MinusIcon className="w-4 h-4"/> : <PlusIcon className="w-4 h-4"/>}
        </CollapsibleTrigger>
        <CollapsibleContent>
          <RadioGroup defaultValue="caps" className="space-y-2 mt-2">
            {[
              "Caps",
              "Casual Footwear",
              "Hats",
              "Hoodies",
              "Jackets",
              "Shirts",
              "Shorts",
              "T-Shirts",
            ].map((item) => (
              <div key={item} className="flex items-center space-x-2">
                <RadioGroupItem value={item} id={item} />
                <Label htmlFor={item} className="text-sm font-normal text-gray-900">{item}</Label>
              </div>
            ))}
          </RadioGroup>
        </CollapsibleContent>
      </Collapsible>

      {/* Brand */}
      <Collapsible
        open={openSection === "brand"}
        onOpenChange={() => handleToggle("brand")}
        className="border-b py-2"
      >
        <CollapsibleTrigger className="flex w-full justify-between py-2 font-normal cursor-pointer text-gray-900">
          Brand {openSection === "brand" ? <MinusIcon className="w-4 h-4"/> : <PlusIcon className="w-4 h-4"/>}
        </CollapsibleTrigger>
        <CollapsibleContent>
          <RadioGroup defaultValue="caps" className="space-y-2 mt-2">
            {[
              "Caps",
              "Casual Footwear",
              "Hats",
              "Hoodies",
              "Jackets",
              "Shirts",
              "Shorts",
              "T-Shirts",
            ].map((item) => (
              <div key={item} className="flex items-center space-x-2">
                <RadioGroupItem value={item} id={item} />
                <Label htmlFor={item} className="text-sm font-normal text-gray-900">{item}</Label>
              </div>
            ))}
          </RadioGroup>
        </CollapsibleContent>
      </Collapsible>

      {/* Color */}
      <Collapsible
        open={openSection === "colour"}
        onOpenChange={() => handleToggle("colour")}
        className="border-b py-2"
      >
        <CollapsibleTrigger className="flex w-full justify-between py-2 font-normal cursor-pointer text-gray-900">
          Colour {openSection === "colour" ? <MinusIcon className="w-4 h-4"/> : <PlusIcon className="w-4 h-4"/>}
        </CollapsibleTrigger>
        <CollapsibleContent>
          <RadioGroup defaultValue="caps" className="space-y-2 mt-2">
            {[
              "Caps",
              "Casual Footwear",
              "Hats",
              "Hoodies",
              "Jackets",
              "Shirts",
              "Shorts",
              "T-Shirts",
            ].map((item) => (
              <div key={item} className="flex items-center space-x-2">
                <RadioGroupItem value={item} id={item} />
                <Label htmlFor={item} className="text-sm font-normal text-gray-900">{item}</Label>
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
          Size {openSection === "size" ? <MinusIcon className="w-4 h-4"/> : <PlusIcon className="w-4 h-4"/>}
        </CollapsibleTrigger>
        <CollapsibleContent>
          <RadioGroup defaultValue="caps" className="space-y-2 mt-2">
            {[
              "Caps",
              "Casual Footwear",
              "Hats",
              "Hoodies",
              "Jackets",
              "Shirts",
              "Shorts",
              "T-Shirts",
            ].map((item) => (
              <div key={item} className="flex items-center space-x-2">
                <RadioGroupItem value={item} id={item} />
                <Label htmlFor={item} className="text-sm font-normal text-gray-900">{item}</Label>
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
          Price {openSection === "price" ? <MinusIcon className="w-4 h-4"/> : <PlusIcon className="w-4 h-4"/>}
        </CollapsibleTrigger>
        <CollapsibleContent>
          <RadioGroup defaultValue="caps" className="space-y-2 mt-2">
            {[
              "Caps",
              "Casual Footwear",
              "Hats",
              "Hoodies",
              "Jackets",
              "Shirts",
              "Shorts",
              "T-Shirts",
            ].map((item) => (
              <div key={item} className="flex items-center space-x-2">
                <RadioGroupItem value={item} id={item} />
                <Label htmlFor={item} className="text-sm font-normal text-gray-900">{item}</Label>
              </div>
            ))}
          </RadioGroup>
        </CollapsibleContent>
      </Collapsible>

      {/* Gender */}
      <Collapsible
        open={openSection === "gender"}
        onOpenChange={() => handleToggle("gender")}
        className="border-b py-2"
      >
        <CollapsibleTrigger className="flex w-full justify-between py-2 font-normal cursor-pointer text-gray-900">
          Gender {openSection === "gender" ? <MinusIcon className="w-4 h-4"/> : <PlusIcon className="w-4 h-4"/>}
        </CollapsibleTrigger>
        <CollapsibleContent>
          <RadioGroup defaultValue="caps" className="space-y-2 mt-2">
            {[
              "Caps",
              "Casual Footwear",
              "Hats",
              "Hoodies",
              "Jackets",
              "Shirts",
              "Shorts",
              "T-Shirts",
            ].map((item) => (
              <div key={item} className="flex items-center space-x-2">
                <RadioGroupItem value={item} id={item} />
                <Label htmlFor={item} className="text-sm font-normal text-gray-900">{item}</Label>
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
          Sort {openSection === "sort" ? <MinusIcon className="w-4 h-4"/> : <PlusIcon className="w-4 h-4"/>}
        </CollapsibleTrigger>
        <CollapsibleContent>
          <RadioGroup defaultValue="caps" className="space-y-2 mt-2">
            {[
              "Featured",
              "Best selling",
              "Latest",
            ].map((item) => (
              <div key={item} className="flex items-center space-x-2">
                <RadioGroupItem value={item} id={item} />
                <Label htmlFor={item} className="text-sm font-normal text-gray-900">{item}</Label>
              </div>
            ))}
          </RadioGroup>
        </CollapsibleContent>
      </Collapsible>

      <Button className="w-full h-11 border bg-black text-white flex items-center justify-center gap-2 text-sm uppercase rounded-none mt-4">
           
            View Products
          </Button>
    </div>
  );
};

export default FilterProduct;
