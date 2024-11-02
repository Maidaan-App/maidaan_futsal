"use client";
import { useSearchParams } from "next/navigation";
import React from "react";
import Loader from "@/components/Loader";
import NewsEventsAddEditForm from "./NewsEventsAddEditForm";
import { useGetAdminNEWSEVENTByIdQuery } from "@/store/api/Admin/adminNewsEvents";

const NewsEventBeforeAddEditForm = () => {
  const searchParams = useSearchParams();
  const id = searchParams.get("id") as string;
  const { data: ExistingDetail, isLoading: Loading } =
    useGetAdminNEWSEVENTByIdQuery(id);
  return (
    <>
      {Loading ? (
        <div className="flex h-[80vh] items-center justify-center">
          <Loader />
        </div>
      ) : (
        <>
          {ExistingDetail && (
            <NewsEventsAddEditForm
              type={"Edit"}
              ExistingDetail={ExistingDetail}
            />
          )}
        </>
      )}
    </>
  );
};

export default NewsEventBeforeAddEditForm;
