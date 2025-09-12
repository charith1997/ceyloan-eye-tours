import React from "react";
import { useSelector } from "react-redux";
import Spinner from "../atoms/Spinner";

const apiSlices = [
  "activityApi",
  "authApi",
  "categoryApi",
  "galleryApi",
  "hotelApi",
  "hotelTypeApi",
  "packageApi",
  "placesApi",
  "reviewApi",
  "tourTypeApi",
];

const GlobalLoader = () => {
  const isLoading = useSelector((state: any) =>
    apiSlices.some((slice) => {
      const queries = state[slice]?.queries;
      const mutations = state[slice]?.mutations;
      const queriesLoading = Object.values(queries || {}).some(
        (query: any) => query?.status === "pending"
      );
      const mutationsLoading = Object.values(mutations || {}).some(
        (mutation: any) => mutation?.status === "pending"
      );
      return queriesLoading || mutationsLoading;
    })
  );

  if (!isLoading) return null;

  return (
    <div className="fixed inset-0 bg-black/30 flex items-center justify-center z-50">
      <Spinner />
    </div>
  );
};

export default GlobalLoader;
