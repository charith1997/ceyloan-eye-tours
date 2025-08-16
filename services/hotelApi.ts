import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const hotelApi = createApi({
    reducerPath: "hotelApi",
    baseQuery: fetchBaseQuery({ baseUrl: process.env.NEXT_PUBLIC_API_BASE_URL }),
    endpoints: (builder) => ({
        getAllHotels: builder.query<any, void>({
        query: () => "/hotels/get-all",
        }),
    }),
})

export const { useGetAllHotelsQuery } = hotelApi;
