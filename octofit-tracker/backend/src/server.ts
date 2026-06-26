import express from "express";
import { getApiBaseUrl } from "./config/baseUrl";
import { connectToDatabase } from "./config/db";
import activitiesRouter from "./routes/activities";
import leaderboardRouter from "./routes/leaderboard";
import teamsRouter from "./routes/teams";
import usersRouter from "./routes/users";
import workoutsRouter from "./routes/workouts";

const app = express();
const port = 8000;
const apiBaseUrl = getApiBaseUrl();

app.use(express.json());

app.get("/health", (_req, res) => {
  res.json({ status: "ok" });
});

app.get("/api", (_req, res) => {
  res.json({
    baseUrl: apiBaseUrl,
    routes: [
      `${apiBaseUrl}/api/users/`,
      `${apiBaseUrl}/api/teams/`,
      `${apiBaseUrl}/api/activities/`,
      `${apiBaseUrl}/api/leaderboard/`,
      `${apiBaseUrl}/api/workouts/`
    ]
  });
});

app.use("/api/users", usersRouter);
app.use("/api/teams", teamsRouter);
app.use("/api/activities", activitiesRouter);
app.use("/api/leaderboard", leaderboardRouter);
app.use("/api/workouts", workoutsRouter);

const startServer = async (): Promise<void> => {
  await connectToDatabase();

  app.listen(port, () => {
    console.log(`Octofit backend listening at ${apiBaseUrl}`);
  });
};

startServer().catch((error: unknown) => {
  console.error("Failed to start Octofit backend", error);
  process.exit(1);
});
