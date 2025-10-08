"use client"

import Autoplay from "embla-carousel-autoplay"
import { useRef } from "react"
import {
  Carousel,
  CarouselContent,
  CarouselItem,
} from "@/app-components/ui/carousel"
import CarouselImage1 from '@/assets/carousel-1.jpg'
import CarouselImage2 from '@/assets/carousel-2.jpg'
import Image from "next/image"
import { Button } from "@/app-components/ui/button"
import { useModalStore } from "@/app-stores/modal"
import { useRouter } from "next/navigation"

const CarouselContainer = () => {
  const { openModal } = useModalStore()
  const router = useRouter()

  const slides = [
    {
      image: CarouselImage1,
      title: 'Sell Your Fashion Collection Online!',
      subtitle: 'Join a thriving marketplace where you can showcase your products, reach more customers, and grow your brand.',
      description: 'List your products, manage sales, and connect with buyers effortlessly',
      button: { name: 'Start Selling', onClick: () => openModal("signup-vendor") },
    },
    {
      image: CarouselImage2,
      title: 'Discover the Latest Fashion Trends!',
      subtitle: 'Shop stylish clothing, footwear, and accessories from top vendors. Find your perfect look with ease.',
      description: 'Exclusive deals & top-quality brands just for you!',
      button: { name: 'Shop Women', onClick: () => router.push("/products/women") },
      button2: { name: 'Shop Men', onClick: () => router.push("/products/men") },
      button3: { name: 'Shop Vendor', onClick: () => router.push("/products/vendor") },
    }
  ]

  const plugin = useRef(
    Autoplay({ delay: 4000, stopOnInteraction: false })
  )

  return (
    <Carousel
      plugins={[plugin.current]}
      className="w-full"
      onMouseEnter={plugin.current.stop}
      onMouseLeave={plugin.current.reset}
    >
      <CarouselContent>
        {slides.map((slide, index) => (
          <CarouselItem key={index} className="w-full">
            <div className="relative w-full h-screen overflow-hidden">
              <Image
                src={slide.image}
                alt={`Slide ${index + 1}`}
                fill
                className="object-cover w-full h-full"
                priority={index === 0}
              />
              <div className="absolute inset-0 bg-black/50" />
              <div className="absolute z-10 p-4 sm:px-8 sm:py-16 text-white max-w-xl sm:left-10 top-1/3">
                <h1 className="text-2xl font-bold mb-4">{slide.title}</h1>
                <p className="mb-2">{slide.subtitle}</p>
                <i className="text-xs mb-6">{slide.description}</i>
                <div className="flex flex-wrap gap-2 mt-5">
                  {slide.button && (
                    <Button
                      onClick={slide.button.onClick}
                      className="bg-grey text-white hover:bg-white hover:text-black font-semibold uppercase py-2 px-4 transition w-40 h-12 rounded-none"
                    >
                      {slide.button.name}
                    </Button>
                  )}
                  {slide.button2 && (
                    <Button
                      onClick={slide.button2.onClick}
                      className="bg-white text-grey font-semibold uppercase py-2 px-4 transition w-40 h-12 hover:bg-grey hover:text-white rounded-none"
                    >
                      {slide.button2.name}
                    </Button>
                  )}
                  {slide.button3 && (
                    <Button
                      onClick={slide.button3.onClick}
                      className="border border-white text-white bg-transparent font-semibold uppercase py-2 px-4 transition w-40 h-12 rounded-none"
                    >
                      {slide.button3.name}
                    </Button>
                  )}
                </div>
              </div>
            </div>
          </CarouselItem>
        ))}
      </CarouselContent>
    </Carousel>
  )
}

export default CarouselContainer
