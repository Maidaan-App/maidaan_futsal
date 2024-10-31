/* eslint-disable @next/next/no-img-element */
"use client";
import { useState } from "react";
import SidebarItem from "./SidebarItem";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { usePathname } from "next/navigation";
import { paths } from "@/lib/paths";
import PublicSidebarItem from "./PublicSidebarItem";

export default function MakeSidebar() {
  const [expanded, setExpanded] = useState(false);
  const [display, setDisplay] = useState(false);
  const pathname = usePathname();

  const navBarItems = [
    {
      icon: (
        <svg
          xmlns="http:www.w3.org/2000/svg"
          width="1.5em"
          height="1.5em"
          viewBox="0 0 24 24"
        >
          <path
            fill="currentColor"
            d="M2 6.5c0-2.121 0-3.182.659-3.841S4.379 2 6.5 2s3.182 0 3.841.659S11 4.379 11 6.5s0 3.182-.659 3.841S8.621 11 6.5 11s-3.182 0-3.841-.659S2 8.621 2 6.5m11 11c0-2.121 0-3.182.659-3.841S15.379 13 17.5 13s3.182 0 3.841.659S22 15.379 22 17.5s0 3.182-.659 3.841S19.621 22 17.5 22s-3.182 0-3.841-.659S13 19.621 13 17.5"
            opacity="0.5"
          />
          <path
            fill="currentColor"
            d="M2 17.5c0-2.121 0-3.182.659-3.841S4.379 13 6.5 13s3.182 0 3.841.659S11 15.379 11 17.5s0 3.182-.659 3.841S8.621 22 6.5 22s-3.182 0-3.841-.659S2 19.621 2 17.5m11-11c0-2.121 0-3.182.659-3.841S15.379 2 17.5 2s3.182 0 3.841.659S22 4.379 22 6.5s0 3.182-.659 3.841S19.621 11 17.5 11s-3.182 0-3.841-.659S13 8.621 13 6.5"
          />
        </svg>
      ),
      text: "Dashboard",
      href: paths.admin.dashboard,
    },
    //... other items
  ];

  const handleClick = () => {
    setExpanded(!expanded);
    setDisplay(!display);
  };

  return (
    <div className="relative h-screen">
      <button
        onClick={handleClick}
        className="bg-primary text-[#f1f1f1] rounded-full p-1.5 hover:text-primary hover:bg-white transition-all duration-300 absolute"
      >
        {expanded ? (
          <ChevronLeft className="h-6 w-6" />
        ) : (
          <ChevronRight className="h-6 w-6" />
        )}
      </button>

      {display && (
        <div className="fixed inset-0 z-40">
          <div
            className="absolute inset-0 bg-gray-800"
            onClick={handleClick}
          ></div>
          <div
            className={`fixed left-0 top-0 h-full transition-all duration-300 z-50 ${
              expanded ? "w-64" : "w-16"
            } bg-white shadow-lg`}
          >
            <nav
              className={`flex flex-col h-full ${
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
              </div>
              <ul className="flex-1 px-3 space-y-2">
                {navBarItems.map((item, index) => (
                  <PublicSidebarItem
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
      )}
    </div>
  );
}
