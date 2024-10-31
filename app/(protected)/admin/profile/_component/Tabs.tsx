"use client";
import { poppins } from "@/lib/constants";
import React, { useState } from "react";
import GeneralContent from "./GeneralContent";
import SecurityContent from "./SecurityContent";
import BillingContent from "./BillingContent";
import NotificationsContent from "./NotificationsContent";
import SocialLinksContent from "./SocialLinksContent";
import { useGetAdminMyPlayerByIdQuery } from "@/store/api/Admin/adminProfile";
import { useGetAdminMyBillingByIdQuery } from "@/store/api/Admin/adminBillings";

// Import icons from HugeIcons (assuming these icons exist)
import {
  UserIcon,
  SecurityIcon,
  Invoice01Icon,
  Notification03Icon,
  Share02Icon,
} from "hugeicons-react";

const Tabs = ({ current_user }: any) => {
  const categories = [
    {
      category: "General",
      icon: <UserIcon size={24} color={"#00a870"} />,
    },
    {
      category: "Security",
      icon: <SecurityIcon size={24} color={"#00a870"} />,
    },
    {
      category: "Billing",
      icon: <Invoice01Icon size={24} color={"#00a870"} />,
    },
    {
      category: "Notifications",
      icon: <Notification03Icon size={24} color={"#00a870"} />,
    },
    {
      category: "Social Links",
      icon: <Share02Icon size={24} color={"#00a870"} />,
    },
  ];

  const [activeTab, setActiveTab] = useState(categories[0].category);

  const { data: ProfileDetail, isLoading: profileLoading } =
    useGetAdminMyPlayerByIdQuery("");
  const { data: BillingDetail, isLoading: billingLoading } =
    useGetAdminMyBillingByIdQuery("");

  const renderContent = () => {
    switch (activeTab) {
      case "General":
        return (
          <GeneralContent
            current_user={current_user}
            ProfileDetail={ProfileDetail}
          />
        );
      case "Security":
        return <SecurityContent />;
      case "Billing":
        return <BillingContent BillingDetail={BillingDetail} />;
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
            className={`flex-shrink-0 flex flex-col items-center gap-2 font-medium text-base cursor-pointer ${
              activeTab === category.category ? "text-primary" : "text-gray-600"
            }`}
          >
            <div className="flex flex-row gap-2">
              {" "}
              {category.icon}
              <span>{category.category}</span>
            </div>

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
