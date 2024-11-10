import { currentUser } from "@/lib/auth";
import connectMongo from "@/lib/connectMongo";
import Bookings from "@/models/Bookings/Bookings";
import Players from "@/models/Users/Players";
import User from "@/models/Users/User";
import { NextResponse } from "next/server";

export const GET = async () => {
  console.log("Running GET request: Admin Get Dashboard");
  const user = await currentUser();
  try {
    await connectMongo();

    if (user?.role === "admin") {
      // Count Completed and Cancelled bookings
      const completedBookingsCount = await Bookings.countDocuments({
        linkedFutsalId: user.id,
        status: "Completed",
      });

      const cancelledBookingsCount = await Bookings.countDocuments({
        linkedFutsalId: user.id,
        status: "Cancelled",
      });

      const completedBookings = await Bookings.find({
        linkedFutsalId: user.id,
        status: "Completed",
      });

      // Calculate totalIncome by summing up netTotal from each booking
      const totalIncome = completedBookings.reduce((sum, booking) => {
        return sum + Number(booking.netTotal);
      }, 0);

      // Query for directly added players in User collection
      const directPlayers = await User.find({ linkedFutsalId: user.id })
        .select("_id")
        .lean();

      // Get linkedUserId from bookings in the futsal
      const bookingPlayers = await Bookings.find({ linkedFutsalId: user.id })
        .distinct("linkedUserId")
        .lean();

      // Combine both arrays and create a unique set of player IDs
      const allPlayersSet = new Set([
        ...directPlayers.map((player: any) => player._id.toString()),
        ...bookingPlayers.map((id) => id.toString()),
      ]);

      // Count of unique players
      const totalPlayers = allPlayersSet.size;

      const recentBookings = await Bookings.find({
        linkedFutsalId: user.id,
      })
        .sort({
          createdDate: -1,
        })
        .limit(6);

      const bookingsWithPlayerDetails = await Promise.all(
        recentBookings.map(async (booking) => {
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

      const currentYear = new Date().getFullYear();

      const thisYearCompletedBookings = await Bookings.find({
        linkedFutsalId: user.id,
        status: "Completed",
        createdDate: {
          $gte: new Date(`${currentYear}-01-01`),
          $lt: new Date(`${currentYear + 1}-01-01`),
        },
      }).select("netTotal createdDate");

      const monthNames = [
        "Jan",
        "Feb",
        "Mar",
        "Apr",
        "May",
        "Jun",
        "Jul",
        "Aug",
        "Sep",
        "Oct",
        "Nov",
        "Dec",
      ];

      const monthlyIncomeMap: any = {};

      // Iterate over the bookings and sum the netTotal for each month
      thisYearCompletedBookings.forEach((booking) => {
        const month = new Date(booking.createdDate).getMonth() + 1; // Get month (0-based index, so add 1)
        const netTotal = Number(booking.netTotal) || 0; // Convert netTotal to number and handle NaN as 0

        if (!monthlyIncomeMap[month]) {
          monthlyIncomeMap[month] = 0;
        }
        monthlyIncomeMap[month] += netTotal;
      });

      // Convert the map to an array of results for easier handling
      const monthlyIncome = Object.keys(monthlyIncomeMap).map((month) => ({
        _id: parseInt(month), // Month as a number
        monthlyIncome: monthlyIncomeMap[month],
      }));

      // Sort the results by month
      monthlyIncome.sort((a, b) => a._id - b._id);

      const monthlyIncomeFilled = Array.from({ length: 12 }, (_, i) => {
        const month = i + 1;
        const foundMonth = monthlyIncome.find((entry) => entry._id === month);
        return {
          month: monthNames[i], // Use month name instead of number
          monthlyIncome: foundMonth ? foundMonth.monthlyIncome : 0,
        };
      });

      const response = {
        completedBookingsCount,
        cancelledBookingsCount,
        totalIncome,
        totalPlayers,
        recentBookings:bookingsWithPlayerDetails,
        monthlyIncome: monthlyIncomeFilled,
      };

      return NextResponse.json(response, { status: 200 });
    } else {
      return NextResponse.json({ message: "Forbidden" }, { status: 403 });
    }
  } catch (error) {
    console.log(error);
    return NextResponse.json(
      { error: "An error occurred while fetching booking data" },
      { status: 500 }
    );
  }
};
