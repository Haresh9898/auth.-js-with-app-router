"use server";

import { signIn } from "../auth";
import { connectToDb } from "@/lib/utils";
import User from "@/models/User";
import bcrypt from "bcryptjs";

export const login = async ({ email, password }) => {
  try {
    console.log('login kar le===========');
    await signIn("credentials", {
      email,
      password,
      redirect: false,
    });
    return {
        success: true,
        message: 'Login successfully',
      };
  } catch (error) {
    console.log('Login err-r=============',error.message);
    return {
      success: false,
      message: error.message,
    };
  }
};

export const signup = async ({ email, password, education, name }) => {
  try {
    await connectToDb();
    console.log("hello comr----------signup");
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
