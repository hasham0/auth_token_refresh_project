import mongoose from "mongoose";
import "dotenv/config";
const connectDB = async () => {
  try {
    const connect = await mongoose.connect(process.env.MONGO_DB_URL, {
      dbName: "AuthenticationProject",
    });
    return connect;
  } catch (error) {
    console.log(error);
    process.exit(1);
  }
};

export default connectDB;
