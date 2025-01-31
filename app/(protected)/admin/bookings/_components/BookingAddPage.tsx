"use client";
import React, { useEffect, useState } from "react";
import { DateSection } from "../_components/DateSection";
import { TimeSlotSection } from "../_components/TimeSlots";
import { useSearchParams } from "next/navigation";
import {
  useGetAdminCourtByIdQuery,
  useGetAllAdminCourtsQuery,
} from "@/store/api/Admin/adminCourts";
import { COURT } from "@/lib/types";
import BookingConfirmationPage from "../_components/BookingConfirmationPage";
import Loader from "@/components/Loader";
import { Layout } from "@/components/custom/layout";
import { Search } from "@/components/search";
import ThemeSwitch from "@/components/theme-switch";
import { UserNav } from "@/components/user-nav";

const BookingAddPage = ({ current_user }: any) => {
  const [completeBooking, setcompleteBooking] = useState(false);
  const [selectedDate, setSelectedDate] = useState();
  const [selectedTimeSlots, setSelectedTimeSlots] = useState([]);
  const [selectedIndices, setSelectedIndices] = React.useState<number[]>([]);
  const [selectedCourt, setSelectedCourt] = useState<COURT>();
  const searchParams = useSearchParams();
  const id = searchParams.get("id") as string;

  const { data: ExistingDetail, isLoading: Loading } =
    useGetAdminCourtByIdQuery(id, { skip: !id });

  const { data: CourtsData, isLoading: CourtsDataLoading } =
    useGetAllAdminCourtsQuery("");

  useEffect(() => {
    if (ExistingDetail?.name) {
      setSelectedCourt(ExistingDetail);
    } else {
      if (CourtsData && CourtsData.length > 0) {
        setSelectedCourt(CourtsData[0]);
      }
    }
  }, [ExistingDetail, CourtsData]);

  const handleCourtClick = (court: COURT) => {
    setSelectedCourt(court);
    setSelectedTimeSlots([]);
    setSelectedIndices([]);
  };

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
        {CourtsDataLoading || Loading ? (
          <div className="flex h-[80vh] items-center justify-center">
            <Loader />
          </div>
        ) : (
          <div>
            {completeBooking ? (
              <BookingConfirmationPage
                setcompleteBooking={setcompleteBooking}
                selectedDate={selectedDate}
                selectedTimeSlots={selectedTimeSlots}
                selectedCourt={selectedCourt}
              />
            ) : (
              <>
                {selectedCourt && (
                  <>
                    <div className="flex space-x-4 mb-6">
                      {CourtsData?.map((court: COURT) => (
                        <button
                          key={court._id}
                          onClick={() => handleCourtClick(court)}
                          className={`px-4 py-2  ${
                            selectedCourt?._id === court._id
                              ? "border-b-2 border-primary text-[#00A76F]"
                              : "border-gray-300 text-[#00A76F]"
                          }transition`}
                        >
                          {court.name}
                        </button>
                      ))}
                    </div>

                    <DateSection
                      selectedDate={selectedDate}
                      setSelectedDate={setSelectedDate}
                      setSelectedTimeSlots={setSelectedTimeSlots}
                      setSelectedIndices={setSelectedIndices}
                    />
                    <TimeSlotSection
                      setcompleteBooking={setcompleteBooking}
                      selectedCourt={selectedCourt}
                      selectedDate={selectedDate}
                      setSelectedTimeSlots={setSelectedTimeSlots}
                      selectedIndices={selectedIndices}
                      setSelectedIndices={setSelectedIndices}
                    />
                  </>
                )}
              </>
            )}
          </div>
        )}
      </>
    </Layout>
  );
};

export default BookingAddPage;
