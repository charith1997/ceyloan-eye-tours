import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const baseApi = createApi({
  reducerPath: "baseApi",
  baseQuery: fetchBaseQuery({
    baseUrl: `${process.env.NEXT_PUBLIC_API_BASE_URL}/api`,
    prepareHeaders: (headers) => {
      const token = localStorage.getItem("authToken");
      if (token) {
        headers.set("Authorization", `Bearer ${token}`);
      }
      return headers;
    },
  }),
  tagTypes: [
    "Activity",
    "Booking",
    "Category",
    "Custom Package",
    "Gallery",
    "Hotel",
    "HotelType",
    "Package",
    "PlaceActivities",
    "Places",
    "Vehicles",
  ],
  endpoints: () => ({}),
});
