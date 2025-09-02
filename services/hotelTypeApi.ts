import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const hotelTypeApi = createApi({
  reducerPath: "hotelTypeApi",
  baseQuery: fetchBaseQuery({ baseUrl: process.env.NEXT_PUBLIC_API_BASE_URL }),
  tagTypes: ["HotelType"],
  endpoints: (builder) => ({
    // Get all hotel types
    getAllHotelTypes: builder.query<any, void>({
      query: () => "/hotel-types/get-all",
      providesTags: ["HotelType"],
    }),
    // Get all hotel types with hotels
    getAllHotelTypesWithHotels: builder.query<any, void>({
      query: () => "/hotel-types/get-all-with-hotels",
    }),
    // Create hotel type (form data)
    createHotelType: builder.mutation<any, FormData>({
      query: (formData) => ({
        url: "/hotel-types/add",
        method: "POST",
        body: formData,
      }),
      invalidatesTags: ["HotelType"],
    }),
    // Get hotel type by URL prefix
    getHotelTypeByUrlPrefix: builder.query<any, string>({
      query: (slug) => `/hotel-types/get-by-urlprefix/${slug}`,
    }),
    // Delete hotel type
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
