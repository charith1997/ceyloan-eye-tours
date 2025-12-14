import { useState, useEffect, useRef, FormEvent } from "react";
import { X, MessageCircle, Send } from "lucide-react";
import { Message } from "../../types/chat.types";
import { useLazyGetUserChatsQuery } from "@/services/chatApi";
import { useSelector } from "react-redux";
import { RootState } from "@/store";
import { getUserDetails } from "@/utils/auth";
import io from "socket.io-client";

const ChatWidget = () => {
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const [messages, setMessages] = useState<Message[]>([]);
  const [inputMessage, setInputMessage] = useState<string>("");
  const [socket, setSocket] = useState<any | null>(null);

  const messagesEndRef = useRef<HTMLDivElement>(null);
  const [getUserChats] = useLazyGetUserChatsQuery();
  const isLogged = useSelector(
    (state: RootState) => state.auth.isLogged || false
  );
  const { userId } = getUserDetails();
  const backendUrl = process.env.NEXT_PUBLIC_API_BASE_URL;

  const scrollToBottom = (): void => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const handleClose = (): void => {
    setIsOpen(false);
  };

  const handleOpen = (): void => {
    setIsOpen(true);
  };

  const currentUser = (receiver_id: string, userId: string) => {
    if (receiver_id === userId) return false;
    return true;
  };

  const getUserMessages = async () => {
    const { data } = await getUserChats();
    if (data.success) setMessages(data.data);
  };

  const handleSendMessage = (e: FormEvent<HTMLFormElement>): void => {
    e.preventDefault();

    if (!inputMessage.trim()) return;

    const data = {
      senderId: userId,
      receiverId: "27c8dbf3-f1b4-4502-9020-9ea29da0013c",
      userId: userId,
      message: inputMessage,
    };

    socket.emit("sendMessage", data);

    if (inputMessage.trim()) {
      setInputMessage("");
    }
  };

  const getChat = async () => {
    const { data } = await getUserChats();
    if (data.success) setIsOpen(data.data);
  };

  useEffect(() => {
    if (isLogged) {
      getUserMessages();
    }
  }, [isLogged]);

  useEffect((): any => {
    const s = io(backendUrl);
    setSocket(s);

    s.emit("join", { id: userId });

    s.on("messageReceived", (data) => {
      if (data) {
        getChat();
      }
    });
    return () => s.disconnect();
  }, []);

  return (
    <>
      {!isOpen && (
        <button
          onClick={handleOpen}
          className="fixed bottom-6 right-6 bg-orange-600 hover:bg-orange-700 text-white rounded-full p-4 shadow-lg transition-all duration-300 hover:scale-110 z-50"
          aria-label="Open chat"
          type="button"
        >
          <MessageCircle size={24} />
        </button>
      )}

      {isOpen && (
        <div className="fixed bottom-6 right-6 w-96 h-[500px] bg-white rounded-lg shadow-2xl flex flex-col z-50 border border-gray-200">
          <div className="bg-gradient-to-r from-red to-orange text-white p-4 rounded-t-lg flex justify-between items-center">
            <div>
              <h3 className="font-semibold text-lg">Jwing Tours Support</h3>
              <p className="text-xs">We're here to help!</p>
            </div>
            <button
              onClick={handleClose}
              className="hover:bg-red-700 rounded-full p-1 transition-colors"
              aria-label="Close chat"
              type="button"
            >
              <X size={20} />
            </button>
          </div>

          {/* Messages Area */}
          <div className="flex-1 overflow-y-auto p-4 bg-gray-50">
            {!isLogged ? (
              <div className="flex items-center justify-center h-full">
                <div className="text-center p-6 bg-white rounded-lg shadow-sm border border-gray-200">
                  <MessageCircle
                    className="mx-auto mb-3 text-gray-400"
                    size={48}
                  />
                  <h4 className="font-semibold text-gray-800 mb-2">
                    Please Log In
                  </h4>
                  <p className="text-gray-600 text-sm mb-4">
                    You need to be logged in to use the chat feature.
                  </p>
                  <button
                    onClick={() => {
                      window.location.href = "/login";
                    }}
                    className="bg-gradient-to-r from-red to-orange text-white px-6 py-2 rounded-lg"
                    type="button"
                  >
                    Log In
                  </button>
                </div>
              </div>
            ) : (
              <>
                {messages.length === 0 && (
                  <div className="text-center text-gray-500 mt-8">
                    <p className="text-sm">Start a conversation with us!</p>
                  </div>
                )}
                {messages.map((message) => (
                  <div
                    key={message.id}
                    className={`mb-4 flex ${
                      currentUser(message.receiver_id, message.user_id)
                        ? "justify-end"
                        : "justify-start"
                    }`}
                  >
                    <div
                      className={`max-w-[75%] rounded-lg p-3 ${
                        currentUser(message.receiver_id, message.user_id)
                          ? "bg-blue-600 text-white"
                          : "bg-white text-gray-800 border border-gray-200"
                      }`}
                    >
                      <p className="text-sm">{message.message}</p>
                    </div>
                  </div>
                ))}
                <div ref={messagesEndRef} />
              </>
            )}
          </div>

          {isLogged && (
            <form
              onSubmit={handleSendMessage}
              className="p-4 border-t border-gray-200 bg-white rounded-b-lg"
            >
              <div className="flex gap-2">
                <input
                  type="text"
                  value={inputMessage}
                  onChange={(e) => setInputMessage(e.target.value)}
                  placeholder="Type your message..."
                  className="flex-1 border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                />
                <button
                  type="submit"
                  className="bg-blue-600 hover:bg-blue-700 text-white rounded-lg px-4 py-2 transition-colors"
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
