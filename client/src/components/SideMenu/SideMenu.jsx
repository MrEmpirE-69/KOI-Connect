import React from "react";
import { Link, useNavigate } from "react-router-dom";
import logo from "../../assets/koi.png";
import adminAvatar from "../../assets/admin.png";
import { MdDashboard, MdSettings, MdLock } from "react-icons/md";
import { BiMessageSquareDetail } from "react-icons/bi";

const SideMenu = ({ currentPage }) => {
  const navigate = useNavigate();

  const handleLogout = () => {
    sessionStorage.clear();
    navigate("/login");
  };

  return (
    <aside className="w-[250px] h-full bg-[#c5dbf0] shadow-md flex flex-col justify-between animate-slideInLeft transition-all duration-700">
      {/* Top Section */}
      <div>
        {/* Logo */}
        <div className="flex items-center justify-center py-6 transition hover:scale-105 duration-300">
          <img src={logo} alt="KOI Logo" className="w-20 h-20" />
        </div>

        {/* Admin Info */}
        <div className="px-6">
          <div className="flex items-center mb-6">
            <img
              src={adminAvatar}
              alt="Admin"
              className="w-10 h-10 rounded-full mr-3 shadow-md"
            />
            <span className="font-semibold text-lg text-[#1C628F]">Admin</span>
          </div>

          {/* Navigation */}
          <nav className="flex flex-col gap-3 text-[#444] font-medium">
            {/* Dashboard Link */}
            <Link
              to="/admin-dashboard"
              className={`flex items-center gap-2 py-2 px-3 rounded-lg ${
                currentPage === "dashboard"
                  ? "bg-[#f0f2ff] text-[#226CD1] shadow-sm"
                  : "hover:bg-[#f5f7ff] hover:text-[#226CD1]"
              } transition hover:scale-[1.02]`}
            >
              <MdDashboard className="text-xl" />
              Dashboard
            </Link>

            {/* Project Review Link */}
            <Link
              to="/admin-projectreview"
              className={`flex items-center gap-2 py-2 px-3 rounded-lg ${
                currentPage === "projectReview"
                  ? "bg-[#f0f2ff] text-[#226CD1] shadow-sm"
                  : "hover:bg-[#f5f7ff] hover:text-[#226CD1]"
              } transition-all duration-300`}
            >
              <MdLock className="text-xl" />
              Project Review
            </Link>

            {/* Communication Page Link */}
            <Link
              to="/admin-communication"
              className={`flex items-center gap-2 py-2 px-3 rounded-lg ${
                currentPage === "communication"
                  ? "bg-[#f0f2ff] text-[#226CD1] shadow-sm"
                  : "hover:bg-[#f5f7ff] hover:text-[#226CD1]"
              } transition-all duration-300`}
            >
              <BiMessageSquareDetail className="text-xl" />
              Communication Page
            </Link>

            {/* Settings Link */}
            <Link
              to="/admin-setting"
              className={`flex items-center gap-2 py-2 px-3 rounded-lg ${
                currentPage === "setting"
                  ? "bg-[#f0f2ff] text-[#226CD1] shadow-sm"
                  : "hover:bg-[#f5f7ff] hover:text-[#226CD1]"
              } transition-all duration-300`}
            >
              <MdSettings className="text-xl" />
              Settings
            </Link>
          </nav>
        </div>
      </div>

      {/* Bottom / Logout */}
      <div className="px-6 py-4">
        <button
          onClick={handleLogout}
          className="flex items-center gap-2 text-sm text-[#444] hover:text-red-600 transition-all hover:scale-105"
        >
          <svg
            width="20"
            height="20"
            fill="currentColor"
            className="transition duration-300"
          >
            <path d="M5 3a2 2 0 00-2 2v10a2 2 0 002 2h6a2 2 0 002-2v-4h2v4a4 4 0 01-4 4H5a4 4 0 01-4-4V5a4 4 0 014-4h6a4 4 0 014 4v4h-2V5a2 2 0 00-2-2H5z" />
            <path d="M13 9l4 3-4 3V9z" />
          </svg>
          Logout
        </button>
      </div>
    </aside>
  );
};

export default SideMenu;
