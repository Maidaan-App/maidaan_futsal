"use client";

import React from "react";
import {
  motion,
  useScroll,
  useTransform,
  useSpring,
  MotionValue,
} from "framer-motion";
import Image from "next/image";
import Link from "next/link";

// Define the type for the product
interface Product {
  title: string;
  link: string;
  thumbnail: string;
}

// Define the props type for the HeroParallax component
interface HeroParallaxProps {
  products: Product[];
}

export const HeroParallax: React.FC<HeroParallaxProps> = ({ products }) => {
  const firstRow = products.slice(0, 5);
  const secondRow = products.slice(5, 10);
  const thirdRow = products.slice(10, 15);
  const ref = React.useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start start", "end start"],
  });

  const springConfig = { stiffness: 300, damping: 30, bounce: 100 };

  const translateX = useSpring(
    useTransform(scrollYProgress, [0, 1], [0, 1000]),
    springConfig
  );
  const translateXReverse = useSpring(
    useTransform(scrollYProgress, [0, 1], [0, -1000]),
    springConfig
  );
  const rotateX = useSpring(
    useTransform(scrollYProgress, [0, 0.2], [15, 0]),
    springConfig
  );
  const opacity = useSpring(
    useTransform(scrollYProgress, [0, 0.2], [0.2, 1]),
    springConfig
  );
  const rotateZ = useSpring(
    useTransform(scrollYProgress, [0, 0.2], [20, 0]),
    springConfig
  );
  const translateY = useSpring(
    useTransform(scrollYProgress, [0, 0.2], [-700, 500]),
    springConfig
  );

  return (
    <div
      ref={ref}
      className="h-[300vh] py-40 overflow-hidden antialiased relative flex flex-col [perspective:1000px] [transform-style:preserve-3d]"
    >
      <Header />
      <motion.div
        style={{ rotateX, rotateZ, translateY, opacity }}
        className="relative"
      >
        <motion.div className="flex flex-row-reverse mb-20 space-x-reverse space-x-20">
          {firstRow.map((product) => (
            <ProductCard
              product={product}
              translate={translateX}
              key={product.title}
            />
          ))}
        </motion.div>
        <motion.div className="flex mb-20 space-x-20">
          {secondRow.map((product) => (
            <ProductCard
              product={product}
              translate={translateXReverse}
              key={product.title}
            />
          ))}
        </motion.div>
        <motion.div className="flex flex-row-reverse space-x-reverse space-x-20">
          {thirdRow.map((product) => (
            <ProductCard
              product={product}
              translate={translateX}
              key={product.title}
            />
          ))}
        </motion.div>
      </motion.div>
    </div>
  );
};

const Header: React.FC = () => {
  return (
    <div className="max-w-7xl mx-auto py-20 md:py-40 px-4">
      <h1 className="text-2xl text-center md:text-7xl font-bold text-white">
        X-CEL FUTSAL CENTER
      </h1>
      <p className="max-w-2xl text-base md:text-xl mt-8 text-neutral-200">
        X-cEl Futsal is a premier futsal facility offering top-notch courts for
        players of all levels. We promote teamwork and fitness through leagues,
        tournaments, and training sessions. Join us to enhance your skills and
        enjoy the excitement of futsal!
      </p>
    </div>
  );
};

// Props type for ProductCard component
interface ProductCardProps {
  product: Product;
  translate: MotionValue<number>;
}

export const ProductCard: React.FC<ProductCardProps> = ({
  product,
  translate,
}) => {
  return (
    <motion.div
      style={{ x: translate }}
      className="h-96 w-[30rem] relative flex-shrink-0"
    >
      <Image
        src={product.thumbnail}
        height={600}
        width={600}
        className="object-cover object-left-top rounded-lg absolute h-full w-full inset-0"
        alt={product.title}
      />
      {/* Removed hover effect and opacity transition */}
    </motion.div>
  );
};