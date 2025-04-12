import React from "react";
import { Link, useLocation, useNavigate } from "react-router-dom"; // Import useNavigate for navigation
import {
  FaClipboardList,
  FaComment,
  FaCog,
  FaSignOutAlt,
} from "react-icons/fa";
import logo from "../../assets/koi.png"; // Ensure the logo image is correctly imported
import userImage from "../../assets/user1.png"; // Replace this with the correct path to the user's image

const ClientSideMenu = () => {
  // Get the current location from react-router
  const location = useLocation();
  const currentPage = location.pathname.split("/")[1]; // Extract the page name from the URL
  const navigate = useNavigate(); // Initialize navigate function

  // Function to handle logout
  const handleLogout = () => {
    // Clear any authentication-related data if needed (e.g., remove from localStorage)
    // localStorage.removeItem('auth_token');  // Example: Removing auth token if stored

    // Navigate to the homepage
    navigate("/"); 
  };

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
          to="/client-dashboard"
          className={`flex items-center gap-2 py-2 px-3 rounded-lg ${
            currentPage === "client-dashboard"
              ? "bg-[#f0f2ff] text-[#226CD1] shadow-md"
              : "text-[#444] hover:bg-[#e0e7ff] hover:text-[#226CD1]"
          } transition duration-300`}
        >
          <FaClipboardList />
          Dashboard
        </Link>

        {/* Project Review Link */}
        <Link
          to="/client-projectreview"
          className={`flex items-center gap-2 py-2 px-3 rounded-lg ${
            currentPage === "client-projectreview"
              ? "bg-[#f0f2ff] text-[#226CD1] shadow-md"
              : "text-[#444] hover:bg-[#e0e7ff] hover:text-[#226CD1]"
          } transition-all duration-300`}
        >
          <FaClipboardList />
          Project Review
        </Link>

        {/* Communication Page Link */}
        <Link
          to="/client-communication"
          className={`flex items-center gap-2 py-2 px-3 rounded-lg ${
            currentPage === "client-communication"
              ? "bg-[#f0f2ff] text-[#226CD1] shadow-md"
              : "text-[#444] hover:bg-[#e0e7ff] hover:text-[#226CD1]"
          } transition-all duration-300`}
        >
          <FaComment />
          Communication Page
        </Link>

        {/* Settings Link */}
        <Link
          to="/client-setting"
          className={`flex items-center gap-2 py-2 px-3 rounded-lg ${
            currentPage === "client-setting"
              ? "bg-[#f0f2ff] text-[#226CD1] shadow-md"
              : "text-[#444] hover:bg-[#e0e7ff] hover:text-[#226CD1]"
          } transition-all duration-300`}
        >
          <FaCog />
          Settings
        </Link>
      </div>

      {/* Logout Button */}
      <div className="px-6 py-4 mt-auto">
        <button
          onClick={handleLogout} // Add onClick handler to navigate
          className="text-sm text-[#444] hover:text-red-600 flex gap-2 items-center"
        >
          <FaSignOutAlt />
          Logout
        </button>
      </div>
    </div>
  );
};

export default ClientSideMenu;
