import { Schema, model, models, Model } from "mongoose";

const bookingSchema = new Schema(
  {
    linkedUserId: {
      type: Schema.Types.ObjectId,
      ref: "User",
    },
    linkedPlayerId: {
      type: Schema.Types.ObjectId,
      ref: "User",
    },
    name: String,
    image: String,
    openingTime: String,
    closingTime: String,
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

let Bookings: Model<any>;
try {
  Bookings = models.Bookings || model("Bookings", bookingSchema, "Bookings");
} catch (error) {
  Bookings = model("Bookings", bookingSchema, "Bookings");
}

export default Bookings;
