"use client";
import { useGetAdminCourtByIdQuery } from "@/store/api/Admin/adminCourts";
import { useSearchParams } from "next/navigation";
import React from "react";
import CourtAddEditForm from "./CourtAddEditForm";
import Loader from "@/components/Loader";

const CourtBeforeAddEditForm = () => {
  const searchParams = useSearchParams();
  const id = searchParams.get("id") as string;
  const { data: ExistingDetail, isLoading: Loading } =
    useGetAdminCourtByIdQuery(id);
  return (
    <>
      {Loading ? (
        <div className="flex h-[80vh] items-center justify-center">
          <Loader />
        </div>
      ) : (
        <>
          {ExistingDetail && (
            <CourtAddEditForm type={"Edit"} ExistingDetail={ExistingDetail} />
          )}
        </>
      )}
    </>
  );
};

export default CourtBeforeAddEditForm;
