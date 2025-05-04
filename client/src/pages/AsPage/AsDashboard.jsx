import React, { useState } from "react";
import AsSideMenu from "../../AsComponents/AsSideMenu/AsSideMenu";
import AsTopNavbar from "../../AsComponents/AsTopNavbar/AsTopNavbar";
import { FaFileAlt, FaArrowCircleUp } from "react-icons/fa";
import user1 from "../../assets/user1.png";
import user2 from "../../assets/user2.png";
import user3 from "../../assets/user3.png";
import Calendar from "react-calendar";
import "react-calendar/dist/Calendar.css";

const AsDashboard = () => {
  const [date, setDate] = useState(new Date());

  const handleDateChange = (newDate) => {
    setDate(newDate);
  };

  return (
    <div className="flex h-screen bg-[#f5f6fa] overflow-hidden">
      {/* Sidebar */}
      <AsSideMenu />

      {/* Main Content */}
      <div className="flex flex-col flex-1 h-full overflow-hidden">
        <AsTopNavbar />

        <div className="flex-1 overflow-y-auto px-8 gap-8">
          {/* Main Content Area */}
          <div className="col-span-2">
            {/* Title */}
            <div className="text-left py-4">
              <h1 className="text-4xl font-extrabold text-[#226CD1]">
                Dashboard
              </h1>
              <p className="text-md text-gray-600 font-medium mt-2">
                Hello ABC, Welcome back
              </p>
            </div>

            {/* Submission Box */}
            <div className="bg-white rounded-xl p-8 shadow-lg mb-12 ">
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
                <div
                  whileHover={{ scale: 1.05 }}
                  className="flex flex-col items-center bg-[#fcd68e] p-6 rounded-lg shadow-md w-full hover:shadow-xl transition-all duration-300"
                >
                  <FaFileAlt className="text-5xl text-[#fff] mb-4" />
                  <p className="font-semibold text-lg text-white">Project 2</p>
                </div>

                {/* Students List */}
                <div className="bg-white p-6 rounded-lg shadow-md w-full">
                  <div className="font-semibold text-center mb-4">
                    Students Involved
                  </div>
                  {[user1, user2, user3].map((user, i) => (
                    <div key={i} className="flex items-center gap-3 mb-3">
                      <img
                        src={user}
                        alt={`user${i}`}
                        className="w-10 h-10 rounded-full"
                      />
                      <span className="font-medium text-gray-700">
                        {["Kushal Nepal", "Gagan Bohara", "Rohan Poudel"][i]}
                      </span>
                    </div>
                  ))}
                  <div className="text-center mt-4">
                    <a href="#" className="text-blue-600 hover:underline">
                      More students...
                    </a>
                  </div>
                </div>

                {/* Side Project List */}
                <div className="flex flex-col items-end gap-4 w-full">
                  {["Project 3", "Project 2", "Project 1"].map((p, idx) => (
                    <div
                      key={idx}
                      className="bg-[#fcd68e] px-4 py-2 rounded-lg shadow-md w-full text-white flex justify-between items-center hover:shadow-xl transition-all duration-300"
                    >
                      <FaFileAlt className="inline-block text-xl" />
                      <span className="ml-2">{p}</span>
                    </div>
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
            </div>

            {/* Upcoming & Assign Projects */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              {/* Upcoming Events */}
              <div className="bg-white p-8 rounded-xl shadow-lg text-center hover:shadow-xl transition-all duration-300">
                <h3 className="font-bold mb-4 text-[#1C628F]">
                  Upcoming Events
                </h3>
                <div className="bg-green-200 rounded-full w-32 h-32 mx-auto flex items-center justify-center mt-4">
                  <p className="text-xl font-semibold text-[#1C628F]">
                    Sample 1
                  </p>
                </div>
              </div>

              {/* Assign Project */}
              <div className="bg-white p-8 rounded-xl shadow-lg text-center hover:shadow-xl transition-all duration-300">
                <h3 className="font-bold mb-4 text-[#1C628F]">
                  Assign the Project
                </h3>
                <div className="bg-gray-100 p-6 rounded-lg mb-6">
                  {["Sample 1", "Sample 2", "Sample 3"].map((project, idx) => (
                    <div
                      key={idx}
                      className="bg-white p-2 rounded shadow-sm mb-4"
                    >
                      {project}
                    </div>
                  ))}
                </div>
                <button className="bg-[#22D1EE] text-white font-semibold px-6 py-3 rounded-full shadow-md hover:bg-[#1a9fcb] transition duration-300">
                  Assign Now
                </button>
              </div>
            </div>

            {/* Calendar Section */}
            <div className="bg-white p-8 rounded-xl shadow-lg mt-10">
              <h3 className="font-bold mb-6 text-[#1C628F]">Select a Date</h3>
              <div className="flex justify-center">
                <Calendar
                  onChange={handleDateChange}
                  value={date}
                  className="rounded-lg shadow-lg"
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AsDashboard;
