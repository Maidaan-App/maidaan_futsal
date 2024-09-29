"use client";
import { poppins } from "@/app/lib/constants";
import React, { useState } from "react";
import GeneralContent from "./GeneralContent";
import SecurityContent from "./SecurityContent";
import BillingContent from "./BillingContent";
import NotificationsContent from "./NotificationsContent";
import SocialLinksContent from "./SocialLinksContent";
import { useGetAdminMyPlayerByIdQuery } from "@/store/api/Admin/adminProfile";

const Tabs = ({current_user}:any) => {
  const categories = [
    { category: "General" },
    { category: "Security" },
    { category: "Billing" },
    { category: "Notifications" },
    { category: "Social Links" },
  ];

  const [activeTab, setActiveTab] = useState(categories[0].category);

  const { data: ProfileDetail, isLoading: profileLoading } =
  useGetAdminMyPlayerByIdQuery("");
  console.log("ProfileDetail:",ProfileDetail)

  const renderContent = () => {
    switch (activeTab) {
      case "General":
        return <GeneralContent current_user={current_user} ProfileDetail={ProfileDetail} />;
      case "Security":
        return <SecurityContent />;
      case "Billing":
        return <BillingContent />;
      case "Notifications":
        return <NotificationsContent />;
      case "Social Links":
        return <SocialLinksContent ProfileDetail={ProfileDetail} />;
      default:
        return null;
    }
  };

  return (
    <div className={`${poppins.className} flex flex-col gap-6`}>
      <h1 className="text-2xl text-[#232D42] font-medium">Account</h1>

      {/* Tabs Navigation */}
      <div className="flex gap-8 overflow-x-auto scrollbar-hide">
        {categories.map((category, index) => (
          <div
            key={index}
            onClick={() => setActiveTab(category.category)}
            className={`flex-shrink-0 flex flex-col font-medium text-base items-center cursor-pointer ${
              activeTab === category.category ? "text-primary" : "text-gray-600"
            }`}
          >
            <span>{category.category}</span>
            {activeTab === category.category && (
              <div className="w-full h-[2px] bg-primary mt-2"></div>
            )}
          </div>
        ))}
      </div>

      {/* Tab Content */}
      <div className="rounded-lg">{renderContent()}</div>
    </div>
  );
};

export default Tabs;
