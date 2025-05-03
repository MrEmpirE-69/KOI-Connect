import React from "react";
import StudentsSideMenu from "../../StudentComponents/StudentsSideMenu/StudentsSideMenu";
import StudentTopNavbar from "../../StudentComponents/StudentTopNavbar/StudentTopNavbar";
import { FaFileAlt } from "react-icons/fa";
import { HiOutlineDocumentArrowUp } from "react-icons/hi2";

const StudentDashboard = () => {
  return (
    <div className="flex h-screen bg-[#f5f6fa] overflow-hidden">
      {/* Sidebar */}
      <StudentsSideMenu />

      {/* Main Content */}
      <div className="flex flex-col flex-1 h-full overflow-hidden">
        <StudentTopNavbar />

        {/* Dashboard Content */}
        <div className="flex-1 overflow-y-auto p-8 bg-gradient-to-br from-[#f6f9fc] to-[#e9f0f6]">
          {/* Welcome Banner */}
          <div className="flex justify-between items-center  px-6 py-4 mb-6 border border-gray-100">
            <div>
              <h2 className="text-lg font-semibold text-[#1C628F]">
                Welcome to KOI Connect 👋
              </h2>
              <p className="text-sm text-gray-500">
                Stay productive. Stay connected. Achieve greatness.
              </p>
            </div>
          </div>

          {/* Documents */}
          <div className="mb-12">
            <h2 className="text-lg font-semibold text-gray-700 mb-4 px-4">
              📂 Your Projects
            </h2>
            <div className="bg-white rounded-2xl shadow-sm px-6 py-8 flex justify-center gap-12">
              {["Project 1", "Project 2", "Project 3"].map((title, index) => (
                <div
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
                </div>
              ))}
            </div>
          </div>

          {/* Upcoming Reports */}
          <div className="mb-10">
            <h2 className="text-lg font-semibold text-gray-700 mb-4 px-4">
              📌 Upcoming Reports
            </h2>
            <div className="bg-white rounded-2xl border border-gray-100 shadow-md px-6 py-8 flex justify-center gap-12">
              {["Sample 1", "Sample 2", "Sample 3"].map((title, index) => (
                <div
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
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default StudentDashboard;
