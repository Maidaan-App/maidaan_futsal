"use client";
import { DateSection } from "@/app/(protected)/admin/courts/[slug]/_components/DateSection";
import { TimeSlotSection } from "@/app/(protected)/admin/courts/[slug]/_components/TimeSlots";
import React, { useState } from "react";

const Bookings = () => {
  const [selectedDate, setSelectedDate] = useState(1); // Default to the first date

  return (
    <div className="container">
      {/* <DateSection
        selectedDate={selectedDate}
        setSelectedDate={setSelectedDate}
      />
      <TimeSlotSection selectedDate={selectedDate} /> */}
      Bookings
    </div>
  );
};

export default Bookings;
