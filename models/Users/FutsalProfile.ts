import { Schema, model, models, Model } from "mongoose";

const socialLinksSchema = {
  facebook: String,
  instagram: String,
  linkedIn: String,
  twitter: String,
};

const futsalProfileSchema = new Schema(
  {
    linkedUserId: {
      type: Schema.Types.ObjectId,
      ref: "User",
    },
    subdomain: {
      type: String,
      required:[true, "Sub-Domain is required"],
      unique: true,
    },
    name: String,
    about: String,
    email: String,
    phone: String,
    address: String,
    mapLink: String,
    embeddMapLink: String,
    image: String,
    socialLinks: socialLinksSchema,
    createdDate: {
      type: Date,
      default: Date.now(),
    },
  },
  { strict: false }
);

let FutsalProfile: Model<any>;
try {
  FutsalProfile =
    models.FutsalProfile ||
    model("FutsalProfile", futsalProfileSchema, "FutsalProfile");
} catch (error) {
  FutsalProfile = model("FutsalProfile", futsalProfileSchema, "FutsalProfile");
}

export default FutsalProfile;
