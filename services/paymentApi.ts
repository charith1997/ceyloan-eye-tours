import { baseApi } from "./baseApi";

export const paymentApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    addPayment: builder.mutation<any, { bookingId: string; currency: string }>({
      query: (body) => ({
        url: "/payments/add",
        method: "POST",
        body,
      }),
    }),
    refundPayment: builder.mutation<
      any,
      { payment_id: string; description: string; pyament_record_id: string }
    >({
      query: (body) => ({
        url: "/payments/refund",
        method: "POST",
        body,
      }),
      invalidatesTags: ["Booking"],
    }),
  }),
});

export const { useAddPaymentMutation, useRefundPaymentMutation } = paymentApi;
