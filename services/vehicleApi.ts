import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const vehicleApi = createApi({
  reducerPath: "vehicleApi",
  baseQuery: fetchBaseQuery({ baseUrl: process.env.NEXT_PUBLIC_API_BASE_URL }),
  tagTypes: ["Vehicles"],
  endpoints: (builder) => ({
    getAllVehicles: builder.query<any, void>({
      query: () => "/vehicles/get-all",
      providesTags: ["Vehicles"],
    }),
    getVehicleByPrefix: builder.query<any, string>({
      query: (prefix) => `/vehicles/${prefix}`,
    }),
    createVehicle: builder.mutation<any, FormData>({
      query: (formData) => ({
        url: "/vehicles/add",
        method: "POST",
        body: formData,
      }),
      invalidatesTags: ["Vehicles"],
    }),
    updateVehicle: builder.mutation({
      query: ({ id, ...updatedVehicle }) => ({
        url: `/vehicles/${id}`,
        method: "PUT",
        body: updatedVehicle,
      }),
    }),
    deleteVehicle: builder.mutation<any, string>({
      query: (id) => ({
        url: `/vehicles/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: ["Vehicles"],
    }),
  }),
});

export const {
  useGetAllVehiclesQuery,
  useGetVehicleByPrefixQuery,
  useCreateVehicleMutation,
  useUpdateVehicleMutation,
  useDeleteVehicleMutation,
} = vehicleApi;
