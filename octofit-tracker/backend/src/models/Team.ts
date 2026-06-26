import { Schema, model } from "mongoose";

const teamSchema = new Schema(
  {
    name: { type: String, required: true, trim: true },
    city: { type: String, required: true, trim: true },
    captain: { type: String, required: true, trim: true },
    members: [{ type: String, required: true }]
  },
  { versionKey: false }
);

export const Team = model("Team", teamSchema);
