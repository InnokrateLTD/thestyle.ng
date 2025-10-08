"use client";
import { useState, useMemo } from "react";
import { useParams } from "next/navigation";
import Link from "next/link";
import { useProducts } from "@/api-services/product";
import ProductCard from "@/app-components/landing-page/product-card";
import { Button } from "@/app-components/ui/button";
import Modal from "@/app-components/landing-page/modal";
import FilterProduct from "@/app-components/product-page/filter-product";
import { ProductParams } from "@/interfaces-and-types/product";

const genders = ["men", "women", "kids"];
const specialSlugs: Record<string, Partial<ProductParams>> = {
  "new-arrivals": { is_new_arrival: true },
  "special-offer": { is_special_offer: true },
  "featured": { is_featured_product: true },
};

const Products = () => {
  const { slug = [] } = useParams<{ slug: string[] }>();

  // derive ProductParams dynamically
  const productParams: ProductParams = useMemo(() => {
    const data: ProductParams = {};

    if (slug.length === 1) {
      if (genders.includes(slug[0])) {
        data.gender = slug[0];
      } else if (specialSlugs[slug[0]]) {
        Object.assign(data, specialSlugs[slug[0]]);
      } else {
        data.category_name = slug[0];
      }
    }

    if (slug.length === 2) {
      if (genders.includes(slug[0])) {
        data.gender = slug[0];
        data.category_name = slug[1];
      }
    }

    return data;
  }, [slug]);

  const { resultIsLoading, result: products } = useProducts(productParams);

  const [isFilterOpen, setIsFilterOpen] = useState(false);
  const [type, setType] = useState<"filter" | "sort">("filter");

  // build breadcrumb
  const breadcrumb = useMemo(() => {
    if (!slug || slug.length === 0) return [{ label: "Products", href: "/product" }];

    return slug.map((s, i) => {
      const label = s.replace(/-/g, " ").replace(/\b\w/g, (c) => c.toUpperCase());
      const href = "/product/" + slug.slice(0, i + 1).join("/");
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
