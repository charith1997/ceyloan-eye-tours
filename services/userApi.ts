import { baseApi } from "./baseApi";

const userApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    getUserDetail: builder.query<any, void>({
      query: () => "/auth/user",
      providesTags: ["User"],
    }),
    updateProfile: builder.mutation<
      any,
      {
        data: {
          name: string;
          email: string;
          country: string;
          phoneNo: string;
          passportNo: string;
        };
      }
    >({
      query: ({ data }) => ({
        url: `/auth/update-profile`,
        method: "PUT",
        body: data,
      }),
      invalidatesTags: ["User"],
    }),
  }),
});

export const { useGetUserDetailQuery, useUpdateProfileMutation } = userApi;
