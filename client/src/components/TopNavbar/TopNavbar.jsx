import React, { useState } from "react";
import adminAvatar from "../../assets/admin.png";

const TopNavbar = () => {
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
      message: "Admin updated your role!",
      time: "1 hour ago",
    },
    {
      id: 3,
      message: "You have a new message from the communication page.",
      time: "3 hours ago",
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

  // Toggle the notification box
  const toggleNotifications = () => {
    setIsNotificationOpen(!isNotificationOpen);
  };

  return (
    <div className="flex justify-between items-center px-6 h-[80px] bg-white shadow-sm rounded-md animate-fadeInDown transition-all duration-700">
      {/* Search */}
      <input
        type="text"
        placeholder="Search here"
        className="border rounded-md px-4 py-2 w-[300px] outline-none focus:ring-2 focus:ring-[#6C63FF] focus:border-transparent transition duration-300"
      />

      {/* Notifications & Admin */}
      <div className="flex items-center gap-4">
        {/* Notification Icon */}
        <button
          className="hover:scale-110 transition duration-300"
          onClick={toggleNotifications}
        >
          <svg
            className="w-6 h-6 text-[#6C63FF]"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            viewBox="0 0 24 24"
          >
            <path d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-5-5.917V4a2 2 0 10-4 0v1.083A6.002 6.002 0 004 11v3.159c0 .538-.214 1.055-.595 1.436L2 17h5m7 0v1a3 3 0 01-6 0v-1m6 0H9" />
          </svg>
        </button>

        {/* Admin Info */}
        <div className="text-right transition duration-300 hover:scale-105">
          <p className="font-semibold">Bronzo Magar</p>
          <p className="text-sm text-gray-500">Admin</p>
        </div>

        {/* Admin Avatar */}
        <img
          src={adminAvatar}
          alt="Admin"
          className="w-10 h-10 rounded-full shadow-md hover:ring-2 hover:ring-[#6C63FF] transition duration-300"
        />
      </div>

      {/* Notification Box */}
      {isNotificationOpen && (
        <div className="absolute right-55 top-16 w-[500px]  bg-white shadow-lg rounded-md p-4 z-50">
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

export default TopNavbar;
