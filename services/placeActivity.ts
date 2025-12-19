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
    updatePlaceActivity: builder.mutation<
      any,
      { placeId: string; activityId: string; data: any }
    >({
      query: ({ placeId, activityId, data }) => ({
        url: "/place-activities/" + placeId + "/" + activityId,
        method: "PUT",
        body: data,
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
    getAllPlaceActivitiesPaginated: builder.query<
      any,
      { page: number; size: number }
    >({
      query: ({ page, size }) => {
        let url = `/place-activities/grouped-paginated?page=${page}&size=${size}`;
        return url;
      },
    }),
  }),
});

export const {
  useGetAllPlaceActivitiesQuery,
  useCreatePlaceActivityMutation,
  useUpdatePlaceActivityMutation,
  useDeletePlaceActivityMutation,
  useGetAllPlaceActivitiesPaginatedQuery,
  useLazyGetAllPlaceActivitiesPaginatedQuery,
} = placeActivity;
