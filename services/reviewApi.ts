import { baseApi } from "./baseApi";

export const reviewApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    getAllReviews: builder.query<any, void>({
      query: () => "/reviews/get-all",
    }),
  }),
});

export const { useGetAllReviewsQuery } = reviewApi;
