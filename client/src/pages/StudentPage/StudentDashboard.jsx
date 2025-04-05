import React from "react";
import StudentsSideMenu from "../../StudentComponents/StudentsSideMenu/StudentsSideMenu";
import StudentTopNavbar from "../../StudentComponents/StudentTopNavbar/StudentTopNavbar";
import { FaFileAlt } from "react-icons/fa";
import { HiOutlineDocumentArrowUp } from "react-icons/hi2";
import { motion } from "framer-motion";
import user1 from "../../assets/user1.png";
import user2 from "../../assets/user2.png";
import user3 from "../../assets/user3.png";
import user4 from "../../assets/user4.png";

const fadeIn = (delay = 0) => ({
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { delay, duration: 0.6, ease: "easeOut" },
  },
});

const StudentDashboard = () => {
  return (
    <div className="flex h-screen w-full overflow-hidden bg-[#f5f7fa]">
      {/* Sidebar */}
      <StudentsSideMenu />

      {/* Main Content */}
      <div className="flex flex-col flex-1 h-full overflow-hidden">
        <StudentTopNavbar />

        {/* Dashboard Content */}
        <div className="flex-1 overflow-y-auto p-8 bg-gradient-to-br from-[#f6f9fc] to-[#e9f0f6]">
          {/* Welcome Banner */}
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.05, duration: 0.4 }}
            className="flex justify-between items-center bg-white px-6 py-4 rounded-xl shadow-lg mb-6 border border-gray-100"
          >
            <div>
              <h2 className="text-lg font-semibold text-[#1C628F]">
                Welcome to KOI Connect 👋
              </h2>
              <p className="text-sm text-gray-500">
                Stay productive. Stay connected. Achieve greatness.
              </p>
            </div>
          </motion.div>

          {/* Header */}
          <motion.div
            variants={fadeIn(0.1)}
            initial="hidden"
            animate="visible"
            className="text-center mb-10 mt-2"
          >
            <h1 className="text-4xl font-extrabold text-[#226CD1] tracking-tight leading-snug drop-shadow-sm">
              Dashboard
            </h1>
            <p className="text-gray-500 mt-1 text-md font-medium">
              Hello Brad, Welcome back 👨‍🎓
            </p>
          </motion.div>

          {/* Documents */}
          <motion.div
            variants={fadeIn(0.2)}
            initial="hidden"
            animate="visible"
            className="mb-12"
          >
            <h2 className="text-lg font-semibold text-gray-700 mb-4 px-4">
              📂 Your Documents
            </h2>
            <div className="bg-white rounded-2xl border border-gray-100 shadow-md px-6 py-8 flex justify-center gap-12">
              {["Project 1", "Project 2", "Project 3"].map((title, index) => (
                <motion.div
                  whileHover={{ scale: 1.05 }}
                  key={index}
                  className="flex flex-col items-center group transition-all duration-300"
                >
                  <div className="bg-[#FCD68E] w-24 h-24 rounded-full flex items-center justify-center shadow-lg group-hover:shadow-yellow-300/40 transition">
                    <FaFileAlt className="text-2xl text-black" />
                  </div>
                  <p className="mt-3 text-sm font-semibold text-gray-700 tracking-wide">
                    {title}
                  </p>
                </motion.div>
              ))}
            </div>
          </motion.div>

          {/* Upcoming Reports */}
          <motion.div
            variants={fadeIn(0.3)}
            initial="hidden"
            animate="visible"
            className="mb-10"
          >
            <h2 className="text-lg font-semibold text-gray-700 mb-4 px-4">
              📌 Upcoming Reports
            </h2>
            <div className="bg-white rounded-2xl border border-gray-100 shadow-md px-6 py-8 flex justify-center gap-12">
              {["Sample 1", "Sample 2", "Sample 3"].map((title, index) => (
                <motion.div
                  whileHover={{ scale: 1.05 }}
                  key={index}
                  className="flex flex-col items-center group transition-all duration-300"
                >
                  <div className="bg-[#C8FEE2] w-24 h-24 rounded-full flex items-center justify-center shadow-lg group-hover:shadow-[#b5fbd1]/40 transition">
                    <HiOutlineDocumentArrowUp className="text-3xl text-[#226CD1]" />
                  </div>
                  <p className="mt-3 text-sm font-semibold text-gray-700 tracking-wide">
                    {title}
                  </p>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </div>

        {/* Right Panel */}
        <motion.aside
          initial={{ x: 100, opacity: 0 }}
          animate={{ x: 0, opacity: 1 }}
          transition={{ delay: 0.4, duration: 0.6 }}
          className="absolute top-[80px] right-0 w-[260px] h-[calc(100%-80px)] bg-white p-6 rounded-l-xl shadow-md flex flex-col justify-between"
        >
          <div>
            <h3 className="text-lg font-semibold mb-4 text-gray-700">
              Recent Activity
            </h3>

            <motion.div
              whileHover={{ scale: 1.02 }}
              className="bg-gray-50 rounded-lg p-4 mb-4 shadow transition"
            >
              <p className="text-sm font-medium text-[#226CD1]">
                Submission Of NLP Programming
              </p>
              <div className="text-xs text-gray-500 mt-1">
                09 Jan 2025 • 02:29 pm
              </div>
            </motion.div>

            <motion.div
              whileHover={{ scale: 1.02 }}
              className="bg-gray-50 rounded-lg p-4 shadow transition"
            >
              <p className="text-sm font-medium text-[#226CD1]">
                Uploaded The Sample 6 File
              </p>
              <div className="text-xs text-gray-500 mt-1">
                12 Jan 2025 • 03:45 pm
              </div>
            </motion.div>
          </div>

          <div>
            <h3 className="text-lg font-semibold mt-8 mb-4 text-gray-700">
              Latest Message
            </h3>
            <div className="flex items-center space-x-3">
              {[user1, user2, user3, user4].map((user, index) => (
                <motion.img
                  whileHover={{ scale: 1.1 }}
                  key={index}
                  src={user}
                  alt={`user${index}`}
                  className="w-10 h-10 rounded-full shadow-sm border border-gray-200"
                />
              ))}
            </div>
          </div>
        </motion.aside>
      </div>
    </div>
  );
};

export default StudentDashboard;
