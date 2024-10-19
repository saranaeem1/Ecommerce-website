import mongoose from "mongoose";

const userSchema = new mongoose.Schema(
  {
    googleId: {
      type: String, 
      required: false, 
    },
    name: {
      type: String,
      required: false,
      trim: true,
    },
    email: {
      type: String,
      required: false,
      unique: true,
    },
    password: {
      type: String,
      required: false, // Optional for OAuth users
    },
    phone: {
      type: String,
      required: false,
    },
    address: {
      type: String, // Change type to String if applicable
      required: false,
    },
    answer: {
      type: String,
      required: false,
    },
    role: {
      type: Number,
      default: 0,
    },
  },
  { timestamps: true }
);

export default mongoose.model("users", userSchema);
