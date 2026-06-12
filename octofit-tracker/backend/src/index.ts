import express from 'express';
import mongoose from 'mongoose';
import { Activity, LeaderboardEntry, Team, User, Workout } from './models';
import { connectDatabase, getDatabaseUrl } from './config/database';

const app = express();
const PORT = process.env.PORT || 8000;
const codespaceName = process.env.CODESPACE_NAME;
const apiBaseUrl = codespaceName
  ? `https://${codespaceName}-8000.app.github.dev`
  : 'http://localhost:8000';

app.use(express.json());

app.get('/health', async (_req, res) => {
  const [userCount, teamCount, activityCount, leaderboardCount, workoutCount] = await Promise.all([
    User.countDocuments(),
    Team.countDocuments(),
    Activity.countDocuments(),
    LeaderboardEntry.countDocuments(),
    Workout.countDocuments()
  ]);

  res.json({
    status: 'ok',
    apiBaseUrl,
    counts: { userCount, teamCount, activityCount, leaderboardCount, workoutCount }
  });
});

app.get('/api/users/', async (_req, res) => {
  const users = await User.find().lean();
  res.json(users);
});

app.get('/api/teams/', async (_req, res) => {
  const teams = await Team.find().populate('members', 'name email').lean();
  res.json(teams);
});

app.get('/api/activities/', async (_req, res) => {
  const activities = await Activity.find().populate('user', 'name email').lean();
  res.json(activities);
});

app.get('/api/leaderboard/', async (_req, res) => {
  const leaderboard = await LeaderboardEntry.find().populate('user', 'name email').sort({ rank: 1 }).lean();
  res.json(leaderboard);
});

app.get('/api/workouts/', async (_req, res) => {
  const workouts = await Workout.find().lean();
  res.json(workouts);
});

connectDatabase()
  .then(() => {
    console.log(`Connected to MongoDB at ${getDatabaseUrl()}`);
    console.log(`API base URL is ${apiBaseUrl}`);
    app.listen(PORT, () => console.log(`Server listening on ${PORT}`));
  })
  .catch((err) => {
    console.error('MongoDB connection error', err);
    process.exit(1);
  });
