import mongoose from "mongoose";

let isConnected: boolean = false;

export const connectToDatabase = async () => {
  mongoose.set("strictQuery", true);
  if (!process.env.MONGODB_URL) {
    return console.log("Missing Mongo DB URL");
  }
  if (isConnected) {
    return console.log("🚀 Mongo DB is connected:", isConnected);
  }

  try {
    await mongoose.connect(process.env.MONGODB_URL, {
      dbName: "devflow",
    });
    isConnected = true;
    return console.log("🚀 Mongo DB is connected:", isConnected);
  } catch (error) {
    return console.log("🚀 Mongo DB is not connected:", error);
  }
};
