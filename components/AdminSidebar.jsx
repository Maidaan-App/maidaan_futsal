/* eslint-disable @next/next/no-img-element */
"use client";
import { useState } from "react";
import SidebarItem from "./SidebarItem";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { usePathname } from "next/navigation";
import { paths } from "@/lib/paths";
import {
  DashboardSquare01Icon,
  UserMultipleIcon,
  FootballPitchIcon,
  Calendar03Icon,
  Calendar02Icon,
  Album02Icon,
  NewsIcon,
  Settings02Icon,
  CustomerSupportIcon,
} from "hugeicons-react";

export default function MakeSidebar() {
  const [expanded, setExpanded] = useState(true);
  const pathname = usePathname();

  const navBarItems = [
    {
      icon: (
        <DashboardSquare01Icon size={24} color={"#00a870"} variant={"stroke"} />
      ),

      text: "Dashboard",
      href: paths.admin.dashboard,
    },

    {
      icon: <UserMultipleIcon size={24} color={"#00a870"} variant={"stroke"} />,
      text: "Players",
      href: paths.admin.players,
    },

    {
      icon: (
        <FootballPitchIcon size={24} color={"#00a870"} variant={"stroke"} />
      ),
      text: "Courts",
      href: paths.admin.courts,
    },

    {
      icon: <Calendar03Icon size={24} color={"#00a870"} variant={"stroke"} />,
      text: "Book Now",
      href: paths.admin.addBookings,
    },

    {
      icon: <Calendar02Icon size={24} color={"#00a870"} variant={"stroke"} />,
      text: "Bookings",
      href: paths.admin.bookings,
    },
    {
      icon: <Album02Icon size={24} color={"#00a870"} variant={"stroke"} />,
      text: "Gallery",
      href: paths.admin.gallery,
    },
    {
      icon: <NewsIcon size={24} color={"#00a870"} variant={"stroke"} />,
      text: "News And Events",
      href: paths.admin.newsevents,
    },
    {
      icon: <Settings02Icon size={24} color={"#00a870"} variant={"stroke"} />,
      text: "Amenities",
      href: paths.admin.amenities,
    },
    {
      icon: (
        <CustomerSupportIcon size={24} color={"#00a870"} variant={"stroke"} />
      ),
      text: "Support",
      // href: paths.admin.players,
    },
  ];

  return (
    <div className="relative h-screen">
      <div className={`h-screen transition-all ${expanded ? "w-64" : "w-64"} `}>
        <nav
          className={`flex flex-col h-screen shadow-lg ${
            expanded ? "overflow-y-auto" : "overflow-hidden"
          } scrollbar-thin scrollbar-thumb-rounded scrollbar-thumb-gray-300`}
        >
          <div className="flex items-center justify-between p-4">
            <img
              src="logo.png"
              className={`${
                expanded ? "w-16 h-16 object-cover" : "w-0"
              } transition-all duration-300`}
              alt="logo"
            />
            <button
              onClick={() => setExpanded(!expanded)}
              className="bg-primary text-[#f1f1f1] rounded-full p-1.5 hover:text-primary hover:bg-white transition-all duration-300"
            >
              {expanded ? (
                <ChevronLeft className="h-6 w-6" />
              ) : (
                <ChevronRight className="h-6 w-6" />
              )}
            </button>
          </div>
          <ul className="flex-1 px-3 space-y-2">
            {navBarItems.map((item, index) => (
              <SidebarItem
                key={index}
                expanded={expanded}
                {...item}
                active={pathname === item.href}
                pathname={pathname}
              />
            ))}
          </ul>
        </nav>
      </div>
    </div>
  );
}
