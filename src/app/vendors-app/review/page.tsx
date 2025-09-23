"use client"
import Search from "@/app-components/search";
import { Button } from "@/app-components/ui/button";
import { Plus, EllipsisVertical } from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/app-components/ui/dropdown-menu";
import Image from "next/image";
const Product = () => {
  return (
    <div className="space-y-6 w-full">
      <div className="">
        <h2 className="text-lg font-bold uppercase">Reviews & Ratings</h2>
        <p className="text-sm">
          Track, manage and forecast your customers and orders.
        </p>
      </div>
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
              Ratings
            </th>
            <th scope="col" className="px-4 py-6 uppercase">
              Product name
            </th>
            <th scope="col" className="px-4 py-6 uppercase">
              Review Text
            </th>
            <th scope="col" className="px-4 py-6 uppercase">
              Date Posted
            </th>
            
            <th scope="col" className="px-4 py-6 uppercase">
              Action
            </th>
          </tr>
        </thead>
        <tbody>
          <tr className="border-b">
            <td className="py-10 px-6 text-gray-900 text-sm gap-1">
                    <Image
                      src="/footwear.jpg"
                      alt="Product"
                      className="rounded-full"
                      width={28}
                      height={28}
                    />
                    Olivia
            </td>
            <td className="py-10 px-6 text-gray-500 text-sm">
              <div className="flex">
                {Array.from({ length: 5 }).map((_, i) => (
                  <svg
                    key={i}
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 24 24"
                    fill={i < 3 ? "#fdb022" : "#d1d5db"}
                    className="w-5 h-5"
                  >
                    <path d="M12 .587l3.668 7.431L24 9.753l-6 5.85 1.417 8.264L12 19.896l-7.417 3.971L6 15.603 0 9.753l8.332-1.735z" />
                  </svg>
                ))}{" "}
              </div>
            </td>
            <td className="py-10 px-6 text-gray-900 text-sm">
              Product 1
            </td>
            <td className="py-10 px-6 text-gray-500 text-sm">Great product</td>
            <td className="py-10 px-6 text-gray-500 text-sm">September 23, 2025</td>
            
            <td className="py-10 px-6  text-sm">
              <DropdownMenu>
                <DropdownMenuTrigger className="focus:outline-none cursor-pointer">
                  <EllipsisVertical className="w-4 h-4" />
                </DropdownMenuTrigger>
                <DropdownMenuContent className="w-70 h-45 rounded-none mt-7">
                  <DropdownMenuItem className="cursor-pointer">
                    Edit
                  </DropdownMenuItem>
                  <DropdownMenuSeparator />
                  <DropdownMenuItem className="cursor-pointer">
                    Delete
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  );
};
export default Product;
