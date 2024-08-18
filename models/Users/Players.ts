import { Schema, model, models, Model } from "mongoose";

const playerSchema = new Schema(
  {
    linkedUserId: {
      type: Schema.Types.ObjectId,
      ref: "Users",
      required: [true, "Linked user ID is required"],
    },
    name: String,
    image: String,
    phone: String,
    email: {
      type: String,
      required: [true, "Email is required"],
      unique: true,
    },
    address: String,
    createdAt: {
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
