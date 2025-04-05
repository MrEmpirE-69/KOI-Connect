import React from "react";
import TopNavbar from "../../components/TopNavbar/TopNavbar";
import SideMenu from "../../components/SideMenu/SideMenu";
import { FaArrowLeft } from "react-icons/fa";

const teacherList = [
  "Dr. Alex Morgan",
  "Prof. Emily White",
  "Dr. John Lee",
  "Ms. Sophia Chen",
  "Mr. David Brown",
  "Dr. Olivia Garcia",
  "Prof. William Smith",
  "Ms. Emma Wilson",
  "Dr. James Anderson",
  "Mr. Daniel Young",
];

const AdminTeacher = () => {
  return (
    <div className="flex min-h-screen h-screen bg-gradient-to-tr from-[#f5f7fb] to-[#ebeff5]">
      {/* Sidebar */}
      <SideMenu currentPage="teachers" />

      {/* Main Content Area */}
      <div className="flex flex-col flex-1 h-full">
        <TopNavbar />

        {/* Scrollable Content */}
        <div className="flex-1 overflow-y-auto p-6 md:p-10">
          {/* Back Button */}
          <div className="mb-6">
            <button className="flex items-center gap-2 text-sm text-gray-600 bg-white px-4 py-2 rounded-full shadow hover:bg-gray-100 hover:scale-105 transition-all duration-300">
              <FaArrowLeft />
              Back
            </button>
          </div>

          {/* Title */}
          <h1 className="text-4xl font-bold text-center text-[#226CD1] mb-12">
            List of Teachers
          </h1>

          {/* Teacher Grid */}
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-6 max-w-6xl mx-auto">
            {teacherList.map((name, index) => (
              <div
                key={index}
                className="bg-white p-5 rounded-2xl shadow-md hover:shadow-xl transition duration-300 transform hover:-translate-y-1 text-center"
              >
                <div className="w-16 h-16 mx-auto mb-4 rounded-full bg-[#dce9f9] flex items-center justify-center text-[#226CD1] font-bold text-xl">
                  {name.charAt(0)}
                </div>
                <h2 className="text-lg font-semibold text-[#1C628F]">{name}</h2>
                <p className="text-sm text-gray-500">KOI ID: TCH{100 + index}</p>
              </div>
            ))}
          </div>

          {/* View More Button */}
          <div className="mt-10 flex justify-center">
            <button className="bg-[#226CD1] text-white font-medium px-6 py-2 rounded-full hover:bg-blue-700 transition duration-300 shadow-lg">
              View More
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminTeacher;
