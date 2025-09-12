"use client";

import { useState } from "react";
import { Button } from "@/app-components/ui/button";
import {
  Select,
  SelectTrigger,
  SelectValue,
  SelectContent,
  SelectItem,
} from "@/app-components/ui/select";
import Image from "next/image";
import { useParams } from "next/navigation";
import { useSingleProduct } from "@/api-services/product";
import { useModalStore } from "@/app-stores/modal";
import { useCartStore } from "@/app-stores/cart";
import { formatAmount } from "@/lib/utils";
import { useGetProductReview } from "@/api-services/product";
import { useStylengAuthStore } from "@/app-stores/auth";
import {formatDate} from "@/lib/utils"
export default function ProductCart() {
  const [, /*size,*/ setSize] = useState("");
  const [page, /*setPage*/] = useState(1)
  const [pageSize, /*setPageSize*/] = useState(10)
  const { isLoggedIn } = useStylengAuthStore()
  const params = useParams();
  const { openModal } = useModalStore();
  const { addToCart, syncWithBackend } = useCartStore();
  const { result: product } = useSingleProduct(params?.id?.toString() ?? "");
  const {result: reviews} = useGetProductReview(params?.id?.toString() ?? "", page, pageSize)
  
  const AddProductToCart = async () => {
    if (product) {
        addToCart({
        product_id: product?.id,
        slug_id: product?.slug_id,
        name: product?.name,
        available_sizes: product?.available_sizes,
        price: product?.price,
        discounted_price: product?.discounted_price,
        discount_value: product?.discount_value,
        main_image: product?.main_image,
        total_stock: product?.total_stock,
      });
    }
    if (isLoggedIn){
      syncWithBackend('add')
    }
    openModal("cart");
  };
  return (
    <div className="grid grid-cols-1 lg:grid-cols-2">
      <div className="h-auto p-6 space-y-6">
        <div className="grid grid-cols-2 gap-4">
          {product?.additional_images?.map((img, index) => (
            <Image
              key={index}
              src={img}
              alt={`Product image ${index + 1}`}
              className="object-cover w-full h-auto"
              width={400}
              height={400}
            />
          ))}
        </div>

        {/* Reviews */}
        <div className="mt-6">
          <h2 className="font-bold uppercase leading-6">Reviews</h2>
          <div className="flex justify-between">
            <div className="flex items-center gap-1">
              <p className="text-4xl font-bold mt-2">4.7</p>
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
            <Button
              variant={"ghost"}
              className="underline"
              onClick={() => openModal("review")}
            >
              Write a Review
            </Button>
          </div>

          <div className="mt-4 space-y-4">
            {reviews && reviews.map((review) => (
                <div key={review.id} className="space-y-2">
              <p className="font-semibold">Solid shoe choice and looks slick</p>
              <p className="text-sm text-gray-500">
                {review.review_text}
              </p>
              <p className="text-xs text-gray-500">{formatDate(review.date_posted)}</p>
              <p className="font-semibold">{review.name}</p>
              <div className="flex">
                {Array.from({ length: 5 }).map((_, i) => (
                  <svg
                    key={i}
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 24 24"
                    fill={i < review.rating ? "#141414" : "#d1d5db"}
                    className="w-5 h-5"
                  >
                    <path d="M12 .587l3.668 7.431L24 9.753l-6 5.85 1.417 8.264L12 19.896l-7.417 3.971L6 15.603 0 9.753l8.332-1.735z" />
                  </svg>
                ))}
              </div>
            </div>
            ))}
          </div>
        </div>
      </div>

      {/* Right Column - Sticky */}
      <div className="p-6 border-l bg-white sticky top-0 h-screen flex flex-col justify-start">
        <p className="underline font-normal text-gray-500">
          {product?.seller_name}
        </p>
        <h1 className="text-xl font-semibold">{product?.name}</h1>
        <p className="text-gray-500 mt-2">{product?.description}</p>

        {/* Price */}
        <div className="mt-4 flex items-center gap-2">
          <p className="text-gray-900 text-sm line-through font-medium">
            ₦{formatAmount(product?.price)}
          </p>
          <p className="text-sm font-medium text-red-700">
            ₦{formatAmount(product?.discounted_price)}
          </p>
        </div>

        {/* Colours */}
        <div className="mt-4">
          <h3 className="font-semibold">Colours</h3>
          <div className="flex gap-2 mt-2">
            {product?.available_colors.map((color, index) => (
              <div
                key={index}
                className="w-8 h-8 rounded-none border cursor-pointer"
                style={{ backgroundColor: color }}
              />
            ))}
          </div>
        </div>

        {/* Size Selection */}
        <div className="mt-4">
          <Select onValueChange={setSize}>
            <SelectTrigger className="w-full rounded-none">
              <SelectValue placeholder="Please select a size" />
            </SelectTrigger>
            <SelectContent>
              {product?.available_sizes.map((size, index) => (
                <SelectItem key={index + 1} value={size}>
                  {size}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>

        {/* Buttons */}
        <div className="flex gap-4 mt-6">
          <Button className="flex-1 rounded-none" onClick={AddProductToCart}>
            Add to Cart
          </Button>
          <Button variant="outline" className=" rounded-none">
            Add to Wishlist
          </Button>
        </div>
      </div>
    </div>
  );
}
