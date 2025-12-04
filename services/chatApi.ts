import { baseApi } from "./baseApi";

const chatApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    getAdminChats: builder.query<any, void>({
      query: () => ({
        url: "/chats/grouped",
        method: "GET",
      }),
    }),
    getSingleChat: builder.query<any, string | null>({
      query: (id) => ({
        url: `/chats/get-by-id/${id}`,
        method: "GET",
      }),
    }),
  }),
});

export const { useGetAdminChatsQuery, useGetSingleChatQuery } = chatApi;
