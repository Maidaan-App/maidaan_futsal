import { userTypes } from "@/lib/constants";
import { Schema, model, models, Model } from "mongoose";

const Userchema = new Schema(
  {
    linkedFutsalId: {
      type: Schema.Types.ObjectId,
      ref: "User",
    },
    name: String,
    image: String,
    password: String,
    phone: {
      type: String,
      required: [true, "Phone is required"],
      unique: true,
    },
    email: String,
    userType: {
      type: String,
      enum: userTypes,
      default: "player",
    },
    status: {
      type: Boolean,
      default: false,
    },
    createdDate: {
      type: Date,
      default: Date.now(),
    },
    setupPasswordToken: String,
    forgotPasswordToken: String,
    forgotPasswordTokenExpiry: Date,
    verifyToken: String,
    verifyTokenExpiry: Date,
  },
  { strict: false }
);

let User: Model<any>;
try {
  User = models.User || model("User", Userchema, "User");
} catch (error) {
  User = model("User", Userchema, "User");
}

export default User;
