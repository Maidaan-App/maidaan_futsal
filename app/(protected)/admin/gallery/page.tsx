import { Button } from "@/components/ui/button";
import { paths } from "@/lib/paths";
import Link from "next/link";
import React from "react";
import GalleryDetailPageComp from "./_components/GalleryDetailPageComp";

const page = () => {
  return (
    <>
      <div className="flex items-center justify-between">
        <h1 className="font-semibold text-2xl">Gallery</h1>
        <div className="flex justify-end">
          <Link href={`${paths.admin.addgallery}`} className="self-end">
            <Button
              variant={"default"}
              className="flex gap-3 items-center w-full md:w-auto"
            >
              Add New Image
            </Button>
          </Link>
        </div>
      </div>
      <GalleryDetailPageComp />
    </>
  );
};

export default page;
