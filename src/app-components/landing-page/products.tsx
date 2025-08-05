'use client';

import React, { useRef } from 'react';
import ProductCard from './product-card';
import Product1 from '@/assets/product-1.jpg';
import Product2 from '@/assets/product-2.jpg';
import Product3 from '@/assets/product-3.jpg';
import Product4 from '@/assets/product-4.jpg';
import { Button } from '@/app-components/ui/button';
import { MoveRightIcon } from "lucide-react"

const products = [
  {
    image: Product1,
    title: 'Sneakers',
    description: 'Classic white sneakers',
    price: 10500,
    // oldPrice: 18500,
    // badgeText: '20% off',
  },
  {
    image: Product2,
    title: 'Poncho',
    description: 'Waterproof poncho jacket',
    price: 8000,
    // oldPrice: 10000,
    // badgeText: 'New',
  },
  {
    image: Product3,
    title: 'Backpack',
    description: 'Durable travel backpack',
    price: 15000,
    // oldPrice: 19000,
    // badgeText: 'Hot',
  },
  {
    image: Product4,
    title: 'Watch',
    description: 'Luxury wristwatch',
    price: 35000,
    // oldPrice: 42000,
    // badgeText: '15% off',
  },
  {
    image: Product1,
    title: 'Watch',
    description: 'Luxury wristwatch',
    price: 35000,
    // oldPrice: 42000,
    // badgeText: '15% off',
  },
  {
    image: Product2,
    title: 'Watch',
    description: 'Luxury wristwatch',
    price: 35000,
    // oldPrice: 42000,
    // badgeText: '15% off',
  },
  {
    image: Product3,
    title: 'Watch',
    description: 'Luxury wristwatch',
    price: 35000,
    // oldPrice: 42000,
    // badgeText: '15% off',
  },
  {
    image: Product4,
    title: 'Watch',
    description: 'Luxury wristwatch',
    price: 35000,
    // oldPrice: 42000,
    // badgeText: '15% off',
  },
];

const Products = () => {
  const scrollRef = useRef<HTMLDivElement>(null);

  const handleScrollRight = () => {
    if (scrollRef.current) {
      scrollRef.current.scrollBy({ left: 300, behavior: 'smooth' });
    }
  };

  return (
    <section className="px-4 sm:px-6 lg:px-8 py-8 space-y-6">
      <div className="flex items-center justify-between">
        <h2 className="text-sm font-bold text-grey">New Arrivals</h2>
        <Button
          variant="ghost"
          className="text-sm text-primary underline hover:no-underline"
          onClick={handleScrollRight}
        >
          View All <MoveRightIcon className='w-10 h-6'/>
        </Button>
      </div>

      <div
        ref={scrollRef}
        className="flex gap-4 overflow-x-auto scroll-smooth pb-2 -mx-2 px-2 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden"
      >
        {products.map((product, index) => (
          <div
            key={index}
            className="min-w-[250px] sm:min-w-[300px] flex-shrink-0"
          >
            <ProductCard
              image={product.image}
              title={product.title}
              description={product.description}
              price={product.price}
            //   oldPrice={product?.oldPrice}
            //   badgeText={product?.badgeText}
            />
          </div>
        ))}
      </div>
    </section>
  );
};

export default Products;
