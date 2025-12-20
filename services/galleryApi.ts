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
    addGalleryImage: builder.mutation<any, FormData>({
      query: (data) => ({
        url: `/gallery/add`,
        method: "POST",
        body: data,
      }),
      invalidatesTags: ["Gallery"],
    }),
    getAllGalleryItemsPaginated: builder.query<
      any,
      { page: number; size: number; isApproved: boolean; search?: string }
    >({
      query: ({ page, size, isApproved, search }) => {
        let url = `/gallery/get-all-paginated?page=${page}&size=${size}`;
        if (isApproved) {
          url += `&isApproved=true`;
        } else {
          url += `&isApproved=false`;
        }
        if (search) url += `&search=${search}`;
        return url;
      },
      providesTags: ["Gallery"],
    }),
    getAllApprovedGalleryItemsPaginated: builder.query<
      any,
      { page: number; size: number }
    >({
      query: ({ page, size }) => {
        let url = `/gallery/get-all-approved-paginated?page=${page}&size=${size}`;
        return url;
      },
      providesTags: ["Gallery"],
    }),
  }),
});

export const {
  useGetAllGalleryItemsQuery,
  useGetAllApprovedGalleryItemsQuery,
  useUpdateGalleryStatusMutation,
  useDeleteGalleryImageMutation,
  useAddGalleryImageMutation,
  useGetAllGalleryItemsPaginatedQuery,
  useLazyGetAllGalleryItemsPaginatedQuery,
  useGetAllApprovedGalleryItemsPaginatedQuery,
  useLazyGetAllApprovedGalleryItemsPaginatedQuery,
} = galleryApi;
