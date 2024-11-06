"use client";

import React from "react";
import { ReactNode } from "react";
import SkipToMain from "@/components/skip-to-main";
import Sidebar from "@/components/sidebar";
import useIsCollapsed from "@/hooks/use-is-collapsed";

import { Inter, Poppins } from "next/font/google";

const inter = Inter({ subsets: ["latin"] });
const pop = Poppins({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
});

export default function AdminLayout({ children }: { children: ReactNode }) {
  const [isCollapsed, setIsCollapsed] = useIsCollapsed();

  return (
    <div className="relative h-full overflow-hidden bg-background">
      <SkipToMain />
      <Sidebar isCollapsed={isCollapsed} setIsCollapsed={setIsCollapsed} />
      <main
        id="content"
        className={`overflow-x-hidden pt-16 transition-[margin] md:overflow-y-hidden md:pt-0 ${
          isCollapsed ? "md:ml-14" : "md:ml-64"
        } h-full`}
      >
        {children}
      </main>
    </div>
  );
}
