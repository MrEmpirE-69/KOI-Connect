import React, { useState } from "react";
import SideMenu from "../../components/SideMenu/SideMenu";
import TopNavbar from "../../components/TopNavbar/TopNavbar";
import { FaPen, FaTrash } from "react-icons/fa";

const AdminCommunicationPage = () => {
  // Example data for projects and messages
  const projects = [
    {
      id: 1,
      title: "Project 1",
      messages: [
        { sender: "Rohan", text: "I am working on it.", time: "2 min ago" },
        { sender: "Client", text: "Okay, keep me updated.", time: "1 min ago" },
      ],
    },
    {
      id: 2,
      title: "Project 2",
      messages: [
        { sender: "Gagan", text: "Done with it?", time: "5 min ago" },
        { sender: "Client", text: "Great! Let's discuss the next steps.", time: "3 min ago" },
      ],
    },
    {
      id: 3,
      title: "Project 3",
      messages: [
        { sender: "Kushal", text: "Finally Done!", time: "10 min ago" },
        { sender: "Client", text: "Awesome, thanks!", time: "7 min ago" },
      ],
    },
    {
      id: 4,
      title: "Project 4",
      messages: [
        { sender: "Client", text: "Doing Good?", time: "10 min ago" },
        { sender: "Burno", text: "Yes, making progress.", time: "5 min ago" },
      ],
    },
    {
      id: 5,
      title: "Project 5",
      messages: [
        { sender: "AS", text: "I am having a look.", time: "15 min ago" },
        { sender: "Client", text: "Great, let me know your thoughts.", time: "12 min ago" },
      ],
    },
  ];

  const [selectedProject, setSelectedProject] = useState(null);
  const [message, setMessage] = useState(""); // For storing the typed message

  const handleProjectClick = (projectId) => {
    const selected = projects.find((project) => project.id === projectId);
    setSelectedProject(selected);
  };

  const handleSendMessage = () => {
    if (message.trim() && selectedProject) {
      const newMessage = {
        sender: "You", // Placeholder for the current user (can be dynamic)
        text: message,
        time: "Just now",
      };

      // Add the new message to the selected project
      const updatedProjects = projects.map((project) =>
        project.id === selectedProject.id
          ? { ...project, messages: [...project.messages, newMessage] }
          : project
      );

      // Update the state with the new message list
      setSelectedProject({ ...selectedProject, messages: [...selectedProject.messages, newMessage] });
      setMessage(""); // Clear the input field
    }
  };

  return (
    <div className="flex h-screen bg-[#f9f9f9]">
      {/* Sidebar */}
      <SideMenu currentPage="communication" />

      {/* Main Section */}
      <main className="flex-1 flex flex-col overflow-hidden">
        <TopNavbar />

        <div className="flex flex-1 overflow-hidden">
          {/* Chat Threads List */}
          <div className="w-full md:w-1/3 lg:w-1/4 bg-white border-r p-4 overflow-y-auto animate-fade-in-left">
            <h2 className="text-xl font-bold text-[#226CD1] mb-4">Chats</h2>
            <div className="space-y-4">
              {projects.map((project) => (
                <div
                  key={project.id}
                  className="p-3 rounded-lg shadow hover:shadow-md bg-[#f9f9ff] hover:bg-[#eef1ff] cursor-pointer transition flex justify-between items-start animate-fade-in-up"
                  onClick={() => handleProjectClick(project.id)}
                >
                  <div>
                    <p className="font-bold text-[#226CD1]">{project.title}</p>
                    <p className="text-sm text-gray-600">{project.messages[project.messages.length - 1].text}</p>
                  </div>
                  <div className="text-right text-xs text-gray-500">
                    <p>{project.messages[project.messages.length - 1].time}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Chat Window */}
          <div className="flex-1 p-6 animate-fade-in-up">
            {selectedProject ? (
              <div className="bg-white rounded-lg p-6 shadow-md h-full flex flex-col">
                {/* Chat Header */}
                <div className="mb-4 border-b pb-2">
                  <h3 className="text-xl font-semibold text-[#226CD1]">{selectedProject.title}</h3>
                  <p className="text-sm text-gray-500">
                    Conversation with {selectedProject.messages[0]?.sender}
                  </p>
                </div>

                {/* Messages */}
                <div className="flex-1 overflow-y-auto space-y-4 pr-2">
                  {selectedProject.messages.map((msg, index) => (
                    <div
                      key={index}
                      className={`p-3 rounded-lg max-w-xs ${msg.sender === "Client" ? "bg-gray-100" : "bg-blue-500 text-white"} `}
                    >
                      <p>{msg.text}</p>
                      <div className="text-xs text-right">{msg.time}</div>
                    </div>
                  ))}
                </div>

                {/* Input Area */}
                <div className="mt-4 border-t pt-3 flex items-center gap-2">
                  {/* Attachment */}
                  <label
                    htmlFor="fileInput"
                    className="cursor-pointer text-gray-500 hover:text-[#226CD1] transition"
                  >
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 24 24"
                      strokeWidth={1.5}
                      stroke="currentColor"
                      className="w-6 h-6"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M15.75 9V5.25A2.25 2.25 0 0013.5 3h-3a2.25 2.25 0 00-2.25 2.25V9m9 0h-9m9 0v6.75A2.25 2.25 0 0113.5 18h-3A2.25 2.25 0 018.25 15.75V9"
                      />
                    </svg>
                  </label>
                  <input
                    type="file"
                    id="fileInput"
                    className="hidden"
                    onChange={(e) => {
                      const file = e.target.files[0];
                      if (file) {
                        alert(`Selected file: ${file.name}`);
                        // Optionally handle file upload here
                      }
                    }}
                  />

                  {/* Input */}
                  <input
                    type="text"
                    placeholder="Type a message..."
                    className="flex-1 border border-gray-300 rounded-full px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-300"
                    value={message}
                    onChange={(e) => setMessage(e.target.value)}
                  />

                  {/* Send Button */}
                  <button
                    className="bg-[#226CD1] text-white px-4 py-2 rounded-full hover:bg-blue-600 transition"
                    onClick={handleSendMessage} // Send message
                  >
                    Send
                  </button>
                </div>
              </div>
            ) : (
              <div className="flex justify-center items-center h-full text-center text-gray-500">
                <p>Select a project to view the conversation</p>
              </div>
            )}
          </div>
        </div>
      </main>
    </div>
  );
};

export default AdminCommunicationPage;
