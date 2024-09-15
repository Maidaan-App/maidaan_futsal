import { Schema, model, models, Model } from "mongoose";

const authConfigSchema = new Schema(
  {
    bannerImage: String,
    createdDate: {
      type: Date,
      default: Date.now(),
    },
  },
  { strict: false }
);

let AuthConfiguration: Model<any>;
try {
  AuthConfiguration = models.AuthConfiguration || model("AuthConfiguration", authConfigSchema, "AuthConfiguration");
} catch (error) {
  AuthConfiguration = model("AuthConfiguration", authConfigSchema, "AuthConfiguration");
}

export default AuthConfiguration;
