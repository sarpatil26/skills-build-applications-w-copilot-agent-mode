import mongoose from "mongoose";

const MONGO_URI = "mongodb://127.0.0.1:27017/octofit_db";

mongoose.set("bufferCommands", false);

export const connectToDatabase = async (): Promise<void> => {
  await mongoose.connect(MONGO_URI);
};

export const disconnectFromDatabase = async (): Promise<void> => {
  await mongoose.disconnect();
};

export const isDatabaseConnected = (): boolean => mongoose.connection.readyState === 1;

export { MONGO_URI };
