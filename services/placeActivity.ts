import { baseApi } from "./baseApi";

export const placeActivity = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    getAllPlaceActivities: builder.query<any, void>({
      query: () => "/place-activities/grouped",
      providesTags: ["PlaceActivities"],
    }),
    createPlaceActivity: builder.mutation<any, FormData>({
      query: (formData) => ({
        url: "/place-activities/add",
        method: "POST",
        body: formData,
      }),
      invalidatesTags: ["PlaceActivities"],
    }),
    deletePlaceActivity: builder.mutation<any, string>({
      query: (id) => ({
        url: `/place-activities/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: ["PlaceActivities"],
    }),
  }),
});

export const {
  useGetAllPlaceActivitiesQuery,
  useCreatePlaceActivityMutation,
  useDeletePlaceActivityMutation,
} = placeActivity;
