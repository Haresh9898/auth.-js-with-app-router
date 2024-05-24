import { clsx } from "clsx";
import mongoose from "mongoose";
import { twMerge } from "tailwind-merge";
import bcrypt from "bcryptjs";
import User from "@/models/User";

export function cn(...inputs) {
  return twMerge(clsx(inputs));
}

export const connectToDb = async () => {
  try {
    const { connection } = await mongoose.connect(
      "mongodb://localhost:27017/next-auth"
    );
    console.log("DB connected: ", connection.host);
  } catch (error) {
    console.log("error while connecting db:", error);
  }
};

export const saltAndHashPassword = async (password, hashedPassword) => {
  try {
    const isMathced = await bcrypt.compare(password, hashedPassword);
    if (isMathced) {
      return true;
    }
    return false;
  } catch (error) {
    return false;
  }
};

export const getUserById = async (id) => {
  try {
    const user = await User.findById(id);
    if (!user) {
      return null;
    }
    return user;
  } catch (error) {
    return null;
  }
};
