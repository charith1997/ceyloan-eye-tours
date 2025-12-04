import React from "react";
import ChatInterface from "@/app/components/ChatInterface";
import { useGetAdminChatsQuery } from "@/services/chatApi";

function AdminChatPage() {
  const { data } = useGetAdminChatsQuery();
  const chats = Array.isArray(data?.data) ? data.data : [];

  return <ChatInterface contacts={chats} />;
}

export default AdminChatPage;
