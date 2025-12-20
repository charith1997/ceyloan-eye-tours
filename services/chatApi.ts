import { baseApi } from "./baseApi";

const chatApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    getAdminChats: builder.query<any, void>({
      query: () => ({
        url: "/chats/grouped",
        method: "GET",
      }),
    }),
    getAdminInitalChats: builder.query<any, void>({
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
    getUserChats: builder.query<any, void>({
      query: () => ({
        url: "/chats",
        method: "GET",
      }),
    }),
    addChat: builder.mutation<
      any,
      { receiverId: string | null | undefined; message: string }
    >({
      query: (body) => ({
        url: "/chats/add",
        method: "POST",
        body,
      }),
    }),
    markAsReadAdminChats: builder.mutation<any, { userId: string }>({
      query: (body) => ({
        url: "/chats/mark-admin-message-as-read",
        method: "PATCH",
        body,
      }),
    }),
    markAsRead: builder.mutation<any, void>({
      query: () => ({
        url: "/chats/mark-as-read",
        method: "PATCH",
      }),
      invalidatesTags: ["UserMessageCount"],
    }),
    getUserUnreadCount: builder.query<any, void>({
      query: () => ({
        url: "/chats/unread-count",
        method: "GET",
      }),
      providesTags: ["UserMessageCount"],
    }),
  }),
});

export const {
  useGetAdminChatsQuery,
  useGetSingleChatQuery,
  useLazyGetSingleChatQuery,
  useLazyGetAdminChatsQuery,
  useGetUserChatsQuery,
  useLazyGetUserChatsQuery,
  useAddChatMutation,
  useMarkAsReadAdminChatsMutation,
  useMarkAsReadMutation,
  useGetUserUnreadCountQuery,
  useLazyGetUserUnreadCountQuery,
  useLazyGetAdminInitalChatsQuery,
} = chatApi;
