import mongoose from "mongoose";

export const connectMongoDB = async () => {
  try {
    await mongoose.connect(process.env.MONGODB_URL_CONNECT!);

    console.log("Connected to MongoDB.");
  } catch (error: any) {
    console.error("Database error: " + error.message);
    throw error;
  }
};
