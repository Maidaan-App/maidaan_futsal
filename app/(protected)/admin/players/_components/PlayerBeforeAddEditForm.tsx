"use client";
import { useGetAdminPlayerByIdQuery } from "@/store/api/Admin/adminPlayers";
import { useSearchParams } from "next/navigation";
import React from "react";
import PlayerAddEditForm from "./PlayerAddEditForm";
import Loader from "@/components/Loader";

const PlayerBeforeAddEditForm = () => {
  const searchParams = useSearchParams();
  const id = searchParams.get("id") as string;
  const { data: ExistingDetail, isLoading: Loading } =
    useGetAdminPlayerByIdQuery(id);
  console.log("ExistingDetail:", ExistingDetail);
  return (
    <>
      {Loading ? (
        <div className="flex h-[80vh] items-center justify-center">
          <Loader />
        </div>
      ) : (
        <>
          {ExistingDetail && (
            <PlayerAddEditForm type={"Edit"} ExistingDetail={ExistingDetail} />
          )}
        </>
      )}
    </>
  );
};

export default PlayerBeforeAddEditForm;
