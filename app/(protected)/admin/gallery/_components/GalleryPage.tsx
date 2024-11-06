"use client"
import React from "react";
import { Button } from "@/components/ui/button";
import { paths } from "@/lib/paths";
import Link from "next/link";
import GalleryDetailPageComp from "./GalleryDetailPageComp";
import { Layout } from "@/components/custom/layout";
import { Search } from "@/components/search";
import ThemeSwitch from "@/components/theme-switch";
import { UserNav } from "@/components/user-nav";

const GalleryPage = ({ current_user }: any) => {
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
        <div className="flex items-center justify-between p-5 ">
          <h1 className="font-semibold text-2xl">Gallery</h1>
          <div className="flex justify-end">
            <Link href={`${paths.admin.addgallery}`} className="self-end">
              <Button
                variant={"default"}
                className="flex gap-3 items-center w-full md:w-auto"
              >
                Add New Images
              </Button>
            </Link>
          </div>
        </div>
        <GalleryDetailPageComp />
      </>
    </Layout>
  );
};

export default GalleryPage;
