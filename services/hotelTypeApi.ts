import { baseApi } from "./baseApi";

export const hotelTypeApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    getAllHotelTypes: builder.query<any, void>({
      query: () => "/hotel-types/get-all",
      providesTags: ["HotelType"],
    }),
    getAllHotelTypesWithHotels: builder.query<any, void>({
      query: () => "/hotel-types/get-all-with-hotels",
    }),

    createHotelType: builder.mutation<any, FormData>({
      query: (formData) => ({
        url: "/hotel-types/add",
        method: "POST",
        body: formData,
      }),
      invalidatesTags: ["HotelType"],
    }),
    updateHotelType: builder.mutation<any, { id: string; data: any }>({
      query: ({ id, data }) => ({
        url: `/hotel-types/${id}`,
        method: "PUT",
        body: data,
      }),
      invalidatesTags: ["HotelType"],
    }),
    getHotelTypeByUrlPrefix: builder.query<any, string>({
      query: (slug) => `/hotel-types/get-by-urlprefix/${slug}`,
    }),

    deleteHotelType: builder.mutation<any, string>({
      query: (id) => ({
        url: `/hotel-types/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: ["HotelType"],
    }),
    getAllHotelTypesPaginated: builder.query<
      any,
      { page: number; size: number; search?: string }
    >({
      query: ({ page, size, search }) => {
        let url = `/hotel-types/get-all-paginated?page=${page}&size=${size}`;
        if (search) url += `&search=${search}`;
        return url;
      },
      providesTags: ["HotelType"],
    }),
    getAllHotelTypesWithHotelsPaginated: builder.query<
      any,
      { page: number; size: number }
    >({
      query: ({ page, size }) => {
        let url = `/hotel-types/get-all-with-hotels-paginated?page=${page}&size=${size}`;
        return url;
      },
    }),
    getHotelTypeByUrlPrefixPaginated: builder.query<
      any,
      { slug: string; page: number; size: number }
    >({
      query: ({ slug, page, size }) => {
        let url = `hotel-types/get-by-urlprefix-paginated/${slug}?page=${page}&size=${size}`;
        return url;
      },
    }),
  }),
});

export const {
  useGetAllHotelTypesQuery,
  useGetAllHotelTypesWithHotelsQuery,
  useCreateHotelTypeMutation,
  useUpdateHotelTypeMutation,
  useGetHotelTypeByUrlPrefixQuery,
  useDeleteHotelTypeMutation,
  useGetAllHotelTypesPaginatedQuery,
  useLazyGetAllHotelTypesPaginatedQuery,
  useGetAllHotelTypesWithHotelsPaginatedQuery,
  useLazyGetAllHotelTypesWithHotelsPaginatedQuery,
  useGetHotelTypeByUrlPrefixPaginatedQuery,
  useLazyGetHotelTypeByUrlPrefixPaginatedQuery,
} = hotelTypeApi;
