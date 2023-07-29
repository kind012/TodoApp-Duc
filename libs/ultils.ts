import mongoose from "mongoose";

let cachedConnection: typeof mongoose | null = null;

const connectMongoDB = async () => {
  if (cachedConnection) {
    return cachedConnection;
  }

  try {
    cachedConnection = await mongoose.connect(
      process.env.MONGODB_URL_CONNECT as string
    );
    console.log("Connected to MongoDB.");
    return cachedConnection;
  } catch (error) {
    console.error(error);
    throw error;
  }
};

export default connectMongoDB;
