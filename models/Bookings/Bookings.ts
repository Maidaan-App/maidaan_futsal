import { bookingStatusTypes } from "@/lib/constants";
import { Schema, model, models, Model } from "mongoose";

const itemPurchasedSchema = {
  name: String,
  quantity: Number,
  price: Number,
};

const bookingSchema = new Schema(
  {
    linkedUserId: {
      type: Schema.Types.ObjectId,
      ref: "User",
    },
    linkedFutsalId: {
      type: Schema.Types.ObjectId,
      ref: "User",
    },
    linkedCourtId: {
      type: Schema.Types.ObjectId,
      ref: "Courts",
    },
    selectedDate: Date,
    selectedslots: [String],
    remarks: String,
    itemPurchased: [itemPurchasedSchema],
    discount: String,
    slotsTotal: String,
    netTotal: String,
    status: {
      type: String,
      enum: bookingStatusTypes,
      default: 'Reserved',
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
