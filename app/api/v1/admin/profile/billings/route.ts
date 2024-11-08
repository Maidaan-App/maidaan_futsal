import { currentUser } from "@/lib/auth";
import connectMongo from "@/lib/connectMongo";
import Billings from "@/models/Billings/Billings";
import Subscriptions from "@/models/Subscriptions/Subscriptions";
import { NextResponse, NextRequest } from "next/server";

export const POST = async (request: NextRequest) => {
  console.log("Running POST request: Admin Add/Update Billings");
  const user = await currentUser();

  try {
    const Data = await request.json();
    await connectMongo();

    if (user?.role === "admin") {
      const existingDoc = await Billings.findOne({
        linkedUserId: user.id,
      });
      if (existingDoc) {
        await existingDoc.updateOne(Data);
        return NextResponse.json(
          { message: "Billing Updated" },
          { status: 201 }
        );
      } else {
        const newDoc = new Billings({ ...Data, linkedUserId: user.id });
        await newDoc.save();
        return NextResponse.json(
          { message: "New Billing Added" },
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

export const GET = async (request: NextRequest) => {
  console.log("Running GET request:Admin Get My Billing");
  const user = await currentUser();

  try {
    await connectMongo();
    if (user?.role === "admin") {
      const doc = await Billings.findOne({ linkedUserId: user.id }) || {};

      const subscription = await Subscriptions.findOne({
        linkedUserId: user.id,
      });

      const response = {
        ...doc._doc,
        subscription: subscription || null,
      };

      return NextResponse.json(response, { status: 200 });
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
