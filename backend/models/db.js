const mongoose = require("mongoose");
const connectDB = async () => {
  try {
    const conn = mongoose.connect(process.env.MONGODB_URI);
    console.log("MongoDB connected successfully......");
  } catch (error) {
    console.log("MongoDB connection error!!!");
  }
};
module.exports = connectDB;
