"use client";
import { useGetAdminCourtByIdQuery } from "@/store/api/Admin/adminCourts";
import { useSearchParams } from "next/navigation";
import React from "react";
import CourtAddEditForm from "./CourtAddEditForm";

const CourtBeforeAddEditForm = () => {
  const searchParams = useSearchParams();
  const id = searchParams.get("id") as string;
  const { data: ExistingDetail, isLoading: Loading } =
  useGetAdminCourtByIdQuery(id);
  return (
    <>
      {Loading ? (
        <div className="h-[100vh] w-full flex justify-center items-center">
          <p className="loader"></p>
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
