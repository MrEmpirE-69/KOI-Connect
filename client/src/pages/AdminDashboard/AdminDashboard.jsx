import React from "react";
import SideMenu from "../../components/SideMenu/SideMenu";
import TopNavbar from "../../components/TopNavbar/TopNavbar";
import { FaUsers, FaChalkboardTeacher, FaFileAlt } from "react-icons/fa";
import user1 from "../../assets/user1.png";
import user2 from "../../assets/user2.png";
import user3 from "../../assets/user3.png";

const AdminDashboard = () => {
  return (
    <div className="flex h-screen bg-[#f5f6fa] overflow-hidden">
      {/* Sidebar */}
      <SideMenu currentPage="dashboard" />

      {/* Main Content */}
      <main className="flex-1 flex flex-col overflow-hidden">
        <TopNavbar />

        <div className="flex-1 overflow-y-auto p-6 md:p-10">
          {/* Heading */}
          <h1 className="text-4xl font-bold text-[#226CD1] mb-1 animate-fadeInDown">
            Dashboard
          </h1>
          <p className="text-lg text-gray-700 mb-10 animate-fadeInDown delay-100">
            Hello Bronzo, Welcome back
          </p>

          {/* Dashboard Cards */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 w-full mb-10 animate-fadeInUp">
            <div className="bg-white rounded-xl shadow-lg p-8 text-center h-48 flex flex-col justify-center transform hover:scale-105 transition-all duration-300 hover:shadow-xl">
              <FaUsers className="text-4xl mx-auto text-[#1C628F]" />
              <h2 className="text-4xl font-bold my-2">100</h2>
              <p className="text-gray-600 font-semibold text-lg">Students</p>
            </div>

            <div className="bg-white rounded-xl shadow-lg p-8 text-center h-48 flex flex-col justify-center transform hover:scale-105 transition-all duration-300 hover:shadow-xl">
              <FaChalkboardTeacher className="text-4xl mx-auto text-[#1C628F]" />
              <h2 className="text-4xl font-bold my-2">10</h2>
              <p className="text-gray-600 font-semibold text-lg">Teachers</p>
            </div>

            <div className="bg-white rounded-xl shadow-lg p-8 text-center h-48 flex flex-col justify-center transform hover:scale-105 transition-all duration-300 hover:shadow-xl">
              <FaFileAlt className="text-4xl mx-auto text-[#1C628F]" />
              <h2 className="text-4xl font-bold my-2">20</h2>
              <p className="text-gray-600 font-semibold text-lg">Clients</p>
            </div>
          </div>

          {/* Announcements */}
          <div className="grid md:grid-cols-2 gap-6 animate-fadeInLeft">
            <div className="bg-white rounded-xl shadow-lg p-6 transform hover:scale-105 transition-all duration-300 hover:shadow-xl">
              <h3 className="text-lg font-semibold text-[#6C63FF] mb-2 flex items-center gap-2">
                <span>📢</span>
                Announcement
              </h3>
              <p className="text-gray-700">
                Maintenance is scheduled on <strong>Sunday, 6th May</strong>.
                Systems will be offline from 2am to 6am AEST.
              </p>
            </div>

            <div className="bg-white rounded-xl shadow-lg p-6 transform hover:scale-105 transition-all duration-300 hover:shadow-xl">
              <h3 className="text-lg font-semibold text-[#6C63FF] mb-2 flex items-center gap-2">
                <span>🚀</span>
                New Feature
              </h3>
              <p className="text-gray-700">
                Role management system updated. Admins can now assign roles per
                course or department.
              </p>
            </div>
          </div>
        </div>
      </main>

      {/* Right Sidebar */}
      <aside className="hidden xl:flex flex-col justify-between w-[350px] bg-gray-100 p-6 animate-fadeInRight shadow-inner">
        {/* Recent Activity */}
        <div>
          <h2 className="text-2xl font-semibold mb-6 text-[#1C628F]">
            Recent Activity
          </h2>
          <div className="bg-white rounded-xl p-4 shadow-md flex items-start gap-4 transition hover:scale-[1.02] hover:shadow-md duration-300">
            <div className="bg-green-100 p-3 rounded-full">
              <svg
                className="w-6 h-6 text-green-600"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                viewBox="0 0 24 24"
              >
                <path d="M4 6h16M4 12h8m-8 6h16" />
              </svg>
            </div>
            <div className="flex flex-col">
              <p className="font-medium text-[#222] leading-snug">
                Role Updated For Bahil <br /> as Student
              </p>
              <div className="flex justify-between text-sm text-gray-500 mt-2">
                <span>12 Jan 2025</span>
                <span>02:29 pm</span>
              </div>
            </div>
          </div>
        </div>

        {/* Latest Messages */}
        <div>
          <h2 className="text-2xl font-semibold mb-6 text-[#1C628F] mt-10">
            Latest Message
          </h2>
          <div className="flex flex-wrap gap-5 justify-center">
            {[user1, user2, user3].map((user, index) => (
              <img
                key={index}
                src={user}
                alt={`User ${index + 1}`}
                className="w-14 h-14 rounded-full shadow-md hover:ring-2 hover:ring-[#6C63FF] hover:scale-110 transition duration-300"
              />
            ))}
          </div>
        </div>
      </aside>
    </div>
  );
};

export default AdminDashboard;
