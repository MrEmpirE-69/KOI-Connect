import React from "react";
import { Link, useLocation, useNavigate } from "react-router-dom"; // Import useNavigate for programmatic navigation
import logo from "../../assets/koi.png";
import studentAvatar from "../../assets/student1.png"; // Update to the correct student avatar
import { MdDashboard, MdLock, MdSettings } from "react-icons/md";
import { BiMessageSquareDetail } from "react-icons/bi";
import { motion } from "framer-motion";

const StudentsSideMenu = () => {
  // Get the current location from react-router
  const location = useLocation();
  const currentPage = location.pathname.split("/")[1]; // Extract the page name from the URL
  const navigate = useNavigate(); // Initialize the navigate function

  // Logout handler
  const handleLogout = () => {
    // Redirect to HomePage
    navigate("/");
  };

  return (
    <motion.aside
      initial={{ x: -100, opacity: 0 }}
      animate={{ x: 0, opacity: 1 }}
      transition={{ duration: 0.5, ease: "easeOut" }}
      className="w-[250px] h-screen bg-white shadow-xl rounded-r-xl flex flex-col justify-between p-6"
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

      {/* Student Info & Nav */}
      <div className="px-6">
        {/* Avatar */}
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          className="flex items-center mb-6"
        >
          <img
            src={studentAvatar}
            alt="Student"
            className="w-12 h-12 rounded-full mr-3 shadow-lg border-2 border-gray-300"
          />
          <span className="font-semibold text-lg text-[#226CD1]">Student</span>
        </motion.div>

        {/* Navigation */}
        <nav className="flex flex-col gap-4 text-[#444] font-medium">
          {[
            {
              label: "Dashboard",
              icon: <MdDashboard className="text-xl" />,
              to: "/student-dashboard",
              active: currentPage === "student-dashboard",
            },
            {
              label: "Assessment Page",
              icon: <MdLock className="text-xl" />,
              to: "/student-assessment",
              active: currentPage === "student-assessment",
            },
            {
              label: "Communication Page",
              icon: <BiMessageSquareDetail className="text-xl" />,
              to: "/student-communication",
              active: currentPage === "student-communication",
            },
            {
              label: "Setting",
              icon: <MdSettings className="text-xl" />,
              to: "/student-setting",
              active: currentPage === "student-setting",
            },
          ].map(({ label, icon, to, active }, idx) => (
            <motion.div key={idx}>
              <Link
                to={to}
                className={`flex items-center gap-3 py-2 px-4 rounded-lg transition duration-300 ${
                  active
                    ? "bg-[#f0f2ff] text-[#226CD1] shadow-md"
                    : "hover:bg-[#f5f7ff] hover:text-[#226CD1] "
                }`}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.98 }}
              >
                {icon}
                {label}
              </Link>
            </motion.div>
          ))}
        </nav>
      </div>

      {/* Footer */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.4 }}
        className="px-6 py-4 mt-auto"
      >
        <button
          className="text-sm text-[#444] hover:text-red-600 flex items-center gap-2 transition hover:scale-105"
          onClick={handleLogout} // Add the logout functionality
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
      </motion.div>
    </motion.aside>
  );
};

export default StudentsSideMenu;
