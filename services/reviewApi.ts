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
    getPaginatedReviews: builder.query<any, { page: number; size: number }>({
      query: ({ page, size }) => {
        let url = `/reviews/get-all-paginated?page=${page}&size=${size}`;
        return url;
      },
    }),
  }),
});

export const {
  useGetAllReviewsQuery,
  useAddReviewMutation,
  useGetPaginatedReviewsQuery,
  useLazyGetPaginatedReviewsQuery,
} = reviewApi;
