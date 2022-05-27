import mongoose from "mongoose";

// db connect
const connectDB = () => {
  mongoose.connect("mongodb://localhost:27017/chat", (err) => {
    if (!err) {
      console.log("MongoDB has connected successfully.");
    } else {
      console.log(err);
    }
  });
};

export default connectDB;
