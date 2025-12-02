import { baseApi } from "./baseApi";

export const authApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    login: builder.mutation<{ data: any }, { email: string; password: string }>(
      {
        query: (body) => ({
          url: "/auth/login",
          method: "POST",
          body,
        }),
      }
    ),
    register: builder.mutation<{ data: any }, any>({
      query: (body) => ({
        url: "/auth/register",
        method: "POST",
        body,
      }),
    }),
    forgotPassword: builder.mutation<
      any,
      {
        data: {
          email: string;
        };
      }
    >({
      query: ({ data }) => ({
        url: `/auth/get-temp-password`,
        method: "PUT",
        body: data,
      }),
    }),
    resetPassword: builder.mutation<
      any,
      {
        data: {
          email: string;
          password: string;
          tempPassword: string;
        };
      }
    >({
      query: ({ data }) => ({
        url: `/auth/reset-password`,
        method: "PUT",
        body: data,
      }),
    }),
  }),
});

export const {
  useLoginMutation,
  useRegisterMutation,
  useForgotPasswordMutation,
  useResetPasswordMutation,
} = authApi;
