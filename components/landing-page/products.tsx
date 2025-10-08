'use client';

import React, { useRef } from 'react';
import ProductCard from './product-card';
import { Button } from '@/components/ui/button';
import { MoveRightIcon } from "lucide-react"
import { useRouter } from 'next/navigation';
import { ProductResponse } from '@/interfaces-and-types/product';

const Products = ({title, products, link}: {title: string, products: ProductResponse[], link: string}) => {
  const router = useRouter()
  const scrollRef = useRef<HTMLDivElement>(null);

  return (
    <section className="px-4 sm:px-6 lg:px-8 py-8 space-y-6">
      <div className="flex items-center justify-between">
        <h2 className="text-sm font-bold text-grey uppercase">{title}</h2>
        <Button
          variant="ghost"
          className="text-sm text-primary underline hover:no-underline"
          onClick={() => router.push(`/products/${link}`)}
        >
          View All <MoveRightIcon className='w-10 h-6'/>
        </Button>
      </div>
      <div
        ref={scrollRef}
        className="flex gap-4 overflow-x-auto scroll-smooth pb-2 -mx-2 px-2 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden"
      >
        {products && products.map((product, index) => (
          <div
            key={index}
            className="min-w-[250px] sm:min-w-[300px] flex-shrink-0"
          >
            <ProductCard
              image={product.main_image}
              title={product.name}
              description={product.short_description}
              price={Number(product.discounted_price)}
              oldPrice={Number(product?.price)}
              badgeText={product?.stock_status}
              id={product.id}
            />
          </div>
        ))}
      </div>
    </section>
  );
};

export default Products;
