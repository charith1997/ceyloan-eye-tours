import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const placesApi = createApi({
    reducerPath: "placesApi",
    baseQuery: fetchBaseQuery({ baseUrl: process.env.NEXT_PUBLIC_API_BASE_URL }),
    endpoints: (builder) => ({
        // Get all places
        getAllPlaces: builder.query<any, void>({
        query: () => "/places/get-all",
        }),
        // Get place by ID
        getPlaceById: builder.query<any, string>({
        query: (id) => `/places/get-by-id/${id}`,
        }),
        // Create a new place
        createPlace: builder.mutation<any, FormData>({
        query: (formData) => ({
            url: "/places/create",
            method: "POST",
            body: formData,
        }),
        }),
        // Update an existing place
        updatePlace: builder.mutation<any, { id: string; data: any }>({
        query: ({ id, data }) => ({
            url: `/places/update/${id}`,
            method: "PUT",
            body: data,
        }),
        }),
        // Delete a place
        deletePlace: builder.mutation<any, string>({
        query: (id) => ({
            url: `/places/delete/${id}`,
            method: "DELETE",
        }),
        }),
    }),
})

export const { useGetAllPlacesQuery, useGetPlaceByIdQuery, useCreatePlaceMutation, useUpdatePlaceMutation, useDeletePlaceMutation } = placesApi;
