"use client";

import * as React from "react";
import "keen-slider/keen-slider.min.css";
import { useKeenSlider } from "keen-slider/react";
import { Card, CardContent } from "@/app-components/ui/card";
import {
  Avatar,
  AvatarFallback,
  AvatarImage,
} from "@/app-components/ui/avatar";

interface Testimonial {
  quote: string;
  name: string;
  image: string;
  rating: number;
}

const testimonials: Testimonial[] = [
  {
    quote: "Helped me exchange it quickly.",
    name: "John Doe",
    image: "/avatar-1.jpg",
    rating: 5,
  },
  {
    quote:
      "The jewelry collection is stunning. The earrings I got were even prettier in person! Just wish they had more color options.",
    name: "Amina Yusuf",
    image: "/avatar-2.jpg",
    rating: 3,
  },
  {
    quote:
      "One of the best shopping experiences I've had online. Fast delivery too!",
    name: "Lola Ade",
    image: "/avatar-3.jpg",
    rating: 4,
  },
];

const TestimonialsSlider = () => {
  const [sliderRef] = useKeenSlider<HTMLDivElement>(
    {
      loop: true,
      mode: "snap",
      slides: {
        perView: 1.3,
        spacing: 24,
      },
      breakpoints: {
        "(min-width: 640px)": {
          slides: { perView: 1.2, spacing: 24, origin: "center" },
        },
        "(min-width: 1024px)": {
          slides: { perView: 1.666, spacing: 24, origin: "center" },
        },
      },
      created(slider) {
        const interval = setInterval(() => slider.next(), 4000);
        slider.on("destroyed", () => clearInterval(interval));
      },
    },
    []
  );

  return (
    <section>
      <h2 className="text-sm font-semibold uppercase tracking-wide mb-4 mx-4 my-10">
        What our customers are saying
      </h2>

      <div ref={sliderRef} className="keen-slider">
        {testimonials.map((t, idx) => (
          <div
            key={idx}
            className="keen-slider__slide flex justify-center"
          >
            <Card className="w-[914px] flex flex-col bg-grey-light items-center text-center p-6 rounded-none shadow-none border-none">
              <CardContent className="flex flex-col items-center justify-center h-full">
                <p className="text-gray-600 mb-6">&quot;{t.quote}&quot;</p>
                <Avatar className="w-11 h-11 mb-3">
                  <AvatarImage src={t.image} alt={t.name}/>
                  <AvatarFallback>CN</AvatarFallback>
                </Avatar>
                <p className="font-semibold">{t.name}</p>
                <div className="flex justify-center mt-1">
                  {Array.from({ length: 5 }).map((_, i) => (
                    <svg
                      key={i}
                      xmlns="http://www.w3.org/2000/svg"
                      viewBox="0 0 24 24"
                      fill={i < t.rating ? "#141414" : "#d1d5db"}
                      className="w-5 h-5"
                    >
                      <path d="M12 .587l3.668 7.431L24 9.753l-6 5.85 1.417 8.264L12 19.896l-7.417 3.971L6 15.603 0 9.753l8.332-1.735z" />
                    </svg>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>
        ))}
      </div>

      {/* Avatars Row */}
      <div className="flex justify-center mt-8 space-x-2">
        {testimonials.map((t, idx) => (
          <Avatar key={idx}>
            <AvatarImage src={t.image} alt={t.name} className="w-11 h-11" />
            <AvatarFallback>CN</AvatarFallback>
          </Avatar>
        ))}
      </div>
    </section>
  );
};

export default TestimonialsSlider;
