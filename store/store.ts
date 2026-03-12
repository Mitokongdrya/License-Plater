import { configureStore } from "@reduxjs/toolkit";
import progressReducer from "./progressSlice";

export const store = configureStore({
  reducer: {
    progress: progressReducer,
  },
});

// Infer types from the store for use throughout the app
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
