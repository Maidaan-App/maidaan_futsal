/* eslint-disable @next/next/no-img-element */
"use client"; // This line ensures the component is treated as a client component
import React, { useState } from "react";
import { motion } from "framer-motion";
import { montserrat } from "@/lib/constants";

const mockdata = [
  {
    title: "Top 10 places to visit in Norway this summer",
    image:
      "https://images.unsplash.com/photo-1527004013197-933c4bb611b3?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=720&q=80",
    date: "August 18, 2022",
    link: "#link1",
  },
  {
    title: "Best forests to visit in North America",
    image:
      "https://images.unsplash.com/photo-1448375240586-882707db888b?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=720&q=80",
    date: "August 27, 2022",
    link: "#link2",
  },
  {
    title: "Hawaii beaches review: better than you think",
    image:
      "https://images.unsplash.com/photo-1507525428034-b723cf961d3e?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=720&q=80",
    date: "September 9, 2022",
    link: "#link3",
  },
  {
    title: "Mountains at night: 12 best locations to enjoy the view",
    image:
      "https://images.unsplash.com/photo-1519681393784-d120267933ba?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=720&q=80",
    date: "September 12, 2022",
    link: "#link4",
  },
  {
    title: "Top 10 places to visit in Norway this summer",
    image:
      "https://images.unsplash.com/photo-1527004013197-933c4bb611b3?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=720&q=80",
    date: "August 18, 2022",
    link: "#link1",
  },
  {
    title: "Best forests to visit in North America",
    image:
      "https://images.unsplash.com/photo-1448375240586-882707db888b?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=720&q=80",
    date: "August 27, 2022",
    link: "#link2",
  },
  {
    title: "Hawaii beaches review: better than you think",
    image:
      "https://images.unsplash.com/photo-1507525428034-b723cf961d3e?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=720&q=80",
    date: "September 9, 2022",
    link: "#link3",
  },
  {
    title: "Mountains at night: 12 best locations to enjoy the view",
    image:
      "https://images.unsplash.com/photo-1519681393784-d120267933ba?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=720&q=80",
    date: "September 12, 2022",
    link: "#link4",
  },
];

const Page = () => {
  const itemsPerPage = 6; // Number of articles to show per page
  const [currentPage, setCurrentPage] = useState(0);

  const totalPages = Math.ceil(mockdata.length / itemsPerPage);
  const currentItems = mockdata.slice(
    currentPage * itemsPerPage,
    (currentPage + 1) * itemsPerPage
  );

  return (
    <div className={`bg-[#182b2a] md:px-20 py-20 ${montserrat.className} `}>
      <h2 className="text-center text-[#f1f1f1] font-bold text-xl md:text-4xl mb-6">
        All News and Events
      </h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
        {currentItems.map((article) => (
          <motion.a
            key={article.title}
            href={article.link}
            className="bg-white rounded-lg shadow-lg overflow-hidden hover:shadow-xl"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            <div className="overflow-hidden rounded-t-lg">
              <img
                src={article.image}
                alt={article.title}
                className="w-full h-48 object-cover transition-transform duration-300 hover:scale-[1.02]"
              />
            </div>
            <div className="p-5">
              <p className="text-sm text-gray-500 font-medium mb-1">
                {article.date}
              </p>
              <h2 className="text-lg font-semibold text-gray-800">
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
            currentPage === 0 ? "bg-gray-400" : "bg-blue-500 hover:bg-blue-600"
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
  );
};

export default Page;
