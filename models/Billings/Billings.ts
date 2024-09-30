import { Schema, model, models, Model } from "mongoose";

const billingsSchema = new Schema(
  {
    linkedUserId: {
      type: Schema.Types.ObjectId,
      ref: "User",
    },
    companyName: String,
    billingEmail: String,
    billingPhone: String,
    billingAddress: String,
    createdDate: {
      type: Date,
      default: Date.now(),
    },
  },
  { strict: false }
);

let Billings: Model<any>;
try {
  Billings = models.Billings || model("Billings", billingsSchema, "Billings");
} catch (error) {
  Billings = model("Billings", billingsSchema, "Billings");
}

export default Billings;
