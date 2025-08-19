
import CarouselContainer from "@/app-components/landing-page/carousel";
import Products from "@/app-components/landing-page/products";
import Categories from "@/app-components/landing-page/category";
import TestimonialSlider from "@/app-components/landing-page/testimonial";
import Header from "@/app-components/header";
import Footer from "@/app-components/footer";
import NavLinks from "@/app-components/nav-links";
export default function Home() {
  return (
    <div className="w-full min-h-screen">
      <Header/>
       <NavLinks/>
       <CarouselContainer/>
       <Products title="New Arrivals"/>
       <Products title="Featured Products"/>
       <Products title="Special Offers"/>
       <Categories/>
       <TestimonialSlider/>
       <Footer/>
    </div>
  );
}
