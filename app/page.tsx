"use client"
import CarouselContainer from "@/components/landing-page/carousel";
import Products from "@/components/landing-page/products";
import Categories from "@/components/landing-page/category";
import TestimonialSlider from "@/components/landing-page/testimonial";
import Header from "@/components/header";
import Footer from "@/components/footer";
import NavLinks from "@/components/nav-links";
import { useProducts } from "@/api-services/product";
export default function Home() {
  const { result: products} = useProducts({
    is_featured_product: false,
    is_new_arrival: false,
    is_special_offer: false
  })
  return (
    <div className="w-full min-h-screen">
      <Header/>
       <NavLinks/>
       <CarouselContainer/>
       <Products title="New Arrivals" products={products} link="new-arrivals"/>
       <Products title="Featured Products" products={products} link="featured-products"/>
       <Products title="Special Offers" products={products} link="special-offers"/>
       <Categories/>
       <TestimonialSlider/>
       <Footer/>
    </div>
  );
}
