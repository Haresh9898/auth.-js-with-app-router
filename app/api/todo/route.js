import authConfig from "@/auth.config";
import { connectToDb, throwError } from "@/lib/utils";
import Todo from "@/models/Todos";
import NextAuth from "next-auth";
import { NextResponse } from "next/server";

const {auth} = NextAuth(authConfig)

export const GET = async (request) => {
  try {
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

export const DELETE = async (request) => {
  try {
    const body = await request.json();
    console.log("api bpdy-", body);
    if (!body._id) {
      return NextResponse.json(
        {
          success: false,
          message: "Id is required",
        },
        { status: 400 }
      );
    }
    await connectToDb();
    await Todo.findByIdAndDelete(body._id);
    return NextResponse.json(
      {
        success: true,
        message: "Todo deleted.",
      },
      { status: 200 }
    );
  } catch (error) {
    console.log("delele todo errro=======", error);
  }
};

export const PUT = async (request) => {
  const body = await request.json();
  if (!body._id || !body.title) {
    throwError("All fields are required", 400);
  }
  await connectToDb();
  const todo = await Todo.findOne({ _id });
  if (!todo) {
    throwError("Todo not found.", 404);
  }
  todo.title = body.title;
  await todo.save();
  return NextResponse.json(
    {
      success: true,
      message: "Todo updated.",
    },
    { status: 200 }
  );
};
