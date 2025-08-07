"use client"
// import { useState } from "react";
import Header from "@/app-components/landing-page/header";
import NavLinks from "@/app-components/landing-page/nav-links";
import CarouselContainer from "@/app-components/landing-page/carousel";
import Products from "@/app-components/landing-page/products";

export default function Home() {
  return (
    <div className="w-full min-h-screen">
       <Header/>
       <NavLinks/>
       <CarouselContainer/>
       <Products/>
    </div>
  );
}
