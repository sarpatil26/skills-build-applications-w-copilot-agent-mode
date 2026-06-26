import { Router } from "express";
import { isDatabaseConnected } from "../config/database";
import { Activity } from "../models/Activity";

const router = Router();

router.get("/", async (_req, res) => {
  if (!isDatabaseConnected()) {
    res.json([]);
    return;
  }

  const activities = await Activity.find().sort({ completedAt: -1 }).lean();
  res.json(activities);
});

export default router;
