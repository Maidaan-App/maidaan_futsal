"use client";
import React from "react";
import Heading from "./Heading";
import SupportPage from "./SupportPage";
import {
  useGetContactConfigQuery,
  useGetLogoConfigQuery,
} from "@/store/api/Config/configs";
import Loader from "@/components/Loader";
import { Layout } from "@/components/custom/layout";
import { Search } from "@/components/search";
import ThemeSwitch from "@/components/theme-switch";
import { UserNav } from "@/components/user-nav";

const FutsalSupport = ({ current_user }: any) => {
  const { data: ContactConfigData, isLoading: ContactConfigDataLoading } =
    useGetContactConfigQuery("");

  const { data: LogoConfigData, isLoading: LogoConfigDataLoading } =
    useGetLogoConfigQuery("");
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

      <>
        {ContactConfigDataLoading || LogoConfigDataLoading ? (
          <div className="flex h-[80vh] items-center justify-center">
            <Loader />
          </div>
        ) : (
          <div className="container my-10">
            {LogoConfigData && <Heading ConfigData={LogoConfigData} />}
            {ContactConfigData && (
              <SupportPage ConfigData={ContactConfigData} />
            )}
          </div>
        )}
      </>
    </Layout>
  );
};

export default FutsalSupport;
