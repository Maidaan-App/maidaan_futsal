"use client";
import { poppins } from "@/lib/constants";
import React, { useState } from "react";
import SecurityContent from "./SecurityContent";
import BillingContent from "./BillingContent";
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
import { Layout } from "@/components/custom/layout";
import { Search } from "@/components/search";
import ThemeSwitch from "@/components/theme-switch";
import { UserNav } from "@/components/user-nav";
import Loader from "@/components/Loader";
import { useGetAllAdminPlansQuery } from "@/store/api/Admin/adminPlans";
import GeneralContent from "./GeneralContent";

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
    // {
    //   category: "Notifications",
    //   icon: <Notification03Icon size={24} color={"#00a870"} />,
    // },
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
  const { data: PlansData, isLoading: PlansDataLoading } =
    useGetAllAdminPlansQuery("");

  const renderContent = () => {
    switch (activeTab) {
      case "General":
        return <GeneralContent ProfileDetail={ProfileDetail} />;
      case "Security":
        return <SecurityContent />;
      case "Billing":
        return (
          <BillingContent BillingDetail={BillingDetail} PlansData={PlansData} />
        );
      // case "Notifications":
      //   return <NotificationsContent />;
      case "Social Links":
        return <SocialLinksContent ProfileDetail={ProfileDetail} />;
      default:
        return null;
    }
  };

  return (
    <Layout>
      {/* ===== Top Heading ===== */}
      <Layout.Header sticky>
        <Search />
        <div className="ml-auto flex items-center space-x-4">
          <ThemeSwitch />
          <UserNav current_user={current_user} />
        </div>
      </Layout.Header>
      {profileLoading || billingLoading || PlansDataLoading ? (
        <div className="flex h-[80vh] items-center justify-center">
          <Loader />
        </div>
      ) : (
        <div className="py-6 container bg-[#F4F4F5] min-h-screen">
          {ProfileDetail && PlansData && PlansData.length > 0 && (
            <div className={`${poppins.className} flex flex-col gap-6`}>
              <h1 className="text-2xl text-[#232D42] font-medium">Account</h1>
              {/* Tabs Navigation */}
              <div className="flex gap-8 overflow-x-auto scrollbar-hide">
                {categories.map((category, index) => (
                  <div
                    key={index}
                    onClick={() => setActiveTab(category.category)}
                    className={`flex-shrink-0 flex flex-col items-center gap-2 font-medium text-base cursor-pointer ${
                      activeTab === category.category
                        ? "text-primary"
                        : "text-gray-600"
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
          )}
        </div>
      )}
    </Layout>
  );
};

export default Tabs;
