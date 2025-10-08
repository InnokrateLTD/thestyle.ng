"use client";
import { useState } from "react";
import { useProducts } from "@/api-services/product";
import ProductCard from "@/app-components/landing-page/product-card";
import { Button } from "@/app-components/ui/button";
import Modal from "@/app-components/landing-page/modal";
import FilterProduct from "@/app-components/product-page/filter-product";

const ProductList = ({title} : {title: string}) => {
  const {/*resultIsLoading,*/ result: products} = useProducts()
 
  const [isFilterOpen, setIsFilterOpen] = useState(false);
  const [type, setType] = useState('filter')
  return (
    <section className="py-8 space-y-6">
      <div className="flex items-center justify-between">
        <h2 className="text-sm font-bold text-grey uppercase">{title}</h2>
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
        {products.map((pro) => (
          <ProductCard
            key={pro.id}
            image={pro.main_image}
            title={pro.name}
            description={pro.slug_id}
            price={Number(pro.discounted_price)}
            oldPrice={Number(pro.price)}
            badgeText={pro.stock_status}
            id={pro.id}
          />
        ))}
      </div>

      <Modal isOpen={isFilterOpen} onClose={() => setIsFilterOpen(false)}>
        <FilterProduct type={type}/>
      </Modal>
    </section>
  );
};
export default ProductList;
