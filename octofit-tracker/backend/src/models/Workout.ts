import { Schema, model } from "mongoose";

const workoutSchema = new Schema(
  {
    title: { type: String, required: true, trim: true },
    intensity: { type: String, required: true, trim: true },
    durationMinutes: { type: Number, required: true, min: 1 },
    focusArea: { type: String, required: true, trim: true },
    equipment: [{ type: String, required: true }]
  },
  { versionKey: false }
);

export const Workout = model("Workout", workoutSchema);
