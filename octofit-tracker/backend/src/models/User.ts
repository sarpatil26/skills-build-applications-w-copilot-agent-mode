import { Schema, model } from "mongoose";

const userSchema = new Schema(
  {
    name: { type: String, required: true, trim: true },
    email: { type: String, required: true, unique: true, lowercase: true, trim: true },
    level: { type: String, required: true },
    goals: [{ type: String, required: true }],
    joinedAt: { type: Date, default: Date.now }
  },
  { versionKey: false }
);

export const User = model("User", userSchema);
