import React, { useState } from "react";
import { BsBell } from "react-icons/bs";

const AsTopNavbar = () => {
  // State to manage the visibility of the notification box
  const [isNotificationOpen, setIsNotificationOpen] = useState(false);

  // Example notifications (like YouTube)
  const notifications = [
    {
      id: 1,
      message: "New comment on your project review!",
      time: "2 minutes ago",
    },
    {
      id: 2,
      message: "Your role has been updated by Admin.",
      time: "1 hour ago",
    },
    {
      id: 3,
      message: "You have a new message in the communication page.",
      time: "3 hours ago",
    },
    {
      id: 4,
      message: "New project review feedback is available.",
      time: "5 hours ago",
    },

    {
      id: 4,
      message: "You have a new message from the Setting page.",
      time: "3 hours ago",
    },
    {
      id: 5,
      message: "You have a new message from the Project 3.",
      time: "3 hours ago",
    },
    {
      id: 6,
      message: "You have a new message from the Project 2.",
      time: "3 hours ago",
    },
  ];

  // Toggle the notification box visibility
  const toggleNotifications = () => {
    setIsNotificationOpen(!isNotificationOpen);
  };

  return (
    <div className="flex justify-between items-center px-6 h-[80px] bg-white shadow-sm rounded-md animate-fadeInDown">
      {/* Search */}
      <input
        type="text"
        placeholder="Search here"
        className="border rounded-md px-4 py-2 w-[300px] outline-none focus:ring-2 focus:ring-[#6C63FF] focus:border-transparent transition duration-300"
      />

      <div className="flex items-center gap-6">
        {/* Notification Icon */}
        <button
          className="hover:scale-110 transition duration-300"
          onClick={toggleNotifications}
        >
          <BsBell className="text-2xl text-[#6C63FF] cursor-pointer" />
        </button>

        {/* User Info */}
        <div className="text-right">
          <p className="font-semibold text-sm">Logged in as</p>
          <p className="text-sm text-gray-500">Academic Supervisor</p>
        </div>
      </div>

      {/* Notification Box */}
      {isNotificationOpen && (
        <div className="absolute right-35 top-16 w-[350px] bg-white shadow-lg rounded-md p-4 z-50">
          <div className="flex justify-between items-center mb-3">
            <h3 className="font-semibold text-lg">Notifications</h3>
            <button
              onClick={toggleNotifications}
              className="text-gray-500 hover:text-gray-700"
            >
              <svg
                className="w-5 h-5"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                viewBox="0 0 24 24"
              >
                <path d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          </div>

          <div className="max-h-[250px] overflow-y-auto">
            {notifications.map((notification) => (
              <div
                key={notification.id}
                className="flex items-start gap-3 mb-4"
              >
                <div className="w-2 h-2 rounded-full bg-[#6C63FF] mt-1" />
                <div>
                  <p className="text-sm font-medium">{notification.message}</p>
                  <p className="text-xs text-gray-500">{notification.time}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default AsTopNavbar;
