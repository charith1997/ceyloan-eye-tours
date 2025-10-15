import { baseApi } from "./baseApi";

export const activityApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    getAllActivities: builder.query<any, void>({
      query: () => "/activities/get-all",
      providesTags: ["Activity"],
    }),
    addActivity: builder.mutation<any, FormData>({
      query: (formData) => ({
        url: "/activities/create",
        method: "POST",
        body: formData,
      }),
      invalidatesTags: ["Activity"],
    }),
    deleteActivity: builder.mutation<any, string>({
      query: (id) => ({
        url: `/activities/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: ["Activity"],
    }),
    updateActivity: builder.mutation<
      any,
      { id: string; data: { name: string } }
    >({
      query: ({ id, data }) => ({
        url: `/activities/update/${id}`,
        method: "PUT",
        body: data,
      }),
      invalidatesTags: ["Activity"],
    }),
  }),
});

export const {
  useGetAllActivitiesQuery,
  useAddActivityMutation,
  useDeleteActivityMutation,
  useUpdateActivityMutation,
} = activityApi;
