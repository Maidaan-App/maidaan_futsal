// /* eslint-disable @next/next/no-img-element */
"use client";
import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { FaTimes } from "react-icons/fa";

const mainImage =
  "https://plus.unsplash.com/premium_photo-1723636807748-255beefb7925?q=80&w=2940&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D";

const images = Array(8).fill(mainImage); // Using the same image for now

const Page = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [selectedImg, setSelectedImg] = useState("");
  const [loading, setLoading] = useState(true);

  const openLightbox = (src: string) => {
    setSelectedImg(src);
    setIsOpen(true);
  };

  const closeLightbox = () => {
    setIsOpen(false);
    setSelectedImg("");
  };

  // Load images
  useEffect(() => {
    const img = new Image();
    img.src = selectedImg; // Preload the selected image
    img.onload = () => setLoading(false);
  }, [selectedImg]);

  return (
    <section className="px-6 py-10 lg:px-24 bg-gray-100">
      <h1 className="text-5xl md:text-6xl font-bold text-center mb-12 text-[#0d2322] tracking-wide">
        Our Futsal Gallery
      </h1>

      <div className="grid gap-6 grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
        {images.map((src, index) => (
          <motion.div
            key={index}
            whileHover={{ scale: 1.05, rotate: 2 }}
            whileTap={{ scale: 0.95 }}
            className="relative overflow-hidden rounded-xl shadow-lg group cursor-pointer transition-transform duration-300 ease-in-out"
            onClick={() => openLightbox(src)}
          >
            <img
              src={src}
              alt={`Gallery Image ${index + 1}`}
              className="w-full h-full object-cover transition-opacity duration-300 group-hover:opacity-80"
              loading="lazy" // Lazy loading images
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-transparent opacity-0 transition-opacity duration-300 group-hover:opacity-80 flex items-end p-4">
              <p className="text-white font-semibold text-lg shadow-md">
                View Image
              </p>
            </div>
          </motion.div>
        ))}
      </div>

      {/* Lightbox Modal */}
      {isOpen && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-75 z-50">
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.3 }}
            className="relative w-11/12 md:w-3/4 lg:w-1/2"
          >
            {loading ? (
              <div className="flex justify-center items-center h-64">
                <div className="loader">Loading...</div> {/* Custom loader */}
              </div>
            ) : (
              <img
                src={selectedImg}
                alt="Selected"
                className="rounded-lg shadow-lg max-h-[80vh] object-cover w-full"
              />
            )}
            <button
              onClick={closeLightbox}
              className="absolute top-4 right-4 text-white text-2xl"
            >
              <FaTimes />
            </button>
          </motion.div>
        </div>
      )}
    </section>
  );
};

export default Page;
