"use client";
import React, { useEffect, useState } from "react";
import { COURT } from "@/lib/types";
import { PublicBookingSlots } from "./PublicBookingSlots";
import { PublicDateSelect } from "./PublicDateSelect";
import { DateSection } from "@/app/(protected)/admin/bookings/_components/DateSection";
import { TimeSlotSection } from "@/app/(protected)/admin/bookings/_components/TimeSlots";
import { montserrat } from "@/lib/constants";

interface props {
  CourtsData: COURT[];
}

const Bookings = ({ CourtsData }: props) => {
  const [selectedDate, setSelectedDate] = useState(new Date());
  const [selectedCourt, setSelectedCourt] = useState<COURT>();
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
    <div
      className={`md:px-20 px-7 bg-[#f0f0f1] py-20 ${montserrat.className}`}
      id="book-now"
    >
      <div>
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
            className={`px-1 py-2 md:text-base text-xs ${
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
          {/* <DateSection
            selectedDate={selectedDate}
            setSelectedDate={setSelectedDate}
          /> */}
          <PublicBookingSlots
            selectedCourt={selectedCourt}
            selectedDate={selectedDate}
          />
        </div>
      )}
    </div>
  );
};

export default Bookings;
