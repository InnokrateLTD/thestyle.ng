// app/checkout/page.tsx
"use client";

import { useState } from "react";
import { Input } from "@/app-components/ui/input";
import { Label } from "@/app-components/ui/label";
import { Button } from "@/app-components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/app-components/ui/card";
import { RadioGroup, RadioGroupItem } from "@/app-components/ui/radio-group";
import { Select, SelectTrigger, SelectValue, SelectContent, SelectItem } from "@/app-components/ui/select";
import { Checkbox } from "@/app-components/ui/checkbox";
import { Switch } from "@/app-components/ui/switch"
import Image from "next/image";
import { useCartStore } from "@/app-stores/cart";
import { formatAmount } from "@/lib/utils";

export default function CheckoutPage() {
  const [deliveryMethod, setDeliveryMethod] = useState("standard");
  const {
      totalItems,
      totalPrice
    } = useCartStore();
  const items = useCartStore((state) => state.items);
  const size = useCartStore((state) => state.size)
  return (
    <div className="max-w-6xl mx-auto px-4 py-8">
      <button className="text-sm text-gray-500 hover:underline mb-4">
        ← Back
      </button>

      <h1 className="text-center text-lg font-semibold">
        CHECKOUT <span className="block text-sm font-normal">{totalItems} item(s) ₦{formatAmount(totalPrice)}</span>
      </h1>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 ">
        <Card className="rounded-none shadow-none border-none">
          <CardHeader>
            <CardTitle className="uppercase font-bold leading-6">Account</CardTitle>
          </CardHeader>
          <CardContent className="space-y-6">
           <p className="text-sm">you@gmail.com</p>

            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label>First Name</Label>
                <Input placeholder="Enter your first name" className="h-11 rounded-none" />
              </div>
              <div className="space-y-2">
                <Label>Last Name</Label>
                <Input placeholder="Enter your last name" className="h-11 rounded-none" />
              </div>
            </div>

            <div className="space-y-2">
              <Label>Address</Label>
              <Input placeholder="Enter your address" className="h-11 rounded-none" />
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label>City</Label>
                <Input placeholder="Enter your city" className="h-11 rounded-none" />
              </div>
              <div className="space-y-2">
                <Label>City</Label>
                <Select>
              <SelectTrigger className="w-full rounded-none">
                <SelectValue placeholder="Please select a state" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="lagos">Lagos</SelectItem>
              </SelectContent>
            </Select>
              </div>
              
            </div>
            <div className="space-y-2">
              <Label>Phone Number</Label>
              <Input placeholder="Enter your number" className="h-11 rounded-none" />
            </div>

            <div className="flex gap-2 items-center">
              <Checkbox/>
              <p className="text-sm">Save address and contact information for future orders</p>
            </div>

            {/* Delivery Method */}
            <div className="mt-15 space-y-6">
              <Label className="uppercase font-bold">Delivery Method</Label>
              <RadioGroup
                value={deliveryMethod}
                onValueChange={setDeliveryMethod}
                className="space-y-3 mt-2"
              >
                <div className="flex items-start space-x-2 border border-gray-100 p-4">
                   <RadioGroupItem value="standard" id="standard" />
                  <div className="flex flex-col gap-2">
                   
                  <Label htmlFor="standard" className="cursor-pointer text-gray-500 tracking-wide leading-6">
                    Standard Delivery – Some items are being sourced from a store, allow 3–5 working days
                  </Label>
                  <span className="uppercase font-medium">Free</span>
                  </div>
                  
                </div>
                <div className="flex items-start space-x-2 border border-gray-100 p-4">
                  <RadioGroupItem value="premium" id="premium" />
                  <div className="flex flex-col gap-2">
                    <Label htmlFor="premium" className="cursor-pointer text-gray-500 tracking-wide leading-6">
                    Premium Delivery – Some items are being sourced from a store, allow 1–2 working days for orders made before 2pm
                  </Label>
                    <span className="uppercase font-medium"> ₦3,000.00</span>
                  </div>
                  
                </div>
                <div className="flex items-start space-x-2 border border-gray-100 p-4">
                  <RadioGroupItem value="pickup" id="pickup" />
                  <div className="flex flex-col gap-2">
                    <Label htmlFor="pickup" className="cursor-pointer text-gray-500 tracking-wide leading-6">
                    Self Pickup – Pick up your order from the pickup point every Thursdays (FREE)
                  </Label>
                  <span className="uppercase font-medium">Free</span>
                  </div>
                  
                </div>
              </RadioGroup>
            </div>

            <Button className="w-full text-gray text-white h-11 rounded-none">Place Order</Button>
          </CardContent>
        </Card>

        {/* Right Section */}
        <Card className="p-6 border-none shadow-none rounded-none sticky top-0 h-screen flex flex-col justify-start">
          <CardHeader className="flex justify-between">
            <div className="uppercase font-bold leading-6">Your Bag</div>
            <Button variant={'link'} className="text-sm text-gray-500 underline">
        Edit
      </Button>
          </CardHeader>
          <CardContent className="space-y-6 h-screen overflow-scroll">
            {/* Product */}
            {items.map((item) => (
  <div key={item.product_id} className="flex gap-4 items-center">
    <div className="w-[100px] h-[100px] relative border rounded overflow-hidden">
      <Image
        src={item.main_image}
        alt="Product"
        fill
        className="object-cover"
      />
    </div>
    <div className="space-y-1">
      <p className="font-semibold tracking-wide leading-6">{item.name}</p>
      <p className="text-xs text-gray-500">Size: {size}</p>
      <p className="text-xs text-gray-500">QTY: {item.quantity}</p>
      <p className="font-semibold">₦{formatAmount(item.discounted_price)} x {item.quantity}</p>
    </div>
  </div>
))}



            

            {/* Cashback */}
            <div>
              <Label className="uppercase font-semibold leading-5 text-sm">Use Cash-Back</Label>
              <div className="flex mt-2 justify-between">
                <div className="flex gap-2">
                  <Switch />
                <p className="text-sm">Available cash-back</p>
                </div>
                <span className="font-semibold leading-5 text-sm">₦0.00</span>
              </div>
            </div>
            {/* Promo */}
            <div>
              <Label className="uppercase font-semibold leading-5 text-sm">Promo Code</Label>
              <div className="flex mt-2">
                <Input placeholder="Enter code" className="rounded-none h-11 w-[347px]" />
                <Button variant="default" className="ml-2 w-[159px] h-11 rounded-none">
                  Apply
                </Button>
              </div>
            </div>

            {/* Summary */}
            <div className="text-sm space-y-2  pt-4">
              <div className="flex justify-between">
                <span className="font-semibold leading-6 tracking-wide text-gray-600">Item(s)</span>
                <span className="font-semibold leading-6 tracking-wide text-gray-600">{totalItems}</span>
              </div>
              <div className="flex justify-between">
                <span className="font-semibold leading-6 tracking-wide text-gray-600">Subtotal</span>
                <span className="font-semibold leading-6 tracking-wide text-gray-600">₦{formatAmount(totalPrice)}</span>
              </div>
              <div className="flex justify-between">
                <span className="font-semibold leading-6 tracking-wide text-gray-600">Cash-back Deduction</span>
                <span className="font-semibold leading-6 tracking-wide text-gray-600">₦0.00</span>
              </div>
              <div className="flex justify-between">
                <span className="font-semibold leading-6 tracking-wide text-gray-600">Coupon Discount</span>
                <span className="font-semibold leading-6 tracking-wide text-gray-600">₦0.00</span>
              </div>
              <div className="flex justify-between">
                <span className="font-semibold leading-6 tracking-wide text-gray-600">Delivery</span>
                <span className="font-semibold leading-6 tracking-wide text-gray-600">₦0.00</span>
              </div>
              <div className="flex justify-between font-semibold mt-5">
                <span className="font-bold leading-6 bg-grey-900 uppercase">Total</span>
                <span className="font-bold leading-6 bg-grey-900">₦{formatAmount(totalPrice)}</span>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
