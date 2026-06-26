import { Schema, model } from "mongoose";

const leaderboardSchema = new Schema(
  {
    userEmail: { type: String, required: true, lowercase: true, trim: true },
    points: { type: Number, required: true, min: 0 },
    rank: { type: Number, required: true, min: 1 }
  },
  { versionKey: false }
);

export const Leaderboard = model("Leaderboard", leaderboardSchema);
