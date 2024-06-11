"use client";
import Loader from "@/components/Loader";
import Todo from "@/components/Todo";
import { toast } from "@/components/ui/use-toast";
import {
  useAddTodoMutation,
  useGetUserTodosQuery,
} from "@/redux/reducers/todo";
import { useFormik } from "formik";
import { useEffect } from "react";
import * as Yup from "yup";

const page = () => {
  const { isLoading, isError, data } = useGetUserTodosQuery("");

  const [
    addTodo,
    {
      isLoading: submitLoading,
      isError: submitIsError,
      error: submitError,
      data: submitData,
      isSuccess: submitSuccess,
    },
  ] = useAddTodoMutation();

  const formik = useFormik({
    initialValues: {
      title: "",
    },
    validationSchema: Yup.object({
      title: Yup.string().required("Title is reqired"),
    }),
    onSubmit: async (data) => {
      await addTodo(data);
      if (submitIsError) {
        toast({
          title: submitError.data.message,
          variant: "destructive",
        });
      }
      formik.resetForm();
    },
  });

  useEffect(() => {
    if (isError) {
      toast({
        title: "Falied to fetch todos",
        variant: "destructive",
      });
    } else if (submitSuccess) {
      toast({
        title: submitData.message,
        variant: "success",
      });
    }
  }, [isError, submitSuccess]);

  if (isLoading) {
    return (
      <div className="w-full h-screen items-center flex justify-center   gap-5">
        <Loader />
      </div>
    );
  }
  return (
    <div className="container ">
      <div className="md:w-1/2 mx-auto">
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
            {submitLoading ? <Loader /> : "Submit"}
          </button>
        </form>
        {/* Todos */}
        <div className="w-full flex flex-col gap-5">
          {!data?.todos?.length ? (
            <div className="w-full  items-center flex justify-center   gap-5">
              <h1>Todos not found,Please start adding todo</h1>
            </div>
          ) : (
            data?.todos?.length &&
            data.todos.map((res) => {
              return <Todo key={res._id} id={res._id} title={res.title} />;
            })
          )}
        </div>
      </div>
    </div>
  );
};

export default page;
