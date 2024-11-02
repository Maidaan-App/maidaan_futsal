import { Schema, model, models, Model } from "mongoose";

const newsEventsSchema = new Schema(
  {
    linkedUserId: {
      type: Schema.Types.ObjectId,
      ref: "User",
    },
    slug: String,
    title: String,
    image: String,
    description: String,
    status: {
      type: Boolean,
      default: true,
    },
    createdDate: {
      type: Date,
      default: Date.now(),
    },
  },
  { strict: false }
);

let NewsEvents: Model<any>;
try {
  NewsEvents =
    models.NewsEvents || model("NewsEvents", newsEventsSchema, "NewsEvents");
} catch (error) {
  NewsEvents = model("NewsEvents", newsEventsSchema, "NewsEvents");
}

export default NewsEvents;
