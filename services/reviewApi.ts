import { baseApi } from "./baseApi";

export const reviewApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    getAllReviews: builder.query<any, void>({
      query: () => "/reviews/get-all",
    }),
    addReview: builder.mutation<any, FormData>({
      query: (body) => ({
        url: "/reviews/add",
        method: "POST",
        body: body,
      }),
      invalidatesTags: ["Booking"],
    }),
  }),
});

export const { useGetAllReviewsQuery, useAddReviewMutation } = reviewApi;
