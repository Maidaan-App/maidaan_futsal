"use client";
import { motion, Variants, AnimatePresence } from "framer-motion";
import { ReactNode } from "react";
import "./TransitionWrapper.css"; // Import your CSS file here

// Define the stair transition variants
const expand: Variants = {
  initial: {
    top: 0,
  },
  enter: (i: number) => ({
    top: "100vh",
    transition: {
      duration: 0.4,
      delay: 0.05 * i,
      ease: [0.215, 0.61, 0.355, 1],
    },
    transitionEnd: { height: "0", top: "0" },
  }),
  exit: (i: number) => ({
    height: "100vh",
    transition: {
      duration: 0.4,
      delay: 0.05 * i,
      ease: [0.215, 0.61, 0.355, 1],
    },
  }),
};

const opacity: Variants = {
  initial: {
    opacity: 0.5,
  },
  enter: {
    opacity: 0,
  },
  exit: {
    opacity: 0.5,
  },
};

type TransitionWrapperProps = {
  children: ReactNode;
  key: string; // Added key prop to allow dynamic changes
};

const TransitionWrapper = ({ children, key }: TransitionWrapperProps) => {
  const nbOfColumns = 5; // Number of "steps" in the stairs effect

  return (
    <AnimatePresence>
      <div className="stairs">
        <motion.div {...anim(opacity)} className="transition-background" />
        <div className="transition-container">
          {[...Array(nbOfColumns)].map((_, i) => (
            <motion.div key={i} {...anim(expand, nbOfColumns - i)} />
          ))}
        </div>
        {children}
      </div>
    </AnimatePresence>
  );
};

// Helper function to set up the animation props
const anim = (variants: Variants, custom: number | null = null) => {
  return {
    initial: "initial",
    animate: "enter",
    exit: "exit",
    custom,
    variants,
  };
};

export default TransitionWrapper;
