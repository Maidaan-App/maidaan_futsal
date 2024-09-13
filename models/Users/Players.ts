import { statusTypes } from "@/lib/constants";
import { Schema, model, models, Model } from "mongoose";

const playerSchema = new Schema(
  {
    linkedUserId: {
      type: Schema.Types.ObjectId,
      ref: "User"
    },
    email: {
      type: String,
      required: [true, "Email is required"],
      unique: true,
    },
    name: String,
    image: String,
    phone: String,
    address: String,
    status: {
      type: String,
      enum: statusTypes,
      default: 'pending',
    },
    createdDate: {
      type: Date,
      default: Date.now(),
    },
  },
  { strict: false }
);

let Players: Model<any>;
try {
  Players =
    models.Players ||
    model("Players", playerSchema, "Players");
} catch (error) {
  Players = model(
    "Players",
    playerSchema,
    "Players"
  );
}

export default Players;
