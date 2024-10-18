import React, { useRef, ReactNode } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import { FiArrowUpRight } from "react-icons/fi";

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
    <div>
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
    </div>
  );
};

const IMG_PADDING = 12;

const TextParallaxContent: React.FC<TextParallaxContentProps> = ({
  imgUrl,
  subheading,
  heading,
  children,
}) => {
  return (
    <div style={{ paddingLeft: IMG_PADDING, paddingRight: IMG_PADDING }}>
      <div className="relative h-[150vh]">
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
      className="absolute left-0 top-0 flex h-screen w-full flex-col items-center justify-center text-white"
    >
      <p className="mb-2 text-center text-xl md:mb-4 md:text-3xl">
        {subheading}
      </p>
      <p className="text-center text-4xl font-bold md:text-7xl">{heading}</p>
    </motion.div>
  );
};

const ExampleContent: React.FC = () => (
  <div className="mx-auto grid max-w-5xl grid-cols-1 gap-8 px-4 pb-24 pt-12 md:grid-cols-12">
    <h2 className="col-span-1 text-3xl font-bold md:col-span-4 text-white">
      Get ready for the exciting futsal events!
    </h2>
    <div className="col-span-1 md:col-span-8">
      <p className="mb-4 text-xl text-neutral-100 md:text-2xl">
        Join us as we kick off the Futsal Championship on October 25th.
        Don&apos;t miss out on the action and support your team!
      </p>
      <p className="mb-8 text-xl text-neutral-300 md:text-2xl">
        Team selection is currently underway. Gather your friends and form your
        futsal team for the tournament!
      </p>
      <button className="w-full rounded bg-white px-9 py-4 text-xl text-black transition-colors hover:bg-neutral-700 md:w-fit">
        Learn more <FiArrowUpRight className="inline" />
      </button>
    </div>
  </div>
);
