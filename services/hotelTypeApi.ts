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
  }),
});

export const {
  useGetAllHotelTypesQuery,
  useGetAllHotelTypesWithHotelsQuery,
  useCreateHotelTypeMutation,
  useGetHotelTypeByUrlPrefixQuery,
  useDeleteHotelTypeMutation,
} = hotelTypeApi;
