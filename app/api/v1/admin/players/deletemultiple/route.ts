import { currentUser } from "@/lib/auth";
import connectMongo from "@/lib/connectMongo";
import { BUCKET_NAME } from "@/lib/constants";
import minioClient from "@/lib/minioClient";
import Players from "@/models/Users/Players";
import User from "@/models/Users/User";
import { NextRequest, NextResponse } from "next/server";

export const DELETE = async (request: NextRequest) => {
  console.log("Running DELETE request: Admin DELETE Multiple Players by id");
  const user = await currentUser();

  try {
    await connectMongo();
    const { ids } = await request.json();

    if (user?.role === "admin") {
      const playersToDelete = await Players.find({
        _id: { $in: ids },
      }).populate({
        path: "linkedUserId",
        select: "linkedFutsalId",
      });

      // Filter players that are authorized for deletion
      const authorizedPlayersToDelete = playersToDelete.filter(
        (player) => player.linkedUserId?.linkedFutsalId.toString() === user.id
      );

      if (authorizedPlayersToDelete.length === 0) {
        return NextResponse.json(
          { message: "No authorized players to delete" },
          { status: 403 }
        );
      }

      // Delete authorized players
      await Players.deleteMany({
        _id: { $in: authorizedPlayersToDelete.map((player) => player._id) },
      });

      // Remove associated images and delete users
      for (const player of authorizedPlayersToDelete) {
        // Remove player image
        if (player.image != null) {
          await minioClient.removeObject(BUCKET_NAME, player.image);
        }
        // Delete the associated user
        await User.deleteOne({ _id: player.linkedUserId._id });
      }

      return NextResponse.json({ message: "Players Deleted" }, { status: 201 });
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
