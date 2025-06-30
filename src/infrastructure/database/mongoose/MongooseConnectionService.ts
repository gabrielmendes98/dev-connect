import mongoose from 'mongoose';

export const connectToMongoDB = async () => {
  const mongoUrl = process.env.MONGO_DATABASE_URL;
  if (!mongoUrl) {
    console.error('MONGO_DATABASE_URL is not defined in .env');
    process.exit(1);
  }

  try {
    await mongoose.connect(mongoUrl);
  } catch (error) {
    console.error('[MONGO CONNECTION] Error when connecting to MongoDB');
    process.exit(1);
  }
};
