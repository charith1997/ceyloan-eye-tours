import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const reviewApi = createApi({
  reducerPath: "reviewApi",
  baseQuery: fetchBaseQuery({ baseUrl: process.env.NEXT_PUBLIC_API_BASE_URL }),
  endpoints: (builder) => ({
    // Get all reviews
    getAllReviews: builder.query<any, void>({
      query: () => "/reviews/get-all",
    }),
  }),
});

export const {
  useGetAllReviewsQuery,
} = reviewApi;