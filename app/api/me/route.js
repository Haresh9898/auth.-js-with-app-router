import { connectToDb } from "@/lib/utils";
import User from "@/models/User";
import { NextResponse } from "next/server";

export const GET = async (request) => {
  const session = await auth();
  if (!session?.user) {
    return NextResponse.json(
      {
        success: false,
        message: "Please login to access this route",
      },
      {
        status: 401,
      }
    );
  }
  await connectToDb();
  try {
    const user = await User.findOne({ _id: session.user.id });
    if (!user) {
      return NextResponse.json(
        {
          success: false,
          message: "User not found.",
        },
        {
          status: 404,
        }
      );
    }
    return NextResponse.json(
      {
        success: true,
        user,
      },
      {
        status: 200,
      }
    );
  } catch (error) {
    console.log("come==========");
    return NextResponse.json(
      {
        error: "Something happend wrong",
      },
      {
        status: 500,
      }
    );
  }
};
