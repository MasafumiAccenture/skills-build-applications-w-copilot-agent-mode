import mongoose, { Schema } from 'mongoose';

export interface UserDocument {
  name: string;
  email: string;
  team: string;
  role: string;
  createdAt: Date;
}

export interface TeamDocument {
  name: string;
  description: string;
  members: mongoose.Types.ObjectId[];
}

export interface ActivityDocument {
  user: mongoose.Types.ObjectId;
  type: string;
  duration: number;
  caloriesBurned: number;
  date: Date;
}

export interface LeaderboardEntryDocument {
  user: mongoose.Types.ObjectId;
  rank: number;
  score: number;
  weeklyPoints: number;
}

export interface WorkoutDocument {
  name: string;
  duration: number;
  difficulty: string;
  focusArea: string;
}

const UserSchema = new Schema<UserDocument>({
  name: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  team: { type: String, required: true },
  role: { type: String, required: true },
  createdAt: { type: Date, default: () => new Date() }
});

const TeamSchema = new Schema<TeamDocument>({
  name: { type: String, required: true },
  description: { type: String, required: true },
  members: [{ type: Schema.Types.ObjectId, ref: 'User', required: true }]
});

const ActivitySchema = new Schema<ActivityDocument>({
  user: { type: Schema.Types.ObjectId, ref: 'User', required: true },
  type: { type: String, required: true },
  duration: { type: Number, required: true },
  caloriesBurned: { type: Number, required: true },
  date: { type: Date, required: true }
});

const LeaderboardEntrySchema = new Schema<LeaderboardEntryDocument>({
  user: { type: Schema.Types.ObjectId, ref: 'User', required: true },
  rank: { type: Number, required: true },
  score: { type: Number, required: true },
  weeklyPoints: { type: Number, required: true }
});

const WorkoutSchema = new Schema<WorkoutDocument>({
  name: { type: String, required: true },
  duration: { type: Number, required: true },
  difficulty: { type: String, required: true },
  focusArea: { type: String, required: true }
});

export const User = mongoose.model<UserDocument>('User', UserSchema);
export const Team = mongoose.model<TeamDocument>('Team', TeamSchema);
export const Activity = mongoose.model<ActivityDocument>('Activity', ActivitySchema);
export const LeaderboardEntry = mongoose.model<LeaderboardEntryDocument>('LeaderboardEntry', LeaderboardEntrySchema);
export const Workout = mongoose.model<WorkoutDocument>('Workout', WorkoutSchema);
