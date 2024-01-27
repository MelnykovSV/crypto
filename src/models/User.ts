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
    phone: {
      type: String,
      default: null,
    },
    birthday: {
      type: Date,
      default: null,
    },
    avatar: {
      type: String,
      default: null,
    },
    password: { type: String, required: true },
  },
  { versionKey: false, timestamps: true }
);

// OUR TODO MODEL

export const User = mongoose.models.User || mongoose.model("User", UserSchema);
