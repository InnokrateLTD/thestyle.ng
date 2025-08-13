"use client";

import { useState } from "react";
import { Button } from "@/app-components/ui/button";
import { Select, SelectTrigger, SelectValue, SelectContent, SelectItem } from "@/app-components/ui/select";
import Image from "next/image";
import Product1 from '@/assets/product-1.jpg';

export default function ProductPage() {
  const [/*size,*/, setSize] = useState("");

  return (
    <div className="grid grid-cols-1 lg:grid-cols-2">
      <div className="h-auto p-6 space-y-6">
        <div className="grid grid-cols-2 gap-4">
          <Image src={Product1} alt="Product" className="object-cover w-full" />
          <Image src={Product1} alt="Product" className="object-cover w-full" />
          <Image src={Product1} alt="Product" className="object-cover w-full" />
          <Image src={Product1} alt="Product" className="object-cover w-full" />
        </div>

        {/* Reviews */}
        <div className="mt-6">
          <h2 className="font-bold uppercase leading-6">Reviews</h2>
          <div className="flex items-center gap-1">
            <p className="text-4xl font-bold mt-2">4.7 
           
          </p>
                 <div className="flex justify-center mt-1">
                  {Array.from({ length: 5 }).map((_, i) => (
                    <svg
                      key={i}
                      xmlns="http://www.w3.org/2000/svg"
                      viewBox="0 0 24 24"
                      fill={i < 4 ? "#141414" : "#d1d5db"}
                      className="w-5 h-5"
                    >
                      <path d="M12 .587l3.668 7.431L24 9.753l-6 5.85 1.417 8.264L12 19.896l-7.417 3.971L6 15.603 0 9.753l8.332-1.735z" />
                    </svg>
                  ))}
                </div>
          </div>
          

          <div className="mt-4 space-y-4">
            <div>
              <p className="font-semibold">Solid shoe choice and looks slick</p>
              <p className="text-sm text-gray-500">This is a very cool looking shoe...</p>
            </div>
            <div>
              <p className="font-semibold">Amazing choice and comfort</p>
              <p className="text-sm text-gray-500">Perfect blend of style and comfort...</p>
            </div>
          </div>
        </div>
      </div>

      {/* Right Column - Sticky */}
      <div className="p-6 border-l bg-white sticky top-0 h-screen flex flex-col justify-start">
        <p className="underline font-normal text-gray-500">Name of store</p>
        <h1 className="text-xl font-semibold">Men&apos;s Beta Down Insulated GORE-TEX Jacket - Tatsu</h1>
        <p className="text-gray-500 mt-2">Pinnacle design from Arc&apos;teryx. The Beta down Jacket is an elevated...</p>

        {/* Price */}
        <div className="mt-4 flex items-center gap-2">
          <p className="text-gray-900 text-sm line-through font-medium">₦245,000.00</p>
          <p className="text-sm font-medium text-red-700">₦195,000.00</p>
        </div>

        {/* Colours */}
        <div className="mt-4">
          <h3 className="font-semibold">Colours</h3>
          <div className="flex gap-2 mt-2">
            <div className="w-8 h-8 rounded-none bg-gray-700 border cursor-pointer" />
            <div className="w-8 h-8 rounded-none bg-blue-900 border cursor-pointer" />
            <div className="w-8 h-8 rounded-none bg-black border cursor-pointer" />
          </div>
        </div>

        {/* Size Selection */}
        <div className="mt-4">
          <Select onValueChange={setSize}>
            <SelectTrigger className="w-full rounded-none">
              <SelectValue placeholder="Please select a size" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="s">Small</SelectItem>
              <SelectItem value="m">Medium</SelectItem>
              <SelectItem value="l">Large</SelectItem>
            </SelectContent>
          </Select>
        </div>

        {/* Buttons */}
        <div className="flex gap-4 mt-6">
          <Button className="flex-1 rounded-none">Add to Cart</Button>
          <Button variant="outline" className=" rounded-none">Add to Wishlist</Button>
        </div>
      </div>
    </div>
  );
}
