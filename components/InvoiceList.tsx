"use client";

import { poppins } from "@/app/lib/constants";
import React from "react";

// InvoiceList component accepting props
const InvoiceList = ({ data }: any) => {
  return (
    <div className={`bg-white rounded-lg ${poppins.className}`}>
      <h2 className="lg:text-lg text-xs p-4 md:p-6 font-semibold">
        Invoice List
      </h2>
      {/* Responsive table container */}
      <div className="overflow-x-auto">
        <table className="min-w-full border-collapse">
          <thead>
            <tr className="bg-gray-100 text-center text-[8px] lg:text-sm md:text-base font-medium text-gray-600">
              <th className="py-2 md:py-4 px-2 md:px-6">#</th>
              <th className="py-2 md:py-4 px-2 md:px-6">TOTAL</th>
              <th className="py-2 md:py-4 px-2 md:px-6">ISSUED DATE</th>
              <th className="py-2 md:py-4 px-2 md:px-6">STATUS</th>
              <th className="py-2 md:py-4 px-2 md:px-6">ACTION</th>
            </tr>
          </thead>
          <tbody className="text-gray-800 text-center text-[6px] lg:text-xs md:text-sm">
            {data.map((invoice: any, index: any) => (
              <tr key={index} className="border-t hover:bg-gray-50">
                <td className="py-2 md:py-4 px-2 md:px-6 text-green-600">
                  {invoice.unique}
                </td>
                <td className="py-2 md:py-4 px-2 md:px-6">{invoice.total}</td>
                <td className="py-2 md:py-4 px-2 md:px-6">{invoice.date}</td>
                <td className="py-2 md:py-4 px-2 md:px-6">
                  <span
                    className={`${
                      invoice.status === "Payed"
                        ? "bg-green-100 text-green-600"
                        : "bg-red-100 text-red-600"
                    } px-2 md:px-3 py-1 md:py-[11px] rounded-[8px] text-[8px] lg:text-xs font-semibold`}
                  >
                    {invoice.status}
                  </span>
                </td>
                <td className="py-2 md:py-4 px-2 md:px-6 text-center">
                  <button className="text-gray-500">
                    <svg
                      className="h-[16px] md:h-[20.19px] w-4 md:w-5"
                      fill="currentColor"
                      viewBox="0 0 20 20"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path d="M10 6a1 1 0 110-2 1 1 0 010 2zm0 4a1 1 0 110-2 1 1 0 010 2zm0 4a1 1 0 110-2 1 1 0 010 2z" />
                    </svg>
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default InvoiceList;
