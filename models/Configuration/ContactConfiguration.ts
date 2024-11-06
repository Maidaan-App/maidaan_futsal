import { Schema, model, models, Model } from "mongoose";

const contactConfigSchema = new Schema(
  {
    whatsappLink: String,
    phone: String,
    callSchedule: String,
    email: String,
    createdDate: {
      type: Date,
      default: Date.now(),
    },
  },
  { strict: false }
);

let ContactConfiguration: Model<any>;
try {
  ContactConfiguration = models.ContactConfiguration || model("ContactConfiguration", contactConfigSchema, "ContactConfiguration");
} catch (error) {
  ContactConfiguration = model("ContactConfiguration", contactConfigSchema, "ContactConfiguration");
}

export default ContactConfiguration;
