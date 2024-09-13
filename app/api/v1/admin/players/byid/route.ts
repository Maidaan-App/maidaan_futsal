import { currentUser } from "@/lib/auth";
import connectMongo from "@/lib/connectMongo";
import Players from "@/models/Users/Players";
import { NextRequest, NextResponse } from "next/server";

export const GET = async (request: NextRequest) => {
  console.log("Running GET request:Admin Get Player by id");
  const user = await currentUser();

  const { searchParams } = new URL(request.url);
  const _id = searchParams.get("id");

  try {
    await connectMongo();
    if (user.role === "admin") {
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
        return NextResponse.json(player, { status: 200 });
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
