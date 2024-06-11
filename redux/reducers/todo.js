"use client";
import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const todoApi = createApi({
  reducerPath: "todoApi",
  baseQuery: fetchBaseQuery({
    baseUrl: `${process.env.NEXT_PUBLIC_FRONTEND_URL}/api/`,
    credentials: "include",
  }),
  tagTypes: ["Todos"],
  endpoints: (builder) => ({
    getUserTodos: builder.query({
      query: () => `todo`,
      providesTags: ["Todos"],
    }),
    addTodo: builder.mutation({
      query: (body) => {
        return {
          url: `todo`,
          method: "POST",
          body,
        };
      },
      invalidatesTags:['Todos']
    }),
    deleteTodo: builder.mutation({
      query: (body) => {
        return {
          url: `todo`,
          method: "DELETE",
          body,
        };
      },
      invalidatesTags: ["Todos"],
    }),
  }),
});

export const {
  useGetUserTodosQuery,
  useAddTodoMutation,
  useDeleteTodoMutation,
} = todoApi;
