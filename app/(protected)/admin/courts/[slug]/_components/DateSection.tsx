"use client";

import * as React from "react";
import { Card, CardContent } from "@/components/ui/card";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import { CalendarDays } from "lucide-react";

// DateSection component
export function DateSection({ selectedDate, setSelectedDate }: any) {
  const daysOfWeek = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
  const totalItems = 19;

  const handleDateClick = (index: number) => {
    // Construct the full date string
    const dayName = daysOfWeek[index % 7];
    const date = index + 1;
    const fullDate = `${dayName}, ${date}`;

    // Console the full date
    console.log("Selected date:", fullDate);
    // Call setSelectedDate to update the state
    setSelectedDate(date);
  };

  return (
    <div className="mt-10">
      <div className="flex justify-between items-center px-5">
        <p className="flex items-center gap-2">
          <CalendarDays /> Date
        </p>
        <p>Monday, August 27</p>
      </div>
      <Carousel className="lg:w-[90%] container mb-10 mt-5">
        <CarouselContent className="-ml-1">
          {Array.from({ length: totalItems }).map((_, index) => (
            <CarouselItem
              key={index}
              className="pl-1 md:basis-1/2 lg:basis-1/6"
            >
              <div className="p-1">
                <Card
                  // Add conditional bg-green-500 if the card is active
                  onClick={() => handleDateClick(index)}
                  className={`
                    ${
                      selectedDate === index + 1
                        ? "bg-green-500 text-white"
                        : "bg-white"
                    }
                    cursor-pointer transition-colors duration-300
                  `}
                >
                  <CardContent className="flex aspect-square items-center justify-center p-6 flex-col">
                    {/* Display day name based on index */}
                    <span className="text-lg font-medium">
                      {daysOfWeek[index % 7]}
                    </span>
                    {/* Display the date */}
                    <span className="text-2xl font-semibold">{index + 1}</span>
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
