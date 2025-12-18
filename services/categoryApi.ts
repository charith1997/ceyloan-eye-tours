import { baseApi } from "./baseApi";

export const categoryApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    getAllCategories: builder.query<any, { tourType?: string }>({
      query: ({ tourType }) => {
        let url = "/categories/get-all";
        if (tourType) url += `?tourType=${tourType}`;
        return url;
      },
      providesTags: ["Category"],
    }),
    createCategory: builder.mutation<any, FormData>({
      query: (formData) => ({
        url: "/categories/create",
        method: "POST",
        body: formData,
      }),
      invalidatesTags: ["Category"],
    }),
    updateCategory: builder.mutation<
      any,
      {
        id: string | undefined;
        data: { name: string; description: string; image_url: string };
      }
    >({
      query: ({ id, data }) => ({
        url: `/categories/update/${id}`,
        method: "PUT",
        body: data,
      }),
      invalidatesTags: ["Category"],
    }),
    deleteCategory: builder.mutation<any, string>({
      query: (id) => ({
        url: `/categories/delete/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: ["Category"],
    }),
    getAllCategoriesWithPackages: builder.query<any, void>({
      query: () => "/categories",
    }),
    getCategoryByUrlPrefix: builder.query<
      any,
      { slug: string; tourType?: string }
    >({
      query: ({ slug, tourType }) => {
        let url = `/categories/get-by-urlprefix/${slug}`;
        if (tourType) url += `?tourType=${tourType}`;
        return url;
      },
    }),
    getAllCategoriesPaginated: builder.query<
      any,
      { page: number; size: number; tourType?: string }
    >({
      query: ({ page, size, tourType }) => {
        let url = `/categories/get-all-with-pagination?page=${page}&size=${size}`;
        if (tourType) url += `&tourType=${tourType}`;
        return url;
      },
    }),
    getCategoryByUrlPrefixPaginated: builder.query<
      any,
      { slug: string; page: number; size: number; tourType?: string }
    >({
      query: ({ slug, page, size, tourType }) => {
        let url = `/categories/get-by-urlprefix-paginated/${slug}?page=${page}&size=${size}`;
        if (tourType) url += `&tourType=${tourType}`;
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
  useGetCategoryByUrlPrefixQuery,
  useGetAllCategoriesPaginatedQuery,
  useLazyGetAllCategoriesPaginatedQuery,
  useGetCategoryByUrlPrefixPaginatedQuery,
  useLazyGetCategoryByUrlPrefixPaginatedQuery,
} = categoryApi;
