"use client";

import React, { useEffect, useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { CalendarDays } from "lucide-react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { poppins } from "@/lib/constants";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";

interface DateObj {
  dayName: string;
  day: number;
  fullDate: Date;
}

interface PublicDateSelectProps {
  selectedDate: Date;
  setSelectedDate: React.Dispatch<React.SetStateAction<Date>>;
}

export const PublicDateSelect: React.FC<PublicDateSelectProps> = ({
  selectedDate,
  setSelectedDate,
}) => {
  const daysOfWeek = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
  const today = new Date();
  const [isOpen, setIsOpen] = useState<boolean>(false);

  // Generate the next 7 days (including today)
  const dates: DateObj[] = Array.from({ length: 7 }).map((_, index) => {
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

  const handleDateClick = (dateObj: DateObj) => {
    setSelectedDate(dateObj.fullDate);
  };

  return (
    <div className={`mt-5 ${poppins.className}`}>
      <div className="flex justify-between items-center px-5">
        <p className="md:text-[1.125rem] text-xs font-medium flex items-center   gap-2">
          <CalendarDays className="w-10" /> Date
        </p>

        {/* Date display with Chevron Down */}
        <p
          style={{ cursor: "pointer", display: "flex", alignItems: "center" }}
          className="font-medium md:text-[1.125rem] text-xs"
          onClick={() => setIsOpen(!isOpen)}
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
        </p>

        {/* Datepicker shown conditionally */}
        {isOpen && (
          <div className="absolute z-50 right-8 top-48">
            <DatePicker
              selected={selectedDate}
              onChange={(date) => {
                setSelectedDate(date as Date);
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
        <Carousel className="lg:w-[90%] container mb-10 mt-5">
          <CarouselContent className="-ml-1">
            {dates.map((dateObj, index) => (
              <CarouselItem key={index} className="pl-1 basis-1/3 lg:basis-1/6">
                <div className="p-1">
                  <Card
                    onClick={() => handleDateClick(dateObj)}
                    className={`
                      ${
                        selectedDate?.toDateString() ===
                        dateObj.fullDate.toDateString()
                          ? "bg-primary text-white"
                          : "bg-white"
                      }
                      cursor-pointer transition-colors duration-300 rounded-xl group-hover
                    `}
                  >
                    <CardContent className="flex items-center justify-center py-6 flex-col gap-5 group-hover:scale-105 group-hover:-rotate-3">
                      <span className="md:text-[1rem] text-xs font-normal">
                        {dateObj.dayName}
                      </span>
                      <span className="md:text-[1.625rem] text-xs font-semibold">
                        {dateObj.day}
                      </span>
                    </CardContent>
                  </Card>
                </div>
              </CarouselItem>
            ))}
          </CarouselContent>
          <CarouselPrevious />
          <CarouselNext />
        </Carousel>
      </div>
    </div>
  );
};
