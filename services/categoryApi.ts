import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const categoryApi = createApi({
  reducerPath: "categoryApi",
  baseQuery: fetchBaseQuery({ baseUrl: process.env.NEXT_PUBLIC_API_BASE_URL }),
  endpoints: (builder) => ({
    // Get all categories (with token)
    getAllCategories: builder.query<any, void>({
      query: () => "/categories/get-all",
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
  }),
});

export const {
  useGetAllCategoriesQuery,
  useCreateCategoryMutation,
  useUpdateCategoryMutation,
  useDeleteCategoryMutation,
  useGetAllCategoriesWithPackagesQuery,
} = categoryApi;