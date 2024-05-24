"use client";
import React, { useTransition } from "react";
import { Button } from "./ui/button";
import { Trash2 } from "lucide-react";
import { deleteTodo } from "@/app/todo/actions";
import { toast } from "./ui/use-toast";
import Loader from "./Loader";

const Todo = ({ title, id }) => {
  const [isPending, startTransition] = useTransition();

  return (
    <div className="p-3 border flex items-center justify-between shadow-md rounded-md">
      <h1>{title}</h1>

      <Button
        onClick={() =>
          startTransition(async () => {
            const result = await deleteTodo(id);
            if (result.success) {
              toast({
                title: result.message,
                variant: "success",
              });
            } else {
              toast({
                title: result.message,
                variant: "destructive",
              });
            }
          })
        }
        variant="icon"
        className="text-red-500"
      >
        {isPending ? <Loader /> : <Trash2 />}
      </Button>
    </div>
  );
};

export default Todo;
