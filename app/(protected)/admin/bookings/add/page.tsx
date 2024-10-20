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

const AddBooking = () => {
  const [completeBooking, setcompleteBooking] = useState(false);
  const [selectedDate, setSelectedDate] = useState();
  const [selectedTimeSlots, setSelectedTimeSlots] = useState();
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
  };

  return (
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
          {selectedCourt && (
            <>
              <DateSection
                selectedDate={selectedDate}
                setSelectedDate={setSelectedDate}
              />
              <TimeSlotSection
                setcompleteBooking={setcompleteBooking}
                selectedCourt={selectedCourt}
                selectedDate={selectedDate}
                setSelectedTimeSlots={setSelectedTimeSlots}
              />
            </>
          )}
        </>
      )}
    </div>
  );
};

export default AddBooking;
