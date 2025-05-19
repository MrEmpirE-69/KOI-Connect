import React, { useState, useEffect } from "react";
import ClientSideMenu from "./ClientSideMenu";
import ClientTopNavbar from "./ClientTopNavbar";
import { fetchChatHistory, fetchChatUsers } from "../../utils/chatApi";
import useChatSocket from "../../hooks/useChatSocket";

const ClientCommunicationPage = () => {
  const [message, setMessage] = useState("");
  const [selectedUser, setSelectedUser] = useState(null);
  const [messages, setMessages] = useState([]);
  const [chatUsers, setChatUsers] = useState([]);
  const [activeUserId, setActiveUserId] = useState(null);

  const { sendMessage } = useChatSocket({
    onReceive: (msg) => {
      if (
        msg.senderId === selectedUser?.id ||
        (msg.receiverId === selectedUser?.id &&
          msg.receiverRole === selectedUser?.role)
      ) {
        setMessages((prev) => [...prev, msg]);
      }
    },
  });

  useEffect(() => {
    async function loadUsers() {
      try {
        const users = await fetchChatUsers();
        setChatUsers(users);
        setSelectedUser(users[0]);
        setActiveUserId(users[0]?.id);
      } catch (err) {
        console.error("Failed to load chat users", err);
      }
    }
    loadUsers();
  }, []);

  useEffect(() => {
    if (selectedUser) loadMessages();
  }, [selectedUser]);

  const loadMessages = async () => {
    try {
      const data = await fetchChatHistory({
        withId: selectedUser.id,
        withRole: selectedUser.role,
      });
      setMessages(data);
    } catch (error) {
      console.error("Failed to load messages", error);
    }
  };

  const handleSendMessage = () => {
    if (!message.trim()) return;

    const payload = {
      receiverId: selectedUser.id,
      receiverRole: selectedUser.role,
      content: message.trim(),
    };

    sendMessage(payload);

    setMessages((prev) => [
      ...prev,
      {
        ...payload,
        senderRole: sessionStorage.getItem("userRole") || "CLIENT",
        senderId: parseInt(sessionStorage.getItem("userId")),
        timestamp: new Date(),
      },
    ]);
    setMessage("");
  };

  return (
    <div className="flex h-screen bg-[#f9f9f9]">
      <ClientSideMenu currentPage="communication" />
      <main className="flex-1 flex flex-col overflow-hidden">
        <ClientTopNavbar />
        <div className="flex flex-1 overflow-hidden">
          <div className="w-full md:w-1/3 lg:w-1/4 bg-white border-r p-4 overflow-y-auto">
            <h2 className="text-xl font-bold text-[#226CD1] mb-4">Chats</h2>
            <div className="space-y-2">
              {chatUsers.map((user) => (
                <div
                  key={`${user.role}-${user.id}`}
                  className={`p-3 rounded-lg shadow hover:shadow-md cursor-pointer transition flex justify-between items-start ${
                    activeUserId === user.id
                      ? "bg-[#eef1ff] border-l-4 border-[#226CD1]"
                      : "bg-[#f9f9ff]"
                  }`}
                  onClick={() => {
                    setSelectedUser(user);
                    setActiveUserId(user.id);
                  }}
                >
                  <div>
                    <p className="font-bold text-[#226CD1]">{user.title}</p>
                    <p className="text-xs text-gray-500">{user.role}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="flex-1 p-4">
            {selectedUser ? (
              <div className="bg-white rounded-xl p-6 shadow-md h-full flex flex-col">
                <div className="mb-4 border-b pb-3">
                  <h3 className="text-lg font-semibold text-[#226CD1]">
                    {selectedUser.title} ({selectedUser.role})
                  </h3>
                </div>

                <div className="flex-1 overflow-y-auto space-y-3 pr-2">
                  {messages.map((msg, index) => {
                    const currentRole = (
                      sessionStorage.getItem("userRole") || ""
                    ).toUpperCase();
                    const currentId = parseInt(
                      sessionStorage.getItem("userId")
                    );
                    const isSender =
                      msg.senderId === currentId &&
                      msg.senderRole?.toUpperCase?.() === currentRole;

                    return (
                      <div
                        key={index}
                        className={`flex ${
                          isSender ? "justify-end" : "justify-start"
                        }`}
                      >
                        <div
                          className={`p-3 rounded-lg max-w-xs ${
                            isSender
                              ? "bg-blue-500 text-white rounded-br-none"
                              : "bg-gray-200 text-gray-800 rounded-bl-none"
                          }`}
                        >
                          <p className="text-sm">{msg.content}</p>
                          <div className="text-[10px] text-right mt-1 opacity-70">
                            {new Date(msg.timestamp).toLocaleTimeString()}
                          </div>
                        </div>
                      </div>
                    );
                  })}
                </div>

                <div className="mt-4 border-t pt-3 flex items-center gap-2">
                  <input
                    type="text"
                    placeholder="Type a message..."
                    className="flex-1 border border-gray-300 rounded-full px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-300"
                    value={message}
                    onChange={(e) => setMessage(e.target.value)}
                  />
                  <button
                    className="bg-[#226CD1] text-white px-4 py-2 rounded-full hover:bg-blue-600 transition"
                    onClick={handleSendMessage}
                  >
                    Send
                  </button>
                </div>
              </div>
            ) : (
              <div className="flex justify-center items-center h-full w-full text-gray-500">
                <p>Select a user to start chatting</p>
              </div>
            )}
          </div>
        </div>
      </main>
    </div>
  );
};

export default ClientCommunicationPage;
