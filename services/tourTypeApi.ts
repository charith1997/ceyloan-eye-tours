import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const tourTypeApi = createApi({
  reducerPath: "tourTypeApi",
  baseQuery: fetchBaseQuery({ baseUrl: process.env.NEXT_PUBLIC_API_BASE_URL }),
  endpoints: (builder) => ({
    // Add tour type (form data)
    addTourType: builder.mutation<any, FormData>({
      query: (formData) => ({
        url: "/tour-types/create",
        method: "POST",
        body: formData,
      }),
    }),
    // Get all tour types
    getAllTourTypes: builder.query<any, void>({
      query: () => "/tour-types",
    }),
    // Update tour type
    updateTourType: builder.mutation<any, { id: string; data: { name: string; description: string } }>({
      query: ({ id, data }) => ({
        url: `/tour-types/${id}`,
        method: "PUT",
        body: data,
      }),
    }),
    // Delete tour type
    deleteTourType: builder.mutation<any, { id: string; data: { name: string; description: string } }>({
      query: ({ id, data }) => ({
        url: `/tour-types/${id}`,
        method: "DELETE",
        body: data,
      }),
    }),
    // Get tour type by ID
    getTourTypeById: builder.query<any, string>({
      query: (id) => `/tour-types/${id}`,
    }),
  }),
});

export const {
  useAddTourTypeMutation,
  useGetAllTourTypesQuery,
  useUpdateTourTypeMutation,
  useDeleteTourTypeMutation,
  useGetTourTypeByIdQuery,
} = tourTypeApi;