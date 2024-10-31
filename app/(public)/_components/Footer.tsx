import React from "react";
import Link from "next/link"; // Importing Link for navigation
import {
  FaFacebookF,
  FaTwitter,
  FaLinkedinIn,
  FaInstagram,
} from "react-icons/fa"; // Importing icons

const Footer = () => {
  return (
    <div className="relative bg-[#182b2a]">
      {/* Google Maps iframe */}
      <iframe
        src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3531.83349969358!2d85.33311857461325!3d27.72242662482776!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x39eb19133a548bcb%3A0x21096e4311b9f9f6!2sClock%20b%20Business%20Technology!5e0!3m2!1sen!2snp!4v1724323219629!5m2!1sen!2snp&t=k"
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
            Clinic Beethovenstrasse AG
          </p>
          <p className="text-xs md:text-lg">Beethovenstrasse 9</p>
          <p className="text-xs md:text-lg">CH-8002 Zürich</p>
        </div>
        <div className="flex flex-col">
          <p className="text-xs md:text-lg">Phone: +41 44 545 14 44</p>
          <p className="text-xs md:text-lg">
            Email: info@colette-camenisch.com
          </p>
        </div>

        {/* Social Media Links */}
        <div className="flex flex-wrap gap-4 mt-2 ">
          <Link href="https://facebook.com" target="_blank">
            <FaFacebookF
              size={20}
              className="text-[#f1f1f1] hover:text-blue-500 transition-colors duration-300"
            />
          </Link>
          <Link href="https://twitter.com" target="_blank">
            <FaTwitter
              size={20}
              className="text-[#f1f1f1] hover:text-blue-400 transition-colors duration-300"
            />
          </Link>
          <Link href="https://linkedin.com" target="_blank">
            <FaLinkedinIn
              size={20}
              className="text-[#f1f1f1] hover:text-blue-700 transition-colors duration-300"
            />
          </Link>
          <Link href="https://instagram.com" target="_blank">
            <FaInstagram
              size={20}
              className="text-[#f1f1f1] hover:text-pink-500 transition-colors duration-300"
            />
          </Link>
        </div>

        <Link
          href="#"
          className="mt-2 px-3 py-1 bg-[#0f1e1f] w-fit text-[#f1f1f1] rounded-full hover:bg-[#0f3f40] transition duration-300 ease-in-out"
        >
          Show Route
        </Link>
      </div>
    </div>
  );
};

export default Footer;
