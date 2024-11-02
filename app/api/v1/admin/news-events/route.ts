import { currentUser } from "@/lib/auth";
import connectMongo from "@/lib/connectMongo";
import { BUCKET_NAME } from "@/lib/constants";
import { convertToSlug } from "@/lib/helper";
import minioClient from "@/lib/minioClient";
import NewsEvents from "@/models/NewsEvents/NewsEvents";
import { NextResponse, NextRequest } from "next/server";

export const POST = async (request: NextRequest) => {
  console.log("Running POST request: Admin Add/Update News Events");
  const user = await currentUser();

  try {
    const Data = await request.json();
    await connectMongo();

    if (user?.role === "admin") {
      const existingDoc = await NewsEvents.findOne({ _id: Data?._id });
      if (existingDoc) {
        const slug = convertToSlug(Data.title);
        if (slug !== existingDoc.slug) {
          Data.slug = slug;
          const existingSlug = await NewsEvents.findOne({ slug });
          if (existingSlug) {
            // Slug already exists, generate a unique slug
            let uniqueSlug = slug;
            let counter = 1;
            // Keep incrementing a counter and adding it to the slug until a unique one is found
            while (await NewsEvents.findOne({ slug: uniqueSlug })) {
              uniqueSlug = `${slug}-${counter}`;
              counter++;
            }
            // Now, uniqueSlug contains a slug that is not in use
            Data.slug = uniqueSlug;
          }
        }

        //check if image has been changed or not if yes delete previous one
        if (existingDoc.image && existingDoc.image != Data.image) {
          await minioClient.removeObject(BUCKET_NAME, existingDoc.image);
        }
        await existingDoc.updateOne(Data);
        return NextResponse.json({ message: "Updated" }, { status: 201 });
      } else {
        if (!Data.slug) {
          const slug = convertToSlug(Data.title);
          Data.slug = slug;
          const existingSlug = await NewsEvents.findOne({ slug });
          if (existingSlug) {
            // Slug already exists, generate a unique slug
            let uniqueSlug = slug;
            let counter = 1;
            // Keep incrementing a counter and adding it to the slug until a unique one is found
            while (await NewsEvents.findOne({ slug: uniqueSlug })) {
              uniqueSlug = `${slug}-${counter}`;
              counter++;
            }
            // Now, uniqueSlug contains a slug that is not in use
            Data.slug = uniqueSlug;
          }
        }

        const newDoc = new NewsEvents({ ...Data, linkedUserId: user.id });
        await newDoc.save();
        return NextResponse.json(
          { message: "New News Event Added" },
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

export const GET = async () => {
  console.log("Running GET request: Admin Get all NewsEvents");

  const user = await currentUser();
  try {
    await connectMongo();

    if (user?.role === "admin") {
      const docs = await NewsEvents.find({ linkedUserId: user.id }).sort({
        createdDate: -1,
      });

      return NextResponse.json(docs, { status: 200 });
    } else {
      return NextResponse.json({ message: "Forbidden" }, { status: 403 });
    }
  } catch (error) {
    console.log(error);
    return NextResponse.json(
      { error: "An error occurred while fetching news events" },
      { status: 500 }
    );
  }
};

export const DELETE = async (request: NextRequest) => {
  console.log("Running DELETE request: Admin DELETE News Event by id");
  const user = await currentUser();

  try {
    await connectMongo();
    const { searchParams } = new URL(request.url);
    const _id = searchParams.get("id");

    if (user?.role === "admin") {
      const exisitingDoc = await NewsEvents.findOne({
        _id,
        linkedUserId: user.id,
      });

      if (!exisitingDoc) {
        return NextResponse.json(
          { message: "No News Event Found" },
          { status: 404 }
        );
      }

      await NewsEvents.deleteOne({ _id, linkedUserId: user.id });
      if (exisitingDoc.image != null) {
        await minioClient.removeObject(BUCKET_NAME, exisitingDoc.image);
      }
      return NextResponse.json(
        { message: "News Event Deleted" },
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
