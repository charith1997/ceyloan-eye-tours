import React from "react";
import { useSelector } from "react-redux";
import Spinner from "../atoms/Spinner";

const apiSlices = ["activityApi", "authApi", "categoryApi", "galleryApi", "hotelApi", "hotelTypeApi", "packageApi", "placesApi", "reviewApi", "tourTypeApi"]; // Add your API slice reducer names here

const GlobalLoader = () => {
    const isLoading = useSelector((state: any) =>
        apiSlices.some((slice) => {
            const queries = state[slice]?.queries;
            return Object.values(queries || {}).some(
                (query: any) => query?.status === "pending"
            );
        })
    );

    if (!isLoading) return null;

    return (
        <div className="fixed inset-0 bg-black bg-opacity-30 flex items-center justify-center z-50">
            <Spinner />
        </div>
    );
};

export default GlobalLoader;