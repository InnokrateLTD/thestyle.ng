"use client";

import { Card, CardContent } from "@/app-components/ui/card";
import Image, { StaticImageData } from "next/image";
import { cn } from "@/lib/utils";
import { HeartIcon } from "lucide-react";
import { useRouter } from "next/navigation";
interface ProductCardProps {
  image: StaticImageData;
  title: string;
  description: string;
  id: number | undefined
  price: number;
  oldPrice?: number;
  badgeText?: string;
  badgeColor?: string;
}

export default function ProductCard({
  image,
  title,
  description,
  id,
  price,
  oldPrice,
  badgeText,
  badgeColor = "bg-red-100 text-red-600",
}: ProductCardProps) {
  const router = useRouter()
  return (
    <Card onClick={() => router.push(`/products/${id}/details`) } className="w-full sm:w-[300px] h-[536px] rounded-none shadow-none border-none transition py-0 group cursor-pointer">
      <div className="relative w-full h-64 sm:h-[420px]">
        <Image src={image} alt={title} fill className="object-cover" />

        {/* Badge */}
        {badgeText && (
          <span
            className={cn(
              "absolute top-2 left-2 text-xs font-semibold px-2 py-1 rounded",
              badgeColor
            )}
          >
            {badgeText}
          </span>
        )}
        
        <div className="absolute top-2 right-2 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
          <HeartIcon className="w-6 h-6 text-black  cursor-pointer" />
        </div>
      </div>

      <CardContent className="flex flex-col gap-3 mt-4">
        <h3 className="text-base font-semibold">{title}</h3>
        <p className="text-sm text-gray-500">{description}</p>
        <div className="flex gap-2 items-center">
          {oldPrice && (
            <span className="line-through text-gray-500 text-sm font-medium">
              ₦{oldPrice.toLocaleString()}
            </span>
          )}
          <span
            className={cn(
              "text-sm font-bold",
              oldPrice ? "text-red-600" : "text-black"
            )}
          >
            ₦{price.toLocaleString()}
          </span>
        </div>
      </CardContent>
    </Card>
  );
}
