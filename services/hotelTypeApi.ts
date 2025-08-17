import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const hotelTypeApi = createApi({
  reducerPath: "hotelTypeApi",
  baseQuery: fetchBaseQuery({ baseUrl: process.env.NEXT_PUBLIC_API_BASE_URL }),
  endpoints: (builder) => ({
    // Get all hotel types
    getAllHotelTypes: builder.query<any, void>({
      query: () => "/hotel-types/get-all",
    }),
    // Get hotel type by URL prefix
    getHotelTypeByUrlPrefix: builder.query<any, string>({
      query: (slug) => `/hotel-types/get-by-urlprefix/${slug}`,
    }),
  }),
});

export const {
  useGetAllHotelTypesQuery,
  useGetHotelTypeByUrlPrefixQuery,
} = hotelTypeApi;