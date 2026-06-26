import { Router } from "express";
import { isDatabaseConnected } from "../config/database";
import { Workout } from "../models/Workout";

const router = Router();

router.get("/", async (_req, res) => {
  if (!isDatabaseConnected()) {
    res.json([]);
    return;
  }

  const workouts = await Workout.find().sort({ title: 1 }).lean();
  res.json(workouts);
});

export default router;
