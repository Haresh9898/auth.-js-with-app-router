import { auth } from "@/app/auth";
import { connectToDb } from "@/lib/utils";
import Todo from "@/models/Todos";
import { NextResponse } from "next/server";

export const GET = async (request) => {
  try {
    const session = await auth();
    console.log("come============todo api");
    if (!session?.user) {
      return NextResponse.json(
        {
          success: false,
          message: "Please login to access this route",
        },
        { status: 401 }
      );
    }
    await connectToDb();
    const todos = await Todo.find({ user: session?.user?.id });
    return NextResponse.json(
      {
        success: true,
        todos,
      },
      { status: 200 }
    );
  } catch (error) {
    console.log(error);
    return NextResponse.json({ error: "Failed to fetch" }, { status: 500 });
  }
};

// Add todo
export const POST = async (request) => {
  try {
    const body = await request.json();
    if (!body.title) {
      return NextResponse.json(
        {
          success: false,
          message: "Title is required",
        },
        { status: 400 }
      );
    }
    const session = await auth();
    if (!session?.user) {
      return NextResponse.json(
        {
          success: false,
          message: "Please login to access this route",
        },
        { status: 401 }
      );
    }
    await connectToDb();
    await Todo.create({
      title: body.title,
      user: session.user?.id,
    });
    return NextResponse.json(
      {
        success: true,
        message: "Todo added.",
      },
      { status: 200 }
    );
  } catch (error) {
    console.log(error);
    return NextResponse.json({ error: "Failed to add todo." }, { status: 400 });
  }
};
