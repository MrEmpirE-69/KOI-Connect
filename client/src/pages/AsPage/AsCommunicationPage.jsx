import React, { useState } from "react";

import AsSideMenu from "../../AsComponents/AsSideMenu/AsSideMenu";
import AsTopNavbar from "../../AsComponents/AsTopNavbar/AsTopNavbar";


const AsCommunicationPage = () => {
    const projects = [
      {
        title: "Project 1",
        message: "Rohan - I am working on it",
        time: "2 min ago",
        count: 3,
      },
      {
        title: "Project 2",
        message: "Gagan - Done with it?",
        time: "2 min ago",
        count: 4,
      },
      {
        title: "Project 3",
        message: "Kushal - Finally Done!",
        time: "2 min ago",
        count: 0,
      },
      {
        title: "Project 4",
        message: "Client - Doing Good?",
        time: "2 min ago",
        count: 0,
      },
      {
        title: "Project 5",
        message: "AS - I am having a look",
        time: "2 min ago",
        count: 0,
      },
    ];
  
    return (
      <div className="flex h-screen bg-[#f9f9f9]">
        {/* Sidebar */}
        <AsSideMenu currentPage="communication" />
  
        {/* Main Section */}
        <main className="flex-1 flex flex-col overflow-hidden">
          <AsTopNavbar />
  
          <div className="flex flex-1 overflow-hidden">
            {/* Chat Threads List */}
            <div className="w-full md:w-1/3 lg:w-1/4 bg-white border-r p-4 overflow-y-auto animate-fade-in-left">
              <h2 className="text-xl font-bold text-[#226CD1] mb-4">Chats</h2>
              <div className="space-y-4">
                {projects.map((project, idx) => (
                  <div
                    key={idx}
                    className="p-3 rounded-lg shadow hover:shadow-md bg-[#f9f9ff] hover:bg-[#eef1ff] cursor-pointer transition flex justify-between items-start animate-fade-in-up"
                    style={{
                      animationDelay: `${idx * 80}ms`,
                      animationFillMode: "backwards",
                    }}
                  >
                    <div>
                      <p className="font-bold text-[#226CD1]">{project.title}</p>
                      <p className="text-sm text-gray-600">{project.message}</p>
                    </div>
                    <div className="text-right text-xs text-gray-500">
                      <p>{project.time}</p>
                      {project.count > 0 && (
                        <span className="mt-1 inline-block bg-red-500 text-white text-xs font-semibold px-2 py-1 rounded-full">
                          {project.count}
                        </span>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            </div>
  
            {/* Chat Window */}
            <div className="hidden md:flex flex-col flex-1 p-6 animate-fade-in-up">
              <div className="bg-white rounded-lg p-6 shadow-md h-full flex flex-col">
                {/* Chat Header */}
                <div className="mb-4 border-b pb-2">
                  <h3 className="text-xl font-semibold text-[#226CD1]">
                    Project 1
                  </h3>
                  <p className="text-sm text-gray-500">Conversation with Rohan</p>
                </div>
  
                {/* Messages */}
                <div className="flex-1 overflow-y-auto space-y-4 pr-2">
                  <div className="self-start bg-gray-100 p-3 rounded-lg max-w-xs">
                    Hey! Just checking on the status.
                  </div>
                  <div className="self-end bg-blue-500 text-white p-3 rounded-lg max-w-xs">
                    I'm working on it, should be done soon.
                  </div>
                  <div className="self-start bg-gray-100 p-3 rounded-lg max-w-xs">
                    Awesome, thanks!
                  </div>
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
                  />
  
                  {/* Send Button */}
                  <button className="bg-[#226CD1] text-white px-4 py-2 rounded-full hover:bg-blue-600 transition">
                    Send
                  </button>
                </div>
              </div>
            </div>
          </div>
        </main>
      </div>
    );
  };
  
  export default AsCommunicationPage;
  