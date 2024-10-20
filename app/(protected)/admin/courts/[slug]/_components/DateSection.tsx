"use client";

import React, { useEffect } from "react";
import { Card, CardContent } from "@/components/ui/card";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import { CalendarDays } from "lucide-react";

export function DateSection({ selectedDate, setSelectedDate }: any) {
  const daysOfWeek = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
  const today = new Date();

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
    setSelectedDate(today); // Set the current date as the default selected date
  }, [setSelectedDate]);

  const handleDateClick = (dateObj: { fullDate: Date }) => {
    setSelectedDate(dateObj.fullDate); // Set the full Date object in the state
  };

  return (
    <div className="mt-10">
      <div className="flex justify-between items-center px-5">
        <p className="flex items-center gap-2">
          <CalendarDays /> Date
        </p>
        <p>
          {selectedDate?.toLocaleDateString("en-US", {
            weekday: "long",
            month: "long",
            day: "numeric",
          })}
        </p>
      </div>
      <Carousel className="lg:w-[90%] container mb-10 mt-5">
        <CarouselContent className="-ml-1">
          {dates.map((dateObj, index) => (
            <CarouselItem
              key={index}
              className="pl-1 md:basis-1/2 lg:basis-1/6"
            >
              <div className="p-1">
                <Card
                  onClick={() => handleDateClick(dateObj)}
                  className={`
                  ${
                    selectedDate?.toDateString() ===
                    dateObj.fullDate.toDateString()
                      ? "bg-green-500 text-[#f1f1f1]"
                      : "bg-white"
                  }
                  cursor-pointer transition-colors duration-300
                `}
                >
                  <CardContent className="flex aspect-square items-center justify-center p-6 flex-col">
                    {/* Display day name */}
                    <span className="text-lg font-medium">
                      {dateObj.dayName}
                    </span>
                    {/* Display the day of the month */}
                    <span className="text-2xl font-semibold">
                      {dateObj.day}
                    </span>
                  </CardContent>
                </Card>
              </div>
            </CarouselItem>
          ))}
        </CarouselContent>
        <div className="hidden lg:flex">
          <CarouselPrevious />
          <CarouselNext />
        </div>
      </Carousel>
    </div>
  );
}
