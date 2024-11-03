"use client";
import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import Image from "next/image";
import { MINIOURL, montserrat } from "@/lib/constants";
import { useGetPublicFutsalGalleryQuery } from "@/store/api/Public/publicFutsal";
import Loader from "@/components/Loader";
import { GALLERY } from "@/lib/types";

const GalleryPage = () => {
  const [currentImageIndex, setCurrentImageIndex] = useState<number | null>(
    null
  );
  const [Images, setImages] = useState<GALLERY[]>([]);
  const { data: GalleyData, isLoading: GalleyDataLoading } =
    useGetPublicFutsalGalleryQuery("");

  useEffect(() => {
    if (GalleyData && GalleyData.length > 0) {
      setImages(GalleyData);
    }
  }, [GalleyData]);

  const openModal = (index: number) => {
    setCurrentImageIndex(index);
  };

  const closeModal = () => {
    setCurrentImageIndex(null);
  };

  const nextImage = () => {
    if (currentImageIndex !== null) {
      setCurrentImageIndex((prevIndex) => {
        // Ensure prevIndex is treated as a number
        const newIndex =
          prevIndex === Images.length - 1 ? 0 : (prevIndex || 0) + 1;
        return newIndex;
      });
    }
  };

  const prevImage = () => {
    if (currentImageIndex !== null) {
      setCurrentImageIndex((prevIndex) => {
        // Ensure prevIndex is treated as a number
        const newIndex =
          prevIndex === 0 ? Images.length - 1 : (prevIndex || 0) - 1;
        return newIndex;
      });
    }
  };
  return (
    <div className={`bg-[#182b2a] min-h-screen py-10 ${montserrat.className}`}>
      {GalleyDataLoading ? (
        <div className="flex h-[100vh] items-center justify-center">
          <Loader />
        </div>
      ) : (
        <div>
          <h2 className="text-center text-[#f1f1f1] font-bold text-xl md:text-4xl mb-6">
            Gallery
          </h2>
          <p className="text-center text-gray-400 mb-12 mx-6">
            Explore moments captured from our tournaments, friendly matches, and
            futsal events.
          </p>

          <div className=" px-6 md:px-12 lg:px-20">
            <motion.div
              className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.5 }}
            >
              {Images.map((image, index) => (
                <motion.div
                  key={index}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className="relative overflow-hidden rounded-lg shadow-lg transition-transform duration-300 cursor-pointer"
                  onClick={() => openModal(index)}
                >
                  <Image
                    src={`${MINIOURL}${image.image}`}
                    alt={`Gallery Image ${index + 1}`}
                    width={500}
                    height={300}
                    className="w-full h-60 object-cover transition-transform duration-300"
                    placeholder="blur"
                    blurDataURL={`${MINIOURL}${image.image}`} // For smooth loading
                  />
                </motion.div>
              ))}
            </motion.div>
          </div>

          {/* Modal */}
          {currentImageIndex !== null && (
            <div
              className="fixed inset-0 bg-black bg-opacity-70 flex items-center justify-center z-50"
              onClick={closeModal}
            >
              <div className="relative w-full max-w-2xl p-4">
                <button
                  className="absolute top-2 right-2 text-white"
                  onClick={closeModal}
                >
                  &times;
                </button>
                <motion.div
                  className="flex flex-col items-center"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ duration: 0.3 }}
                >
                  <Image
                    src={`${MINIOURL}${Images[currentImageIndex].image}`}
                    alt={`Gallery Image ${currentImageIndex + 1}`}
                    width={800}
                    height={500}
                    className="w-full h-auto object-cover mb-4"
                    placeholder="blur"
                    blurDataURL={`${MINIOURL}${Images[currentImageIndex].image}`} // For smooth loading
                  />
                  <div className="flex justify-between w-full">
                    <button
                      className="bg-gray-800 text-white px-4 py-2 rounded hover:bg-gray-700"
                      onClick={(e) => {
                        e.stopPropagation(); // Prevent closing the modal
                        prevImage();
                      }}
                    >
                      Prev
                    </button>
                    <button
                      className="bg-gray-800 text-white px-4 py-2 rounded hover:bg-gray-700"
                      onClick={(e) => {
                        e.stopPropagation(); // Prevent closing the modal
                        nextImage();
                      }}
                    >
                      Next
                    </button>
                  </div>
                </motion.div>
              </div>
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default GalleryPage;
