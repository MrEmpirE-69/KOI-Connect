import React from "react";
import { Link } from "react-router-dom";
import {
  FaClipboardList,
  FaComment,
  FaCog,
  FaSignOutAlt,
} from "react-icons/fa";
import logo from "../../assets/koi.png"; // Make sure the logo image is correctly imported
import userImage from "../../assets/user1.png"; // Replace this with the correct path to the user's image

const ClientSideMenu = ({ currentPage }) => {
  return (
    <div className="w-[250px] shadow-xl rounded-r-xl flex flex-col h-full p-6">
      {/* Logo Section */}
      <div className="flex items-center justify-center py-6 hover:scale-105 transition duration-300">
        <img src={logo} alt="Logo" className="w-16 h-16" />
      </div>

      {/* User Profile Section */}
      <div className="flex items-center gap-3 py-4 px-3 bg-[#e6f0ff] rounded-lg">
        <img
          src={userImage}
          alt="Client"
          className="w-10 h-10 rounded-full border-2 border-[#226CD1]"
        />
        <span className="text-[#226CD1] font-semibold text-lg">Client</span>
      </div>

      {/* Menu Items */}
      <div className="flex flex-col gap-4 mt-4">
        {/* Dashboard Link */}
        <Link
          to="/client/dashboard"
          className={`flex items-center gap-2 py-2 px-3 rounded-lg ${
            currentPage === "dashboard"
              ? "bg-[#f0f2ff] text-[#226CD1]"
              : "text-[#444]"
          } hover:bg-[#e0e7ff] hover:text-[#226CD1] transition duration-300`}
        >
          <FaClipboardList />
          Dashboard
        </Link>

        {/* Project Review Link */}
        <Link
          to="/client/project-review"
          className={`flex items-center gap-2 py-2 px-3 rounded-lg ${
            currentPage === "project-review"
              ? "bg-[#f0f2ff] text-[#226CD1]"
              : "text-[#444]"
          } hover:bg-[#e0e7ff] hover:text-[#226CD1] transition duration-300`}
        >
          <FaClipboardList />
          Project Review
        </Link>

        {/* Communication Page Link */}
        <Link
          to="/client/communication"
          className={`flex items-center gap-2 py-2 px-3 rounded-lg ${
            currentPage === "communication"
              ? "bg-[#f0f2ff] text-[#226CD1]"
              : "text-[#444]"
          } hover:bg-[#e0e7ff] hover:text-[#226CD1] transition duration-300`}
        >
          <FaComment />
          Communication Page
        </Link>

        {/* Settings Link */}
        <Link
          to="/client/settings"
          className={`flex items-center gap-2 py-2 px-3 rounded-lg ${
            currentPage === "settings"
              ? "bg-[#f0f2ff] text-[#226CD1]"
              : "text-[#444]"
          } hover:bg-[#e0e7ff] hover:text-[#226CD1] transition duration-300`}
        >
          <FaCog />
          Settings
        </Link>
      </div>

      {/* Logout Button */}
      <div className="px-6 py-4 mt-auto">
        <button className="text-sm text-[#444] hover:text-red-600 flex gap-2 items-center">
          <FaSignOutAlt />
          Logout
        </button>
      </div>
    </div>
  );
};

export default ClientSideMenu;
