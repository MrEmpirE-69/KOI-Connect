import React from "react";
import adminAvatar from "../../assets/admin.png";

const TopNavbar = () => {
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
        <button className="hover:scale-110 transition duration-300">
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
    </div>
  );
};

export default TopNavbar;
