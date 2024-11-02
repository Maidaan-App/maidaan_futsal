import connectMongo from "@/lib/connectMongo";
import { NextResponse } from "next/server";
import FutsalProfile from "@/models/Users/FutsalProfile";
import Amenities from "@/models/Amenities/Amenities";

export const dynamic = "force-dynamic";

export const GET = async () => {
  console.log("Running GET request:Public Get Futsal Amenities");
  await connectMongo();

  try {
    const currentFutsal = await FutsalProfile.findOne({ subdomain: "test" });

    const amenities = await Amenities.findOne({
      linkedUserId: currentFutsal.linkedUserId,
    });

    return NextResponse.json(amenities, { status: 201 });
  } catch (error) {
    console.log(error);
    return NextResponse.json(
      { error: "Invalid request body" },
      { status: 400 }
    );
  }
};
