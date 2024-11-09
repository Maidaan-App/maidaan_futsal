import { currentUser } from "@/lib/auth";
import connectMongo from "@/lib/connectMongo";
import Bookings from "@/models/Bookings/Bookings";
import Players from "@/models/Users/Players";
import User from "@/models/Users/User";
import { NextResponse, NextRequest } from "next/server";

export const POST = async (request: NextRequest) => {
  console.log("Running POST request: Admin Add/Update Booking");
  const user = await currentUser();

  try {
    const Data = await request.json();
    await connectMongo();

    if (user?.role === "admin") {
      const existingDoc = await Bookings.findOne({
        _id: Data?._id,
        linkedFutsalId: user.id,
      });
      if (existingDoc) {
        if (Data.playerId) {
          const existingPlayer = await Players.findOne({ _id: Data.playerId });
          if (!existingPlayer) {
            return NextResponse.json(
              { message: "Player Not Found" },
              { status: 404 }
            );
          }
          await existingDoc.updateOne(Data);
        } else {
          const existingPhone = await User.findOne({ phone: Data.phone });
          if (existingPhone) {
            return NextResponse.json(
              { message: "User with that Phone Number Exists" },
              { status: 400 }
            );
          }
          const userData = {
            linkedFutsalId: user.id,
            name: Data.name,
            phone: Data.phone,
            userType: "player",
          };
          const newUser = new User({ ...userData });
          const playerData = {
            linkedUserId: newUser._id,
            name: Data.name,
            phone: Data.phone,
            status: "enrolled",
          };
          const newPlayer = new Players({ ...playerData });
          await newUser.save();
          await newPlayer.save();

          const bookingData = {
            ...Data,
            linkedUserId: newUser._id,
          };
          await existingDoc.updateOne(bookingData);
        }

        return NextResponse.json(
          { message: "Booking Updated" },
          { status: 201 }
        );
      } else {
        //check for new user
        if (Data.playerId) {
          const existingPlayer = await Players.findOne({ _id: Data.playerId });
          if (!existingPlayer) {
            return NextResponse.json(
              { message: "Player Not Found" },
              { status: 404 }
            );
          }
          const newDoc = new Bookings({
            linkedFutsalId: user.id,
            linkedUserId: existingPlayer.linkedUserId,
            linkedCourtId: Data.linkedCourtId,
            selectedDate: Data.selectedDate,
            selectedslots: Data.selectedslots,
            status: Data.bookingStatus,
            remarks: Data.remarks,
            slotsTotal: Data.slotsTotal,
            netTotal: Data.netTotal,
          });
          await newDoc.save();
          return NextResponse.json(
            { message: "New Booking Added" },
            { status: 201 }
          );
        } else {
          const existingPhone = await User.findOne({ phone: Data.phone });
          if (existingPhone) {
            return NextResponse.json(
              { message: "User with that Phone Number Exists" },
              { status: 400 }
            );
          }
          const userData = {
            linkedFutsalId: user.id,
            name: Data.name,
            phone: Data.phone,
            userType: "player",
          };
          const newUser = new User({ ...userData });
          const playerData = {
            linkedUserId: newUser._id,
            name: Data.name,
            phone: Data.phone,
            status: "enrolled",
          };
          const newPlayer = new Players({ ...playerData });

          const newBooking = new Bookings({
            linkedFutsalId: user.id,
            linkedUserId: newUser._id,
            linkedCourtId: Data.linkedCourtId,
            selectedDate: Data.selectedDate,
            selectedslots: Data.selectedslots,
            status: Data.bookingStatus,
            remarks: Data.remarks,
            slotsTotal: Data.slotsTotal,
            netTotal: Data.netTotal,
          });
          await newUser.save();
          await newPlayer.save();
          await newBooking.save();
          return NextResponse.json(
            { message: "New Booking Added" },
            { status: 201 }
          );
        }
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
  console.log("Running GET request: Admin Get all Bookings");
  const user = await currentUser();

  try {
    await connectMongo();
    if (user?.role === "admin") {
      const bookings = await Bookings.find({ linkedFutsalId: user.id }).sort({
        createdDate: -1,
      });

      const bookingsWithPlayerDetails = await Promise.all(
        bookings.map(async (booking) => {
          const player = await Players.findOne({
            linkedUserId: booking.linkedUserId,
          }).select("name image phone _id");

          if (player) {
            const { _id, ...rest } = player.toObject();
            return {
              ...booking.toObject(),
              ...rest,
              playerId: _id,
            };
          }

          return {
            ...booking.toObject(),
          };
        })
      );

      return NextResponse.json(bookingsWithPlayerDetails, { status: 201 });
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
