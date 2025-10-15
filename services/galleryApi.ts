import { baseApi } from "./baseApi";

export const galleryApi = baseApi.injectEndpoints({
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
