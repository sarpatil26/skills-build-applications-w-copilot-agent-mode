import { Router } from "express";
import { isDatabaseConnected } from "../config/database";
import { User } from "../models/User";

const router = Router();

router.get("/", async (_req, res) => {
  if (!isDatabaseConnected()) {
    res.json([]);
    return;
  }

  const users = await User.find().sort({ joinedAt: -1 }).lean();
  res.json(users);
});

export default router;
