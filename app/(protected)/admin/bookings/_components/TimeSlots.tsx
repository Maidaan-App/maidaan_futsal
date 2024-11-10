"use client";

import * as React from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Clock } from "lucide-react";
import { toast } from "sonner";
import { MINIOURL } from "@/lib/constants";

const formatTime = (time: Date) => {
  return new Date(time).toLocaleTimeString("en-US", {
    hour: "2-digit",
    minute: "2-digit",
    hour12: true,
  });
};

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

const getSlotStatus = (
  slot: string,
  selectedDate: string,
  selectedCourt: any
) => {
  const dateObject = new Date(selectedDate);
  const selectedDateString = dateObject.toISOString().split("T")[0];
  const dayBookings = selectedCourt?.bookings[selectedDateString];

  console.log("selectedCourt:",selectedCourt)

  if (!dayBookings) return { status: "Available", details: null };

  const checkBooking = (status: string) =>
    dayBookings[status]?.find((booking: any) =>
      booking.selectedslots.includes(slot)
    );

  const reserved = checkBooking("Reserved");
  const preBooked = checkBooking("Pre-Booked");
  const booked = checkBooking("Booked");
  const completed = checkBooking("Completed");

  if (booked) return { status: "Booked", details: booked };
  if (preBooked) return { status: "Pre-Booked", details: preBooked };
  if (reserved) return { status: "Reserved", details: reserved };
  if (completed) return { status: "Completed", details: completed };

  return { status: "Available", details: null };
};

const HoverPopover = ({ details }: { details: any }) => (
  <div className="absolute left-0 -top-24 z-10 bg-white p-4 rounded-md flex justify-between shadow-[rgba(7,_65,_210,_0.1)_0px_9px_30px] transform transition-all duration-500 ease-out scale-95 hover:scale-100 hover:shadow-lg hover:bg-opacity-90 hover:cursor-pointer">
    <div className="flex items-center gap-5">
      {details.player.image ? (
        <img
          src={`${MINIOURL}${details.player.image}`}
          alt={details.player.name}
          className="h-24 w-24 object-cover rounded-full shadow-md border-4 border-white transition-transform duration-300 ease-in-out transform hover:scale-110"
        />
      ) : (
        <div className="h-24 w-24 rounded-full bg-gradient-to-r from-blue-500 to-purple-500 text-white flex justify-center items-center text-4xl shadow-lg transition-transform duration-300 ease-in-out transform hover:scale-110">
          {details.player.name[0]}
        </div>
      )}
      <div className="flex flex-col">
        <h3 className="text-[1.25rem] font-semibold text-gray-900 mb-1 transition-opacity duration-300 ease-in-out opacity-80 hover:opacity-100">
          {details.player.name}
        </h3>
        {details.player.address && (
          <p className="font-normal text-[#6B7280] text-sm mb-1 transition-opacity duration-300 ease-in-out opacity-70 hover:opacity-90">
            {details.player.address}
          </p>
        )}
        <p className="text-blue-600 font-medium text-sm transition-opacity duration-300 ease-in-out opacity-70 hover:opacity-90">
          {details.player.phone}
        </p>
      </div>
    </div>
  </div>
);

export function TimeSlotSection({
  selectedCourt,
  selectedDate,
  setSelectedTimeSlots,
  setcompleteBooking,
  selectedIndices,
  setSelectedIndices,
}: any) {
  const [hoveredSlot, setHoveredSlot] = React.useState<number | null>(null);

  const timeSlots = generateTimeSlots(
    selectedCourt.openingTime,
    selectedCourt.closingTime
  );

  const handleCardClick = (index: number) => {
    setSelectedIndices((prevSelectedIndices: any) => {
      const isSelected = prevSelectedIndices.includes(index);
      const newSelectedIndices = isSelected
        ? prevSelectedIndices.filter((i: any) => i !== index)
        : [...prevSelectedIndices, index];
      return newSelectedIndices;
    });
  };

  const handleContinueClick = () => {
    const selectedTimeSlots = selectedIndices.map((i: any) => timeSlots[i]);
    if (selectedTimeSlots.length === 0) {
      toast.error("Please Select Slots");
      return;
    }
    setSelectedTimeSlots(selectedTimeSlots);
    setcompleteBooking(true);
  };

  return (
    <div>
      {selectedDate && selectedCourt && (
        <>
          <div className="flex gap-2 px-3">
            <Clock />
            <h1 className="text-[1.125rem] font-medium">Time slots</h1>
          </div>

          <div className="px-3 my-10 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
            {timeSlots.map((slot, index) => {
              const { status: slotStatus, details } = getSlotStatus(
                slot,
                selectedDate,
                selectedCourt
              );
              console.log("details:", details);
              let slotBgColor = "bg-white";
              let isDisabled = false;

              if (slotStatus === "Booked") {
                slotBgColor = "bg-[#FF5630] text-white";
                isDisabled = true;
              } else if (slotStatus === "Pre-Booked") {
                slotBgColor = "bg-[#3169FF] text-white";
                isDisabled = true;
              } else if (slotStatus === "Reserved") {
                slotBgColor = "bg-primary text-white";
                isDisabled = true;
              }
              else if (slotStatus === "Completed") {
                slotBgColor = "bg-gray-600 text-white";
                isDisabled = true;
              }

              return (
                <div
                  key={index}
                  className="p-1 relative"
                  onMouseEnter={() => isDisabled && setHoveredSlot(index)}
                  onMouseLeave={() => setHoveredSlot(null)}
                >
                  <Card
                    onClick={() => !isDisabled && handleCardClick(index)}
                    className={`cursor-pointer transition-colors duration-300 ${slotBgColor} ${
                      selectedIndices.includes(index)
                        ? "border-2 border-primary"
                        : ""
                    } ${isDisabled ? "cursor-not-allowed" : ""}`}
                  >
                    <CardContent className="flex items-center justify-center px-5 py-5 flex-col">
                      <span className="text-lg font-medium">{slot}</span>
                    </CardContent>
                  </Card>
                  {isDisabled && hoveredSlot === index && details && (
                    <HoverPopover details={details} />
                  )}
                </div>
              );
            })}
          </div>
        </>
      )}

      <div className="flex items-center justify-between pb-10 px-4">
        <div className="flex items-center gap-2 w-full">
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
        <button
          className="bg-primary hover:bg-green-500 text-white px-5 py-2 rounded-md"
          onClick={handleContinueClick}
        >
          Continue
        </button>
      </div>
    </div>
  );
}
