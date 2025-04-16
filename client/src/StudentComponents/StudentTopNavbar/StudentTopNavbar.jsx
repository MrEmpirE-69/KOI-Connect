import React, { useState } from "react";
import { BsBell } from "react-icons/bs";
import { motion } from "framer-motion";

const StudentTopNavbar = () => {
  // State to manage the visibility of the notification box
  const [isNotificationOpen, setIsNotificationOpen] = useState(false);

  // Example notifications
  const notifications = [
    {
      id: 1,
      message: "New assignment posted in your course!",
      time: "5 minutes ago",
    },
    {
      id: 2,
      message: "Your project review has been approved.",
      time: "30 minutes ago",
    },
    {
      id: 3,
      message: "New message from your instructor.",
      time: "1 hour ago",
    },
    {
      id: 4,
      message: "Reminder: Assignment submission deadline tomorrow.",
      time: "2 hours ago",
    },
  ];

  // Toggle the notification box visibility
  const toggleNotifications = () => {
    setIsNotificationOpen(!isNotificationOpen);
  };

  return (
    <motion.div
      initial={{ y: -20, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.5, ease: "easeOut" }}
      className="flex justify-between items-center px-6 h-[80px] bg-white shadow-md rounded-lg backdrop-blur-md"
    >
      {/* Search Bar */}
      <div className="relative w-[320px]">
        <input
          type="text"
          placeholder="Search students, topics, or courses..."
          className="w-full px-4 py-2 text-sm text-gray-700 border border-gray-200 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-[#6C63FF] focus:border-transparent transition-all duration-300"
        />
      </div>

      {/* Right Side - Notification + Profile */}
      <div className="flex items-center gap-6">
        {/* Notification Icon */}
        <motion.div
          whileHover={{ scale: 1.2 }}
          className="relative cursor-pointer"
        >
          <BsBell className="text-2xl text-[#6C63FF]" onClick={toggleNotifications} />
          {/* Optional red dot for unread notifications */}
          <span className="absolute top-0 right-0 block h-2 w-2 rounded-full bg-red-500"></span>
        </motion.div>

        {/* User Info */}
        <motion.div
          initial={{ opacity: 0, x: 10 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.2 }}
          className="text-right"
        >
          <p className="font-semibold text-sm text-gray-700">Logged in as</p>
          <p className="text-sm text-[#6C63FF] font-bold">Student</p>
        </motion.div>
      </div>

      {/* Notification Box */}
      {isNotificationOpen && (
        <div className="absolute right-0 top-[80px] w-[350px] bg-white shadow-lg rounded-md p-4 z-50 max-h-[250px] overflow-y-auto">
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

          <div>
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
    </motion.div>
  );
};

export default StudentTopNavbar;
