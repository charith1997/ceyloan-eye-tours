import { configureStore } from "@reduxjs/toolkit";
import { authApi } from "./services/authApi";
import { categoryApi } from "./services/categoryApi";
import { activityApi } from "./services/activityApi";
import { packageApi } from "./services/packageApi";
import { placesApi } from "./services/placesApi";
import { hotelApi } from "./services/hotelApi";
import { hotelTypeApi } from "./services/hotelTypeApi";
import { reviewApi } from "./services/reviewApi";
import { galleryApi } from "./services/galleryApi";
import { placeActivity } from "./services/placeActivity";
import authReducer from "./features/authSlice";
import { bookingApi } from "./services/bookingApi";

export const store = configureStore({
  reducer: {
    [authApi.reducerPath]: authApi.reducer,
    [categoryApi.reducerPath]: categoryApi.reducer,
    [activityApi.reducerPath]: activityApi.reducer,
    [packageApi.reducerPath]: packageApi.reducer,
    [placesApi.reducerPath]: placesApi.reducer,
    [hotelApi.reducerPath]: hotelApi.reducer,
    [hotelTypeApi.reducerPath]: hotelTypeApi.reducer,
    [reviewApi.reducerPath]: reviewApi.reducer,
    [galleryApi.reducerPath]: galleryApi.reducer,
    [placeActivity.reducerPath]: placeActivity.reducer,
    [bookingApi.reducerPath]: bookingApi.reducer,
    auth: authReducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware()
      .concat(categoryApi.middleware)
      .concat(activityApi.middleware)
      .concat(packageApi.middleware)
      .concat(authApi.middleware)
      .concat(placesApi.middleware)
      .concat(hotelApi.middleware)
      .concat(hotelTypeApi.middleware)
      .concat(reviewApi.middleware)
      .concat(galleryApi.middleware)
      .concat(placeActivity.middleware)
      .concat(bookingApi.middleware),
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
