"use client";
import { poppins } from "@/lib/constants";
import React, { useState } from "react";
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
import Reports from "./Reports";
import UpcomingBookings from "./UpcomingBookings";
import { useSearchParams } from "next/navigation";
import { useGetAdminPlayerByIdQuery, useGetAdminPlayerReportsByIdQuery } from "@/store/api/Admin/adminPlayers";
import PlayerGeneralContent from "./PlayerGeneralContent";
import PastBookings from "./PastBookings";
import { useGetAdminPlayerBookingByIdQuery } from "@/store/api/Admin/adminBookings";

const PlayerProfileTabs = ({ current_user }: any) => {
  const searchParams = useSearchParams();
  const id = searchParams.get("id") as string;
  const { data: PlayerDetails, isLoading: Loading } =
    useGetAdminPlayerByIdQuery(id);

  const { data: BookingsData, isLoading: BookingsDataLoading } =
    useGetAdminPlayerBookingByIdQuery(id);

  const { data: reportsData, isLoading: reportsDataLoading } =
  useGetAdminPlayerReportsByIdQuery(id);


  const categories = [
    {
      category: "General",
      icon: <UserIcon size={24} color={"#00a870"} />,
    },
    {
      category: "Upcoming Bookings",
      icon: <SecurityIcon size={24} color={"#00a870"} />,
    },
    {
      category: "Past Bookings",
      icon: <Invoice01Icon size={24} color={"#00a870"} />,
    },
    {
      category: "Reports",
      icon: <Share02Icon size={24} color={"#00a870"} />,
    },
  ];

  const [activeTab, setActiveTab] = useState(categories[0].category);

  const { data: ProfileDetail, isLoading: profileLoading } =
    useGetAdminMyPlayerByIdQuery("");

  const renderContent = () => {
    switch (activeTab) {
      case "General":
        return <PlayerGeneralContent ExistingDetail={PlayerDetails} />;
      case "Upcoming Bookings":
        return (
          <UpcomingBookings BookingsData={BookingsData.upcomingBookings} />
        );
      case "Past Bookings":
        return <PastBookings BookingsData={BookingsData.pastBookings} />;
      case "Reports":
        return <Reports reportsData={reportsData} ExistingDetail={PlayerDetails} />;
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
      {profileLoading || Loading || BookingsDataLoading ||reportsDataLoading  ? (
        <div className="flex h-[80vh] items-center justify-center">
          <Loader />
        </div>
      ) : (
        <div className="py-6 container bg-[#F4F4F5] min-h-screen">
          {ProfileDetail && BookingsData && (
            <div className={`${poppins.className} flex flex-col gap-6`}>
              <h1 className="text-2xl text-[#232D42] font-medium">
                Player&apos;s Profile
              </h1>
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

export default PlayerProfileTabs;
