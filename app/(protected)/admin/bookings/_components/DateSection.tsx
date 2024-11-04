"use client";

import React, { useEffect, useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import { CalendarDays } from "lucide-react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css"; 
import { FaChevronDown } from "react-icons/fa";
import { poppins } from "@/lib/constants";

export function DateSection({ selectedDate, setSelectedDate,setSelectedTimeSlots,setSelectedIndices }: any) {
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
    setSelectedDate(today); // Set the current date as the default selected date
  }, [setSelectedDate]);

  const handleDateClick = (dateObj: { fullDate: Date }) => {
    setSelectedDate(dateObj.fullDate); // Set the full Date object in the state
    setSelectedTimeSlots([])
    setSelectedIndices([])
  };

  const toggleCalendar = () => {
    setIsOpen(!isOpen);
  };

  return (
    <div className={`mt-10 ${poppins.className}`}>
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
          <FaChevronDown style={{ marginLeft: "8px" }} />
        </p>

        {/* Datepicker shown conditionally */}
        {isOpen && (
          <div className="absolute z-50 right-8 top-48">
            <DatePicker
              selected={selectedDate}
              onChange={(date) => {
                setSelectedDate(date);
                setIsOpen(false); // Close the calendar after selecting the date
              }}
              onClickOutside={() => setIsOpen(false)} // Close calendar if clicked outside
              inline // To show calendar inline
            />
          </div>
        )}
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
                      ? "bg-primary text-white"
                      : "bg-white"
                  }
                  cursor-pointer transition-colors duration-300 rounded-xl group-hover
                `}
                >
                  <CardContent className="flex  items-center justify-center py-6 flex-col gap-5 group-hover:scale-105 group-hover:-rotate-3">
                    {/* Display day name */}
                    <span className="text-[1rem] font-normal">
                      {dateObj.dayName}
                    </span>
                    {/* Display the day of the month */}
                    <span className="text-[1.625rem] font-semibold">
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

// "use client";

// import React, { useEffect, useState, useRef } from "react";
// import { Card, CardContent } from "@/components/ui/card";
// import {
//   Carousel,
//   CarouselContent,
//   CarouselItem,
//   CarouselNext,
//   CarouselPrevious,
// } from "@/components/ui/carousel";
// import { CalendarDays } from "lucide-react";
// import DatePicker from "react-datepicker";
// import "react-datepicker/dist/react-datepicker.css";
// import { FaChevronDown } from "react-icons/fa";
// import { poppins } from "@/lib/constants";

// export function DateSection({ selectedDate, setSelectedDate }: any) {
//   const daysOfWeek = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
//   const today = new Date();
//   const [isOpen, setIsOpen] = useState(false);
//   const carouselRef = useRef<HTMLDivElement>(null); // Reference to the carousel

//   // Generate the 7 days before, today, and 7 days after
//   const dates = Array.from({ length: 14 }).map((_, index) => {
//     const date = new Date();
//     date.setDate(today.getDate() - 7 + index); // 7 days before today, today, and 7 days after
//     return {
//       dayName: daysOfWeek[date.getDay()],
//       day: date.getDate(),
//       fullDate: date,
//     };
//   });

//   // Set today's date as the default selected date
//   useEffect(() => {
//     setSelectedDate(today); // Set the current date as the default selected date

//     // Center the carousel on today's date (index 7)
//     if (carouselRef.current) {
//       const todayItem = carouselRef.current.children[7] as HTMLElement;
//       todayItem?.scrollIntoView({
//         behavior: "smooth",
//         inline: "center",
//       });
//     }
//   }, [setSelectedDate]);

//   const handleDateClick = (dateObj: { fullDate: Date }) => {
//     setSelectedDate(dateObj.fullDate); // Set the full Date object in the state
//   };

//   const toggleCalendar = () => {
//     setIsOpen(!isOpen);
//   };

//   return (
//     <div className={`mt-10 ${poppins.className}`}>
//       <div className="flex justify-between items-center px-5">
//         <p className="text-[1.125rem] font-medium flex gap-2">
//           <CalendarDays /> Date
//         </p>

//         {/* Date display with Chevron Down */}
//         <p
//           onClick={toggleCalendar}
//           style={{ cursor: "pointer", display: "flex", alignItems: "center" }}
//           className="font-medium text-[1.125rem]"
//         >
//           <span>
//             {selectedDate?.toLocaleDateString("en-US", { weekday: "long" })},{" "}
//           </span>
//           <span style={{ color: "#28353D5C" }}>
//             {selectedDate?.toLocaleDateString("en-US", {
//               month: "long",
//               day: "numeric",
//             })}
//           </span>
//           <FaChevronDown style={{ marginLeft: "8px" }} />
//         </p>

//         {/* Datepicker shown conditionally */}
//         {isOpen && (
//           <div className="absolute z-50 right-8 top-48">
//             <DatePicker
//               selected={selectedDate}
//               onChange={(date) => {
//                 setSelectedDate(date);
//                 setIsOpen(false); // Close the calendar after selecting the date
//               }}
//               onClickOutside={() => setIsOpen(false)} // Close calendar if clicked outside
//               inline // To show calendar inline
//             />
//           </div>
//         )}
//       </div>

//       {/* Carousel for past and future dates */}
//       <Carousel className="lg:w-[90%] container mb-10 mt-5">
//         <CarouselContent className="-ml-1" ref={carouselRef}>
//           {dates.map((dateObj, index) => (
//             <CarouselItem
//               key={index}
//               className="pl-1 md:basis-1/2 lg:basis-1/6"
//             >
//               <div className="p-1">
//                 <Card
//                   onClick={() => handleDateClick(dateObj)}
//                   className={`
//                   ${
//                     selectedDate?.toDateString() ===
//                     dateObj.fullDate.toDateString()
//                       ? "bg-primary text-white"
//                       : "bg-white"
//                   }
//                   cursor-pointer transition-colors duration-300 rounded-xl group-hover
//                 `}
//                 >
//                   <CardContent className="flex items-center justify-center py-6 flex-col gap-5 group-hover:scale-105 group-hover:-rotate-3">
//                     {/* Display day name */}
//                     <span className="text-[1rem] font-normal">
//                       {dateObj.dayName}
//                     </span>
//                     {/* Display the day of the month */}
//                     <span className="text-[1.625rem] font-semibold">
//                       {dateObj.day}
//                     </span>
//                   </CardContent>
//                 </Card>
//               </div>
//             </CarouselItem>
//           ))}
//         </CarouselContent>
//         <div className="hidden lg:flex">
//           <CarouselPrevious />
//           <CarouselNext />
//         </div>
//       </Carousel>
//     </div>
//   );
// }
