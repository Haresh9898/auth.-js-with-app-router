import { auth } from "@/app/auth";
import Todo from "@/models/Todos";
import { NextResponse } from "next/server";

export const GET = async (request) => {
  try {
    const { user } = await auth();
    const todos = await Todo.findByI(user?.id);
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
