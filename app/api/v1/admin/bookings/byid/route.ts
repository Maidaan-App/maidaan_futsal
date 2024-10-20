import { currentUser } from "@/lib/auth";
import connectMongo from "@/lib/connectMongo";
import Bookings from "@/models/Bookings/Bookings";
import { NextRequest, NextResponse } from "next/server";
import Players from "@/models/Users/Players";

export const GET = async (request: NextRequest) => {
  console.log("Running GET request:Admin Get Booking by id");
  const user = await currentUser();

  const { searchParams } = new URL(request.url);
  const _id = searchParams.get("id");

  try {
    await connectMongo();
    if (user?.role === "admin") {
      const booking = await Bookings.findOne({ _id, linkedFutsalId: user.id });
      if (!booking) {
        return NextResponse.json(
          { message: "Booking Not Found" },
          { status: 404 }
        );
      }

      const player = await Players.findOne({
        linkedUserId: booking.linkedUserId,
      }).select("name image phone _id");

      if (player) {
        const { _id, ...rest } = player.toObject();
        const response = {
          ...booking.toObject(),
          ...rest,
          playerId: _id,
        };
        return NextResponse.json(response, { status: 201 });
      } else {
        return NextResponse.json(
          { message: "Player Not Found" },
          { status: 404 }
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
