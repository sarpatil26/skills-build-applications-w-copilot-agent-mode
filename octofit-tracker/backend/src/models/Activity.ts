import { Schema, model } from "mongoose";

const activitySchema = new Schema(
  {
    userEmail: { type: String, required: true, lowercase: true, trim: true },
    type: { type: String, required: true, trim: true },
    durationMinutes: { type: Number, required: true, min: 1 },
    caloriesBurned: { type: Number, required: true, min: 1 },
    completedAt: { type: Date, required: true }
  },
  { versionKey: false }
);

export const Activity = model("Activity", activitySchema);
