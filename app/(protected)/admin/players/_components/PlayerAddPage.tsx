"use client"
import React from "react";
import PlayerAddEditForm from "../_components/PlayerAddEditForm";
import { Layout } from "@/components/custom/layout";
import { Search } from "@/components/search";
import ThemeSwitch from "@/components/theme-switch";
import { UserNav } from "@/components/user-nav";

const PlayerAddPage = ({ current_user }: any) => {
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
      <PlayerAddEditForm type={"Add"} />
    </Layout>
  );
};

export default PlayerAddPage;
