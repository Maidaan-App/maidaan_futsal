"use client";
import React from "react";
import BookingEditForm from "./BookingEditForm";
import { Layout } from "@/components/custom/layout";
import { Search } from "@/components/search";
import ThemeSwitch from "@/components/theme-switch";
import { UserNav } from "@/components/user-nav";
import { useGetAdminBookingByIdQuery } from "@/store/api/Admin/adminBookings";
import { useGetAllAdminPlayersQuery } from "@/store/api/Admin/adminPlayers";
import { useSearchParams } from "next/navigation";
import Loader from "@/components/Loader";

const BookingEditPage = ({ current_user }: any) => {
  const searchParams = useSearchParams();
  const id = searchParams.get("id") as string;
  const { data: ExistingDetail, isLoading: Loading } =
    useGetAdminBookingByIdQuery(id);
  const { data: PlayersData, isLoading: PlayersDataLoading } =
    useGetAllAdminPlayersQuery("");
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
      {Loading || PlayersDataLoading ? (
        <div className="flex h-[80vh] items-center justify-center">
          <Loader />
        </div>
      ) : (
        <>
          {ExistingDetail && PlayersData && PlayersData.length > 0 && (
            <BookingEditForm
              ExistingDetail={ExistingDetail}
              playerLists={PlayersData}
            />
          )}
        </>
      )}
    </Layout>
  );
};

export default BookingEditPage;
