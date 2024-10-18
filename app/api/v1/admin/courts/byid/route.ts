import { currentUser } from "@/lib/auth";
import connectMongo from "@/lib/connectMongo";
import Bookings from "@/models/Bookings/Bookings";
import Courts from "@/models/Courts/Courts";
import { NextRequest, NextResponse } from "next/server";
import { format } from "date-fns";
import { bookingStatusTypes } from "@/lib/constants";


export const GET = async (request: NextRequest) => {
  console.log("Running GET request:Admin Get Court by id");
  const user = await currentUser();

  const { searchParams } = new URL(request.url);
  const _id = searchParams.get("id");

  try {
    await connectMongo();
    if (user?.role === "admin") {
      const court = await Courts.findOne({ _id, linkedUserId: user.id });
      if (!court) {
        return NextResponse.json(
          { message: "Court Not Found" },
          { status: 404 }
        );
      }
      const allBookings = await Bookings.find({
        linkedCourtId: court._id,
      });

      // Group the bookings by date and booking status
      const groupedBookingsByDay = allBookings.reduce((acc: any, booking) => {
        // Get the local date for each booking (formatted as "YYYY-MM-DD")
        const bookingDate = format(new Date(booking.selectedDate), 'yyyy-MM-dd');

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

      const response = {
        ...court.toObject(), // Convert court document to plain object
        bookings: groupedBookingsByDay, // Attach the grouped bookings by day and status to the court
      };

      return NextResponse.json(response, { status: 201 });
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
