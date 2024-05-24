"use client";
import Todo from "@/components/Todo";
import { useFormik } from "formik";
import * as Yup from "yup";
import { addTodo, getUserTodos } from "./actions";
import { useEffect, useState, useTransition } from "react";
import { toast } from "@/components/ui/use-toast";
import Loader from "@/components/Loader";

const page = () => {
  const [isPending, startTransition] = useTransition();
  const [todos, setTodos] = useState([]);
  const [loading, setLoading] = useState(true);
  useEffect(() => {
    (async () => {
      try {
        const todos = await getUserTodos();
        setTodos(todos);
      } catch (error) {
      } finally {
        setLoading(false);
      }
    })();
  }, [isPending]);

  const formik = useFormik({
    initialValues: {
      title: "",
    },
    validationSchema: Yup.object({
      title: Yup.string().required("Title is reqired"),
    }),
    onSubmit: (data) => {
      startTransition(async () => {
        const result = await addTodo(data.title);
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
        formik.resetForm();
      });
    },
  });

  if (loading) {
    return (
      <div className="w-full h-screen items-center flex justify-center   gap-5">
        <Loader />
      </div>
    );
  }
  return (
    <div className="container ">
      <div className="w-1/2 mx-auto">
        <form onSubmit={formik.handleSubmit}>
          <input
            className={`p-5 border w-full ${
              formik.errors.title && formik.touched.title
                ? "border-red-500"
                : ""
            }`}
            type="text"
            name="title"
            value={formik.values.title}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            placeholder="Todo......."
          />
          {formik.errors.title && formik.touched.title && (
            <p className="text-red-500">{formik.errors.title}</p>
          )}
          <button className="bg-green-500 rounded-sm p-2 mx-auto my-5 text-white">
            {isPending ? <Loader /> : "Submit"}
          </button>
        </form>
        {/* Todos */}
        <div className="w-full flex flex-col gap-5">
          {todos?.length &&
            todos?.map((res) => {
              return <Todo key={res._id} id={res._id} title={res.title} />;
            })}
        </div>
      </div>
    </div>
  );
};

export default page;
