import { Schema, model, models, Model } from "mongoose";

const courtSchema = new Schema(
  {
    name: String,
    image: String,

    status: {
      type: Boolean,
      default: true,
    },
    createdDate: {
      type: Date,
      default: Date.now(),
    },
    openingTime: String,
    closingTime: String,
  },
  { strict: false }
);

let Courts: Model<any>;
try {
  Courts = models.Courts || model("Courts", courtSchema, "Courts");
} catch (error) {
  Courts = model("Courts", courtSchema, "Courts");
}

export default Courts;
