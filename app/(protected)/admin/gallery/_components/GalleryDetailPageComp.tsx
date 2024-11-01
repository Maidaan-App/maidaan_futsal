"use client";
import React from "react";
import GalleryDetailCard from "./GalleryDetailCard";
import { useGetAllAdminGalleryQuery } from "@/store/api/Admin/adminGallery";
import { GALLERY } from "@/lib/types";
import Loader from "@/components/Loader";

const GalleryDetailPageComp = () => {
  const { data: Data, isLoading: DataLoading } = useGetAllAdminGalleryQuery("");

  return (
    <>
      {DataLoading ? (
        <div className="flex h-[80vh] items-center justify-center">
          <Loader />
        </div>
      ) : (
        <>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {Data &&
              Data.length > 0 &&
              Data.map((galleryDetail: GALLERY, index: number) => (
                <GalleryDetailCard key={index} galleryDetail={galleryDetail} />
              ))}
          </div>
          {Data && Data.length === 0 && <div>No Images...</div>}
        </>
      )}
    </>
  );
};

export default GalleryDetailPageComp;
