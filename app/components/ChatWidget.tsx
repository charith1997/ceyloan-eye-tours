import { useState, useEffect, useRef, FormEvent } from "react";
import { X, MessageCircle, Send } from "lucide-react";
import { Message } from "../../types/chat.types";
import {
  useAddChatMutation,
  useLazyGetUserChatsQuery,
  useLazyGetUserUnreadCountQuery,
  useMarkAsReadMutation,
} from "@/services/chatApi";
import { useSelector } from "react-redux";
import { RootState } from "@/store";
import { getUserDetails } from "@/utils/auth";
import io from "socket.io-client";
import Link from "next/link";
import { ChatLoading } from "@/components/atoms/ChatLoading";

const ChatWidget = () => {
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const [messages, setMessages] = useState<Message[]>([]);
  const [inputMessage, setInputMessage] = useState<string>("");
  const [socket, setSocket] = useState<any | null>(null);
  const [unreadCount, setUnreadCount] = useState(0);
  const [isReceivingMessage, setIsReceivingMessage] = useState<boolean>(false);

  const messagesEndRef = useRef<HTMLDivElement>(null);
  const messagesContainerRef = useRef<HTMLDivElement>(null);
  const chatBoxRef = useRef<HTMLDivElement>(null);

  const isLogged = useSelector(
    (state: RootState) => state.auth.isLogged || false
  );

  const [getUserChats] = useLazyGetUserChatsQuery();
  const [addChat] = useAddChatMutation();
  const [markAsRead] = useMarkAsReadMutation();
  const [getUserUnreadCount] = useLazyGetUserUnreadCountQuery();
  const { userId } = getUserDetails();
  const backendUrl = process.env.NEXT_PUBLIC_API_BASE_URL;

  const scrollToBottom = (): void => {
    if (messagesContainerRef.current) {
      messagesContainerRef.current.scrollTop =
        messagesContainerRef.current.scrollHeight;
    }
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages,isReceivingMessage]);

  useEffect(() => {
    if (isOpen) {
      // Small delay to ensure DOM is rendered
      setTimeout(() => {
        scrollToBottom();
      }, 100);
    }
  }, [isOpen]);

  const handleClose = (): void => {
    setIsOpen(false);
  };

  const handleRead = async () => {
    await markAsRead();
  };

  const handleOpen = () => {
    handleRead();
    getUserMessages();
    setIsOpen(true);
  };

  const currentUser = (receiver_id: string, userId: string) => {
    if (receiver_id === userId) return false;
    return true;
  };

  const getUserMessages = async () => {
    const { data } = await getUserChats();
    if (data.success) {
      setMessages(data.data);
      setIsReceivingMessage(false);
    }
  };

  const handleSendMessage = async (
    e: FormEvent<HTMLFormElement>
  ): Promise<void> => {
    e.preventDefault();

    if (!inputMessage.trim()) return;

    const data = {
      senderId: userId,
      receiverId: "27c8dbf3-f1b4-4502-9020-9ea29da0013c",
      userId: userId,
      message: inputMessage,
    };

    // socket.emit("sendMessage", data);

    try {
      await addChat({ receiverId: null, message: data.message });
      socket.emit("sendNewMessage", {
        senderId: data.senderId,
        receiverId: null,
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
      setMessages([...messages, newMessage]);
      getUserMessages();

      if (inputMessage.trim()) {
        setInputMessage("");
      }
    } catch (err) {
      console.error(err);
    }
  };

  const handleUnreadMessageCount = async () => {
    const { data } = await getUserUnreadCount();
    if (data.success) {
      setUnreadCount(data.data.unreadCount);
    }
  };

  useEffect(() => {
    if (isLogged) {
      handleUnreadMessageCount();
    }
  }, [isLogged]);

  useEffect((): any => {
    const s = io(backendUrl);
    setSocket(s);

    s.emit("join", { id: userId });

    s.on("messageReceived", (data) => {
      if (data) {
        setIsReceivingMessage(true);
        getUserMessages();
        if (isOpen) {
          handleRead();
        }
        setIsOpen((current) => {
          if (!current) {
            handleUnreadMessageCount();
          } else {
            handleRead();
          }
          return current;
        });
      }
    });
    return () => s.disconnect();
  }, []);

  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      const target = event.target as Element;
      if (chatBoxRef.current && !chatBoxRef.current.contains(target)) {
        setIsOpen(false);
      }
    }

    if (isOpen) {
      document.addEventListener("mousedown", handleClickOutside);
    }

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [isOpen]);

  return (
    <>
      {!isOpen && (
        <button
          onClick={handleOpen}
          className="group fixed bottom-6 right-6 bg-gradient-to-br from-orange-500 to-orange-600 hover:from-orange-600 hover:to-orange-700 text-white rounded-full p-4 shadow-xl hover:shadow-2xl transition-all duration-300 hover:scale-110 active:scale-95 z-50 ring-2 ring-orange-200 hover:ring-orange-300 cursor-pointer"
          aria-label="Open chat"
          type="button"
        >
          <MessageCircle
            size={24}
            className="transition-transform duration-300 group-hover:rotate-12"
          />
          {unreadCount > 0 && (
            <div className="absolute -right-1 -top-2 flex h-7 w-7 items-center justify-center rounded-full bg-gradient-to-br from-red-500 to-red-600 shadow-lg ring-2 ring-white animate-pulse">
              <span className="text-xs font-bold text-white">
                {unreadCount > 99 ? "99+" : unreadCount}
              </span>
            </div>
          )}

          <span className="absolute inset-0 rounded-full bg-orange-400 opacity-0 group-hover:opacity-20 group-hover:animate-ping"></span>
        </button>
      )}

      {isOpen && (
        <div
          ref={chatBoxRef}
          className="fixed bottom-6 right-6 w-96 h-[500px] bg-white rounded-2xl shadow-2xl flex flex-col z-50 border border-gray-100 overflow-hidden backdrop-blur-sm"
        >
          {/* Header */}
          <div className="bg-gradient-to-br from-red-500 via-red-600 to-orange-500 text-white p-4 flex justify-between items-center relative overflow-hidden">
            {/* Animated background pattern */}
            <div className="absolute inset-0 opacity-10">
              <div className="absolute top-0 right-0 w-32 h-32 bg-white rounded-full -translate-y-1/2 translate-x-1/2"></div>
              <div className="absolute bottom-0 left-0 w-24 h-24 bg-white rounded-full translate-y-1/2 -translate-x-1/2"></div>
            </div>

            <div className="relative z-10">
              <h3 className="font-bold text-lg flex items-center gap-2">
                <MessageCircle size={20} className="animate-bounce" />
                Jwing Tours Support
              </h3>
              <p className="text-xs text-red-100 flex items-center gap-1">
                <span className="w-2 h-2 bg-green-400 rounded-full animate-pulse"></span>
                We&apos;re here to help!
              </p>
            </div>

            <button
              onClick={handleClose}
              className="relative z-10 hover:bg-white/20 rounded-full p-2 transition-all duration-200 hover:rotate-90 active:scale-95"
              aria-label="Close chat"
              type="button"
            >
              <X size={20} />
            </button>
          </div>

          {/* Messages Area */}
          <div
            ref={messagesContainerRef}
            className="flex-1 overflow-y-auto p-4 bg-gradient-to-b from-gray-50 to-white"
            style={{ scrollBehavior: "smooth" }}
          >
            {!isLogged ? (
              <div className="flex items-center justify-center h-full">
                <div className="text-center p-8 bg-white rounded-2xl shadow-lg border border-gray-100 transform transition-all hover:scale-105">
                  <div className="bg-gradient-to-br from-orange-100 to-red-100 w-20 h-20 rounded-full flex items-center justify-center mx-auto mb-4">
                    <MessageCircle className="text-orange-500" size={40} />
                  </div>
                  <h4 className="font-bold text-gray-800 mb-2 text-lg">
                    Please Log In
                  </h4>
                  <p className="text-gray-600 text-sm mb-6 leading-relaxed">
                    You need to be logged in to use the chat feature and connect
                    with our support team.
                  </p>
                  <Link
                    href="/login"
                    className="inline-block bg-gradient-to-r from-red-500 to-orange-500 hover:from-red-600 hover:to-orange-600 text-white px-8 py-3 rounded-xl font-semibold shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-105 active:scale-95"
                  >
                    Log In Now
                  </Link>
                </div>
              </div>
            ) : (
              <>
                {messages.length === 0 && (
                  <div className="text-center mt-12 animate-fade-in">
                    <div className="bg-gradient-to-br from-orange-50 to-red-50 rounded-2xl p-8 inline-block">
                      <div className="bg-white w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4 shadow-md">
                        <MessageCircle className="text-orange-500" size={32} />
                      </div>
                      <p className="text-gray-600 font-medium">
                        Start a conversation with us!
                      </p>
                      <p className="text-gray-400 text-sm mt-2">
                        We typically reply within minutes
                      </p>
                    </div>
                  </div>
                )}
                {messages.map((message) => (
                  <div
                    key={message.id}
                    className={`mb-4 flex ${
                      currentUser(message.receiver_id, message.user_id)
                        ? "justify-end"
                        : "justify-start"
                    } animate-slide-up`}
                  >
                    <div
                      className={`max-w-[75%] rounded-2xl p-3 shadow-sm ${
                        currentUser(message.receiver_id, message.user_id)
                          ? "bg-gradient-to-br from-orange-500 to-orange-600 text-white rounded-br-sm"
                          : "bg-white text-gray-800 border border-gray-200 rounded-bl-sm"
                      }`}
                    >
                      <p className="text-sm leading-relaxed">
                        {message.message}
                      </p>
                      {/* Optional: Add timestamp */}
                      {/* <span className="text-xs opacity-70 mt-1 block">
                {new Date(message.timestamp).toLocaleTimeString()}
              </span> */}
                    </div>
                  </div>
                ))}

                {isReceivingMessage ? (
                  <div className={`mb-4 flex animate-slide-up`}>
                    <div
                      className={`max-w-[75%] rounded-2xl p-3 shadow-sm bg-white text-gray-800 border border-gray-200 rounded-bl-sm`}
                    >
                      <ChatLoading isUser={true} />
                    </div>
                  </div>
                ) : null}
                <div ref={messagesEndRef} />
              </>
            )}
          </div>

          {/* Input Area */}
          {isLogged && (
            <form
              onSubmit={handleSendMessage}
              className="p-4 border-t border-gray-100 bg-white"
            >
              <div className="flex gap-2">
                <input
                  type="text"
                  value={inputMessage}
                  onChange={(e) => setInputMessage(e.target.value)}
                  placeholder="Type your message..."
                  className="flex-1 border border-gray-200 rounded-xl px-4 py-3 focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-transparent transition-all duration-200 bg-gray-50 focus:bg-white"
                />
                <button
                  type="submit"
                  disabled={!inputMessage.trim()}
                  className="bg-gradient-to-br from-orange-500 to-orange-600 hover:from-orange-600 hover:to-orange-700 text-white rounded-xl px-5 py-3 transition-all duration-200 hover:shadow-lg active:scale-95 disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:shadow-none disabled:active:scale-100"
                  aria-label="Send message"
                >
                  <Send size={20} />
                </button>
              </div>
            </form>
          )}
        </div>
      )}
    </>
  );
};

export default ChatWidget;
