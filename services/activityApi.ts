import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const activityApi = createApi({
  reducerPath: "activityApi",
  baseQuery: fetchBaseQuery({ baseUrl: process.env.NEXT_PUBLIC_API_BASE_URL }),
  endpoints: (builder) => ({
    // Get all activities
    getAllActivities: builder.query<any, void>({
      query: () => "/activities/get-all",
    }),
    // Get activity by ID
    getActivityById: builder.query<any, string>({
      query: (id) => `/activities/${id}`,
    }),
    // Add activity (form data)
    addActivity: builder.mutation<any, FormData>({
      query: (formData) => ({
        url: "/activities/create",
        method: "POST",
        body: formData,
      }),
    }),
    // Delete activity
    deleteActivity: builder.mutation<any, string>({
      query: (id) => ({
        url: `/activities/${id}`,
        method: "DELETE",
      }),
    }),
    // Update activity
    updateActivity: builder.mutation<any, { id: string; data: { name: string } }>({
      query: ({ id, data }) => ({
        url: `/activities/update/${id}`,
        method: "PUT",
        body: data,
      }),
    }),
  }),
});

export const {
  useGetAllActivitiesQuery,
  useGetActivityByIdQuery,
  useAddActivityMutation,
  useDeleteActivityMutation,
  useUpdateActivityMutation,
} = activityApi;