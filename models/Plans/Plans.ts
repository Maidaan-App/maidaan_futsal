import { Schema, model, models, Model } from "mongoose";

const plansSchema = new Schema(
  {
    image: String,
    name: String,
    price: String,
    month: String,
    createdDate: {
      type: Date,
      default: Date.now(),
    },
  },
  { strict: false }
);

let Plans: Model<any>;
try {
  Plans = models.Plans || model("Plans", plansSchema, "Plans");
} catch (error) {
  Plans = model("Plans", plansSchema, "Plans");
}

export default Plans;
