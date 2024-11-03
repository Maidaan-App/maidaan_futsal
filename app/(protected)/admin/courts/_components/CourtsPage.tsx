"use client";
import { poppins } from "@/lib/constants";
import { Button } from "@/components/ui/button";
import { SquarePlus } from "lucide-react";
import React from "react";
import Link from "next/link";
import { paths } from "@/lib/paths";
import CourtCard from "./CourtCard";
import { useGetAllAdminCourtsQuery } from "@/store/api/Admin/adminCourts";
import Loader from "@/components/Loader";

const CourtsPage = () => {
  const { data: CourtsData, isLoading: CourtsDataLoading } =
    useGetAllAdminCourtsQuery("");
  return (
    <>
      {CourtsDataLoading ? (
        <div className="h-screen w-full flex justify-center items-center">
          <Loader />
        </div>
      ) : (
        <div className={`container my-5 ${poppins.className}`}>
          <div className="flex justify-between">
            <h2 className="text-[#232D42] font-medium text-2xl">
              My Futsal Grounds
            </h2>
            <Link href={paths.admin.addCourts}>
              {" "}
              <Button>
                <SquarePlus className="mr-2 w-6 h-6" />
                Add New Ground
              </Button>
            </Link>
          </div>
          <div className="flex gap-4">
            {CourtsData &&
              CourtsData.length > 0 &&
              CourtsData.map((element: any, index) => (
                <CourtCard key={index} courtData={element} />
              ))}
          </div>
        </div>
      )}
    </>
  );
};

export default CourtsPage;
