import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const hotelApi = createApi({
  reducerPath: "hotelApi",
  baseQuery: fetchBaseQuery({ baseUrl: process.env.NEXT_PUBLIC_API_BASE_URL }),
  tagTypes: ["Hotel"],
  endpoints: (builder) => ({
    getAllHotels: builder.query<any, void>({
      query: () => "/hotels/get-all",
      providesTags: ["Hotel"],
    }),
    createHotel: builder.mutation<any, FormData>({
      query: (formData) => ({
        url: "/hotels/add",
        method: "POST",
        body: formData,
      }),
    }),
    deleteHotel: builder.mutation<any, string>({
      query: (id) => ({
        url: `/hotels/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: ["Hotel"],
    }),
  }),
});

export const {
  useGetAllHotelsQuery,
  useCreateHotelMutation,
  useDeleteHotelMutation,
} = hotelApi;
