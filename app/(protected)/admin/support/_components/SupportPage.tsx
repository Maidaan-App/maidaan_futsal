import React from "react";
import { Card } from "@/components/ui/card";
import { HiChatAlt2, HiPhone, HiMail } from "react-icons/hi"; // Importing icons

const SupportPage = () => {
  const supportData = [
    {
      title: "Chat to support",
      description: "We're here to help.",
      contact: "Start a chat",
      isEmail: false,
      isChat: true,
      icon: <HiChatAlt2 className="h-5 w-5 text-gray-500" />, // Chat Icon
    },
    {
      title: "Call us",
      description: "Mon-Fri from 8am to 5pm",
      contact: "9841000000",
      isEmail: false,
      isChat: false,
      icon: <HiPhone className="h-5 w-5 text-gray-500" />, // Call Icon
    },
    {
      title: "Email us",
      description: "We're here to help.",
      contact: "support@maidaan.com",
      isEmail: true,
      isChat: false,
      icon: <HiMail className="h-5 w-5 text-gray-500" />, // Email Icon
    },
  ];

  return (
    <div className="flex justify-center space-x-4 py-10">
      {supportData.map((support, index) => (
        <Card
          key={index}
          className="w-60 p-6 flex flex-col gap-4 h-fit shadow-md rounded-lg"
        >
          <div className="flex items-center justify-start mb-4">
            {/* Icon Container */}
            <div className="h-8 w-8 bg-gray-100 rounded flex items-center justify-center">
              {support.icon}
            </div>
          </div>
          <div className="flex flex-col space-y-3">
            {/* Title */}
            <h2 className="text-base font-semibold text-gray-800">
              {support.title}
            </h2>
            {/* Description */}
            <p className="text-sm text-gray-600">{support.description}</p>

            {/* Contact Method - Render based on type */}
            {support.isEmail ? (
              <a
                href={`mailto:${support.contact}`}
                className="text-sm text-gray-600 font-semibold underline mt-2"
              >
                {support.contact}
              </a>
            ) : support.isChat ? (
              <button className="text-sm text-gray-600 font-semibold underline mt-2 text-left">
                {support.contact}
              </button>
            ) : (
              <p className="text-sm text-gray-600 font-semibold mt-2">
                {support.contact}
              </p>
            )}
          </div>
        </Card>
      ))}
    </div>
  );
};

export default SupportPage;
