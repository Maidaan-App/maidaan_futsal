import { Schema, model, models, Model } from "mongoose";

const reportSchema = new Schema(
  {
    linkedPlayerId: {
      type: Schema.Types.ObjectId,
      ref: "User",
    },
    linkedFutsalId: {
      type: Schema.Types.ObjectId,
      ref: "User",
    },
    category: String,
    description: String,
    reportedDate: Date,
  },
  { strict: false }
);

let PlayerReports: Model<any>;
try {
  PlayerReports =
    models.PlayerReports ||
    model("PlayerReports", reportSchema, "PlayerReports");
} catch (error) {
  PlayerReports = model("PlayerReports", reportSchema, "PlayerReports");
}

export default PlayerReports;
