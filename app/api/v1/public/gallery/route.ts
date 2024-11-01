import connectMongo from "@/lib/connectMongo";
import { NextResponse } from "next/server";
import FutsalProfile from "@/models/Users/FutsalProfile";
import Gallery from "@/models/Gallery/Gallery";

export const dynamic = "force-dynamic";

export const GET = async () => {
  console.log("Running GET request:Public Get Futsal Gallery");
  await connectMongo();

  try {
    const currentFutsal = await FutsalProfile.findOne({ subdomain: "test" });

    const gallery = await Gallery.find({
      linkedUserId: currentFutsal.linkedUserId,
    });

    return NextResponse.json(gallery, { status: 201 });
  } catch (error) {
    console.log(error);
    return NextResponse.json(
      { error: "Invalid request body" },
      { status: 400 }
    );
  }
};
