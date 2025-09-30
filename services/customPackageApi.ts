import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const customPackageApi = createApi({
  reducerPath: "customPackageApi",
  baseQuery: fetchBaseQuery({ baseUrl: process.env.NEXT_PUBLIC_API_BASE_URL }),
  tagTypes: ["Custom Package"],
  endpoints: (builder) => ({
    // Get all packages
    getAllCustomPackages: builder.query<any, void>({
      query: () => "/custom-packages/get-all",
      providesTags: ["Custom Package"],
    }),
    getCustomPackagesByUserID: builder.query<any, string>({
      query: (userId) => `/custom-packages/get-all/${userId}`,
      providesTags: ["Custom Package"],
    }),
    updateStatus: builder.mutation<any, { id: string; isApproved: boolean }>({
      query: ({ id, isApproved }) => ({
        url: `/custom-packages/${id}/is-approved`,
        method: "PUT",
        body: { isApproved },
      }),
      invalidatesTags: ["Custom Package"],
    }),
    updateRequiredDayCount: builder.mutation<
      any,
      { id: string; requiredDayCount: number }
    >({
      query: ({ id, requiredDayCount }) => ({
        url: `/custom-packages/${id}/required-day-count`,
        method: "PUT",
        body: { requiredDayCount },
      }),
      invalidatesTags: ["Custom Package"],
    }),
    updateMessage: builder.mutation<any, { id: string; message: string }>({
      query: ({ id, message }) => ({
        url: `/custom-packages/${id}/message`,
        method: "PUT",
        body: { message },
      }),
      invalidatesTags: ["Custom Package"],
    }),
    updatePrice: builder.mutation<any, { id: string; price: number }>({
      query: ({ id, price }) => ({
        url: `/custom-packages/${id}/price`,
        method: "PUT",
        body: { price },
      }),
      invalidatesTags: ["Custom Package"],
    }),
    updateCustomPackagePlace: builder.mutation<
      any,
      {
        id: string;
        sortOrder: string;
        dayNo: number;
        description: number;
      }
    >({
      query: ({ id, sortOrder, dayNo, description }) => ({
        url: `/custom-package-places/${id}/update`,
        method: "PUT",
        body: { sortOrder, dayNo, description },
      }),
      invalidatesTags: (result, error) => (error ? [] : ["Custom Package"]),
    }),
    createCustomPackagePlace: builder.mutation<
      any,
      {
        places: any[];
      }
    >({
      query: ({ places }) => ({
        url: `/custom-packages/add`,
        method: "POST",
        body: { places },
        headers: {
          Authorization: `Bearer ${localStorage.getItem("authToken")}`,
        },
      }),
      invalidatesTags: ["Custom Package"],
    }),
  }),
});

export const {
  useGetAllCustomPackagesQuery,
  useGetCustomPackagesByUserIDQuery,
  useUpdateStatusMutation,
  useUpdateRequiredDayCountMutation,
  useUpdateMessageMutation,
  useUpdatePriceMutation,
  useUpdateCustomPackagePlaceMutation,
  useCreateCustomPackagePlaceMutation,
} = customPackageApi;
