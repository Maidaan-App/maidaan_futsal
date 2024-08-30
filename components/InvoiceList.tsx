"use client";

import React from "react";

// InvoiceList component accepting props
const InvoiceList = ({ data }: any) => {
  return (
    <div className="bg-white p-6 rounded-lg shadow-md">
      <h2 className="text-lg font-semibold mb-4">Invoice List</h2>
      <div className="overflow-x-auto">
        <table className="min-w-full border-collapse">
          <thead>
            <tr className="bg-gray-100 text-left text-sm font-medium text-gray-600">
              <th className="py-4 px-6">#</th>
              <th className="py-4 px-6">TOTAL</th>
              <th className="py-4 px-6">ISSUED DATE</th>
              <th className="py-4 px-6">STATUS</th>
              <th className="py-4 px-6">ACTION</th>
            </tr>
          </thead>
          <tbody className="text-gray-800 text-sm">
            {data.map((invoice: any, index: any) => (
              <tr key={index} className="border-t hover:bg-gray-50">
                <td className="py-4 px-6 text-green-600">{invoice.unique}</td>
                <td className="py-4 px-6">{invoice.total}</td>
                <td className="py-4 px-6">{invoice.date}</td>
                <td className="py-4 px-6">
                  <span
                    className={`${
                      invoice.status === "Payed"
                        ? "bg-green-100 text-green-600"
                        : "bg-red-100 text-red-600"
                    } px-3 py-1 rounded-full text-xs font-semibold`}
                  >
                    {invoice.status}
                  </span>
                </td>
                <td className="py-4 px-6 text-right">
                  <button className="text-gray-500">
                    <svg
                      className="h-5 w-5"
                      fill="currentColor"
                      viewBox="0 0 20 20"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path d="M6 10a1 1 0 102 0 1 1 0 00-2 0zm4 0a1 1 0 102 0 1 1 0 00-2 0zm4 0a1 1 0 102 0 1 1 0 00-2 0z" />
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
