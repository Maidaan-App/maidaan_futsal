import { Schema, model, models, Model } from "mongoose";

const Gallerychema = new Schema(
  {
    linkedUserId: {
      type: Schema.Types.ObjectId,
      ref: "User",
    },
    image: String,
    postedDate: {
      type: Date,
      default: Date.now(),
    },
  },
  { strict: false }
);

let Gallery: Model<any>;
try {
  Gallery = models.Gallery || model("Gallery", Gallerychema, "Gallery");
} catch (error) {
  Gallery = model("Gallery", Gallerychema, "Gallery");
}

export default Gallery;
