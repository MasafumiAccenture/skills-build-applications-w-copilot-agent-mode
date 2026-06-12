import mongoose from 'mongoose';

const MONGO_URL = process.env.MONGO_URL || 'mongodb://localhost:27017/octofit_db';

export const connectDatabase = async () => {
  await mongoose.connect(MONGO_URL);
};

export const getDatabaseUrl = () => MONGO_URL;
