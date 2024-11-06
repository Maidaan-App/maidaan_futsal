"use client";
import React from "react";
import Heading from "./Heading";
import SupportPage from "./SupportPage";
import {
  useGetContactConfigQuery,
  useGetLogoConfigQuery,
} from "@/store/api/Config/configs";
import Loader from "@/components/Loader";

const FutsalSupport = () => {
  const { data: ContactConfigData, isLoading: ContactConfigDataLoading } =
    useGetContactConfigQuery("");

  const { data: LogoConfigData, isLoading: LogoConfigDataLoading } =
    useGetLogoConfigQuery("");
  return (
    <>
      {ContactConfigDataLoading || LogoConfigDataLoading ? (
        <div className="flex h-[80vh] items-center justify-center">
          <Loader />
        </div>
      ) : (
        <div className="container my-10">
          {LogoConfigData && <Heading ConfigData={LogoConfigData} />}
          {ContactConfigData && <SupportPage ConfigData={ContactConfigData} />}
        </div>
      )}
    </>
  );
};

export default FutsalSupport;
