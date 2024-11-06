import { currentUser } from "@/lib/auth";
import connectMongo from "@/lib/connectMongo";
import { NextResponse, NextRequest } from "next/server";
import Plans from "@/models/Plans/Plans";

export const GET = async () => {
  console.log("Running GET request: Admin Get all Plans");
  const user = await currentUser();

  try {
    await connectMongo();
    if (user?.role === "admin") {
      const plans = await Plans.find().sort({
        createdDate: -1,
      });

      return NextResponse.json(plans, { status: 201 });
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
