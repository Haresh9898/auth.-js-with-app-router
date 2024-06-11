"use client";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import { useDeleteTodoMutation } from "@/redux/reducers/todo";
import { Trash2 } from "lucide-react";
import { toast } from "./ui/use-toast";
import { useEffect } from "react";

const Todo = ({ title, id }) => {
  const [deleteTodo, { isError, data, isLoading, error, isSuccess }] =
    useDeleteTodoMutation();

  useEffect(() => {
    if (isError) {
      toast({
        title: error.data || 'Failed to delete todo.',
        variant: "destructive",
      });
    } else if (isSuccess) {
      toast({
        title: data.message,
        variant: "success",
      });
    }
  }, [isError, isSuccess]);

  return (
    <AlertDialog>
      <div className="p-3 border flex items-center justify-between shadow-md rounded-md">
        <h1>{title}</h1>

        <AlertDialogTrigger
          // onClick={() =>
          //   startTransition(async () => {
          //     const result = await deleteTodo(id);
          //     if (result.success) {
          //       toast({
          //         title: result.message,
          //         variant: "success",
          //       });
          //     } else {
          //       toast({
          //         title: result.message,
          //         variant: "destructive",
          //       });
          //     }
          //   })
          // }
          variant="icon"
          className="text-red-500"
        >
          <Trash2 />
        </AlertDialogTrigger>
        <TodoAlertDialog
          deleteTodo={deleteTodo}
          _id={id}
          isLoading={isLoading}
        />
      </div>
    </AlertDialog>
  );
};

export default Todo;

function TodoAlertDialog({ deleteTodo, isLoading, _id }) {
  return (
    <AlertDialogContent>
      <AlertDialogHeader>
        <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
        <AlertDialogDescription>
          This action cannot be undone.
        </AlertDialogDescription>
      </AlertDialogHeader>
      <AlertDialogFooter>
        <AlertDialogCancel>Cancel</AlertDialogCancel>
        <AlertDialogAction
          onClick={async () => {
            await deleteTodo({ _id });
          }}
        >
          Continue
        </AlertDialogAction>
      </AlertDialogFooter>
    </AlertDialogContent>
  );
}
