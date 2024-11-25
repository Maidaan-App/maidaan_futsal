import { currentUser } from "@/lib/auth";
import connectMongo from "@/lib/connectMongo";
import { bookingStatusTypes, BUCKET_NAME } from "@/lib/constants";
import minioClient from "@/lib/minioClient";
import Bookings from "@/models/Bookings/Bookings";
import Courts from "@/models/Courts/Courts";
import { NextResponse, NextRequest } from "next/server";
import { format } from "date-fns";
import Players from "@/models/Users/Players";

export const POST = async (request: NextRequest) => {
  console.log("Running POST request: Admin Add/Update Court");
  const user = await currentUser();

  try {
    const Data = await request.json();
    await connectMongo();

    if (user?.role === "admin") {
      const existingDoc = await Courts.findOne({
        _id: Data?._id,
        linkedUserId: user.id,
      });
      if (existingDoc) {
        //check if image has been changed or not if yes delete previous one
        if (existingDoc.image && existingDoc.image != Data.image) {
          await minioClient.removeObject(BUCKET_NAME, existingDoc.image);
        }
        await existingDoc.updateOne(Data);
        return NextResponse.json({ message: "Court Updated" }, { status: 201 });
      } else {
        const newDoc = new Courts({ ...Data, linkedUserId: user.id });
        await newDoc.save();
        return NextResponse.json(
          { message: "New Court Added" },
          { status: 201 }
        );
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

export const GET = async () => {
  console.log("Running GET request: Admin Get all Courts");
  const user = await currentUser();

  try {
    await connectMongo();
    if (user?.role === "admin") {
      const courts = await Courts.find({
        linkedUserId: user.id,
        status: true,
      }).sort({
        createdDate: -1,
      });

      const courtsWithGroupedBookings = await Promise.all(
        courts.map(async (court) => {
          // Fetch all bookings for the current court
          const allBookings = await Bookings.find({
            linkedCourtId: court._id,
          });

          // Group the bookings by date and booking status, including player details
          const groupedBookingsByDay = await allBookings.reduce(
            async (accPromise, booking) => {
              const acc = await accPromise; // Resolve accumulator

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

              // Fetch player details using linkedUserId from each booking
              const player = await Players.findOne({
                linkedUserId: booking.linkedUserId,
              });

              // Include the player information in the booking object
              const bookingWithPlayer = {
                ...booking.toObject(),
                player: player ? player.toObject() : null, // Convert player to a plain object
              };

              // Push the booking with player details to the appropriate status group for that date
              acc[bookingDate][booking.status].push(bookingWithPlayer);

              return acc;
            },
            Promise.resolve({})
          );

          return {
            ...court.toObject(), // Convert court document to plain object
            bookings: groupedBookingsByDay, // Attach the grouped bookings by day and status to the court
          };
        })
      );

      return NextResponse.json(courtsWithGroupedBookings, { status: 201 });
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

export const DELETE = async (request: NextRequest) => {
  console.log("Running DELETE request: Admin DELETE Court by id");
  const user = await currentUser();

  try {
    await connectMongo();
    const { searchParams } = new URL(request.url);
    const _id = searchParams.get("id");

    if (user?.role === "admin") {
      const exisitingDoc = await Courts.findOne({ _id, linkedUserId: user.id });
      if (!exisitingDoc) {
        return NextResponse.json(
          { message: "No Court Found" },
          { status: 404 }
        );
      }
      await Courts.updateOne({ _id }, { $set: { status: false } });
      // await Courts.deleteOne({ _id });
      // if (exisitingDoc.image != null) {
      //   await minioClient.removeObject(BUCKET_NAME, exisitingDoc.image);
      // }
      return NextResponse.json({ message: "Court Deleted" }, { status: 201 });
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
