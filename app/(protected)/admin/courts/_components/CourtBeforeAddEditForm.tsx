"use client";
import { useGetAdminCourtByIdQuery } from "@/store/api/Admin/adminCourts";
import { useSearchParams } from "next/navigation";
import React from "react";
import CourtAddEditForm from "./CourtAddEditForm";
import Loader from "@/components/Loader";
import { Layout } from "@/components/custom/layout";
import { Search } from "@/components/search";
import ThemeSwitch from "@/components/theme-switch";
import { UserNav } from "@/components/user-nav";

const CourtBeforeAddEditForm = ({ current_user }: any) => {
  const searchParams = useSearchParams();
  const id = searchParams.get("id") as string;
  const { data: ExistingDetail, isLoading: Loading } =
    useGetAdminCourtByIdQuery(id);
  return (
    <Layout>
      {/* ===== Top Heading ===== */}
      <Layout.Header sticky>
        <Search />
        <div className="ml-auto flex items-center space-x-4">
          <ThemeSwitch />
          <UserNav current_user={current_user} />
        </div>
      </Layout.Header>
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
    </Layout>
  );
};

export default CourtBeforeAddEditForm;
