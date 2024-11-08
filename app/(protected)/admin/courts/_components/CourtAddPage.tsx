"use client";
import { Layout } from "@/components/custom/layout";
import { Search } from "@/components/search";
import ThemeSwitch from "@/components/theme-switch";
import { UserNav } from "@/components/user-nav";
import { poppins } from "@/lib/constants";
import React from "react";
import CourtAddEditForm from "./CourtAddEditForm";

const CourtAddPage = ({ current_user }: any) => {
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
      <div
        className={`container my-5 flex flex-col gap-6 ${poppins.className}`}
      >
        <CourtAddEditForm type={"Add"} />
      </div>
    </Layout>
  );
};

export default CourtAddPage;
