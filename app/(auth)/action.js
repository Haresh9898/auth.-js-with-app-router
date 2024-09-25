"use server";

import { connectToDb } from "@/lib/utils";
import User from "@/models/User";
import bcrypt from "bcryptjs";
import { signIn } from "../auth";

export const login = async ({ email, password }) => {
  try {
    await signIn("credentials", {
      email,
      password,
      redirect: false,
    });
    return {
      success: true,
      message: "Login successfully",
    };
  } catch (error) {
    return {
      success: false,
      message: error.message,
    };
  }
};

export const signup = async ({ email, password, education, name }) => {
  try {
    await connectToDb();
    const hashedPassword = await bcrypt.hash(password, 10);
    const user = await User.findOne({ email });
    if (user) {
      return {
        message: "User already exist",
        success: false,
      };
    }
    await User.create({
      email,
      password: hashedPassword,
      name,
      education,
    });

    return {
      message: "Register successfully",
      success: true,
    };
  } catch (error) {
    console.log("Error while signup------", error);
    return {
      message: error.message,
      success: false,
    };
  }
};


