import { currentUser } from "@/lib/auth";
import connectMongo from "@/lib/connectMongo";
import { BUCKET_NAME } from "@/lib/constants";
import minioClient from "@/lib/minioClient";
import Players from "@/models/Users/Players";
import User from "@/models/Users/User";
import { NextResponse, NextRequest } from "next/server";

export const POST = async (request: NextRequest) => {
  console.log("Running POST request: Admin Add/Update Player");
  const user = await currentUser();

  try {
    const Data = await request.json();
    await connectMongo();

    if (user?.role === "admin") {
      const existingDoc = await Players.findOne({ _id: Data?._id });
      if (existingDoc) {
        //check if image has been changed or not if yes delete previous one
        if (existingDoc.image && existingDoc.image != Data.image) {
          await minioClient.removeObject(BUCKET_NAME, existingDoc.image);
        }
        await existingDoc.updateOne(Data);
        //also update on User side
        const existingUser = await User.findOne({
          linkedFutsalId: user.id,
          _id: existingDoc.linkedUserId,
        });

        if (existingUser) {
          await existingUser.updateOne({
            name: Data.name,
            image: Data.image,
            email: Data.email,
          });
        }
        return NextResponse.json(
          { message: "Profile Updated" },
          { status: 201 }
        );
      } else {
        const existingNumber = await User.findOne({ phone: Data.phone });
        if (existingNumber) {
          return NextResponse.json(
            { message: "User with that Phone Number already Exists" },
            { status: 400 }
          );
        }

        const newUser = new User({
          ...Data,
          linkedFutsalId: user.id,
          userType: "player",
          status: true,
        });
        const newPlayer = new Players({
          ...Data,
          linkedUserId: newUser._id,
          status: "enrolled",
        });
        await newUser.save();
        await newPlayer.save();
        return NextResponse.json(
          { message: "New Player Added" },
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
  console.log("Running GET request: Admin Get all Players");

  const user = await currentUser();
  try {
    await connectMongo();

    if (user?.role === "admin") {
      const players = await Players.find()
        .populate({
          path: "linkedUserId",
          match: { linkedFutsalId: user?.id },
          select: "_id",
        })
        .sort({
          createdDate: -1,
        });

      const filteredPlayers = players.filter(
        (player) => player.linkedUserId !== null
      );

      return NextResponse.json(filteredPlayers, { status: 200 });
    } else {
      return NextResponse.json({ message: "Forbidden" }, { status: 403 });
    }
  } catch (error) {
    console.log(error);
    return NextResponse.json(
      { error: "An error occurred while fetching players" },
      { status: 500 }
    );
  }
};

export const DELETE = async (request: NextRequest) => {
  console.log("Running DELETE request: Admin DELETE Player by id");
  const user = await currentUser();

  try {
    await connectMongo();
    const { searchParams } = new URL(request.url);
    const _id = searchParams.get("id");

    if (user?.role === "admin") {
      const exisitingDoc = await Players.findOne({ _id }).populate({
        path: "linkedUserId",
        select: "linkedFutsalId", // Only select linkedFutsalId to match
      });

      if (!exisitingDoc) {
        return NextResponse.json(
          { message: "No Player Found" },
          { status: 404 }
        );
      }

      // Check if the player's linked user has the same linkedFutsalId as the admin
      if (exisitingDoc.linkedUserId?.linkedFutsalId.toString() !== user.id) {
        return NextResponse.json(
          { message: "You are not authorized to delete this player" },
          { status: 403 }
        );
      }

      const linkedUserId = exisitingDoc.linkedUserId._id;

      await Players.deleteOne({ _id });
      // Delete the corresponding user from the User collection
      await User.deleteOne({ _id: linkedUserId });
      if (exisitingDoc.image != null) {
        await minioClient.removeObject(BUCKET_NAME, exisitingDoc.image);
      }
      return NextResponse.json({ message: "Player Deleted" }, { status: 201 });
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
