import React, { useRef, ReactNode } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import { FiArrowUpRight } from "react-icons/fi";
import { MINIOURL, montserrat } from "@/lib/constants";
import { NEWSEVENT } from "@/lib/types";
import {
  convertToHumanReadable,
  convertToHumanReadableNoTime,
} from "@/lib/helper";
import Link from "next/link";
import { paths } from "@/lib/paths";

// Define the types for the TextParallaxContent component props
interface TextParallaxContentProps {
  imgUrl: string;
  subheading: string;
  heading: string;
  children?: ReactNode;
}

interface props {
  NewsEventsData: NEWSEVENT[];
}

// Main component
export const NewsAndEvents = ({ NewsEventsData }: props) => {
  return (
    <div className={`${montserrat.className} py-20`}>
      <h1 className="md:text-4xl text-2xl font-bold mb-12 text-center uppercase text-[#f1f1f1]">
        NEWS AND EVENTS
      </h1>
      <TextParallaxContent
        imgUrl={`${MINIOURL}${NewsEventsData[0].image}`}
        subheading={convertToHumanReadableNoTime(NewsEventsData[0].createdDate)}
        heading={NewsEventsData[0].title}
      >
        <ExampleContent NewsEventsData={NewsEventsData[0]} />
      </TextParallaxContent>
      <TextParallaxContent
        imgUrl={`${MINIOURL}${NewsEventsData[1].image}`}
        subheading={convertToHumanReadableNoTime(NewsEventsData[1].createdDate)}
        heading={NewsEventsData[1].title}
      >
        <ExampleContent NewsEventsData={NewsEventsData[1]} />
      </TextParallaxContent>

      {/* View More Button */}
      <div className="flex justify-center mt-12">
        <Link
          href={paths.public.newsEvents}
          className="w-fit md:w-fit rounded px-8 py-3 text-xl text-white transition-colors hover:bg-neutral-700"
        >
          View All <FiArrowUpRight className="inline ml-2" />
        </Link>
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
      <div className="relative mx-4 md:mx-20">
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
        top: IMG_PADDING,
        scale,
      }}
      ref={targetRef}
      className="sticky z-0 overflow-hidden rounded-3xl h-[50vh] md:h-[100vh]" // Responsive height
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
      className="absolute left-0 top-0 flex h-[50vh] md:h-screen w-full flex-col items-center justify-center px-4 text-[#f1f1f1]"
    >
      <p className="mb-2 text-center md:mb-4 md:text-xl">{subheading}</p>
      <p className="text-center  md:text-4xl font-bold">{heading}</p>
    </motion.div>
  );
};

interface exampleProps {
  NewsEventsData: NEWSEVENT;
}

const ExampleContent = ({ NewsEventsData }: exampleProps) => (
  <div className="mx-auto  max-w-5xl  gap-8 px-4 pb-24 pt-12 ">
    <div className="flex flex-col items-center">
      {/* <div className="text-[#28353D] flex flex-col gap-4"> */}
      <p
        className="mb-4 text-neutral-100 md:text-xl line-clamp-4"
        dangerouslySetInnerHTML={{ __html: NewsEventsData.description }}
      ></p>
      {/* </div> */}
      <Link
        href={`${paths.public.newsEvents}/${NewsEventsData.slug}`}
        className="w-fit rounded bg-white px-8 py-3 md:text-xl text-black transition-colors hover:bg-neutral-700 md:w-fit"
      >
        Learn more <FiArrowUpRight className="inline" />
      </Link>
    </div>
  </div>
);
