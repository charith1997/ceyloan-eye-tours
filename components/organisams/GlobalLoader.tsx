import React from "react";
import { useSelector } from "react-redux";
import Spinner from "../atoms/Spinner";

const EXCLUDED_ENDPOINTS = [
  "getAdminChats",
  // "getAdminInitalChats",
  "getSingleChat",
  "getUserChats",
  "addChat",
  "markAsReadAdminChats",
  "markAsRead",
  "getUserUnreadCount",
];

const GlobalLoader = () => {
  const isLoading = useSelector((state: any) => {
    const queries = state.baseApi?.queries;
    const mutations = state.baseApi?.mutations;

    const isExcludedEndpoint = (endpoint: string) => {
      return EXCLUDED_ENDPOINTS.includes(endpoint);
    };

    const queriesLoading = Object.entries(queries || {}).some(
      ([key, query]: [string, any]) => {
        if (isExcludedEndpoint(query.endpointName)) {
          return false;
        } else {
          return query?.status === "pending" ? true : false;
        }
      }
    );

    const mutationsLoading = Object.entries(mutations || {}).some(
      ([key, mutation]: [string, any]) => {
        if (isExcludedEndpoint(mutation.endpointName)) {
          return false;
        } else {
          return mutation?.status === "pending" ? true : false;
        }
      }
    );

    return queriesLoading || mutationsLoading;
  });

  if (!isLoading) return null;

  return (
    <div className="fixed inset-0 bg-black/30 flex items-center justify-center z-50">
      <Spinner />
    </div>
  );
};

export default GlobalLoader;
