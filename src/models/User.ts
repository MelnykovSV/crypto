import mongoose from "mongoose";
import { userNameRegexp, emailRegexp, passwordRegexp } from "../../regexp";

const UserSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      trim: true,
      match: userNameRegexp,
      required: true,
      unique: true,
    },
    email: {
      type: String,
      trim: true,
      match: emailRegexp,
      required: true,
      unique: true,
    },
    password: { type: String, required: true },
    completed: Boolean,
  },
  { versionKey: false, timestamps: true }
);

// OUR TODO MODEL

export const User = mongoose.models.User || mongoose.model("User", UserSchema);
