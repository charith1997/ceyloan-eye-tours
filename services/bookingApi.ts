import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const bookingApi = createApi({
  reducerPath: "bookingApi",
  baseQuery: fetchBaseQuery({
    baseUrl: process.env.NEXT_PUBLIC_API_BASE_URL,
    prepareHeaders: (headers) => {
      const token = localStorage.getItem("authToken");
      if (token) {
        headers.set("Authorization", `Bearer ${token}`);
      }
      return headers;
    },
  }),
  tagTypes: ["Booking"],
  endpoints: (builder) => ({
    // Get all bookings
    getAllBookings: builder.query<any, void>({
      query: () => "/bookings/get-all",
      providesTags: ["Booking"],
    }),
    // Add booking (form data)
    addBooking: builder.mutation<any, FormData>({
      query: (body) => ({
        url: "/bookings/add",
        method: "POST",
        body: body,
        headers: {
          Authorization: `Bearer ${localStorage.getItem("authToken")}`,
        },
      }),
      invalidatesTags: ["Booking"],
    }),
    getBookingById: builder.query<any, string>({
      query: (id) => `/bookings/customer/${id}`,
      providesTags: ["Booking"],
    }),
    updateStatus: builder.mutation<
      any,
      { id: string; data: { status: string } }
    >({
      query: ({ id, data }) => ({
        url: `/bookings/${id}/status`,
        method: "PUT",
        body: data,
      }),
      invalidatesTags: ["Booking"],
    }),
  }),
});

export const {
  useGetAllBookingsQuery,
  useAddBookingMutation,
  useGetBookingByIdQuery,
  useUpdateStatusMutation,
} = bookingApi;
