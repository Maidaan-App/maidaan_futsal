import { Schema, model, models, Model } from "mongoose";

const detailSchema = {
  title: String,
  isAvailable: Boolean,
};

const amenitiesSchema = new Schema(
  {
    linkedUserId: {
      type: Schema.Types.ObjectId,
      ref: "User",
    },
    amenities: [detailSchema],
    createdDate: {
      type: Date,
      default: Date.now(),
    },
  },
  { strict: false }
);

let Amenities: Model<any>;
try {
  Amenities =
    models.Amenities || model("Amenities", amenitiesSchema, "Amenities");
} catch (error) {
  Amenities = model("Amenities", amenitiesSchema, "Amenities");
}

export default Amenities;
