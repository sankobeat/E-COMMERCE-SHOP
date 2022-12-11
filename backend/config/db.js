import mongoose from "mongoose";
import Order from "../models/orderModel.js";
const connectDB = async () => {
  try {
    const connect = await mongoose.connect(process.env.MONGO_URI);
    console.log(`mongodb is connected ${connect.connection.host}`);
  } catch (error) {
    console.log(error.message);
    process.exit(1);
  }
};

export default connectDB;
