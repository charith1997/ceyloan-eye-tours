import { baseApi } from "./baseApi";

export const packageApi = baseApi.injectEndpoints({
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
    // Update package
    updatePackage: builder.mutation<
      any,
      {
        id: string | undefined;
        data: any;
      }
    >({
      query: ({ id, data }) => ({
        url: `/packages/update/${id}`,
        method: "PUT",
        body: data,
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
  useUpdatePackageMutation,
  useGetPackagesByCategoryQuery,
  useGetPackagesByTourTypeQuery,
  useGetPackageByUrlPrefixQuery,
} = packageApi;
