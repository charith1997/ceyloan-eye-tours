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
    deletePackage: builder.mutation<any, string>({
      query: (id) => ({
        url: `/packages/delete/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: ["Package"],
    }),
    getAllPackagesPaginated: builder.query<
      any,
      { page: number; size: number; search?: string }
    >({
      query: ({ page, size, search }) => {
        let url = `/packages/get-all-paginated?page=${page}&size=${size}`;
        if (search) url += `&search=${search}`;
        return url;
      },
      providesTags: ["Package"],
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
  useDeletePackageMutation,
  useGetAllPackagesPaginatedQuery,
  useLazyGetAllPackagesPaginatedQuery,
} = packageApi;
