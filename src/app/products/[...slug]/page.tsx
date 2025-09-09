"use client";
import { useState, useMemo } from "react";
import { useParams } from "next/navigation";
import Link from "next/link";
import { useProducts } from "@/api-services/product";
import { useCategory } from "@/api-services/product";
import ProductCard from "@/app-components/landing-page/product-card";
import { Button } from "@/app-components/ui/button";
import Modal from "@/app-components/landing-page/modal";
import FilterProduct from "@/app-components/product-page/filter-product";
import { ProductParams } from "@/interfaces-and-types/product";

const genders = ["men", "women", "kids"];
const specialSlugs: Record<string, Partial<ProductParams>> = {
  "new-arrivals": { is_new_arrival: true },
  "special-offers": { is_special_offer: true },
  "featured-product": { is_featured_product: true },
};

const Products = () => {
  const { slug = [] } = useParams<{ slug: string[] }>();
  const { result: categories } = useCategory();

  // derive ProductParams dynamically
  const productParams: ProductParams = useMemo(() => {
  const data: ProductParams = {};
  if (!slug || slug.length === 0) return data;

  // normalize slug values
  const [first, second] = slug.map((s) => s.toLowerCase());

  if (slug.length === 1) {
    // /products/new-arrivals (special)
    if (specialSlugs[first]) {
      Object.assign(data, specialSlugs[first]);
    } 
    // /products/men → treat as category
    else {
      const cat = categories?.find(
        (c) => c.name.toLowerCase() === first
      );
      if (cat) {
        data.category = cat.id;
      } else {
        data.category_name = first;
      }
    }
  }

  if (slug.length === 2) {
    // /products/men/jewellery → gender + category
    if (genders.includes(first)) {
      data.gender = first;
      const cat = categories?.find(
        (c) => c.name.toLowerCase() === second
      );
      if (cat) {
        data.category = cat.id;
      } else {
        data.category_name = second;
      }
    }
    // /products/new-arrivals/jewellery → special + category
    else if (specialSlugs[first]) {
      Object.assign(data, specialSlugs[first]);
      const cat = categories?.find(
        (c) => c.name.toLowerCase() === second
      );
      if (cat) {
        data.category = cat.id;
      } else {
        data.category_name = second;
      }
    }
  }

  return data;
}, [slug, categories]);


  const { resultIsLoading, result: products } = useProducts(productParams);

  const [isFilterOpen, setIsFilterOpen] = useState(false);
  const [type, setType] = useState<"filter" | "sort">("filter");

  // build breadcrumb
  const breadcrumb = useMemo(() => {
    if (!slug || slug.length === 0) return [{ label: "Products", href: "/product" }];

    return slug.map((s, i) => {
      const label = s.replace(/-/g, " ").replace(/\b\w/g, (c) => c.toUpperCase());
      const href = "/products/" + slug.slice(0, i + 1).join("/");
      return { label, href };
    });
  }, [slug]);

  return (
    <section className="px-4 py-8 space-y-6">
      <div className="flex items-center justify-between">
        {/* Breadcrumb */}
        <nav className="flex items-center gap-2 text-sm font-bold text-grey uppercase">
          {breadcrumb.map((b, i) => (
            <span key={b.href} className="flex items-center gap-2">
              <Link href={b.href} className="hover:underline">
                {b.label}
              </Link>
              {i < breadcrumb.length - 1 && <span>/</span>}
            </span>
          ))}
        </nav>

        {/* Actions */}
        <div>
          <Button
            variant="ghost"
            className="text-sm text-primary"
            onClick={() => {
              setIsFilterOpen(true);
              setType("filter");
            }}
          >
            Filter
          </Button>
          <Button
            variant="ghost"
            className="text-sm text-primary"
            onClick={() => {
              setIsFilterOpen(true);
              setType("sort");
            }}
          >
            Sort
          </Button>
        </div>
      </div>

      {resultIsLoading ? (
        <p>Loading...</p>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {products.map((pro) => (
            <ProductCard
              key={pro.id}
              image={pro.main_image}
              title={pro.name}
              description={pro.short_description}
              price={Number(pro.discounted_price)}
              oldPrice={Number(pro.price)}
              badgeText={pro.stock_status}
              id={pro.id}
            />
          ))}
        </div>
      )}

      <Modal isOpen={isFilterOpen} onClose={() => setIsFilterOpen(false)}>
        <FilterProduct type={type} />
      </Modal>
    </section>
  );
};

export default Products;
