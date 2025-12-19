import { baseApi } from "./baseApi";

export const bookingApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    getAllBookings: builder.query<any, void>({
      query: () => "/bookings/get-all",
      providesTags: ["Booking"],
    }),
    addBooking: builder.mutation<any, FormData>({
      query: (body) => ({
        url: "/bookings/add",
        method: "POST",
        body: body,
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
    getCalendarBookings: builder.query<any, { month: number; year: number }>({
      query: ({ month, year }) => ({
        url: `/bookings/calendar?year=${year}&month=${month}`,
        method: "GET",
      }),
    }),
  }),
});

export const {
  useGetAllBookingsQuery,
  useAddBookingMutation,
  useGetBookingByIdQuery,
  useUpdateStatusMutation,
  useGetCalendarBookingsQuery,
  useLazyGetCalendarBookingsQuery,
} = bookingApi;
