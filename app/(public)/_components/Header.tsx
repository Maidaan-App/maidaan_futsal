"use client";
import React, { useEffect, useState } from "react";
import { montserrat } from "@/lib/constants";
import Navbar from "./Navbar";
import { useGetPublicFutsalProfileQuery } from "@/store/api/Public/publicFutsal";

const Header = () => {
  const [isScrolled, setIsScrolled] = useState(false); // State to track if the page is scrolled

  const { data: FutsalProfile, isLoading: FutsalProfileLoading } =
  useGetPublicFutsalProfileQuery("");
  const handleScroll = () => {
    const currentScrollY = window.scrollY;
    setIsScrolled(currentScrollY > 10); // Change this value to adjust when the effect activates
  };

  useEffect(() => {
    window.addEventListener("scroll", handleScroll);

    return () => {
      window.removeEventListener("scroll", handleScroll); // Clean up listener on component unmount
    };
  }, []);

  return (
    <div
      className={`header ${montserrat.className}`}
      style={{
        position: "sticky",
        top: "0", // Always stick to the top
        zIndex: 1000, // Ensure it's above other content
        width: "100%", // Make sure header takes full width
        transition:
          "background-color 0.3s ease-in-out, backdrop-filter 0.3s ease-in-out", // Smooth transition for effects
      }}
    >
      <Navbar FutsalProfile={FutsalProfile} isScrolled={isScrolled} /> {/* Pass isScrolled to Navbar */}
    </div>
  );
};

export default Header;
