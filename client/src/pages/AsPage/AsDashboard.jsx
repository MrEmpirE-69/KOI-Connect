import React, { useState } from "react";
import AsSideMenu from "../../AsComponents/AsSideMenu/AsSideMenu";  
import AsTopNavbar from "../../AsComponents/AsTopNavbar/AsTopNavbar"; 
import { FaFileAlt, FaArrowCircleUp } from "react-icons/fa";
import user1 from "../../assets/user1.png";
import user2 from "../../assets/user2.png";
import user3 from "../../assets/user3.png";
import Calendar from "react-calendar";
import "react-calendar/dist/Calendar.css"; // Styling for the calendar
import { motion } from "framer-motion"; // Importing motion for animations

const AsDashboard = () => {
  const [date, setDate] = useState(new Date()); // State to manage the selected date

  const handleDateChange = (newDate) => {
    setDate(newDate); // Handle date change from the calendar
  };

  return (
    <div className="flex h-screen w-full bg-gradient-to-br from-[#f9f9f9] to-[#f0f4f8] overflow-hidden">
      {/* Sidebar */}
      <AsSideMenu />

      {/* Main Content */}
      <div className="flex flex-col flex-1 h-full overflow-hidden">
        <AsTopNavbar />

        <div className="flex-1 overflow-y-auto p-8 grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Main Content Area */}
          <div className="col-span-2">
            {/* Title */}
            <div className="text-center mb-10">
              <motion.h1
                initial={{ opacity: 0, y: -30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, ease: "easeOut" }}
                className="text-4xl font-extrabold text-[#226CD1]"
              >
                Dashboard
              </motion.h1>
              <p className="text-md text-gray-600 font-medium mt-2">Hello ABC, Welcome back</p>
            </div>

            {/* Submission Box */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, ease: "easeOut" }}
              className="bg-white rounded-xl p-8 shadow-lg mb-12"
            >
              <div className="flex justify-between items-center mb-6">
                <h2 className="text-md font-bold bg-[#e4e4e4] rounded-full px-4 py-1 shadow-lg">
                  Recent Submissions
                </h2>
                <h2 className="text-md font-bold bg-[#e4e4e4] rounded-full px-4 py-1 shadow-lg">
                  ICT301 IT Project 1
                </h2>
              </div>

              <div className="flex justify-between items-center gap-8">
                {/* Document Section */}
                <motion.div
                  whileHover={{ scale: 1.05 }}
                  className="flex flex-col items-center bg-[#fcd68e] p-6 rounded-lg shadow-md w-full hover:shadow-xl transition-all duration-300"
                >
                  <FaFileAlt className="text-5xl text-[#fff] mb-4" />
                  <p className="font-semibold text-lg text-white">Project 2</p>
                </motion.div>

                {/* Students List */}
                <div className="bg-white p-6 rounded-lg shadow-md w-full">
                  <div className="font-semibold text-center mb-4">Students Involved</div>
                  {[user1, user2, user3].map((user, i) => (
                    <div key={i} className="flex items-center gap-3 mb-3">
                      <img src={user} alt={`user${i}`} className="w-10 h-10 rounded-full" />
                      <span className="font-medium text-gray-700">
                        {["Kushal Nepal", "Gagan Bohara", "Rohan Poudel"][i]}
                      </span>
                    </div>
                  ))}
                  <div className="text-center mt-4">
                    <a href="#" className="text-blue-600 hover:underline">More students...</a>
                  </div>
                </div>

                {/* Side Project List */}
                <div className="flex flex-col items-end gap-4 w-full">
                  {["Project 3", "Project 2", "Project 1"].map((p, idx) => (
                    <motion.div
                      key={idx}
                      whileHover={{ scale: 1.05 }}
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.5, delay: idx * 0.2 }}
                      className="bg-[#fcd68e] px-4 py-2 rounded-lg shadow-md w-full text-white flex justify-between items-center hover:shadow-xl transition-all duration-300"
                    >
                      <FaFileAlt className="inline-block text-xl" />
                      <span className="ml-2">{p}</span>
                    </motion.div>
                  ))}
                </div>
              </div>

              {/* Buttons */}
              <div className="flex justify-between gap-8 mt-6">
                <button className="bg-[#6C63FF] text-white text-sm px-6 py-3 rounded-lg shadow-md hover:bg-[#5b52cc] transition duration-300 w-1/2">
                  Open Review Page
                </button>
                <button className="bg-white text-[#6C63FF] text-sm px-6 py-3 border rounded-lg shadow-md hover:bg-[#f3f4f7] transition duration-300 w-1/2">
                  Download
                </button>
              </div>
            </motion.div>

            {/* Upcoming & Assign Projects */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              {/* Upcoming Events */}
              <motion.div
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, ease: "easeOut" }}
                className="bg-white p-8 rounded-xl shadow-lg text-center hover:shadow-xl transition-all duration-300"
              >
                <h3 className="font-bold mb-4 text-[#1C628F]">Upcoming Events</h3>
                <motion.div
                  whileHover={{ scale: 1.1 }}
                  className="bg-green-200 rounded-full w-32 h-32 mx-auto flex items-center justify-center mt-4"
                >
                  <p className="text-xl font-semibold text-[#1C628F]">Sample 1</p>
                </motion.div>
              </motion.div>

              {/* Assign Project */}
              <motion.div
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, ease: "easeOut" }}
                className="bg-white p-8 rounded-xl shadow-lg text-center hover:shadow-xl transition-all duration-300"
              >
                <h3 className="font-bold mb-4 text-[#1C628F]">Assign the Project</h3>
                <div className="bg-gray-100 p-6 rounded-lg mb-6">
                  {["Sample 1", "Sample 2", "Sample 3"].map((project, idx) => (
                    <motion.div
                      key={idx}
                      whileHover={{ scale: 1.05 }}
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.5, delay: idx * 0.2 }}
                      className="bg-white p-2 rounded shadow-sm mb-4"
                    >
                      {project}
                    </motion.div>
                  ))}
                </div>
                <button className="bg-[#22D1EE] text-white font-semibold px-6 py-3 rounded-full shadow-md hover:bg-[#1a9fcb] transition duration-300">
                  Assign Now
                </button>
              </motion.div>
            </div>

            {/* Calendar Section */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, ease: "easeOut" }}
              className="bg-white p-8 rounded-xl shadow-lg mt-10"
            >
              <h3 className="font-bold mb-6 text-[#1C628F]">Select a Date</h3>
              <div className="flex justify-center">
                <Calendar
                  onChange={handleDateChange}
                  value={date}
                  className="rounded-lg shadow-lg"
                />
              </div>
            </motion.div>
          </div>

          {/* Right Panel - Recent Activity and Latest Message */}
          <div className="col-span-1">
            <motion.div
              initial={{ opacity: 0, x: 100 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6, ease: "easeOut" }}
              className="bg-white p-6 rounded-xl shadow-lg mb-8"
            >
              <h3 className="font-semibold text-lg text-[#1C628F] mb-4">Recent Activity</h3>
              <div className="flex flex-col gap-4">
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.2 }}
                  className="flex items-center gap-3"
                >
                  <FaArrowCircleUp className="text-xl text-[#6C63FF]" />
                  <div className="text-sm font-medium text-gray-700">
                    Submission Of NLP Programming
                    <p className="text-xs text-gray-500">09 Jan 2025 • 02:29 pm</p>
                  </div>
                </motion.div>
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.3 }}
                  className="flex items-center gap-3"
                >
                  <FaArrowCircleUp className="text-xl text-[#6C63FF]" />
                  <div className="text-sm font-medium text-gray-700">
                    Uploaded The Sample 6 File
                    <p className="text-xs text-gray-500">12 Jan 2025 • 03:45 pm</p>
                  </div>
                </motion.div>
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 100 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6, ease: "easeOut" }}
              className="bg-white p-6 rounded-xl shadow-lg"
            >
              <h3 className="font-semibold text-lg text-[#1C628F] mb-4">Latest Message</h3>
              <div className="flex items-center space-x-3">
                {[user1, user2, user3].map((user, idx) => (
                  <img
                    key={idx}
                    src={user}
                    alt={`user${idx}`}
                    className="w-10 h-10 rounded-full shadow-sm"
                  />
                ))}
              </div>
            </motion.div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AsDashboard;
