/* eslint-disable @next/next/no-img-element */
"use client";
import React, { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { MINIOURL, montserrat } from "@/lib/constants";
import { useGetPublicFutsalNewsEventsQuery } from "@/store/api/Public/publicFutsal";
import Loader from "@/components/Loader";
import { NEWSEVENT } from "@/lib/types";
import { convertToHumanReadableNoTime } from "@/lib/helper";
import { paths } from "@/lib/paths";
import {
  Pagination,
  PaginationContent,
  PaginationItem,
  PaginationPrevious,
  PaginationNext,
  PaginationLink,
  PaginationEllipsis,
} from "@/components/ui/pagination";

const NewsEventsPage = () => {
  const itemsPerPage = 6;
  const [currentPage, setCurrentPage] = useState(1);
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
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
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
          <h2 className="text-center text-[#f1f1f1] uppercase font-bold text-xl md:text-4xl mb-6">
            All News and Events
          </h2>

          <motion.div
            className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8"
            key={currentPage}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.5 }}
          >
            {currentItems.map((article) => (
              <motion.a
                key={article.title}
                href={`${paths.public.newsEvents}/${article.slug}`}
                className="bg-transparent rounded-lg overflow-hidden"
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
                <div className="py-5">
                  <p className="text-sm text-gray-300 font-medium mb-1">
                    {convertToHumanReadableNoTime(article.createdDate)}
                  </p>
                  <h2 className="text-lg font-semibold text-gray-50">
                    {article.title}
                  </h2>
                </div>
              </motion.a>
            ))}
          </motion.div>

          {/* Shadcn Pagination Component */}
          <div className="flex justify-center mt-8">
            <Pagination aria-label="Pagination">
              <PaginationContent>
                {/* Previous Button */}
                <PaginationItem>
                  <PaginationPrevious
                    href="#"
                    onClick={() =>
                      currentPage > 1 && setCurrentPage(currentPage - 1)
                    }
                  />
                </PaginationItem>

                {/* Page Numbers */}
                {[...Array(totalPages)].map((_, index) => (
                  <PaginationItem key={index}>
                    <PaginationLink
                      href="#"
                      onClick={() => setCurrentPage(index + 1)}
                      className={
                        currentPage === index + 1
                          ? "bg-blue-600 text-white"
                          : "bg-gray-700 text-white"
                      }
                    >
                      {index + 1}
                    </PaginationLink>
                  </PaginationItem>
                ))}

                {/* Ellipsis for pagination */}
                {totalPages > 5 && (
                  <PaginationItem>
                    <PaginationEllipsis />
                  </PaginationItem>
                )}

                {/* Next Button */}
                <PaginationItem>
                  <PaginationNext
                    href="#"
                    onClick={() =>
                      currentPage < totalPages &&
                      setCurrentPage(currentPage + 1)
                    }
                  />
                </PaginationItem>
              </PaginationContent>
            </Pagination>
          </div>
        </div>
      )}
    </div>
  );
};

export default NewsEventsPage;
