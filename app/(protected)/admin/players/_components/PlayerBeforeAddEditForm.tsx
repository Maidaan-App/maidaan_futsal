"use client";
import { useGetAdminPlayerByIdQuery } from "@/store/api/Admin/adminPlayers";
import { useSearchParams } from "next/navigation";
import React from "react";
import PlayerAddEditForm from "./PlayerAddEditForm";

const PlayerBeforeAddEditForm = () => {
  const searchParams = useSearchParams();
  const id = searchParams.get("id") as string;
  const { data: ExistingDetail, isLoading: Loading } =
    useGetAdminPlayerByIdQuery(id);
  console.log("ExistingDetail:", ExistingDetail);
  return (
    <>
      {Loading ? (
        <div className="h-[100vh] w-full flex justify-center items-center">
          <p className="loader"></p>
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
