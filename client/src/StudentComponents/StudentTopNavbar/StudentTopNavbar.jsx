import React from "react";
import { BsBell } from "react-icons/bs";
import { motion } from "framer-motion";

const StudentTopNavbar = () => {
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
          <BsBell className="text-2xl text-[#6C63FF]" />
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
          <p className="font-semibold text-sm text-gray-700">
            Logged in as
          </p>
          <p className="text-sm text-[#6C63FF] font-bold">Student</p>
        </motion.div>
      </div>
    </motion.div>
  );
};

export default StudentTopNavbar;
