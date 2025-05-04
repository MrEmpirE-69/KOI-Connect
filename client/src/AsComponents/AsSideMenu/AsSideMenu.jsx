import React from "react";
import { Link, useLocation } from "react-router-dom"; // Import useLocation for getting current route
import logo from "../../assets/koi.png";
import adminAvatar from "../../assets/user2.png"; // Update to use the correct avatar
import { MdDashboard, MdSettings, MdLockOutline } from "react-icons/md"; // Update icons for Academic Supervisor
import { BiMessageSquareDetail } from "react-icons/bi";
import { Paperclip } from "lucide-react";

const AsSideMenu = () => {
  const location = useLocation();
  const currentPage = location.pathname.split("/")[1];

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
              src={adminAvatar} // Update to use the correct avatar (admin or supervisor)
              alt="Academic Supervisor"
              className="w-10 h-10 rounded-full mr-3 shadow-md"
            />
            <span className="font-semibold text-lg text-[#1C628F]">
              Academic Supervisor
            </span>
          </div>

          {/* Navigation */}
          <nav className="flex flex-col gap-3 text-[#444] font-medium">
            {/* Dashboard Link */}
            <Link
              to="/as-dashboard"
              className={`flex items-center gap-2 py-2 px-3 rounded-lg transition-all duration-300 ${
                currentPage === "as-dashboard"
                  ? "bg-[#f0f2ff] text-[#226CD1] shadow-md"
                  : "hover:bg-[#f5f7ff] hover:text-[#226CD1]"
              }`}
            >
              <MdDashboard className="text-xl" />
              Dashboard
            </Link>

            {/* Project Review Link */}
            <Link
              to="/as-projectreview"
              className={`flex items-center gap-2 py-2 px-3 rounded-lg transition-all duration-300 ${
                currentPage === "as-projectreview"
                  ? "bg-[#f0f2ff] text-[#226CD1] shadow-md"
                  : "hover:bg-[#f5f7ff] hover:text-[#226CD1]"
              }`}
            >
              <MdLockOutline className="text-xl" />
              Project Review
            </Link>

            {/* Assessment Review */}
            <Link
              to="/assessment-review"
              className={`flex items-center gap-2 py-2 px-3 rounded-lg transition-all duration-300 ${
                currentPage === "assessment-review"
                  ? "bg-[#f0f2ff] text-[#226CD1] shadow-md"
                  : "hover:bg-[#f5f7ff] hover:text-[#226CD1]"
              }`}
            >
              <Paperclip className="text-xl" />
              Assessment Review
            </Link>

            {/* Communication Page Link */}
            <Link
              to="/as-communication"
              className={`flex items-center gap-2 py-2 px-3 rounded-lg transition-all duration-300 ${
                currentPage === "as-communication"
                  ? "bg-[#f0f2ff] text-[#226CD1] shadow-md"
                  : "hover:bg-[#f5f7ff] hover:text-[#226CD1]"
              }`}
            >
              <BiMessageSquareDetail className="text-xl" />
              Communication
            </Link>

            {/* Settings Link */}
            <Link
              to="/as-setting"
              className={`flex items-center gap-2 py-2 px-3 rounded-lg transition-all duration-300 ${
                currentPage === "as-setting"
                  ? "bg-[#f0f2ff] text-[#226CD1] shadow-md"
                  : "hover:bg-[#f5f7ff] hover:text-[#226CD1]"
              }`}
            >
              <MdSettings className="text-xl" />
              Settings
            </Link>
          </nav>
        </div>
      </div>

      {/* Bottom / Logout */}
      <div className="px-6 py-4">
        <Link
          to="/"
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
        </Link>
      </div>
    </aside>
  );
};

export default AsSideMenu;
