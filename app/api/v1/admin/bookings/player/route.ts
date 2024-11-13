// import { currentUser } from "@/lib/auth";
// import connectMongo from "@/lib/connectMongo";
// import { BOOKING } from "@/lib/types";
// import Bookings from "@/models/Bookings/Bookings";
// import Players from "@/models/Users/Players";
// import { NextResponse, NextRequest } from "next/server";

// export const GET = async (request: NextRequest) => {
//   console.log("Running GET request: Admin Get Player Bookings");
//   const user = await currentUser();

//   const { searchParams } = new URL(request.url);
//   const _id = searchParams.get("id");

//   try {
//     await connectMongo();
//     if (user?.role === "admin") {
//       const player = await Players.findOne({ _id }).populate({
//         path: "linkedUserId",
//         select: "linkedFutsalId",
//       });

//       if (!player) {
//         return NextResponse.json(
//           { message: "No Player Found" },
//           { status: 404 }
//         );
//       }

//       if (player.linkedUserId?.linkedFutsalId.toString() === user.id) {
//         const bookings = await Bookings.find({
//           linkedUserId: player.linkedUserId._id,
//           linkedFutsalId: user.id,
//         }).sort({
//           createdDate: -1,
//         });

//         const currentDate = new Date();

//         const localDateString = currentDate.toLocaleString();
//         console.log("currentDate in local time:", localDateString);

//         // If you only need the local time part
//         const localTimeString = currentDate.toLocaleTimeString();
//         console.log("currentTime in local time:", localTimeString);

//         // Construct `currentTime` in local time format
//         const localHours = currentDate.getHours();
//         const localTime = `${localHours.toString().padStart(2, "0")}:00 ${
//           localHours >= 12 ? "PM" : "AM"
//         }`;

//         // Set the time of `currentDate` to 00:00:00 to only compare dates
//         currentDate.setHours(0, 0, 0, 0);

//         const pastBookings: BOOKING[] = [];
//         const upcomingBookings: BOOKING[] = [];

//         for (const booking of bookings) {
//           const bookingDate = new Date(booking.selectedDate);
//           bookingDate.setHours(0, 0, 0, 0); // Set time to 00:00 for date-only comparison

//           if (bookingDate < currentDate) {
//             pastBookings.push(booking);
//           } else if (bookingDate.getTime() === currentDate.getTime()) {
//             // Compare time slots if the booking date is today
//             if (Array.isArray(booking.selectedslots)) {
//               const isPastSlot = booking.selectedslots.every((slot: any) => {
//                 // Extract start time from "HH:MM AM/PM - HH:MM AM/PM"
//                 const slotStartTime = slot.split(" - ")[0];
//                 return slotStartTime < localTime;
//               });

//               if (isPastSlot) {
//                 pastBookings.push(booking);
//               } else {
//                 upcomingBookings.push(booking);
//               }
//             } else {
//               upcomingBookings.push(booking);
//             }
//           } else {
//             upcomingBookings.push(booking);
//           }
//         }

//         console.log("pastBookings:", pastBookings);
//         console.log("upcomingBookings:", upcomingBookings);

//         const response = {
//           pastBookings,
//           upcomingBookings,
//         };

//         return NextResponse.json(response, { status: 201 });
//       } else {
//         return NextResponse.json({ message: "Forbidden" }, { status: 400 });
//       }
//     } else {
//       return NextResponse.json({ message: "Forbidden" }, { status: 400 });
//     }
//   } catch (error) {
//     console.log(error);
//     return NextResponse.json(
//       { error: "Invalid request body" },
//       { status: 400 }
//     );
//   }
// };


import { currentUser } from "@/lib/auth";
import connectMongo from "@/lib/connectMongo";
import { BOOKING } from "@/lib/types";
import Bookings from "@/models/Bookings/Bookings";
import Players from "@/models/Users/Players";
import { NextResponse, NextRequest } from "next/server";

export const GET = async (request: NextRequest) => {
  console.log("Running GET request: Admin Get Player Bookings");
  const user = await currentUser();

  const { searchParams } = new URL(request.url);
  const _id = searchParams.get("id");

  try {
    await connectMongo();
    if (user?.role === "admin") {
      const player = await Players.findOne({ _id }).populate({
        path: "linkedUserId",
        select: "linkedFutsalId",
      });

      if (!player) {
        return NextResponse.json(
          { message: "No Player Found" },
          { status: 404 }
        );
      }

      if (player.linkedUserId?.linkedFutsalId.toString() === user.id) {
        const bookings = await Bookings.find({
          linkedUserId: player.linkedUserId._id,
          linkedFutsalId: user.id,
        }).sort({
          createdDate: -1,
        });

        const currentDate = new Date();
        // Normalize currentDate to the start of the day (00:00:00)
        currentDate.setHours(0, 0, 0, 0);

        const pastBookings: BOOKING[] = [];
        const upcomingBookings: BOOKING[] = [];

        for (const booking of bookings) {
          const bookingDate = new Date(booking.selectedDate);
          // Normalize bookingDate to the start of the day (00:00:00)
          bookingDate.setHours(0, 0, 0, 0);

          if (bookingDate < currentDate) {
            pastBookings.push(booking);
          } else if (bookingDate.getTime() === currentDate.getTime()) {
            // Handle bookings on the current date
            const localTime = new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
            if (Array.isArray(booking.selectedslots)) {
              const isPastSlot = booking.selectedslots.every((slot: any) => {
                // Extract the start time from the slot (assuming format "HH:MM AM/PM - HH:MM AM/PM")
                const slotStartTime = slot.split(" - ")[0];
                return slotStartTime < localTime;
              });

              if (isPastSlot) {
                pastBookings.push(booking);
              } else {
                upcomingBookings.push(booking);
              }
            } else {
              upcomingBookings.push(booking);
            }
          } else {
            upcomingBookings.push(booking);
          }
        }

        console.log("pastBookings:", pastBookings);
        console.log("upcomingBookings:", upcomingBookings);

        const response = {
          pastBookings,
          upcomingBookings,
        };

        return NextResponse.json(response, { status: 201 });
      } else {
        return NextResponse.json({ message: "Forbidden" }, { status: 400 });
      }
    } else {
      return NextResponse.json({ message: "Forbidden" }, { status: 400 });
    }
  } catch (error) {
    console.log(error);
    return NextResponse.json(
      { error: "Invalid request body" },
      { status: 400 }
    );
  }
};

