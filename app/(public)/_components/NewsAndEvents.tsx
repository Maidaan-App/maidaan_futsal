import React, { useRef, ReactNode } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import { FiArrowUpRight } from "react-icons/fi";
import { montserrat } from "@/lib/constants";

// Define the types for the TextParallaxContent component props
interface TextParallaxContentProps {
  imgUrl: string;
  subheading: string;
  heading: string;
  children?: ReactNode;
}

// Main component
export const NewsAndEvents: React.FC = () => {
  return (
    <div className={`${montserrat.className} py-20`}>
      <h1 className="text-4xl font-bold mb-12 text-center text-[#f1f1f1]">
        NEWS AND EVENTS
      </h1>
      <TextParallaxContent
        imgUrl="/images/futsalEvent.jpg"
        subheading="Upcoming Match"
        heading="Futsal Championship on October 25th"
      >
        <ExampleContent />
      </TextParallaxContent>
      <TextParallaxContent
        imgUrl="/images/futsalEvent2.jpg"
        subheading="Team Selection"
        heading="Select Your Futsal Team for the Tournament"
      >
        <ExampleContent />
      </TextParallaxContent>

      {/* View More Button */}
      <div className="flex justify-center mt-12">
        <button className="w-full md:w-fit rounded  px-8 py-3 text-xl text-white transition-colors hover:bg-neutral-700">
          View All <FiArrowUpRight className="inline ml-2" />
        </button>
      </div>
    </div>
  );
};

const IMG_PADDING = 20;

const TextParallaxContent: React.FC<TextParallaxContentProps> = ({
  imgUrl,
  subheading,
  heading,
  children,
}) => {
  return (
    <div style={{ paddingLeft: IMG_PADDING, paddingRight: IMG_PADDING }}>
      <div className="relative mx-20">
        <StickyImage imgUrl={imgUrl} />
        <OverlayCopy heading={heading} subheading={subheading} />
      </div>
      {children}
    </div>
  );
};

const StickyImage: React.FC<{ imgUrl: string }> = ({ imgUrl }) => {
  const targetRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: targetRef,
    offset: ["end end", "end start"],
  });

  const scale = useTransform(scrollYProgress, [0, 1], [1, 0.85]);
  const opacity = useTransform(scrollYProgress, [0, 1], [1, 0]);

  return (
    <motion.div
      style={{
        backgroundImage: `url(${imgUrl})`,
        backgroundSize: "cover",
        backgroundPosition: "center",
        height: `calc(100vh - ${IMG_PADDING * 2}px)`,
        top: IMG_PADDING,
        scale,
      }}
      ref={targetRef}
      className="sticky z-0 overflow-hidden rounded-3xl"
    >
      <motion.div
        className="absolute inset-0 bg-neutral-950/70"
        style={{
          opacity,
        }}
      />
    </motion.div>
  );
};

const OverlayCopy: React.FC<{ subheading: string; heading: string }> = ({
  subheading,
  heading,
}) => {
  const targetRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: targetRef,
    offset: ["start end", "end start"],
  });

  const y = useTransform(scrollYProgress, [0, 1], [250, -250]);
  const opacity = useTransform(scrollYProgress, [0.25, 0.5, 0.75], [0, 1, 0]);

  return (
    <motion.div
      style={{
        y,
        opacity,
      }}
      ref={targetRef}
      className="absolute left-0 top-0 flex h-screen w-full flex-col items-center justify-center text-[#f1f1f1]"
    >
      <p className="mb-2 text-center text-lg md:mb-4 md:text-xl">
        {subheading}
      </p>
      <p className="text-center text-4xl font-bold md:text-5xl">{heading}</p>
    </motion.div>
  );
};

const ExampleContent: React.FC = () => (
  <div className="mx-auto grid max-w-5xl grid-cols-1 gap-8 px-4 pb-24 pt-12 md:grid-cols-12">
    <h2 className="col-span-1 text-2xl font-bold md:col-span-4 text-[#f1f1f1]">
      Get ready for the exciting futsal events!
    </h2>
    <div className="col-span-1 md:col-span-8">
      <p className="mb-4 text-lg text-neutral-100 md:text-xl">
        Join us as we kick off the Futsal Championship on October 25th.
        Don&apos;t miss out on the action and support your team!
      </p>
      <p className="mb-8 text-lg text-neutral-300 md:text-xl">
        Team selection is currently underway. Gather your friends and form your
        futsal team for the tournament!
      </p>
      <button className="w-full rounded bg-white px-8 py-3 text-xl text-black transition-colors hover:bg-neutral-700 md:w-fit">
        Learn more <FiArrowUpRight className="inline" />
      </button>
    </div>
  </div>
);
