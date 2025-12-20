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
      { bookingId: string; description: string; pyament_record_id: string }
    >({
      query: (body) => ({
        url: "/payments/refund",
        method: "POST",
        body,
      }),
    }),
  }),
});

export const { useAddPaymentMutation, useRefundPaymentMutation } = paymentApi;
