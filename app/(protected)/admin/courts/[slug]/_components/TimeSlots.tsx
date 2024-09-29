"use client";

// import * as React from "react";
// import { Card, CardContent } from "@/components/ui/card";


// type TimeSlotData = {
//   [key: number]: string[];
// };

// // Time slots for different dates
// const timeSlotData:TimeSlotData = {
//   1: [
//     "7 AM - 8 AM",
//     "8 AM - 9 AM",
//     "9 AM - 10 AM",
//     "10 AM - 11 AM",
//     "11 AM - 12 AM",
//     "12 AM - 1 PM",
//     "1 PM - 2 PM",
//     "2 PM - 3PM",
//     "3PM - 4PM",
//     "4 PM - 5 PM",
//     "5 PM -6 PM",
//     "6 PM - 7 PM",
//   ],
//   2: [
//     "7 AM - 8 AM",
//     "8 AM - 9 AM",
//     "9 AM - 10 AM",
//     "10 AM - 11 AM",
//     "11 AM - 12 AM",
//     "12 AM - 1 PM",
//     "1 PM - 2 PM",
//     "2 PM - 3PM",
//     "3PM - 4PM",
//     "4 PM - 5 PM",
//     "5 PM -6 PM",
//     "6 PM - 7 PM",
//   ],
//   3: [
//     "7 AM - 8 AM",
//     "8 AM - 9 AM",
//     "9 AM - 10 AM",
//     "10 AM - 11 AM",
//     "11 AM - 12 AM",
//     "12 AM - 1 PM",
//     "1 PM - 2 PM",
//     "2 PM - 3PM",
//     "3PM - 4PM",
//     "4 PM - 5 PM",
//     "5 PM -6 PM",
//     "6 PM - 7 PM",
//   ],
//   4: [
//     "7 AM - 8 AM",
//     "8 AM - 9 AM",
//     "9 AM - 10 AM",
//     "10 AM - 11 AM",
//     "11 AM - 12 AM",
//     "12 AM - 1 PM",
//     "1 PM - 2 PM",
//     "2 PM - 3PM",
//     "3PM - 4PM",
//     "4 PM - 5 PM",
//     "5 PM -6 PM",
//     "6 PM - 7 PM",
//   ],
//   5: [
//     "7 AM - 8 AM",
//     "8 AM - 9 AM",
//     "9 AM - 10 AM",
//     "10 AM - 11 AM",
//     "11 AM - 12 AM",
//     "12 AM - 1 PM",
//     "1 PM - 2 PM",
//     "2 PM - 3PM",
//     "3PM - 4PM",
//     "4 PM - 5 PM",
//     "5 PM -6 PM",
//     "6 PM - 7 PM",
//   ],
//   6: [
//     "7 AM - 8 AM",
//     "8 AM - 9 AM",
//     "9 AM - 10 AM",
//     "10 AM - 11 AM",
//     "11 AM - 12 AM",
//     "12 AM - 1 PM",
//     "1 PM - 2 PM",
//     "2 PM - 3PM",
//     "3PM - 4PM",
//     "4 PM - 5 PM",
//     "5 PM -6 PM",
//     "6 PM - 7 PM",
//   ],
//   7: [
//     "7 AM - 8 AM",
//     "8 AM - 9 AM",
//     "9 AM - 10 AM",
//     "10 AM - 11 AM",
//     "11 AM - 12 AM",
//     "12 AM - 1 PM",
//     "1 PM - 2 PM",
//     "2 PM - 3PM",
//     "3PM - 4PM",
//     "4 PM - 5 PM",
//     "5 PM -6 PM",
//     "6 PM - 7 PM",
//   ],

//   // Add time slots for more dates as necessary
// };

// export function TimeSlotSection({ selectedDate }: any) {
//   // Fetch time slots for the selected date or fallback to an empty array
//   const timeSlots = timeSlotData[selectedDate] || [];
//   const [selectedIndices, setSelectedIndices] = React.useState<number[]>([]);

//   const handleCardClick = (index: number) => {
//     setSelectedIndices((prevSelectedIndices) => {
//       // Toggle the selection of the clicked index
//       const isSelected = prevSelectedIndices.includes(index);
//       const newSelectedIndices = isSelected
//         ? prevSelectedIndices.filter((i) => i !== index)
//         : [...prevSelectedIndices, index];

//       console.log(timeSlots.filter((_:any, i:number) => newSelectedIndices.includes(i)));
//       return newSelectedIndices;
//     });
//   };

//   return (
//     <div>
//       <div className="px-3 my-10 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
//         {timeSlots.map((slot:any, index:number) => (
//           <div key={index} className="p-1">
//             <Card
//               onClick={() => handleCardClick(index)}
//               className={`cursor-pointer transition-colors duration-300 ${
//                 selectedIndices.includes(index)
//                   ? "bg-green-500 text-white"
//                   : "bg-white"
//               }`}
//             >
//               <CardContent className="flex items-center justify-center px-5 py-5 flex-col">
//                 {/* Display time slot */}
//                 <span className="text-lg font-medium">{slot}</span>
//               </CardContent>
//             </Card>
//           </div>
//         ))}
//       </div>

