import { connectToDatabase, disconnectFromDatabase } from "../config/db";
import { Activity } from "../models/Activity";
import { Leaderboard } from "../models/Leaderboard";
import { Team } from "../models/Team";
import { User } from "../models/User";
import { Workout } from "../models/Workout";

const seed = async (): Promise<void> => {
  // Seed the octofit_db database with test data
  console.log("Seed the octofit_db database with test data");

  await connectToDatabase();

  await Promise.all([
    User.deleteMany({}),
    Team.deleteMany({}),
    Activity.deleteMany({}),
    Leaderboard.deleteMany({}),
    Workout.deleteMany({})
  ]);

  const users = [
    {
      name: "Maya Thompson",
      email: "maya@example.com",
      level: "Intermediate",
      goals: ["Run 5k under 28 minutes", "Improve core strength"]
    },
    {
      name: "Carlos Vega",
      email: "carlos@example.com",
      level: "Advanced",
      goals: ["Complete a triathlon", "Maintain weekly mileage"]
    },
    {
      name: "Priya Nair",
      email: "priya@example.com",
      level: "Beginner",
      goals: ["Build consistency", "Increase flexibility"]
    }
  ];

  const teams = [
    {
      name: "Stride Syndicate",
      city: "Seattle",
      captain: "Maya Thompson",
      members: ["maya@example.com", "priya@example.com"]
    },
    {
      name: "Iron Pulse",
      city: "Austin",
      captain: "Carlos Vega",
      members: ["carlos@example.com"]
    }
  ];

  const now = new Date();
  const activities = [
    {
      userEmail: "maya@example.com",
      type: "Tempo Run",
      durationMinutes: 42,
      caloriesBurned: 510,
      completedAt: new Date(now.getTime() - 1000 * 60 * 60 * 24)
    },
    {
      userEmail: "carlos@example.com",
      type: "Cycling Intervals",
      durationMinutes: 55,
      caloriesBurned: 690,
      completedAt: new Date(now.getTime() - 1000 * 60 * 60 * 36)
    },
    {
      userEmail: "priya@example.com",
      type: "Yoga Mobility",
      durationMinutes: 30,
      caloriesBurned: 180,
      completedAt: new Date(now.getTime() - 1000 * 60 * 60 * 8)
    }
  ];

  const leaderboardEntries = [
    { userEmail: "carlos@example.com", points: 1480, rank: 1 },
    { userEmail: "maya@example.com", points: 1325, rank: 2 },
    { userEmail: "priya@example.com", points: 920, rank: 3 }
  ];

  const workouts = [
    {
      title: "Power Endurance Circuit",
      intensity: "High",
      durationMinutes: 45,
      focusArea: "Full Body",
      equipment: ["Dumbbells", "Resistance Bands"]
    },
    {
      title: "Core + Mobility Flow",
      intensity: "Low",
      durationMinutes: 25,
      focusArea: "Core",
      equipment: ["Yoga Mat"]
    },
    {
      title: "Sprint Ladder Session",
      intensity: "Medium",
      durationMinutes: 35,
      focusArea: "Cardio",
      equipment: ["Track", "Timer"]
    }
  ];

  await Promise.all([
    User.insertMany(users),
    Team.insertMany(teams),
    Activity.insertMany(activities),
    Leaderboard.insertMany(leaderboardEntries),
    Workout.insertMany(workouts)
  ]);

  console.log("Seeding complete: users, teams, activities, leaderboard, workouts inserted.");

  await disconnectFromDatabase();
};

seed().catch(async (error: unknown) => {
  console.error("Seed failed", error);
  await disconnectFromDatabase();
  process.exit(1);
});
