import { Schema, model, models, Model } from "mongoose";

const logoConfigSchema = new Schema(
  {
    logo: String,
    createdDate: {
      type: Date,
      default: Date.now(),
    },
  },
  { strict: false }
);

let LogoConfiguration: Model<any>;
try {
  LogoConfiguration = models.LogoConfiguration || model("LogoConfiguration", logoConfigSchema, "LogoConfiguration");
} catch (error) {
  LogoConfiguration = model("LogoConfiguration", logoConfigSchema, "LogoConfiguration");
}

export default LogoConfiguration;