//       <div className="flex items-center justify-between pb-10 px-4">
//         <div className="flex items-center gap-2 w-full">
//           <div className="flex items-center gap-2">
//             <div className="bg-white border h-5 w-5 rounded-md"></div>
//             Available
//           </div>
//           <div className="flex items-center gap-2">
//             <div className="bg-blue-600 border h-5 w-5 rounded-md"></div>
//             Pre-Booked
//           </div>
//           <div className="flex items-center gap-2">
//             <div className="bg-red-600 border h-5 w-5 rounded-md"></div>
//             Sold
//           </div>
//           <div className="flex items-center gap-2">
//             <div className="bg-green-600 border h-5 w-5 rounded-md"></div>
//             Booked
//           </div>
//         </div>

//         <button className="bg-green-600 hover:bg-green-500 text-white px-5 py-2 rounded-md">
//           Continue
//         </button>
//       </div>
//     </div>
//   );
// }



"use client";

import * as React from "react";
import { Card, CardContent } from "@/components/ui/card";
import { useRouter } from "next/navigation";
import { paths } from "@/lib/paths";

type TimeSlotData = {
  [key: number]: string[];
};

const timeSlotData: TimeSlotData = {
  1: ["7 AM - 8 AM", "8 AM - 9 AM", "9 AM - 10 AM", "10 AM - 11 AM", "11 AM - 12 AM", "12 AM - 1 PM", "1 PM - 2 PM", "2 PM - 3 PM", "3 PM - 4 PM", "4 PM - 5 PM", "5 PM - 6 PM", "6 PM - 7 PM"],
  2: ["7 AM - 8 AM", "8 AM - 9 AM", "9 AM - 10 AM", "10 AM - 11 AM", "11 AM - 12 AM", "12 AM - 1 PM", "1 PM - 2 PM", "2 PM - 3 PM", "3 PM - 4 PM", "4 PM - 5 PM", "5 PM - 6 PM", "6 PM - 7 PM"],
  3: ["7 AM - 8 AM", "8 AM - 9 AM", "9 AM - 10 AM", "10 AM - 11 AM", "11 AM - 12 AM", "12 AM - 1 PM", "1 PM - 2 PM", "2 PM - 3 PM", "3 PM - 4 PM", "4 PM - 5 PM", "5 PM - 6 PM", "6 PM - 7 PM"],
  4: ["7 AM - 8 AM", "8 AM - 9 AM", "9 AM - 10 AM", "10 AM - 11 AM", "11 AM - 12 AM", "12 AM - 1 PM", "1 PM - 2 PM", "2 PM - 3 PM", "3 PM - 4 PM", "4 PM - 5 PM", "5 PM - 6 PM", "6 PM - 7 PM"],
  5: ["7 AM - 8 AM", "8 AM - 9 AM", "9 AM - 10 AM", "10 AM - 11 AM", "11 AM - 12 AM", "12 AM - 1 PM", "1 PM - 2 PM", "2 PM - 3 PM", "3 PM - 4 PM", "4 PM - 5 PM", "5 PM - 6 PM", "6 PM - 7 PM"],
  6: ["7 AM - 8 AM", "8 AM - 9 AM", "9 AM - 10 AM", "10 AM - 11 AM", "11 AM - 12 AM", "12 AM - 1 PM", "1 PM - 2 PM", "2 PM - 3 PM", "3 PM - 4 PM", "4 PM - 5 PM", "5 PM - 6 PM", "6 PM - 7 PM"],
  7: ["7 AM - 8 AM", "8 AM - 9 AM", "9 AM - 10 AM", "10 AM - 11 AM", "11 AM - 12 AM", "12 AM - 1 PM", "1 PM - 2 PM", "2 PM - 3 PM", "3 PM - 4 PM", "4 PM - 5 PM", "5 PM - 6 PM", "6 PM - 7 PM"],
};

export function TimeSlotSection({ selectedDate }: any) {
  const timeSlots = timeSlotData[selectedDate] || [];
  const [selectedIndices, setSelectedIndices] = React.useState<number[]>([]);
  const router = useRouter();


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
    const selectedTimeSlots = selectedIndices.map(i => timeSlots[i]);

    const queryString = new URLSearchParams({
      date: selectedDate,
      timeSlots: JSON.stringify(selectedTimeSlots),
    }).toString();

    router.push(`${paths.admin.createbook}?${queryString}`);
  };

  return (
    <div>
      <div className="px-3 my-10 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
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
      </div>

      <div className="flex items-center justify-between pb-10 px-4">
        <div className="flex items-center gap-2 w-full">
          <div className="flex items-center gap-2">
            <div className="bg-white border h-5 w-5 rounded-md"></div>
            Available
          </div>
          <div className="flex items-center gap-2">
            <div className="bg-blue-600 border h-5 w-5 rounded-md"></div>
            Selected
          </div>
        </div>

        <button
          onClick={handleContinueClick}
          className="bg-green-600 hover:bg-green-500 text-white px-5 py-2 rounded-md"
        >
          Continue
        </button>
      </div>
    </div>
  );
}
