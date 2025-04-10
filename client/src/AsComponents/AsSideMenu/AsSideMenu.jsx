import React from "react";
import { Link } from "react-router-dom"; // Import Link for navigation
import logo from "../../assets/koi.png";
import avatar from "../../assets/student.png";
import { MdDashboard, MdSettings, MdLockOutline } from "react-icons/md";
import { BiMessageSquareDetail } from "react-icons/bi";
import { motion } from "framer-motion";

const AsSideMenu = ({ currentPage }) => {
  return (
    <motion.aside
      initial={{ x: -100, opacity: 0 }}
      animate={{ x: 0, opacity: 1 }}
      transition={{ duration: 0.5, ease: "easeOut" }}
      className="w-[250px] h-full bg-white shadow-2xl rounded-r-xl flex flex-col justify-between"
    >
      {/* Logo */}
      <div className="flex flex-col items-center py-6">
        <motion.img
          src={logo}
          alt="KOI Logo"
          className="w-20 h-20"
          initial={{ scale: 0.9 }}
          animate={{ scale: 1 }}
          transition={{ delay: 0.2 }}
        />
      </div>

      {/* Info Section */}
      <div className="px-6">
        <div className="flex items-center mb-6">
          <motion.img
            src={avatar}
            alt="Academic Supervisor"
            className="w-10 h-10 rounded-full mr-3 shadow-md"
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
          />
          <span className="font-semibold text-sm text-[#1C628F]">
            Academic Supervisor
          </span>
        </div>

        {/* Navigation Links */}
        <nav className="flex flex-col gap-3 text-[#444] font-medium">
          {/* Dashboard Link */}
          <motion.div key="dashboard">
            <Link
              to="/as-dashboard" // Redirect to the dashboard
              className={`flex items-center gap-2 py-2 px-3 rounded-lg transition duration-300 ${
                currentPage === "dashboard"
                  ? "bg-[#f0f2ff] text-[#226CD1] shadow-md"
                  : "hover:bg-[#f5f7ff] hover:text-[#226CD1]"
              }`}
              whileHover={{ scale: 1.03 }}
              whileTap={{ scale: 0.98 }}
            >
              <MdDashboard className="text-xl" />
              Dashboard
            </Link>
          </motion.div>

          {/* Project Review Link */}
          <motion.div key="project-review">
            <Link
              to="/as-projectreview" // Redirect to project review
              className={`flex items-center gap-2 py-2 px-3 rounded-lg transition duration-300 ${
                currentPage === "project-review"
                  ? "bg-[#f0f2ff] text-[#226CD1] shadow-md"
                  : "hover:bg-[#f5f7ff] hover:text-[#226CD1]"
              }`}
              whileHover={{ scale: 1.03 }}
              whileTap={{ scale: 0.98 }}
            >
              <MdLockOutline className="text-xl" />
              Project Review
            </Link>
          </motion.div>

          {/* Communication Page Link */}
          <motion.div key="communication">
            <Link
              to="/as-communication" // Redirect to communication page
              className={`flex items-center gap-2 py-2 px-3 rounded-lg transition duration-300 ${
                currentPage === "communication"
                  ? "bg-[#f0f2ff] text-[#226CD1] shadow-md"
                  : "hover:bg-[#f5f7ff] hover:text-[#226CD1]"
              }`}
              whileHover={{ scale: 1.03 }}
              whileTap={{ scale: 0.98 }}
            >
              <BiMessageSquareDetail className="text-xl" />
              Communication Page
            </Link>
          </motion.div>

          {/* Setting Link */}
          <motion.div key="setting">
            <Link
              to="/as-setting" // Redirect to settings
              className={`flex items-center gap-2 py-2 px-3 rounded-lg transition duration-300 ${
                currentPage === "setting"
                  ? "bg-[#f0f2ff] text-[#226CD1] shadow-md"
                  : "hover:bg-[#f5f7ff] hover:text-[#226CD1]"
              }`}
              whileHover={{ scale: 1.03 }}
              whileTap={{ scale: 0.98 }}
            >
              <MdSettings className="text-xl" />
              Setting
            </Link>
          </motion.div>
        </nav>
      </div>

      {/* Logout Button with Icon */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.4 }}
        className="px-6 py-4 flex items-center gap-2 text-sm text-[#444] cursor-pointer hover:text-red-500 hover:scale-105 transition-all duration-300"
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          className="h-5 w-5"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
          strokeWidth={2}
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M17 16l4-4m0 0l-4-4m4 4H7m7 4v-8a3 3 0 00-3-3h-2a3 3 0 00-3 3v8"
          />
        </svg>
        Logout
      </motion.div>
    </motion.aside>
  );
};

export default AsSideMenu;
