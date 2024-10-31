"use client";
import React, { useEffect, useState } from "react";
import { useSearchParams } from "next/navigation";
import {
  useGetAdminCourtByIdQuery,
  useGetAllAdminCourtsQuery,
} from "@/store/api/Admin/adminCourts";
import { COURT } from "@/lib/types";
import { PublicBookingSlots } from "./PublicBookingSlots";
import { PublicDateSelect } from "./PublicDateSelect";
import { FaChevronDown } from "react-icons/fa";

const Bookings = ({ CourtsData }: any) => {
  const [completeBooking, setcompleteBooking] = useState(false);
  const [selectedDate, setSelectedDate] = useState(new Date());
  const [selectedTimeSlots, setSelectedTimeSlots] = useState();
  const [selectedCourt, setSelectedCourt] = useState<COURT>();
  const searchParams = useSearchParams();
  const today = new Date(); // Define 'today' here

  useEffect(() => {
    if (CourtsData && CourtsData.length > 0) {
      setSelectedCourt(CourtsData[0]);
    }
  }, [CourtsData]);

  const handleCourtClick = (court: COURT) => {
    setSelectedCourt(court);
  };

  return (
    <div className="md:px-20 px-10 bg-[#f0f0f1] py-20" id="book-now">
      <div>
        {/* Today&apos;s Slots */}
        <p className="text-center text-[#172b2a] font-bold text-xl flex justify-center items-center gap-3 md:text-4xl">
          <span>
            {selectedDate?.toDateString() === today.toDateString()
              ? "Today's"
              : selectedDate?.toLocaleDateString("en-US", {
                  weekday: "long",
                })}{" "}
            Slot
          </span>
        </p>
      </div>

      <div className="flex space-x-4 mb-6">
        {CourtsData?.map((court: COURT) => (
          <button
            key={court._id}
            onClick={() => handleCourtClick(court)}
            className={`px-1 py-2  ${
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
        <div className="flex flex-col gap-7">
          <PublicDateSelect
            selectedDate={selectedDate}
            setSelectedDate={setSelectedDate}
          />
          <PublicBookingSlots
            setcompleteBooking={setcompleteBooking}
            selectedCourt={selectedCourt}
            selectedDate={selectedDate}
            setSelectedTimeSlots={setSelectedTimeSlots}
          />
        </div>
      )}
    </div>
  );
};

export default Bookings;
