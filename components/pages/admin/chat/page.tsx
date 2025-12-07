import React from "react";
import ChatInterface from "@/app/components/ChatInterface";
import { useGetAdminChatsQuery } from "@/services/chatApi";

function AdminChatPage() {
  return <ChatInterface />;
}

export default AdminChatPage;
