
"use client";
import React, { useState } from "react";
import { DateSection } from "../../courts/[slug]/_components/DateSection";
import { TimeSlotSection } from "../../courts/[slug]/_components/TimeSlots";

const AddBooking = () => {
  const [selectedDate, setSelectedDate] = useState(1); // Default to the first date

  return (
    <div>
    <DateSection
      selectedDate={selectedDate}
      setSelectedDate={setSelectedDate}
    />
    <TimeSlotSection selectedDate={selectedDate} />
  </div>
  )
}

export default AddBooking