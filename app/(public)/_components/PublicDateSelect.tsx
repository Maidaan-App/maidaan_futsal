"use client";

import React, { useEffect, useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { CalendarDays } from "lucide-react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { FaChevronDown } from "react-icons/fa";
import { poppins } from "@/lib/constants";
import { Carousel } from "@/components/ui/carousel";

export function PublicDateSelect({ selectedDate, setSelectedDate }: any) {
  const daysOfWeek = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
  const today = new Date();
  const [isOpen, setIsOpen] = useState(false);

  // Generate the next 7 days (including today)
  const dates = Array.from({ length: 7 }).map((_, index) => {
    const date = new Date();
    date.setDate(today.getDate() + index);
    return {
      dayName: daysOfWeek[date.getDay()],
      day: date.getDate(),
      fullDate: date,
    };
  });

  // Set today's date as the default selected date
  useEffect(() => {
    setSelectedDate(today);
  }, [setSelectedDate]);

  const handleDateClick = (dateObj: { fullDate: Date }) => {
    setSelectedDate(dateObj.fullDate);
  };

  const toggleCalendar = () => {
    setIsOpen(!isOpen);
  };

  return (
    <div className={`mt-5 ${poppins.className}`}>
      <div className="flex justify-between items-center px-5">
        <p className="text-[1.125rem] font-medium flex gap-2">
          <CalendarDays /> Date
        </p>

        {/* Date display with Chevron Down */}
        <p
          onClick={toggleCalendar}
          style={{ cursor: "pointer", display: "flex", alignItems: "center" }}
          className="font-medium text-[1.125rem]"
        >
          <span>
            {selectedDate?.toLocaleDateString("en-US", { weekday: "long" })},{" "}
          </span>
          <span style={{ color: "#28353D5C" }}>
            {selectedDate?.toLocaleDateString("en-US", {
              month: "long",
              day: "numeric",
            })}
          </span>
          {/* <FaChevronDown style={{ marginLeft: "8px" }} /> */}
        </p>

        {/* Datepicker shown conditionally */}
        {isOpen && (
          <div className="absolute z-50 right-8 top-48">
            <DatePicker
              selected={selectedDate}
              onChange={(date) => {
                setSelectedDate(date);
                setIsOpen(false);
              }}
              onClickOutside={() => setIsOpen(false)}
              inline
            />
          </div>
        )}
      </div>

      {/* Display dates in a grid for larger screens */}
      <div className="hidden lg:grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-7 gap-4 my-5 px-3">
        {dates.map((dateObj, index) => (
          <div key={index} className="p-1">
            <Card
              onClick={() => handleDateClick(dateObj)}
              className={`${
                selectedDate?.toDateString() === dateObj.fullDate.toDateString()
                  ? "bg-primary text-white"
                  : "bg-white"
              } cursor-pointer transition-colors duration-300 rounded-xl`}
            >
              <CardContent className="flex items-center justify-center py-6 flex-col gap-5">
                <span className="text-[1rem] font-normal">
                  {dateObj.dayName}
                </span>
                <span className="text-[1.625rem] font-semibold">
                  {dateObj.day}
                </span>
              </CardContent>
            </Card>
          </div>
        ))}
      </div>

      {/* Display dates in a carousel for mobile screens */}
      <div className="block lg:hidden">
        <Carousel>
          {dates.map((dateObj, index) => (
            <div key={index} className="p-1">
              <Card
                onClick={() => handleDateClick(dateObj)}
                className={`${
                  selectedDate?.toDateString() ===
                  dateObj.fullDate.toDateString()
                    ? "bg-primary text-white"
                    : "bg-white"
                } cursor-pointer transition-colors duration-300 rounded-xl`}
              >
                <CardContent className="flex items-center justify-center py-6 flex-col gap-5">
                  <span className="text-[1rem] font-normal">
                    {dateObj.dayName}
                  </span>
                  <span className="text-[1.625rem] font-semibold">
                    {dateObj.day}
                  </span>
                </CardContent>
              </Card>
            </div>
          ))}
        </Carousel>
      </div>
    </div>
  );
}
