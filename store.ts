import { configureStore } from "@reduxjs/toolkit";
import { authApi } from "./services/authApi";
import authReducer from "./features/authSlice";
import routingReducer from "./features/routingSlice";
import { categoryApi } from "./services/categoryApi";
import { activityApi } from "./services/activityApi";
import { packageApi } from "./services/packageApi";
import { placesApi } from "./services/placesApi";
import { hotelApi } from "./services/hotelApi";

export const store = configureStore({
  reducer: {
    [authApi.reducerPath]: authApi.reducer,
    [categoryApi.reducerPath]: categoryApi.reducer,
    [activityApi.reducerPath]: activityApi.reducer,
    [packageApi.reducerPath]: packageApi.reducer,
    [placesApi.reducerPath]: placesApi.reducer,
    [hotelApi.reducerPath]: hotelApi.reducer,
    auth: authReducer,
    routing: routingReducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware()
      .concat(categoryApi.middleware)
      .concat(activityApi.middleware)
      .concat(packageApi.middleware)
      .concat(authApi.middleware)
      .concat(placesApi.middleware)
      .concat(hotelApi.middleware),
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;