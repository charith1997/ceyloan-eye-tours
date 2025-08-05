import { configureStore } from "@reduxjs/toolkit";
import { authApi } from "./services/authApi"; // <-- import your API slice
import authReducer from "./features/authSlice";

export const store = configureStore({
  reducer: {
    [authApi.reducerPath]: authApi.reducer, // <-- add API reducer
    auth: authReducer,
    // add other reducers here
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(authApi.middleware), // <-- add API middleware
});

// Types for use in your app
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;