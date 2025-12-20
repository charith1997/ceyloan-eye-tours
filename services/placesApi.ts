import { baseApi } from "./baseApi";

export const placesApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    // Get all places
    getAllPlaces: builder.query<any, void>({
      query: () => "/places/get-all",
      providesTags: ["Places"],
    }),
    getAllPlacesWithHotels: builder.query<any, void>({
      query: () => "/places/get-all-with-hotels",
    }),
    // Get place by ID
    getPlaceById: builder.query<any, string>({
      query: (id) => `/places/get-by-id/${id}`,
    }),
    // Create a new place
    createPlace: builder.mutation<any, FormData>({
      query: (formData) => ({
        url: "/places/add",
        method: "POST",
        body: formData,
      }),
      invalidatesTags: ["Places"],
    }),
    // Update an existing place
    updatePlace: builder.mutation<any, { id: string; data: any }>({
      query: ({ id, data }) => ({
        url: `/places/update/${id}`,
        method: "PUT",
        body: data,
      }),
      invalidatesTags: ["Places"],
    }),
    // Delete a place
    deletePlace: builder.mutation<any, string>({
      query: (id) => ({
        url: `/places/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: ["Places"],
    }),
    getPlaceByUrlPrefix: builder.query<any, string>({
      query: (slug) => `/places/get-by-urlprefix/${slug}`,
    }),
    getAllPlacesPaginated: builder.query<
      any,
      { page: number; size: number; search?: string }
    >({
      query: ({ page, size, search }) => {
        let url = `/places/get-all-paginated?page=${page}&size=${size}`;
        if (search) url += `&search=${search}`;
        return url;
      },
      providesTags: ["Places"],
    }),
    getAllPlacesWithHotelPaginated: builder.query<
      any,
      { page: number; size: number }
    >({
      query: ({ page, size }) => {
        let url = `/places/get-all-with-hotels-paginated?page=${page}&size=${size}`;
        return url;
      },
    }),
    getPlaceByUrlPrefixPaginated: builder.query<
      any,
      { slug: string; page: number; size: number }
    >({
      query: ({ slug, page, size }) => {
        let url = `/places/get-by-urlprefix/${slug}/paginated?page=${page}&size=${size}`;
        return url;
      },
    }),
  }),
});

export const {
  useGetAllPlacesQuery,
  useGetAllPlacesWithHotelsQuery,
  useGetPlaceByIdQuery,
  useCreatePlaceMutation,
  useUpdatePlaceMutation,
  useDeletePlaceMutation,
  useGetPlaceByUrlPrefixQuery,
  useGetAllPlacesWithHotelPaginatedQuery,
  useLazyGetAllPlacesWithHotelPaginatedQuery,
  useGetPlaceByUrlPrefixPaginatedQuery,
  useLazyGetPlaceByUrlPrefixPaginatedQuery,
  useGetAllPlacesPaginatedQuery,
  useLazyGetAllPlacesPaginatedQuery,
} = placesApi;
