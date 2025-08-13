
import CarouselContainer from "@/app-components/landing-page/carousel";
import Products from "@/app-components/landing-page/products";
import Categories from "@/app-components/landing-page/category";
import TestimonialSlider from "@/app-components/landing-page/testimonial";
export default function Home() {
  return (
    <div className="w-full min-h-screen">
       <CarouselContainer/>
       <Products title="New Arrivals"/>
       <Products title="Featured Products"/>
       <Products title="Special Offers"/>
       <Categories/>
       <TestimonialSlider/>
    </div>
  );
}
