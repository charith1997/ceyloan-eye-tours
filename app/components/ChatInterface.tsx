import React, { useState } from "react";
import { Search, Send, ChevronDown, ArrowLeft, Menu } from "lucide-react";

interface Message {
  id: string;
  text: string;
  timestamp: string;
  isOwn: boolean;
}

interface Contact {
  id: string;
  name: string;
  avatar: string;
  lastMessage: string;
  timestamp: string;
  isOnline?: boolean;
  unreadCount?: number;
}

interface ChatInterfaceProps {
  className?: string;
}

const ChatInterface: React.FC<ChatInterfaceProps> = ({ className = "" }) => {
  const [selectedContact, setSelectedContact] = useState<Contact | null>(null);
  const [messageInput, setMessageInput] = useState("");
  const [searchQuery, setSearchQuery] = useState("");
  const [showSidebar, setShowSidebar] = useState(false);
  const [showMessages, setShowMessages] = useState(true);

  // Sample data
  const contacts: Contact[] = [
    {
      id: "1",
      name: "Elmer Laverty",
      avatar: "/api/placeholder/40/40",
      lastMessage: "Haha oh man 🔥",
      timestamp: "12m",
      unreadCount: 1,
    },
    {
      id: "2",
      name: "Florencio Dorrance",
      avatar: "/api/placeholder/40/40",
      lastMessage: "woohoooo",
      timestamp: "24m",
      isOnline: true,
    },
    {
      id: "3",
      name: "Lavern Laboy",
      avatar: "/api/placeholder/40/40",
      lastMessage: "Haha that's terrifying 😅",
      timestamp: "1h",
    },
    {
      id: "4",
      name: "Titus Kitamura",
      avatar: "/api/placeholder/40/40",
      lastMessage: "omg, this is amazing",
      timestamp: "5h",
    },
    {
      id: "5",
      name: "Geoffrey Mott",
      avatar: "/api/placeholder/40/40",
      lastMessage: "aww 😊",
      timestamp: "2d",
    },
    {
      id: "6",
      name: "Alfonzo Schuessler",
      avatar: "/api/placeholder/40/40",
      lastMessage: "perfect!",
      timestamp: "1m",
    },
  ];

  const messages: Message[] = [
    {
      id: "1",
      text: "omg, this is amazing",
      timestamp: "2:30 PM",
      isOwn: false,
    },
    { id: "2", text: "perfect! ✅", timestamp: "2:31 PM", isOwn: false },
    {
      id: "3",
      text: "Wow, this is really epic",
      timestamp: "2:32 PM",
      isOwn: false,
    },
    {
      id: "4",
      text: "just ideas for next time",
      timestamp: "2:35 PM",
      isOwn: false,
    },
    {
      id: "5",
      text: "I'll be there in 2 mins ⏰",
      timestamp: "2:36 PM",
      isOwn: false,
    },
    { id: "6", text: "How are you?", timestamp: "2:40 PM", isOwn: true },
    { id: "7", text: "woohoooo", timestamp: "2:41 PM", isOwn: true },
    { id: "8", text: "Haha oh man", timestamp: "2:42 PM", isOwn: true },
    { id: "9", text: "Haha that's", timestamp: "2:43 PM", isOwn: true },
    { id: "10", text: "aww", timestamp: "2:45 PM", isOwn: false },
    {
      id: "11",
      text: "omg, this is amazing",
      timestamp: "2:46 PM",
      isOwn: false,
    },
    { id: "12", text: "woohoooo 🔥", timestamp: "2:47 PM", isOwn: false },
  ];

  const navigationItems = [
    { name: "Home", active: false },
    { name: "Tours", active: false },
    { name: "Hotels", active: false },
    { name: "Vehicales", active: false },
    { name: "Orders", active: false },
    { name: "Chats", active: true },
    { name: "Gallery", active: false },
    { name: "Places", active: false },
  ];

  const handleSelectContact = (contact: Contact) => {
    setSelectedContact(contact);
    setShowMessages(false); // Hide messages list on mobile when chat is selected
  };

  const handleBackToMessages = () => {
    setShowMessages(true);
    setSelectedContact(null);
  };

  const handleSendMessage = () => {
    if (messageInput.trim()) {
      // Handle message sending logic here
      setMessageInput("");
    }
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === "Enter") {
      handleSendMessage();
    }
  };

  return (
    <div className={`flex h-screen bg-gray-100 ${className}`}>
      <div
        className={`${
          showMessages ? "flex" : "hidden"
        } lg:flex w-full lg:w-80 bg-white border-r border-gray-200 flex-col`}
      >
        <div className="p-4 border-b border-gray-200">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-xl font-semibold flex items-center">
              Messages
              <ChevronDown className="ml-2 h-4 w-4" />
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

        <div className="flex-1 overflow-y-auto">
          {contacts.map((contact) => (
            <div
              key={contact.id}
              onClick={() => handleSelectContact(contact)}
              className={`flex items-center p-4 cursor-pointer hover:bg-gray-50 ${
                selectedContact?.id === contact.id ? "bg-gray-50" : ""
              }`}
            >
              <div className="relative">
                <div className="w-12 h-12 bg-gray-300 rounded-full flex items-center justify-center">
                  <span className="text-sm font-medium text-gray-600">
                    {contact.name
                      .split(" ")
                      .map((n) => n[0])
                      .join("")}
                  </span>
                </div>
                {contact.isOnline && (
                  <div className="absolute bottom-0 right-0 w-3 h-3 bg-green-500 rounded-full border-2 border-white"></div>
                )}
              </div>

              <div className="ml-3 flex-1">
                <div className="flex items-center justify-between">
                  <h3 className="font-medium text-gray-900">{contact.name}</h3>
                  <span className="text-sm text-gray-500">
                    {contact.timestamp}
                  </span>
                </div>
                <p className="text-sm text-gray-500 truncate">
                  {contact.lastMessage}
                </p>
              </div>

              {contact.unreadCount && (
                <div className="ml-2 w-5 h-5 bg-red-500 rounded-full flex items-center justify-center">
                  <span className="text-xs text-white">
                    {contact.unreadCount}
                  </span>
                </div>
              )}
            </div>
          ))}
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
                      {selectedContact.name
                        .split(" ")
                        .map((n) => n[0])
                        .join("")}
                    </span>
                  </div>
                  {selectedContact.isOnline && (
                    <div className="absolute bottom-0 right-0 w-3 h-3 bg-green-500 rounded-full border-2 border-white"></div>
                  )}
                </div>
                <div className="ml-3">
                  <h3 className="font-medium text-gray-900">
                    {selectedContact.name}
                  </h3>
                  <p className="text-sm text-green-500">Online</p>
                </div>
              </div>
            </div>

            {/* Messages */}
            <div className="flex-1 overflow-y-auto p-4 space-y-4">
              {messages.map((message) => (
                <div
                  key={message.id}
                  className={`flex ${
                    message.isOwn ? "justify-end" : "justify-start"
                  }`}
                >
                  {!message.isOwn && (
                    <div className="w-8 h-8 bg-gray-300 rounded-full flex items-center justify-center mr-3 flex-shrink-0">
                      <span className="text-xs font-medium text-gray-600">
                        {selectedContact.name
                          .split(" ")
                          .map((n) => n[0])
                          .join("")}
                      </span>
                    </div>
                  )}
                  <div
                    className={`max-w-xs sm:max-w-md px-4 py-2 rounded-lg ${
                      message.isOwn
                        ? "bg-orange-500 text-white rounded-br-none"
                        : "bg-gray-200 text-gray-900 rounded-bl-none"
                    }`}
                  >
                    <p className="text-sm sm:text-base">{message.text}</p>
                  </div>
                  {message.isOwn && (
                    <div className="w-8 h-8 bg-gray-300 rounded-full flex items-center justify-center ml-3 flex-shrink-0">
                      <span className="text-xs font-medium text-gray-600">
                        You
                      </span>
                    </div>
                  )}
                </div>
              ))}
            </div>

            {/* Message Input */}
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
