import Header from "@/app-components/landing-page/header";
import NavLinks from "@/app-components/landing-page/nav-links";
import CarouselContainer from "@/app-components/landing-page/carousel";
export default function Home() {
  return (
    <div className="w-full min-h-screen">
       <Header/>
       <NavLinks/>
       <CarouselContainer/>
    </div>
  );
}
