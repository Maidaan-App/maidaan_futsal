import { Schema, model, models, Model } from "mongoose";

const SubscriptionsSchema = new Schema(
  {
    linkedUserId: {
      type: Schema.Types.ObjectId,
      ref: "User",
    },
    price: String,
    planName: String,
    subscribedDate: Date,
    expiryDate: Date,
    createdDate: {
      type: Date,
      default: Date.now(),
    },
  },
  { strict: false }
);

let Subscriptions: Model<any>;
try {
  Subscriptions = models.Subscriptions || model("Subscriptions", SubscriptionsSchema, "Subscriptions");
} catch (error) {
  Subscriptions = model("Subscriptions", SubscriptionsSchema, "Subscriptions");
}

export default Subscriptions;
