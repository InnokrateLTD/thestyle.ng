"use client";
import { useState } from "react";
import Product1 from "@/assets/product-1.jpg";
import Product2 from "@/assets/product-2.jpg";
import Product3 from "@/assets/product-3.jpg";
import Product4 from "@/assets/product-4.jpg";
import ProductCard from "@/app-components/landing-page/product-card";
import { Button } from "@/app-components/ui/button";
import Modal from "@/app-components/landing-page/modal";
import FilterProduct from "@/app-components/product-page/filter-product";
const products = [
  {
    image: Product1,
    title: "Sneakers",
    description: "Classic white sneakers",
    id: 1,
    price: 10500,
    // oldPrice: 18500,
    // badgeText: '20% off',
  },
  {
    image: Product2,
    title: "Poncho",
    description: "Waterproof poncho jacket",
    id: 1,
    price: 8000,
    oldPrice: 10000,
    badgeText: "New",
  },
  {
    image: Product3,
    title: "Backpack",
    description: "Durable travel backpack",
    id: 1,
    price: 15000,
    // oldPrice: 19000,
    // badgeText: 'Hot',
  },
  {
    image: Product4,
    title: "Watch",
    description: "Luxury wristwatch",
    price: 35000,
    // oldPrice: 42000,
    // badgeText: '15% off',
  },
  {
    image: Product1,
    title: "Watch",
    description: "Luxury wristwatch",
    id: 1,
    price: 35000,
    // oldPrice: 42000,
    // badgeText: '15% off',
  },
  {
    image: Product2,
    title: "Watch",
    description: "Luxury wristwatch",
    id: 1,
    price: 35000,
    // oldPrice: 42000,
    // badgeText: '15% off',
  },
  {
    image: Product3,
    title: "Watch",
    description: "Luxury wristwatch",
    id: 1,
    price: 35000,
    oldPrice: 42000,
    badgeText: "15% off",
  },
  {
    image: Product4,
    title: "Watch",
    description: "Luxury wristwatch",
    id: 1,
    price: 35000,
    // oldPrice: 42000,
    // badgeText: '15% off',
  },
];
const Products = () => {
  const [isFilterOpen, setIsFilterOpen] = useState(false);
  const [type, setType] = useState('filter')
  return (
    <section className="px-4 py-8 space-y-6">
      <div className="flex items-center justify-between">
        <h2 className="text-sm font-bold text-grey uppercase">women</h2>
        <div>
          <Button
            variant="ghost"
            className="text-sm text-primary"
            onClick={() => {
              setIsFilterOpen(true)
              setType('filter')
            }}
          >
            Filter
          </Button>
          <Button 
            variant="ghost" 
            className="text-sm text-primary"
            onClick={() => {
              setIsFilterOpen(true)
              setType('sort')
            }}
          >
            Sort
          </Button>
        </div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {products.map((product, index) => (
          <ProductCard
            key={index}
            image={product.image}
            title={product.title}
            description={product.description}
            price={product.price}
            oldPrice={product?.oldPrice}
            badgeText={product?.badgeText}
            id={product.id}
          />
        ))}
      </div>

      <Modal isOpen={isFilterOpen} onClose={() => setIsFilterOpen(false)}>
        <FilterProduct type={type}/>
      </Modal>
    </section>
  );
};
export default Products;
