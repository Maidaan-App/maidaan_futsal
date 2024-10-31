import { currentUser } from "@/lib/auth";
import connectMongo from "@/lib/connectMongo";
import { bookingStatusTypes, BUCKET_NAME } from "@/lib/constants";
import minioClient from "@/lib/minioClient";
import Bookings from "@/models/Bookings/Bookings";
import Courts from "@/models/Courts/Courts";
import { NextResponse, NextRequest } from "next/server";
import { format } from "date-fns";

export const dynamic = "force-dynamic";

export const GET = async () => {
  console.log("Running GET request:Public Get all Courts");
  const user = await currentUser();

  try {
    await connectMongo();
    const courts = await Courts.find({}).sort({
      createdDate: -1,
    });
    // Loop through each court and fetch its bookings
    const courtsWithGroupedBookings = await Promise.all(
      courts.map(async (court) => {
        // Fetch all bookings for the current court
        const allBookings = await Bookings.find({
          linkedCourtId: court._id,
        });

        // Group the bookings by date and booking status
        const groupedBookingsByDay = allBookings.reduce((acc: any, booking) => {
          // Get the local date for each booking (formatted as "YYYY-MM-DD")
          const bookingDate = format(
            new Date(booking.selectedDate),
            "yyyy-MM-dd"
          );

          // Initialize the date group if not present
          if (!acc[bookingDate]) {
            acc[bookingDate] = {};
            bookingStatusTypes.forEach((status) => {
              acc[bookingDate][status] = []; // Initialize arrays for each booking status
            });
          }

          // Push the booking to the appropriate status group for that date
          acc[bookingDate][booking.status].push(booking);

          return acc;
        }, {});

        return {
          ...court.toObject(), // Convert court document to plain object
          bookings: groupedBookingsByDay, // Attach the grouped bookings by day and status to the court
        };
      })
    );

    return NextResponse.json(courtsWithGroupedBookings, { status: 201 });
  } catch (error) {
    console.log(error);
    return NextResponse.json(
      { error: "Invalid request body" },
      { status: 400 }
    );
  }
};
