import { Router } from "express";
import { isDatabaseConnected } from "../config/database";
import { Leaderboard } from "../models/Leaderboard";

const router = Router();

router.get("/", async (_req, res) => {
  if (!isDatabaseConnected()) {
    res.json([]);
    return;
  }

  const leaderboard = await Leaderboard.find().sort({ rank: 1 }).lean();
  res.json(leaderboard);
});

export default router;
