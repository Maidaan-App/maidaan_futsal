import { currentUser } from "@/lib/auth";
import connectMongo from "@/lib/connectMongo";
import Bookings from "@/models/Bookings/Bookings";
import Players from "@/models/Users/Players";
import User from "@/models/Users/User";
import { NextResponse } from "next/server";

export const GET = async () => {
  console.log("Running GET request: Admin Get all My Players");

  const user = await currentUser();
  try {
    await connectMongo();

    if (user?.role === "admin") {
      // Step 1: Find users who are linked to the current user's futsal
      const usersWhoAddedPlayers = await User.find({ linkedFutsalId: user.id });
      const userIdsWhoAddedPlayers = usersWhoAddedPlayers.map(u => u._id.toString());

      // Step 2: Find players added by these users
      const playersAddedByLinkedUsers = await Players.find({
        linkedUserId: { $in: userIdsWhoAddedPlayers },
      });

      // Step 3: Find players who have at least one booking in the current user's futsal
      const bookingsInUserFutsal = await Bookings.find({ linkedFutsalId: user.id });
      const playersWithBookingsIds = bookingsInUserFutsal.map(booking => booking.linkedUserId.toString());

      // Step 4: Merge results by creating a set of unique player IDs
      const allPlayerIds = new Set([
        ...playersAddedByLinkedUsers.map(player => player._id.toString()),
        ...playersWithBookingsIds,
      ]);

      // Step 5: Fetch all players with the combined unique IDs
      const players = await Players.find({ _id: { $in: Array.from(allPlayerIds) } }).sort({
        createdDate: -1,
      });

      return NextResponse.json(players, { status: 200 });
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
