import { RootState } from "@/store";
import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

const baseQuery = fetchBaseQuery({
  baseUrl: `${process.env.NEXT_PUBLIC_API_BASE_URL}/api`,
  // credentials: "include",
  prepareHeaders: (headers, { getState }) => {
    const store = getState() as RootState;

    const token = localStorage.getItem("authToken");
    if (token) {
      headers.set("Authorization", `Bearer ${token}`);
    }
    return headers;
  },
});

const baseQueryWithReauth = async (args: any, api: any, extraOptions: any) => {
  const result = await baseQuery(args, api, extraOptions);
  // Check for 401 Unauthorized
  if (result.error && result.error.status === 401) {
    window.location.href = "/login";
  }
  // Check for 403 Forbidden
  if (result.error && result.error.status === 403) {
    window.location.href = "/login";
  }
  return result;
};

export const baseApi = createApi({
  reducerPath: "baseApi",
  // baseQuery: fetchBaseQuery({
  //   baseUrl: `${process.env.NEXT_PUBLIC_API_BASE_URL}/api`,
  //   prepareHeaders: (headers) => {
  //     const token = localStorage.getItem("authToken");
  //     if (token) {
  //       headers.set("Authorization", `Bearer ${token}`);
  //     }
  //     return headers;
  //   },
  // }),
  baseQuery: baseQueryWithReauth,
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
    "User",
    "UserMessageCount",
  ],
  endpoints: () => ({}),
});
