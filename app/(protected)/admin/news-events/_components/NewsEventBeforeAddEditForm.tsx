"use client";
import { useSearchParams } from "next/navigation";
import React from "react";
import Loader from "@/components/Loader";
import NewsEventsAddEditForm from "./NewsEventsAddEditForm";
import { useGetAdminNEWSEVENTByIdQuery } from "@/store/api/Admin/adminNewsEvents";
import { Layout } from "@/components/custom/layout";
import { Search } from "@/components/search";
import ThemeSwitch from "@/components/theme-switch";
import { UserNav } from "@/components/user-nav";

const NewsEventBeforeAddEditForm = ({ current_user }: any) => {
  const searchParams = useSearchParams();
  const id = searchParams.get("id") as string;
  const { data: ExistingDetail, isLoading: Loading } =
    useGetAdminNEWSEVENTByIdQuery(id);
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
              <NewsEventsAddEditForm
                type={"Edit"}
                ExistingDetail={ExistingDetail}
              />
            )}
          </>
        )}
      </>
    </Layout>
  );
};

export default NewsEventBeforeAddEditForm;
