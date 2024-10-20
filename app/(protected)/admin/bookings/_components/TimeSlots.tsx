"use client";

import * as React from "react";
import { Card, CardContent } from "@/components/ui/card";

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
  const isBooked = dayBookings?.Booked?.some((booking: any) =>
    booking.selectedslots.includes(slot)
  );
  const isSold = dayBookings?.Sold?.some((booking: any) =>
    booking.selectedslots.includes(slot)
  );
  const isPreBooked = dayBookings?.["Pre-Booked"]?.some((booking: any) =>
    booking.selectedslots.includes(slot)
  );

  if (isSold) return "Sold";
  if (isPreBooked) return "Pre-Booked";
  if (isBooked) return "Booked";
  return "Available";
};

export function TimeSlotSection({
  selectedCourt,
  selectedDate,
  setSelectedTimeSlots,
  setcompleteBooking,
}: any) {
  const [selectedIndices, setSelectedIndices] = React.useState<number[]>([]);
  const timeSlots = generateTimeSlots(
    selectedCourt.openingTime,
    selectedCourt.closingTime
  );

  const handleCardClick = (index: number) => {
    setSelectedIndices((prevSelectedIndices) => {
      const isSelected = prevSelectedIndices.includes(index);
      const newSelectedIndices = isSelected
        ? prevSelectedIndices.filter((i) => i !== index)
        : [...prevSelectedIndices, index];
      return newSelectedIndices;
    });
  };

  const handleContinueClick = () => {
    const selectedTimeSlots = selectedIndices.map((i) => timeSlots[i]);
    setSelectedTimeSlots(selectedTimeSlots);
    setcompleteBooking(true);
  };

  return (
    <div>
      {/* <div className="px-3 my-10 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
        {timeSlots.map((slot, index) => (
          <div key={index} className="p-1">
            <Card
              onClick={() => handleCardClick(index)}
              className={`cursor-pointer transition-colors duration-300 ${
                selectedIndices.includes(index)
                  ? "bg-green-500 text-white"
                  : "bg-white"
              }`}
            >
              <CardContent className="flex items-center justify-center px-5 py-5 flex-col">
                <span className="text-lg font-medium">{slot}</span>
              </CardContent>
            </Card>
          </div>
        ))}
      </div> */}
      {selectedDate && selectedCourt && (
        <div className="px-3 my-10 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
          {timeSlots.map((slot, index) => {
            const slotStatus = getSlotStatus(slot, selectedDate, selectedCourt);

            let slotBgColor = "bg-white"; // Default Available
            let isDisabled = false; // Track if the slot is disabled

            if (slotStatus === "Sold") {
              slotBgColor = "bg-red-600 text-white";
              isDisabled = true; // Disable Sold slots
            }
            if (slotStatus === "Pre-Booked") {
              slotBgColor = "bg-blue-500 text-white";
              isDisabled = true; // Disable Pre-Booked slots
            }
            if (slotStatus === "Booked") {
              slotBgColor = "bg-green-600 text-white";
              isDisabled = true; // Disable Booked slots
            }

            return (
              <div key={index} className="p-1">
                <Card
                  onClick={() => !isDisabled && handleCardClick(index)} // Only call if not disabled
                  className={`cursor-pointer transition-colors duration-300 ${slotBgColor} ${
                    selectedIndices.includes(index) ? "border-4 border-green-500" : ""
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
      )}

      <div className="flex items-center justify-between pb-10 px-4">
        <div className="flex items-center gap-2 w-full">
          <div className="flex items-center gap-2">
            <div className="bg-white border h-5 w-5 rounded-md"></div>
            Available
          </div>
          <div className="flex items-center gap-2">
            <div className="bg-blue-600 border h-5 w-5 rounded-md"></div>
            Pre-Booked
          </div>
          <div className="flex items-center gap-2">
            <div className="bg-red-600 border h-5 w-5 rounded-md"></div>
            Sold
          </div>
          <div className="flex items-center gap-2">
            <div className="bg-green-600 border h-5 w-5 rounded-md"></div>
            Booked
          </div>
        </div>

        <button
          className="bg-green-600 hover:bg-green-500 text-white px-5 py-2 rounded-md"
          onClick={handleContinueClick}
        >
          Continue
        </button>
      </div>
    </div>
  );
}
