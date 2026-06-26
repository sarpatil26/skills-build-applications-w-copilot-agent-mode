import { Router } from "express";
import { isDatabaseConnected } from "../config/database";
import { Team } from "../models/Team";

const router = Router();

router.get("/", async (_req, res) => {
  if (!isDatabaseConnected()) {
    res.json([]);
    return;
  }

  const teams = await Team.find().sort({ name: 1 }).lean();
  res.json(teams);
});

export default router;
