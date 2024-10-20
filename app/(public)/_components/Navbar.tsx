/* eslint-disable @next/next/no-img-element */
import { montserrat } from "@/lib/constants";
import React from "react";
import { motion } from "framer-motion";
import Link from "next/link"; // Import Link from next/link

type NavbarProps = {
  isScrolled: boolean; // Accept the isScrolled prop
};

const DURATION = 0.25; // Animation duration
const STAGGER = 0.025; // Stagger delay for each letter

// Define props for the FlipLink component
type FlipLinkProps = {
  children: string; // Children should be a string to split into characters
};

const FlipLink: React.FC<FlipLinkProps> = ({ children }) => {
  return (
    <motion.div
      initial="initial"
      whileHover="hovered"
      className="relative block overflow-hidden whitespace-nowrap text-xl font-bold"
      style={{ lineHeight: 1 }}
    >
      <div>
        {children.split("").map((l, i) => (
          <motion.span
            variants={{
              initial: { y: 0 },
              hovered: { y: "-100%" },
            }}
            transition={{
              duration: DURATION,
              ease: "easeInOut",
              delay: STAGGER * i,
            }}
            className="inline-block"
            key={i}
          >
            {l}
          </motion.span>
        ))}
      </div>
      <div className="absolute inset-0">
        {children.split("").map((l, i) => (
          <motion.span
            variants={{
              initial: { y: "100%" },
              hovered: { y: 0 },
            }}
            transition={{
              duration: DURATION,
              ease: "easeInOut",
              delay: STAGGER * i,
            }}
            className="inline-block"
            key={i}
          >
            {l}
          </motion.span>
        ))}
      </div>
    </motion.div>
  );
};
const handleScroll = (e: React.MouseEvent<HTMLAnchorElement, MouseEvent>) => {
  e.preventDefault(); // Prevent default link behavior
  const target = document.getElementById("contact"); // Get contact section by id
  if (target) {
    target.scrollIntoView({ behavior: "smooth" }); // Smooth scroll to the section
  }
};

const Navbar: React.FC<NavbarProps> = ({ isScrolled }) => {
  return (
    <div
      className={`text-[#f1f1f1] transition-all duration-300 h-20 px-20 flex justify-center ${
        isScrolled
          ? "bg-[#182b2a] bg-opacity-80 backdrop-blur-md shadow-lg" // Apply glassy effect when scrolled
          : "bg-[#182b2a]"
      }`}
    >
      <ul
        className={`flex w-full justify-between items-center list-none h-full cursor-pointer ${montserrat.className}`}
      >
        <li>
          <Link href="/book-now" passHref>
            <FlipLink>BOOK-NOW</FlipLink>
          </Link>
        </li>
        <li>
          <Link href="/gallery" passHref>
            <FlipLink>GALLERY</FlipLink>
          </Link>
        </li>
        <li>
          <Link href={"#"} passHref>
            <span className="flex w-20 h-10  items-center">
              <img src="logo.png" alt="Logo" />
            </span>{" "}
            {/* No effect on LOGO */}
          </Link>
        </li>
        <li>
          <Link href="/news-events" passHref>
            <FlipLink>NEWS - EVENTS</FlipLink>
          </Link>
        </li>
        <li>
          <Link href="#contact" passHref onClick={handleScroll}>
            <FlipLink>CONTACT</FlipLink>
          </Link>
        </li>
      </ul>
    </div>
  );
};

export default Navbar;
