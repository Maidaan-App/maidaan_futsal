"use client";

import * as React from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Clock } from "lucide-react";

const formatTime = (time: Date) => {
  return new Date(time).toLocaleTimeString("en-US", {
    hour: "2-digit",
    minute: "2-digit",
    hour12: true,
  });
};

// Function to generate time slots with a 1-hour gap between opening and closing time
const generateTimeSlots = (openingTime: string, closingTime: string) => {
  const slots = [];
  let currentTime = new Date(openingTime);
  const closingDate = new Date(closingTime);

  while (currentTime < closingDate) {
    const start = new Date(currentTime);
    currentTime.setHours(currentTime.getHours() + 1);
    const end = new Date(currentTime);

    if (end > closingDate) break;

    slots.push(`${formatTime(start)} - ${formatTime(end)}`);
  }

  return slots;
};

// Function to check the status of a given slot
const getSlotStatus = (
  slot: string,
  selectedDate: string,
  selectedCourt: any
) => {
  const dateObject = new Date(selectedDate);
  const selectedDateString = dateObject.toISOString().split("T")[0];
  const dayBookings = selectedCourt?.bookings[selectedDateString];

  if (!dayBookings) return "Available"; // If no booking data, treat as available

  const checkBooking = (status: string) =>
    dayBookings[status]?.find((booking: any) =>
      booking.selectedslots.includes(slot)
    );

  const reserved = checkBooking("Reserved");
  const preBooked = checkBooking("Pre-Booked");
  const booked = checkBooking("Booked");
  const completed = checkBooking("Completed");

  if (reserved) return "Reserved";
  if (preBooked) return "Pre-Booked";
  if (booked) return "Booked";
  if (completed) return "Completed";
  return "Available";
};

export function PublicBookingSlots({ selectedCourt, selectedDate }: any) {
  const [selectedIndices, setSelectedIndices] = React.useState<number[]>([]);
  const timeSlots = generateTimeSlots(
    selectedCourt.openingTime,
    selectedCourt.closingTime
  );

  return (
    <div>
      {selectedDate && selectedCourt && (
        <>
          <div className="flex gap-2 px-3">
            <Clock />
            <h1 className="text-[1.125rem] font-medium">Time slots</h1>
          </div>

          <div className="px-3 my-5 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
            {timeSlots.map((slot, index) => {
              const slotStatus = getSlotStatus(
                slot,
                selectedDate,
                selectedCourt
              );

              let slotBgColor = "bg-white"; // Default Available
              let isDisabled = false; // Track if the slot is disabled

              if (slotStatus === "Booked") {
                slotBgColor = "bg-[#FF5630] text-white";
                isDisabled = false;
              } else if (slotStatus === "Pre-Booked") {
                slotBgColor = "bg-[#3169FF] text-white";
                isDisabled = false;
              } else if (slotStatus === "Reserved") {
                slotBgColor = "bg-primary text-white";
                isDisabled = false;
              }
              else if (slotStatus === "Completed") {
                slotBgColor = "bg-gray-600 text-white";
                isDisabled = false;
              }

              return (
                <div key={index} className="p-1">
                  <Card
                    className={`cursor-pointer transition-colors duration-300 ${slotBgColor} ${
                      selectedIndices.includes(index)
                        ? "border-2 border-primary"
                        : ""
                    } ${isDisabled ? "cursor-not-allowed" : ""}`} // Add styles for disabled
                  >
                    <CardContent className="flex items-center justify-center px-5 py-5 flex-col">
                      <span className="text-lg font-medium">{slot}</span>
                    </CardContent>
                  </Card>
                </div>
              );
            })}
          </div>
        </>
      )}

      <div className="flex items-center justify-between pb-10 px-4">
        <div className="flex items-center gap-6 w-full">
          <div className="flex items-center gap-2">
            <div className="bg-white border h-5 w-5 rounded-md"></div>
            Available
          </div>
          <div className="flex items-center gap-2">
            <div className="bg-primary border h-5 w-5 rounded-md"></div>
            Reserved
          </div>
          <div className="flex items-center gap-2">
            <div className="bg-blue-600 border h-5 w-5 rounded-md"></div>
            Pre-Booked
          </div>
          <div className="flex items-center gap-2">
            <div className="bg-[#FF5630] border h-5 w-5 rounded-md"></div>
            Booked
          </div>
          <div className="flex items-center gap-2">
            <div className="bg-gray-600 border h-5 w-5 rounded-md"></div>
            Unavailable
          </div>
        </div>
      </div>
    </div>
  );
}
