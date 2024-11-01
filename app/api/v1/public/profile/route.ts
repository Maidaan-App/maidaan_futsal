import connectMongo from "@/lib/connectMongo";
import { NextResponse } from "next/server";
import FutsalProfile from "@/models/Users/FutsalProfile";

export const dynamic = "force-dynamic";

export const GET = async () => {
  console.log("Running GET request:Public Get Futsal Profile");
  await connectMongo();

  try {
    const currentFutsal = await FutsalProfile.findOne({ subdomain: "test" });

    return NextResponse.json(currentFutsal, { status: 201 });
  } catch (error) {
    console.log(error);
    return NextResponse.json(
      { error: "Invalid request body" },
      { status: 400 }
    );
  }
};
