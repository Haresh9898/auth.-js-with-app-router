"use server";

import { auth } from "@/app/auth";
import { connectToDb } from "@/lib/utils";
import User from "@/models/User";
import { NextResponse } from "next/server";

export const getUserProfile = async () => {
  const { user: sessionUser } = await auth();
  await connectToDb();
  const user = await User.findOne({ _id: sessionUser?.id });
  if (!user || user == null) {
    return NextResponse.json(
      {
        message: "User not found",
      },
      { status: 404 }
    );
  }
  return user;
};
