import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import SideMenu from "../../components/SideMenu/SideMenu";
import TopNavbar from "../../components/TopNavbar/TopNavbar";
import { FaUsers, FaChalkboardTeacher, FaFileAlt } from "react-icons/fa";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts";
import { adminRequest, updateAuthToken } from "../../utils/requestMethods";
import { BASE_URL } from "../../utils/config";
import useFetch from "../../hooks/useFetch";

const userActivityData = [
  { date: "2025-01-01", loginCount: 50 },
  { date: "2025-01-02", loginCount: 30 },
  { date: "2025-01-03", loginCount: 70 },
  { date: "2025-01-04", loginCount: 90 },
  { date: "2025-01-05", loginCount: 110 },
];

const AdminDashboard = () => {
  const [adminCount, setAdminCount] = useState("");
  const [supervisorCount, setSupervisorCount] = useState("");

  useEffect(() => {
    const fetchAdminCount = async () => {
      try {
        const response = await adminRequest.get(`${BASE_URL}/user/count`);
        setAdminCount(response.data.data);
      } catch (error) {}
    };
    fetchAdminCount();
  }, []);

  useEffect(() => {
    const fetchSupervisorCount = async () => {
      try {
        const response = await adminRequest.get(`${BASE_URL}/user/count`);
        setSupervisorCount(response.data.data);
      } catch (error) {
        console.error("Failed to fetch supervisor count:", error);
      }
    };

    fetchSupervisorCount();
  }, []);

  const { data } = useFetch(`${BASE_URL}/user/profile`, adminRequest);
  updateAuthToken();

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
            Hello {data.data?.fullName}, Welcome back
          </p>

          {/* Dashboard Cards */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 w-full mb-10 animate-fadeInUp">
            {/* Admin Card */}
            <Link
              to="/admin-list"
              className="bg-white rounded-xl shadow-lg p-8 text-center h-48 flex flex-col justify-center transform hover:scale-105 transition-all duration-300 hover:shadow-xl"
            >
              <FaChalkboardTeacher className="text-4xl mx-auto text-[#1C628F]" />
              <div>
                <h2 className="text-4xl font-bold my-2">{adminCount}</h2>
                <p className="text-gray-600 font-semibold text-lg">Admin</p>
              </div>
            </Link>

            {/* Teachers Card */}
            <Link
              to="/supervisor-list"
              className="bg-white rounded-xl shadow-lg p-8 text-center h-48 flex flex-col justify-center transform hover:scale-105 transition-all duration-300 hover:shadow-xl"
            >
              <FaChalkboardTeacher className="text-4xl mx-auto text-[#1C628F]" />
              <h2 className="text-4xl font-bold my-2">{supervisorCount}</h2>
              <p className="text-gray-600 font-semibold text-lg">Supervisors</p>
            </Link>
            {/* Students Card */}
            <Link
              to="/student-list"
              className="bg-white rounded-xl shadow-lg p-8 text-center h-48 flex flex-col justify-center transform hover:scale-105 transition-all duration-300 hover:shadow-xl"
            >
              <FaUsers className="text-4xl mx-auto text-[#1C628F]" />
              <h2 className="text-4xl font-bold my-2">100</h2>
              <p className="text-gray-600 font-semibold text-lg">Students</p>
            </Link>

            {/* Clients Card */}
            <Link
              to="/client-list"
              className="bg-white rounded-xl shadow-lg p-8 text-center h-48 flex flex-col justify-center transform hover:scale-105 transition-all duration-300 hover:shadow-xl"
            >
              <FaFileAlt className="text-4xl mx-auto text-[#1C628F]" />
              <h2 className="text-4xl font-bold my-2">20</h2>
              <p className="text-gray-600 font-semibold text-lg">Clients</p>
            </Link>
          </div>

          {/* Activity Analytics */}
          <div className="bg-white rounded-xl shadow-lg p-6 mb-6">
            <h3 className="text-2xl font-semibold text-[#226CD1] mb-4">
              User Activity Analytics
            </h3>
            <ResponsiveContainer width="100%" height={300}>
              <LineChart data={userActivityData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="date" />
                <YAxis />
                <Tooltip />
                <Legend />
                <Line type="monotone" dataKey="loginCount" stroke="#226CD1" />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </div>
      </main>
    </div>
  );
};

export default AdminDashboard;
