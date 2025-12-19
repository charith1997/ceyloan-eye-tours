import React, { useEffect, useRef, useState } from "react";
import { Search, Send, ArrowLeft } from "lucide-react";
import {
  useAddChatMutation,
  useLazyGetAdminChatsQuery,
  useLazyGetSingleChatQuery,
  useMarkAsReadAdminChatsMutation,
} from "@/services/chatApi";
import io from "socket.io-client";
import { getUserDetails } from "@/utils/auth";
import { randomUUID } from "crypto";

interface Contact {
  id: string;
  message: string;
  sender_id: string;
  receiver_id: string;
  created_at: string;
  user: {
    id: string;
    name: string;
  };
  unreadCount: number;
}

interface Chat {
  id: string;
  message: string;
  sender_id: string;
  receiver_id: string;
  user_id: string;
  created_at: string;
  updated_at: string;
}

interface ChatInterfaceProps {
  className?: string;
}
const backendUrl = process.env.NEXT_PUBLIC_API_BASE_URL;

const ChatInterface: React.FC<ChatInterfaceProps> = ({ className = "" }) => {
  const [selectedContact, setSelectedContact] = useState<Contact | null>(null);
  const [messageInput, setMessageInput] = useState("");
  const [searchQuery, setSearchQuery] = useState("");
  const [showMessages, setShowMessages] = useState(true);
  const [socket, setSocket] = useState<any | null>(null);
  const [chats, setChats] = useState<Chat[]>([]);
  const [contacts, setContacts] = useState<Contact[]>([]);

  const messagesEndRef = useRef<HTMLDivElement>(null);
  const messagesContainerRef = useRef<HTMLDivElement>(null);

  const [getUserMessages] = useLazyGetSingleChatQuery();
  const [getAllChats] = useLazyGetAdminChatsQuery();
  const [addChat] = useAddChatMutation();
  const [markAsRead] = useMarkAsReadAdminChatsMutation();
  const { userId } = getUserDetails();

  const scrollToBottom = (): void => {
    if (messagesContainerRef.current) {
      messagesContainerRef.current.scrollTop =
        messagesContainerRef.current.scrollHeight;
    }
  };

  useEffect(() => {
    scrollToBottom();
  }, [chats]);

  useEffect(() => {
    if (selectedContact) {
      // Small delay to ensure DOM is rendered
      setTimeout(() => {
        scrollToBottom();
      }, 100);
    }
  }, [selectedContact]);

  const filteredContacts = contacts.filter((contact) => {
    const searchLower = searchQuery.toLowerCase().trim();
    if (!searchLower) return true;

    const nameMatch = contact.user.name.toLowerCase().includes(searchLower);

    return nameMatch;
  });

  const handleSelectContact = async (contact: Contact) => {
    try {
      handleReadMessage(contact.user.id);
      getAllAdminChats();
      const { data } = await getUserMessages(contact.user.id);
      if (data.success) {
        setChats(data.data);
      }

      setSelectedContact(contact);
      setShowMessages(false);
    } catch (err) {
      console.error(err);
    }
  };

  const handleReadMessage = async (userId: string) => {
    await markAsRead({ userId });
  };

  const getChat = async (id: string) => {
    const { data } = await getUserMessages(id);
    if (data.success) setChats(data.data);

    const { data: chatList } = await getAllChats();
    if (chatList.success) setContacts(chatList.data);
  };

  const getAllAdminChats = async () => {
    const { data: chatList } = await getAllChats();
    if (chatList.success) setContacts(chatList.data);
  };

  const handleBackToMessages = () => {
    setShowMessages(true);
    setSelectedContact(null);
  };

  const handleSendMessage = async () => {
    if (!messageInput.trim()) return;

    const data = {
      senderId: userId,
      receiverId: selectedContact?.user.id,
      userId: selectedContact?.user.id,
      message: messageInput,
    };

    try {
      await addChat({ receiverId: data.receiverId!, message: data.message });
      socket.emit("sendNewMessage", {
        senderId: data.senderId,
        receiverId: data.receiverId,
      });
      const newMessage = {
        id: crypto.randomUUID(),
        message: data.message,
        sender_id: data.senderId,
        receiver_id: data.receiverId!,
        user_id: data.userId!,
        created_at: new Date().toISOString(),
        updated_at: new Date().toISOString(),
      };
      setChats([...chats, newMessage]);

      getChat(data.receiverId!);

      if (messageInput.trim()) {
        setMessageInput("");
      }
    } catch (err) {
      console.log(err);
    }
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === "Enter") {
      handleSendMessage();
    }
  };

  const currentUser = (senderId: string, userId: string) => {
    if (senderId === userId) return false;
    return true;
  };

  useEffect((): any => {
    getAllAdminChats();
    const s = io(backendUrl);
    setSocket(s);
    s.emit("join", { id: userId });

    s.on("messageReceived", (data) => {
      if (data) {
        getChat(data.from);

        // Use functional update to access latest state
        setSelectedContact((current) => {
          if (current && current.user.id === data.from) {
            handleReadMessage(current.user.id);
            getAllAdminChats();
          }
          return current; // Don't change the state
        });
      }
    });

    return () => s.disconnect();
  }, []);

  return (
    <div className={`flex md:h-screen bg-gray-100 ${className}`}>
      <div
        className={`${
          showMessages ? "flex" : "hidden"
        } lg:flex w-full md:w-80 bg-white border-r border-gray-200 flex-col`}
      >
        <div className="p-4 border-b border-gray-200">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-xl font-semibold flex items-center">
              Messages
            </h2>
          </div>

          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
            <input
              type="text"
              placeholder="Search messages"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-10 pr-4 py-2 bg-gray-100 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500"
            />
          </div>
        </div>

        <div className="flex-1 w-auto">
          {filteredContacts.length > 0 ? (
            filteredContacts.map((contact: Contact) => (
              <div
                key={contact.id}
                onClick={() => handleSelectContact(contact)}
                className={`flex items-center p-4 cursor-pointer hover:bg-gray-50 w-full ${
                  selectedContact?.id === contact.id ? "bg-gray-50" : ""
                }`}
              >
                <div className="relative">
                  <div className="w-12 h-12 bg-gray-300 rounded-full flex items-center justify-center">
                    <span className="text-sm font-medium text-gray-600">
                      {contact.user.name
                        .split(" ")
                        .map((n) => n[0])
                        .join("")}
                    </span>
                  </div>
                </div>

                <div className="ml-3 flex-1 w-1">
                  <div className="flex items-center justify-between w-auto">
                    <h3 className="font-medium text-gray-900 truncate">
                      {contact.user.name}
                    </h3>
                    <span className="text-sm text-gray-500">24m</span>
                  </div>
                  <p className="text-sm text-gray-500 truncate">
                    {contact.message}
                  </p>
                </div>

                {contact.unreadCount !== 0 && (
                  <div className="ml-2 w-5 h-5 bg-red-500 rounded-full flex items-center justify-center">
                    <span className="text-xs text-white">
                      {contact.unreadCount}
                    </span>
                  </div>
                )}
              </div>
            ))
          ) : (
            <div className="flex flex-col items-center justify-center p-8 text-center">
              <Search className="h-12 w-12 text-gray-300 mb-3" />
              <p className="text-gray-500 text-sm">No contacts found</p>
              {searchQuery && (
                <p className="text-gray-400 text-xs mt-1">
                  Try searching with a different keyword
                </p>
              )}
            </div>
          )}
        </div>
      </div>

      <div
        className={`${
          showMessages ? "hidden" : "flex"
        } lg:flex flex-1 flex-col`}
      >
        {selectedContact ? (
          <>
            <div className="bg-white border-b border-gray-200 p-4">
              <div className="flex items-center">
                <button
                  onClick={handleBackToMessages}
                  className="lg:hidden p-2 hover:bg-gray-100 rounded-lg mr-2"
                >
                  <ArrowLeft className="h-5 w-5" />
                </button>
                <div className="relative">
                  <div className="w-10 h-10 bg-gray-300 rounded-full flex items-center justify-center">
                    <span className="text-sm font-medium text-gray-600">
                      {selectedContact.user.name
                        .split(" ")
                        .map((n) => n[0])
                        .join("")}
                    </span>
                  </div>
                </div>
                <div className="ml-3">
                  <h3 className="font-medium text-gray-900">
                    {selectedContact.user.name}
                  </h3>
                </div>
              </div>
            </div>

            {/* Messages */}
            <div
              ref={messagesContainerRef}
              className="flex-1 overflow-y-auto p-4 space-y-4"
              style={{ scrollBehavior: "smooth" }}
            >
              <>
                {chats.map((chat: Chat) => (
                  <div
                    key={chat.id}
                    className={`flex ${
                      currentUser(chat.sender_id, chat.user_id)
                        ? "justify-end"
                        : "justify-start"
                    }`}
                  >
                    {!currentUser(chat.sender_id, chat.user_id) && (
                      <div className="w-8 h-8 bg-gray-300 rounded-full flex items-center justify-center mr-3 flex-shrink-0">
                        <span className="text-xs font-medium text-gray-600">
                          {selectedContact.user.name
                            .split(" ")
                            .map((n) => n[0])
                            .join("")}
                        </span>
                      </div>
                    )}
                    <div
                      className={`max-w-xs sm:max-w-md px-4 py-2 rounded-lg ${
                        currentUser(chat.sender_id, chat.user_id)
                          ? "bg-orange-500 text-white rounded-br-none"
                          : "bg-gray-200 text-gray-900 rounded-bl-none"
                      }`}
                    >
                      <p className="text-sm sm:text-base">{chat.message}</p>
                    </div>
                    {currentUser(chat.sender_id, chat.user_id) && (
                      <div className="w-8 h-8 bg-gray-300 rounded-full flex items-center justify-center ml-3 flex-shrink-0">
                        <span className="text-xs font-medium text-gray-600">
                          You
                        </span>
                      </div>
                    )}
                  </div>
                ))}
                <div ref={messagesEndRef} />
              </>
            </div>

            <div className="bg-white border-t border-gray-200 p-4">
              <div className="flex items-center space-x-2">
                <button className="text-gray-500 hover:text-gray-700 hidden sm:block">
                  <span className="text-xl">@</span>
                </button>
                <input
                  type="text"
                  placeholder="Type a message"
                  value={messageInput}
                  onChange={(e) => setMessageInput(e.target.value)}
                  onKeyPress={handleKeyPress}
                  className="flex-1 px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500 text-sm sm:text-base"
                />
                <button
                  onClick={handleSendMessage}
                  className="bg-orange-500 text-white p-2 rounded-lg hover:bg-orange-600 transition-colors"
                >
                  <Send className="h-5 w-5" />
                </button>
              </div>
            </div>
          </>
        ) : (
          <div className="flex-1 flex items-center justify-center p-4">
            <div className="text-center">
              <h3 className="text-lg font-medium text-gray-900 mb-2">
                Select a conversation
              </h3>
              <p className="text-gray-500 text-sm sm:text-base">
                Choose a contact from the sidebar to start chatting
              </p>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default ChatInterface;
