"use client";
import React from "react";
import Link from "next/link"; // Importing Link for navigation
import {
  FaFacebookF,
  FaTwitter,
  FaLinkedinIn,
  FaInstagram,
} from "react-icons/fa"; // Importing icons
import { useGetPublicFutsalProfileQuery } from "@/store/api/Public/publicFutsal";

const Footer = () => {
  const { data: FutsalProfile, isLoading: FutsalProfileLoading } =
    useGetPublicFutsalProfileQuery("");

  return (
    <>
      {FutsalProfile && (
        <div className="relative bg-[#182b2a]">
          {/* Google Maps iframe */}
          <iframe
            src={FutsalProfile.embeddMapLink}
            style={{ border: 0, width: "100%", height: "80vh" }}
            allowFullScreen
            loading="lazy"
            referrerPolicy="no-referrer-when-downgrade"
          ></iframe>

          {/* Custom Overlay */}
          <div
            className="absolute top-0 left-0 w-full h-full"
            style={{
              backgroundColor: "#182b2a",
              opacity: 0.6, // Increased opacity for better visibility
              pointerEvents: "none", // Allows interaction with the map below
            }}
          ></div>

          {/* Address Information Overlay */}
          <div
            id="contact"
            className="absolute md:top-32 bottom-5 left-5 md:left-10 bg-[#1d3535] w-[90%] md:w-[35%] h-fit flex flex-col gap-2 text-[#f1f1f1] p-4 md:p-6 rounded-3xl shadow-xl z-10"
          >
            <h2 className="text-sm md:text-xl font-bold text-neutral-300">
              Contact Us
            </h2>
            <div className="flex flex-col">
              <p className="text-sm md:text-2xl font-semibold">
                {FutsalProfile.name}
              </p>
              <p className="text-xs md:text-lg">{FutsalProfile.address}</p>
              {/* <p className="text-xs md:text-lg">CH-8002 Zürich</p> */}
            </div>
            <div className="flex flex-col">
              <p className="text-xs md:text-lg">Phone: {FutsalProfile.phone}</p>
              <p className="text-xs md:text-lg">Email: {FutsalProfile.email}</p>
            </div>

            {/* Social Media Links */}
            <div className="flex flex-wrap gap-4 mt-2 ">
              {FutsalProfile.socialLinks.facebook && (
                <Link href={FutsalProfile.socialLinks.facebook} target="_blank">
                  <FaFacebookF
                    size={20}
                    className="text-[#f1f1f1] hover:text-blue-500 transition-colors duration-300"
                  />
                </Link>
              )}
              {FutsalProfile.socialLinks.twitter && (
                <Link href={FutsalProfile.socialLinks.twitter} target="_blank">
                  <FaTwitter
                    size={20}
                    className="text-[#f1f1f1] hover:text-blue-400 transition-colors duration-300"
                  />
                </Link>
              )}
              {FutsalProfile.socialLinks.linkedIn && (
                <Link href={FutsalProfile.socialLinks.linkedIn} target="_blank">
                  <FaLinkedinIn
                    size={20}
                    className="text-[#f1f1f1] hover:text-blue-700 transition-colors duration-300"
                  />
                </Link>
              )}
              {FutsalProfile.socialLinks.instagram && (
                <Link
                  href={FutsalProfile.socialLinks.instagram}
                  target="_blank"
                >
                  <FaInstagram
                    size={20}
                    className="text-[#f1f1f1] hover:text-pink-500 transition-colors duration-300"
                  />
                </Link>
              )}
            </div>

            <Link
              href={FutsalProfile.mapLink}
              target="_blank"
              className="mt-2 px-3 py-1 bg-[#0f1e1f] w-fit text-[#f1f1f1] rounded-full hover:bg-[#0f3f40] transition duration-300 ease-in-out"
            >
              Show Route
            </Link>
          </div>
        </div>
      )}
    </>
  );
};

export default Footer;
