"use client";
import { configureStore } from "@reduxjs/toolkit";
import { todoApi } from "./reducers/todo";
export const store = configureStore({
  reducer: {
    [todoApi.reducerPath]: todoApi.reducer,
  },
  middleware: (getDefaultMiddleware) => [
    ...getDefaultMiddleware(),
    todoApi.middleware,
  ],
});
