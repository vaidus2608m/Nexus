import mongoose from "mongoose";

const connectDB = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URL);
    console.log("✅ Mongoose DB is connected sucessfully");
  } catch (error) {
    console.log("❌ Mongoose Connection Error:", error);
    process.exit(1);
  }
};

export {connectDB};
