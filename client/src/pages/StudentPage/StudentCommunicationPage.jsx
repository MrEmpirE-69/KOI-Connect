import React, { useState, useEffect } from "react";
import StudentsSideMenu from "../../StudentComponents/StudentsSideMenu/StudentsSideMenu";
import StudentTopNavbar from "../../StudentComponents/StudentTopNavbar/StudentTopNavbar";

const StudentCommunicationPage = () => {
  // Example data for the chat groups with sender names for each message
  const chatGroups = [
    {
      id: 1,
      title: "Admin",
      messages: [
        { sender: "Admin", text: "How can I assist you?", time: "2 min ago" },
        { sender: "Student", text: "I need help with my project.", time: "1 min ago" },
      ],
    },
    {
      id: 2,
      title: "Client",
      messages: [
        { sender: "Client", text: "Let’s discuss the next steps.", time: "5 min ago" },
        { sender: "Student", text: "Sure, I’m ready.", time: "3 min ago" },
      ],
    },
    {
      id: 3,
      title: "Academic Supervisor",
      messages: [
        { sender: "Supervisor", text: "Please submit your progress report.", time: "10 min ago" },
        { sender: "Student", text: "I’ll submit it by tomorrow.", time: "7 min ago" },
      ],
    },
    {
      id: 4,
      title: "Team Parker Verse",
      messages: [
        { sender: "Rohan", text: "Let’s get started with the project tasks.", time: "10 min ago" },
        { sender: "Kushal", text: "I will handle the backend.", time: "7 min ago" },
        { sender: "Gagan", text: "I’ll work on the UI.", time: "5 min ago" },
        { sender: "Ankit", text: "I’m ready to start.", time: "3 min ago" },
        { sender: "Sajeet", text: "Same here.", time: "1 min ago" },
      ],
    },
  ];

  // State for selected chat group, message, and tracking which group is highlighted
  const [selectedGroup, setSelectedGroup] = useState(chatGroups[0]);
  const [message, setMessage] = useState(""); // For storing the typed message
  const [activeGroup, setActiveGroup] = useState(1); // Track active group ID for highlighting

  useEffect(() => {
    // By default, set the first chat group as selected when page loads
    setSelectedGroup(chatGroups[0]);
  }, []);

  const handleGroupClick = (groupId) => {
    const selected = chatGroups.find((group) => group.id === groupId);
    setSelectedGroup(selected);
    setActiveGroup(groupId); // Highlight the clicked group
  };

  const handleSendMessage = () => {
    if (message.trim() && selectedGroup) {
      const newMessage = {
        sender: "You", // Placeholder for the current user (can be dynamic)
        text: message,
        time: "Just now",
      };

      // Add the new message to the selected group
      const updatedGroups = chatGroups.map((group) =>
        group.id === selectedGroup.id
          ? { ...group, messages: [...group.messages, newMessage] }
          : group
      );

      // Update the state with the new message list
      setSelectedGroup({ ...selectedGroup, messages: [...selectedGroup.messages, newMessage] });
      setMessage(""); // Clear the input field
    }
  };

  return (
    <div className="flex h-screen bg-[#f9f9f9]">
      {/* Sidebar */}
      <StudentsSideMenu currentPage="communication" />

      {/* Main Section */}
      <main className="flex-1 flex flex-col overflow-hidden">
        <StudentTopNavbar />

        <div className="flex flex-1 overflow-hidden">
          {/* Chat Groups List */}
          <div className="w-full md:w-1/3 lg:w-1/4 bg-white border-r p-4 overflow-y-auto animate-fade-in-left">
            <h2 className="text-xl font-bold text-[#226CD1] mb-4">Chats</h2>
            <div className="space-y-4">
              {chatGroups.map((group) => (
                <div
                  key={group.id}
                  className={`p-3 rounded-lg shadow hover:shadow-md cursor-pointer transition flex justify-between items-start animate-fade-in-up ${
                    activeGroup === group.id
                      ? "bg-[#eef1ff] border-l-4 border-[#226CD1]"
                      : "bg-[#f9f9ff]"
                  }`}
                  onClick={() => handleGroupClick(group.id)}
                >
                  <div>
                    <p className="font-bold text-[#226CD1]">{group.title}</p>
                    <p className="text-sm text-gray-600">{group.messages[group.messages.length - 1].text}</p>
                  </div>
                  <div className="text-right text-xs text-gray-500">
                    <p>{group.messages[group.messages.length - 1].time}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Chat Window */}
          <div className="flex-1 p-6 animate-fade-in-up">
            {selectedGroup ? (
              <div className="bg-white rounded-lg p-6 shadow-md h-full flex flex-col">
                {/* Chat Header */}
                <div className="mb-4 border-b pb-2">
                  <h3 className="text-xl font-semibold text-[#226CD1]">{selectedGroup.title}</h3>
                  <p className="text-sm text-gray-500">
                    Conversation with {selectedGroup.messages.map(msg => msg.sender).join(", ")}
                  </p>
                </div>

                {/* Messages */}
                <div className="flex-1 overflow-y-auto space-y-4 pr-2">
                  {selectedGroup.messages.map((msg, index) => (
                    <div
                      key={index}
                      className={`p-3 rounded-lg max-w-xs ${
                        msg.sender === "Client" ? "bg-gray-100" : "bg-blue-500 text-white"
                      }`}
                    >
                      <p><strong>{msg.sender}:</strong> {msg.text}</p>
                      <div className="text-xs text-right">{msg.time}</div>
                    </div>
                  ))}
                </div>

                {/* Input Area */}
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
              <div className="flex justify-center items-center h-full text-center text-gray-500">
                <p>Select a group to view the conversation</p>
              </div>
            )}
          </div>
        </div>
      </main>
    </div>
  );
};

export default StudentCommunicationPage;
