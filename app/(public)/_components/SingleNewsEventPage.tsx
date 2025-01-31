"use client";
import React from "react";
import Image from "next/image";
import { twMerge } from "tailwind-merge";
import { MINIOURL, montserrat } from "@/lib/constants";
import { TracingBeam } from "@/components/ui/tracing-beam";
import { useParams } from "next/navigation";
import { useGetAdminNewseventBySlugQuery } from "@/store/api/Public/publicFutsal";
import Loader from "@/components/Loader";
import { convertToHumanReadableNoTime } from "@/lib/helper";

const SingleNewsEventPage = () => {
  const { slug } = useParams();
  const { data: NewsEventBySlug, isLoading: NewsEventLoading } =
    useGetAdminNewseventBySlugQuery(slug as string);

  return (
    <div
      className={`bg-[#182b2a] min-h-screen md:py-10 pb-7 ${montserrat.className}`}
    >
      {NewsEventLoading ? (
        <div className="flex h-[100vh] items-center justify-center">
          <Loader />
        </div>
      ) : (
        <div>
          {NewsEventBySlug && (
            <TracingBeam className="px-9 ">
              <div className="max-w-2xl mx-auto antialiased pt-4 text-white relative">
                <div className="">
                  <h2 className="bg-black text-white rounded-full text-xs md:text-sm w-fit md:px-4 px-3 py-1 mb-4">
                    {convertToHumanReadableNoTime(NewsEventBySlug?.createdDate)}
                  </h2>

                  <p
                    className={twMerge(
                      montserrat.className,
                      "md:text-3xl font-bold pb-4 mb-4"
                    )}
                  >
                    {NewsEventBySlug?.title}
                  </p>

                  <div className="text-lg prose prose-sm dark:prose-invert">
                    {NewsEventBySlug?.image && (
                      <Image
                        src={`${MINIOURL}${NewsEventBySlug.image}`}
                        alt="blog thumbnail"
                        height="1000"
                        width="1000"
                        className="rounded-lg mb-10 object-cover"
                      />
                    )}
                    <p
                      dangerouslySetInnerHTML={{
                        __html: NewsEventBySlug?.description as string,
                      }}
                      className="md:text-lg text-xs"
                    ></p>
                    {/* {NewsEventBySlug?.description} */}
                  </div>
                </div>
              </div>
            </TracingBeam>
          )}
        </div>
      )}
    </div>
  );
};

export default SingleNewsEventPage;
