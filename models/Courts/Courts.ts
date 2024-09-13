import { Schema, model, models, Model } from "mongoose";

const shiftDetailSchema = {
  startTime: String,
  endTime: String,
  price: String,
};

const shiftSchema = {
  morningShift: shiftDetailSchema,
  dayShift: shiftDetailSchema,
  eveningShift: shiftDetailSchema,
  holidayShift: shiftDetailSchema,
};

const courtSchema = new Schema(
  {
    linkedUserId: {
      type: Schema.Types.ObjectId,
      ref: "User",
    },
    name: String,
    image: String,
    openingTime: String,
    closingTime: String,
    shifts: shiftSchema,
    status: {
      type: Boolean,
      default: true,
    },
    createdDate: {
      type: Date,
      default: Date.now(),
    },
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
