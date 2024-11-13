/* eslint-disable @next/next/no-img-element */
"use client";
import LightGallery from "lightgallery/react";

// import styles
import "lightgallery/css/lightgallery.css";
import "lightgallery/css/lg-zoom.css";
import "lightgallery/css/lg-thumbnail.css";
import "lightgallery/css/lg-autoplay.css";
import "lightgallery/css/lg-fullscreen.css";
// import "lightgallery/css/lg-share.css";
import "lightgallery/css/lg-rotate.css";
import "./gallery.css";

// import plugins if you need
import lgThumbnail from "lightgallery/plugins/thumbnail";
import lgZoom from "lightgallery/plugins/zoom";
import lgAutoplay from "lightgallery/plugins/autoplay";
import lgFullscreen from "lightgallery/plugins/fullscreen";
// import lgShare from "lightgallery/plugins/share";
import lgRotate from "lightgallery/plugins/rotate";
import { useEffect, useState } from "react";
import { useGetPublicFutsalGalleryQuery } from "@/store/api/Public/publicFutsal";
import { GALLERY } from "@/lib/types";
import { MINIOURL } from "@/lib/constants";
import Loader from "@/components/Loader";

export function GalleryComponent() {
  const [Images, setImages] = useState<GALLERY[]>([]);
  const { data: GalleyData, isLoading: GalleyDataLoading } =
    useGetPublicFutsalGalleryQuery("");

  useEffect(() => {
    if (GalleyData && GalleyData.length > 0) {
      setImages(GalleyData);
    }
  }, [GalleyData]);
  const onInit = () => {
    console.log("lightGallery has been initialized");
  };
  return (
    <div className="App md:px-20 md:py-10 px-10 py-5 bg-[#172b2a]">
      {GalleyDataLoading ? (
        <div className="flex h-[100vh] items-center justify-center">
          <Loader />
        </div>
      ) : (
        <div>
          <h2 className="text-center text-[#f1f1f1] font-bold text-xl md:text-4xl mb-6">
            Gallery
          </h2>
          <p className="text-center text-gray-400 mb-6 mx-4 md:mb-12 md:mx-6">
            Explore moments captured from our tournaments, friendly matches, and
            futsal events.
          </p>

          <LightGallery
            onInit={onInit}
            speed={200}
            plugins={[
              lgThumbnail,
              lgZoom,
              lgAutoplay,
              lgFullscreen,
              lgRotate,
              // lgShare,
            ]}
          >
            {Images.map((image, index) => {
              return (
                <a href={`${MINIOURL}${image.image}`} key={index}>
                  <img alt={"Gallery"} src={`${MINIOURL}${image.image}`} />
                </a>
              );
            })}
          </LightGallery>
        </div>
      )}
    </div>
  );
}
