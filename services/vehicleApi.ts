import { baseApi } from "./baseApi";

export const vehicleApi = baseApi.injectEndpoints({
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
    updateVehicle: builder.mutation<any, { id: string; data: any }>({
      query: ({ id, data }) => ({
        url: `/vehicles/${id}`,
        method: "PUT",
        body: data,
      }),
      invalidatesTags: ["Vehicles"],
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
