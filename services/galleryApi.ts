import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const galleryApi = createApi({
  reducerPath: "galleryApi",
  baseQuery: fetchBaseQuery({ baseUrl: process.env.NEXT_PUBLIC_API_BASE_URL }),
  tagTypes: ["Gallery"],
  endpoints: (builder) => ({
    // Get all gallery items
    getAllGalleryItems: builder.query<any, void>({
      query: () => "/gallery/get-all",
      providesTags: ["Gallery"],
    }),
    getAllApprovedGalleryItems: builder.query<any, void>({
      query: () => "/gallery/get-all-approved",
      providesTags: ["Gallery"],
    }),
    updateGalleryStatus: builder.mutation<
      any,
      { id: string; data: { isApproved: boolean } }
    >({
      query: ({ id, data }) => ({
        url: `/gallery/${id}`,
        method: "PUT",
        body: data,
      }),
      invalidatesTags: ["Gallery"],
    }),
    deleteGalleryImage: builder.mutation<any, string>({
      query: (id) => ({
        url: `/gallery/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: ["Gallery"],
    }),
  }),
});

export const {
  useGetAllGalleryItemsQuery,
  useGetAllApprovedGalleryItemsQuery,
  useUpdateGalleryStatusMutation,
  useDeleteGalleryImageMutation,
} = galleryApi;
