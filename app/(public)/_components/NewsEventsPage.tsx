/* eslint-disable @next/next/no-img-element */
"use client"; // This line ensures the component is treated as a client component
import React, { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { MINIOURL, montserrat } from "@/lib/constants";
import { useGetPublicFutsalNewsEventsQuery } from "@/store/api/Public/publicFutsal";
import Loader from "@/components/Loader";
import { NEWSEVENT } from "@/lib/types";
import { convertToHumanReadableNoTime } from "@/lib/helper";
import { paths } from "@/lib/paths";

const NewsEventsPage = () => {
  const itemsPerPage = 6; // Number of articles to show per page
  const [currentPage, setCurrentPage] = useState(0);
  const [NewsEvents, setNewsEvents] = useState<NEWSEVENT[]>([]);

  const { data: NewsEventsData, isLoading: NewsEventsDataLoading } =
    useGetPublicFutsalNewsEventsQuery("");

  useEffect(() => {
    if (NewsEventsData && NewsEventsData.length > 0) {
      setNewsEvents(NewsEventsData);
    }
  }, [NewsEventsData]);

  const totalPages = Math.ceil(NewsEvents.length / itemsPerPage);
  const currentItems = NewsEvents.slice(
    currentPage * itemsPerPage,
    (currentPage + 1) * itemsPerPage
  );
  return (
    <div
      className={`bg-[#182b2a] min-h-screen md:px-20 px-10 py-10 ${montserrat.className}`}
    >
      {NewsEventsDataLoading ? (
        <div className="flex h-[100vh] items-center justify-center">
          <Loader />
        </div>
      ) : (
        <div>
          <h2 className="text-center text-[#f1f1f1] font-bold text-xl md:text-4xl mb-6">
            All News and Events
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
            {currentItems.map((article) => (
              <motion.a
                key={article.title}
                href={`${paths.public.newsEvents}/${article.slug}`}
                className="bg-transparent rounded-lg shadow-lg overflow-hidden hover:shadow-xl "
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
              >
                <div className="overflow-hidden rounded-t-lg">
                  <img
                    src={`${MINIOURL}${article.image}`}
                    alt={article.title}
                    className="w-full h-48 object-cover transition-transform duration-300 hover:scale-[1.02]"
                  />
                </div>
                <div className="p-5 ">
                  <p className="text-sm text-gray-300 font-medium mb-1">
                    {convertToHumanReadableNoTime(article.createdDate)}
                  </p>
                  <h2 className="text-lg font-semibold text-gray-50">
                    {article.title}
                  </h2>
                </div>
              </motion.a>
            ))}
          </div>
          <div className="flex justify-center mt-6 space-x-2">
            <button
              onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 0))}
              disabled={currentPage === 0}
              className={`py-2 px-4 rounded ${
                currentPage === 0
                  ? "bg-gray-400"
                  : "bg-blue-500 hover:bg-blue-600"
              } text-white font-semibold`}
            >
              Previous
            </button>
            <button
              onClick={() =>
                setCurrentPage((prev) => Math.min(prev + 1, totalPages - 1))
              }
              disabled={currentPage >= totalPages - 1}
              className={`py-2 px-4 rounded ${
                currentPage >= totalPages - 1
                  ? "bg-gray-400"
                  : "bg-blue-500 hover:bg-blue-600"
              } text-white font-semibold`}
            >
              Next
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default NewsEventsPage;
