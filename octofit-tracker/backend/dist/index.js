"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const mongoose_1 = __importDefault(require("mongoose"));
const models_1 = require("./models");
const app = (0, express_1.default)();
const PORT = process.env.PORT || 8000;
const MONGO_URL = process.env.MONGO_URL || 'mongodb://localhost:27017/octofit_db';
const codespaceName = process.env.CODESPACE_NAME;
const apiBaseUrl = codespaceName
    ? `https://${codespaceName}-8000.app.github.dev`
    : 'http://localhost:8000';
app.use(express_1.default.json());
app.get('/health', async (_req, res) => {
    const [userCount, teamCount, activityCount, leaderboardCount, workoutCount] = await Promise.all([
        models_1.User.countDocuments(),
        models_1.Team.countDocuments(),
        models_1.Activity.countDocuments(),
        models_1.LeaderboardEntry.countDocuments(),
        models_1.Workout.countDocuments()
    ]);
    res.json({
        status: 'ok',
        apiBaseUrl,
        counts: { userCount, teamCount, activityCount, leaderboardCount, workoutCount }
    });
});
app.get('/api/users/', async (_req, res) => {
    const users = await models_1.User.find().lean();
    res.json(users);
});
app.get('/api/teams/', async (_req, res) => {
    const teams = await models_1.Team.find().populate('members', 'name email').lean();
    res.json(teams);
});
app.get('/api/activities/', async (_req, res) => {
    const activities = await models_1.Activity.find().populate('user', 'name email').lean();
    res.json(activities);
});
app.get('/api/leaderboard/', async (_req, res) => {
    const leaderboard = await models_1.LeaderboardEntry.find().populate('user', 'name email').sort({ rank: 1 }).lean();
    res.json(leaderboard);
});
app.get('/api/workouts/', async (_req, res) => {
    const workouts = await models_1.Workout.find().lean();
    res.json(workouts);
});
mongoose_1.default
    .connect(MONGO_URL)
    .then(() => {
    console.log(`Connected to MongoDB at ${MONGO_URL}`);
    console.log(`API base URL is ${apiBaseUrl}`);
    app.listen(PORT, () => console.log(`Server listening on ${PORT}`));
})
    .catch((err) => {
    console.error('MongoDB connection error', err);
    process.exit(1);
});
