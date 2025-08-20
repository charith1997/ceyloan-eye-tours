import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const packageApi = createApi({
  reducerPath: "packageApi",
  baseQuery: fetchBaseQuery({ baseUrl: process.env.NEXT_PUBLIC_API_BASE_URL }),
  tagTypes: ["Package"],
  endpoints: (builder) => ({
    // Get all packages
    getAllPackages: builder.query<any, void>({
      query: () => "/packages/get-all",
      providesTags: ["Package"],
    }),
    // Get package by ID
    getPackageById: builder.query<any, string>({
      query: (id) => `/packages/get-by-id/${id}`,
    }),
    // Add package (form data)
    addPackage: builder.mutation<any, FormData>({
      query: (formData) => ({
        url: "/packages/add",
        method: "POST",
        body: formData,
      }),
      invalidatesTags: ["Package"],
    }),
    // Get packages by category
    getPackagesByCategory: builder.query<any, string>({
      query: (categoryId) => `/packages/category/${categoryId}`,
    }),
    // Get packages by tour type
    getPackagesByTourType: builder.query<any, string>({
      query: (tourTypeId) => `/packages/tour-type/${tourTypeId}`,
    }),
    // Get package by URL prefix
    getPackageByUrlPrefix: builder.query<any, string>({
      query: (slug) => `/packages/get-by-urlprefix/${slug}`,
    }),
  }),
});

export const {
  useGetAllPackagesQuery,
  useGetPackageByIdQuery,
  useAddPackageMutation,
  useGetPackagesByCategoryQuery,
  useGetPackagesByTourTypeQuery,
  useGetPackageByUrlPrefixQuery,
} = packageApi;