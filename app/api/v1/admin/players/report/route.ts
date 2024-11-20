import { currentUser } from "@/lib/auth";
import connectMongo from "@/lib/connectMongo";
import PlayerReports from "@/models/PlayerReports/PlayerReports";
import Players from "@/models/Users/Players";
import { NextResponse, NextRequest } from "next/server";

export const POST = async (request: NextRequest) => {
  console.log("Running POST request: Admin Report Player");
  const user = await currentUser();

  try {
    const Data = await request.json();
    await connectMongo();

    if (user?.role === "admin") {
      const newDoc = new PlayerReports({
        ...Data,
        linkedFutsalId: user.id,
        reportedDate: Date.now(),
      });

      await newDoc.save();
      return NextResponse.json(
        { message: "Successfully Reported" },
        { status: 201 }
      );
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

export const GET = async (request: NextRequest) => {
  console.log("Running GET request: Admin Get all Player's Report");
  const user = await currentUser();
  const { searchParams } = new URL(request.url);
  const _id = searchParams.get("id");
  try {
    await connectMongo();
    if (user?.role === "admin") {
      const player = await Players.findOne({ _id });

      if (!player) {
        return NextResponse.json(
          { message: "No Player Found" },
          { status: 404 }
        );
      }
      const docs = await PlayerReports.find({
        linkedPlayerId: player.linkedUserId,
        linkedFutsalId: user.id,
      }).sort({
        reportedDate: -1,
      });

      return NextResponse.json(docs, { status: 200 });
    } else {
      return NextResponse.json({ message: "Forbidden" }, { status: 403 });
    }
  } catch (error) {
    console.log(error);
    return NextResponse.json({ error: "An error occurred" }, { status: 500 });
  }
};
