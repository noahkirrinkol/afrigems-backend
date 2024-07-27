import dotenv from "dotenv";
import mongoose from "mongoose";

dotenv.config();

const MONGODB_URI: string | undefined = process.env.MONGODB_URI;

async function connectDB() {
  try {
    if (MONGODB_URI) {
      await mongoose.connect(MONGODB_URI);

      console.log("DB connected successfully.");
    } else {
      console.log("MONGODB_URI is undefined");
    }
  } catch (error) {
    console.error("Error encoutered when connecting to DB.", error);
  }
}

export default connectDB;
