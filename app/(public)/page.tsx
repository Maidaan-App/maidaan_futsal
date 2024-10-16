import React from "react";
import { HeroParallax } from "@/components/hero-parallax";
import Courts from "./_components/Courts";
import Bookings from "./_components/Bookings";
import Facilities from "./_components/Facilities";

const sampleProducts = [
  {
    title: "Product 1",
    link: "/product1",
    thumbnail: "/images/futsal.jpeg",
  },
  {
    title: "Product 2",
    link: "/product2",
    thumbnail: "/images/futsal2.jpeg",
  },
  {
    title: "Product 3",
    link: "/product3",
    thumbnail: "/images/futsal3.jpeg",
  },
  {
    title: "Product 4",
    link: "/product4",
    thumbnail: "/images/futsal.jpeg",
  },
  {
    title: "Product 5",
    link: "/product5",
    thumbnail: "/images/futsal2.jpeg",
  },
  {
    title: "Product 6",
    link: "/product6",
    thumbnail: "/images/futsal3.jpeg",
  },
  {
    title: "Product 7",
    link: "/product7",
    thumbnail: "/images/futsal.jpeg",
  },
  {
    title: "Product 8",
    link: "/product8",
    thumbnail: "/images/futsal2.jpeg",
  },
  {
    title: "Product 9",
    link: "/product9",
    thumbnail: "/images/futsal3.jpeg",
  },
  {
    title: "Product 10",
    link: "/product10",
    thumbnail: "/images/futsal.jpeg",
  },
  {
    title: "Product 11",
    link: "/product11",
    thumbnail: "/images/futsal2.jpeg",
  },
  {
    title: "Product 12",
    link: "/product12",
    thumbnail: "/images/futsal3.jpeg",
  },
  {
    title: "Product 13",
    link: "/product13",
    thumbnail: "/images/futsal.jpeg",
  },
  {
    title: "Product 14",
    link: "/product14",
    thumbnail: "/images/futsal2.jpeg",
  },
  {
    title: "Product 15",
    link: "/product15",
    thumbnail: "/images/futsal3.jpeg",
  },
];

export default function ImagesSliderDemo() {
  return (
    <div className="bg-[#182b2a]">
      <HeroParallax products={sampleProducts} />
      <Courts />
      <Bookings />
      <Facilities />
    </div>
  );
}
