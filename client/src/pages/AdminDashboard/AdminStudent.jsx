import React, { useState } from "react";
import TopNavbar from "../../components/TopNavbar/TopNavbar";
import SideMenu from "../../components/SideMenu/SideMenu";
import { FaArrowLeft, FaSearch } from "react-icons/fa";
import { Link } from "react-router-dom"; // Import Link for navigation

const AdminStudent = () => {
  const [studentList, setStudentList] = useState([
    "Kushal Nepal",
    "Rohan Poudel",
    "Gagan Bohara",
    "Sajit KC",
    "Harry Magar",
    "Cristiano Maharjan",
    "Burno Shrestha",
    "Messi Limbu",
    "Abdul Ali",
    "Bahil Tamang",
  ]);
  const [searchQuery, setSearchQuery] = useState("");

  const handleAddStudent = () => {
    const newStudentName = `New Student ${studentList.length + 1}`;
    setStudentList((prevList) => [...prevList, newStudentName]); // Adds new student to the list
  };

  const filteredStudents = studentList.filter((name) =>
    name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="flex h-screen w-screen bg-gradient-to-tr from-[#f5f7fb] to-[#ebeff5] overflow-hidden">
      {/* Sidebar */}
      <SideMenu currentPage="students" />

      {/* Main Content */}
      <div className="flex flex-col flex-1 h-full">
        <TopNavbar />

        {/* Page Body */}
        <div className="flex-1 overflow-y-auto p-6 md:p-10">
          {/* Back Button */}
          <div className="mb-6">
            <Link to="/admin-dashboard">
              <button className="flex items-center gap-2 text-sm text-gray-600 bg-white px-4 py-2 rounded-full shadow hover:bg-gray-100 hover:scale-105 transition-all duration-300">
                <FaArrowLeft />
                Back
              </button>
            </Link>
          </div>

          {/* Page Title */}
          <h1 className="text-4xl font-semibold text-center text-[#226CD1] mb-12">
            List of Students
          </h1>

          {/* Search Bar */}
          <div className="mb-6 max-w-sm mx-auto">
            <div className="relative">
              <input
                type="text"
                placeholder="Search students..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full px-4 py-2 pr-10 rounded-full border border-gray-300 focus:ring-2 focus:ring-blue-500"
              />
              <FaSearch className="absolute right-3 top-2 text-gray-500" />
            </div>
          </div>

          {/* Student Cards */}
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8 max-w-6xl mx-auto">
            {filteredStudents.map((name, index) => (
              <div
                key={index}
                className="bg-white p-5 rounded-2xl shadow-md hover:shadow-lg transition duration-300 transform hover:-translate-y-2 text-center cursor-pointer"
              >
                <div className="w-16 h-16 mx-auto mb-4 rounded-full bg-[#dce9f9] flex items-center justify-center text-[#226CD1] font-bold text-xl">
                  {name.charAt(0)}
                </div>
                <h2 className="text-lg font-semibold text-[#1C628F]">{name}</h2>
                <p className="text-sm text-gray-500">ID: 1220{100 + index}</p>

                {/* Action Buttons */}
                <div className="mt-4 flex justify-center gap-3">
                  <Link
                    to="/student-profile"
                    className="text-blue-500 text-sm hover:underline"
                  >
                    View Profile
                  </Link>
                  <button className="bg-yellow-500 text-white px-4 py-1 rounded-md hover:bg-yellow-600 text-sm">
                    Edit
                  </button>
                </div>
              </div>
            ))}
          </div>

          {/* Add More Button */}
          <div className="mt-10 flex justify-center">
            <button
              onClick={handleAddStudent}
              className="bg-[#226CD1] text-white font-medium px-6 py-2 rounded-full hover:bg-blue-700 transition duration-300 shadow-lg"
            >
              Add More Students
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminStudent;
