"use server";

import { auth } from "@/app/auth";
import { connectToDb } from "@/lib/utils";
import Todo from "@/models/Todos";
import { revalidatePath } from "next/cache";

export const addTodo = async (title) => {
  try {
    const { user } = await auth();
    await connectToDb();
    await Todo.create({
      title,
      user: user.id,
    });
    revalidatePath("/todo");
    return {
      success: true,
      message: "Todo created.",
    };
  } catch (error) {
    return {
      success: false,
      message: error.message,
    };
  }
};

export const getUserTodos = async () => {
    const { user } = await auth();
    await connectToDb();
    const todos = await Todo.find({ user: user?.id })
      .select("title")
      .sort({ createdAt: -1 });
    return todos;
};

export const deleteTodo = async (id) => {
  try {
    const { user } = await auth();
    if (user?.email) {
      await connectToDb();
      const todo = await Todo.findByIdAndDelete(id)
      if (!todo) {
        return {
          success: false,
          message: "Todo not found",
        };
      }
      return {
        success: true,
        message: "Todo deleted",
      };
    }
    throw new Error("Something happed wrong");
  } catch (error) {
    return {
      success: false,
      message: error.message,
    };
  }
};
