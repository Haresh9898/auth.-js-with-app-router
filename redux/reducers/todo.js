"use client";
import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const todoApi = createApi({
  reducerPath: "todoApi",
  baseQuery: fetchBaseQuery({
    baseUrl: "http://localhost:3000/api/",
    credentials: "include",
  }),
  endpoints: (builder) => ({
    getUserTodos: builder.query({
      query: () => `todo`,
    }),
    addTodo: builder.mutation({
      query: (body) => {
        return {
          url: `todo`,
          method: "POST",
          body,
        };
      },
    }),
  }),
});

export const { useGetUserTodosQuery, useAddTodoMutation } = todoApi;
