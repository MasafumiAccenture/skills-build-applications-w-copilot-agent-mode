"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = __importDefault(require("mongoose"));
const models_1 = require("../models");
const MONGO_URL = process.env.MONGO_URL || 'mongodb://localhost:27017/octofit_db';
async function seed() {
    console.log('Seed the octofit_db database with test data');
    await mongoose_1.default.connect(MONGO_URL);
    console.log(`Connected to MongoDB at ${MONGO_URL}`);
    await Promise.all([
        models_1.User.deleteMany({}),
        models_1.Team.deleteMany({}),
        models_1.Activity.deleteMany({}),
        models_1.LeaderboardEntry.deleteMany({}),
        models_1.Workout.deleteMany({})
    ]);
    const users = await models_1.User.create([
        { name: 'Alex Green', email: 'alex.green@example.com', team: 'Team Nova', role: 'Member' },
        { name: 'Taylor Brooks', email: 'taylor.brooks@example.com', team: 'Team Pulse', role: 'Captain' },
        { name: 'Jordan Lee', email: 'jordan.lee@example.com', team: 'Team Nova', role: 'Coach' }
    ]);
    const teams = await models_1.Team.create([
        { name: 'Team Nova', description: 'A high-energy performance team focused on speed and endurance.', members: [users[0]._id, users[2]._id] },
        { name: 'Team Pulse', description: 'A community-focused team built around strength and recovery.', members: [users[1]._id] }
    ]);
    const workouts = await models_1.Workout.create([
        { name: 'Full Body Blast', duration: 40, difficulty: 'Intermediate', focusArea: 'Total body' },
        { name: 'Core Strength', duration: 25, difficulty: 'Beginner', focusArea: 'Core' },
        { name: 'HIIT Sprint', duration: 30, difficulty: 'Advanced', focusArea: 'Cardio' }
    ]);
    const activities = await models_1.Activity.create([
        { user: users[0]._id, type: 'Running', duration: 35, caloriesBurned: 320, date: new Date('2026-06-09T08:30:00Z') },
        { user: users[1]._id, type: 'Cycling', duration: 45, caloriesBurned: 510, date: new Date('2026-06-09T10:00:00Z') },
        { user: users[2]._id, type: 'Yoga', duration: 50, caloriesBurned: 220, date: new Date('2026-06-08T18:15:00Z') }
    ]);
    const leaderboardEntries = await models_1.LeaderboardEntry.create([
        { user: users[0]._id, rank: 1, score: 240, weeklyPoints: 98 },
        { user: users[1]._id, rank: 2, score: 205, weeklyPoints: 85 },
        { user: users[2]._id, rank: 3, score: 192, weeklyPoints: 78 }
    ]);
    console.log('Seed complete:');
    console.log(`  users: ${users.length}`);
    console.log(`  teams: ${teams.length}`);
    console.log(`  workouts: ${workouts.length}`);
    console.log(`  activities: ${activities.length}`);
    console.log(`  leaderboard entries: ${leaderboardEntries.length}`);
    await mongoose_1.default.disconnect();
    console.log('Disconnected from MongoDB');
}
seed().catch((error) => {
    console.error('Seed script failed', error);
    process.exit(1);
});
