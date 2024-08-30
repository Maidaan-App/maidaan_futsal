"use client";

import React from "react";
import InvoiceList from "@/components/InvoiceList";

// Sample data for invoices
const players = [
  {
    id: 1,
    unique: "#123",
    total: "Rs. 3545",
    date: "10 Aug 2024",
    status: "Payed",
  },
  {
    id: 2,
    unique: "#124",
    total: "Rs. 3546",
    date: "15 Aug 2024",
    status: "Not Payed",
  },
  {
    id: 3,
    unique: "#125",
    total: "Rs. 3547",
    date: "18 Aug 2024",
    status: "Payed",
  },
];

// Main BillingInvoice component rendering the InvoiceList
const BillingInvoice = () => {
  return (
    <div className="p-6 bg-white rounded-lg shadow-lg">
      <InvoiceList data={players} />
    </div>
  );
};

export default BillingInvoice;
