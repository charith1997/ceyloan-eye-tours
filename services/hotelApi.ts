import { baseApi } from "./baseApi";

export const hotelApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    getAllHotels: builder.query<any, void>({
      query: () => "/hotels/get-all",
      providesTags: ["Hotel"],
    }),
    createHotel: builder.mutation<any, FormData>({
      query: (formData) => ({
        url: "/hotels/add",
        method: "POST",
        body: formData,
      }),
      invalidatesTags: ["Hotel", "HotelType"],
    }),
    deleteHotel: builder.mutation<any, string>({
      query: (id) => ({
        url: `/hotels/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: ["Hotel"],
    }),
    updateHotel: builder.mutation<
      any,
      {
        id: string | undefined;
        data: any;
      }
    >({
      query: ({ id, data }) => ({
        url: `/hotels/${id}`,
        method: "PUT",
        body: data,
      }),
      invalidatesTags: ["Hotel"],
    }),
  }),
});

export const {
  useGetAllHotelsQuery,
  useCreateHotelMutation,
  useDeleteHotelMutation,
  useUpdateHotelMutation,
} = hotelApi;
