import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const categoryApi = createApi({
  reducerPath: "categoryApi",
  baseQuery: fetchBaseQuery({ baseUrl: process.env.NEXT_PUBLIC_API_BASE_URL }),
  endpoints: (builder) => ({
    // Get all categories (with token)
    getAllCategories: builder.query<any, { tourType?: string }>({
      query: ({ tourType }) => {
        let url = "/categories/get-all";
        if (tourType) url += `?tourType=${tourType}`;
        return url;
      },
    }),
    // Create category (form data)
    createCategory: builder.mutation<any, FormData>({
      query: (formData) => ({
        url: "/categories/create",
        method: "POST",
        body: formData,
      }),
    }),
    // Update category
    updateCategory: builder.mutation<any, { id: string; data: { name: string; description: string } }>({
      query: ({ id, data }) => ({
        url: `/categories/update/${id}`,
        method: "PUT",
        body: data,
      }),
    }),
    // Delete category
    deleteCategory: builder.mutation<any, string>({
      query: (id) => ({
        url: `/categories/delete/${id}`,
        method: "DELETE",
      }),
    }),
    // Get all categories with packages
    getAllCategoriesWithPackages: builder.query<any, void>({
      query: () => "/categories",
    }),
    // Get category by ID
    getCategoryById: builder.query<any, { id: string; tourType?: string }>({
      query: ({ id, tourType }) => {
        let url = `/categories/get-by-id/${id}`;
        if (tourType) url += `?tourType=${tourType}`;
        return url;
      },
    }),
    // Get category by URL prefix
    getCategoryByUrlPrefix: builder.query<any, {slug: string; tourType?: string}>({
      query: ({slug, tourType}) => {
        let url = `/categories/get-by-urlprefix/${slug}`;
        if (tourType) url += `?tourType=${tourType}`;
        return url;
      },
    }),
  }),
});

export const {
  useGetAllCategoriesQuery,
  useCreateCategoryMutation,
  useUpdateCategoryMutation,
  useDeleteCategoryMutation,
  useGetAllCategoriesWithPackagesQuery,
  useGetCategoryByIdQuery,
  useGetCategoryByUrlPrefixQuery,
} = categoryApi;