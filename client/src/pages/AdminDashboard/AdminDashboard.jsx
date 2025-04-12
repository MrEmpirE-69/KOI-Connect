import React, { useState } from "react";
import { Link } from "react-router-dom"; // Import Link for navigation
import SideMenu from "../../components/SideMenu/SideMenu";
import TopNavbar from "../../components/TopNavbar/TopNavbar";
import { FaUsers, FaChalkboardTeacher, FaFileAlt, FaClipboardList } from "react-icons/fa";
import { CSVLink } from "react-csv";
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from "recharts"; // For activity analytics chart
import Calendar from 'react-calendar'; // Calendar for upcoming events

// Mocked example data
const projects = [
  { id: 1, student: "Rohan Poudel", title: "Implication Of AI In KOI", date: "2025/09/19", status: "Pending", progress: 72 },
  { id: 2, student: "Kushal Nepal", title: "Upgrade Of Student Portal", date: "2025/08/17", status: "Pending", progress: 54 },
  { id: 3, student: "Gagan Bohara", title: "Adding New Features In Moodle", date: "2025/06/12", status: "Reviewed", progress: 85 },
  // Add more projects...
];

// Sample user activity data for charts
const userActivityData = [
  { date: "2025-01-01", loginCount: 50 },
  { date: "2025-01-02", loginCount: 30 },
  { date: "2025-01-03", loginCount: 70 },
  { date: "2025-01-04", loginCount: 90 },
  { date: "2025-01-05", loginCount: 110 },
];

// Sample event data
const events = [
  { date: "2025/05/01", event: "Exams Begin" },
  { date: "2025/06/12", event: "Course Registration" },
];

const AdminDashboard = () => {
  const [selectedDate, setSelectedDate] = useState(new Date()); // for calendar view
  const [userLogs, setUserLogs] = useState([
    "Admin logged in at 2:30 PM",
    "John Doe updated profile settings at 3:15 PM",
    "System update applied at 4:00 PM",
  ]);
  const [systemHealth, setSystemHealth] = useState({
    uptime: "99.99%",
    responseTime: "200ms",
    recentUpdates: [
      "Security patch applied on 2025/04/01",
      "Database optimization on 2025/04/02",
    ],
  });

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
            Hello Admin, Welcome back
          </p>

          {/* Dashboard Cards */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 w-full mb-10 animate-fadeInUp">
            {/* Students Card */}
            <Link
              to="/student-list"
              className="bg-white rounded-xl shadow-lg p-8 text-center h-48 flex flex-col justify-center transform hover:scale-105 transition-all duration-300 hover:shadow-xl"
            >
              <FaUsers className="text-4xl mx-auto text-[#1C628F]" />
              <h2 className="text-4xl font-bold my-2">100</h2>
              <p className="text-gray-600 font-semibold text-lg">Students</p>
            </Link>

            {/* Teachers Card */}
            <Link
              to="/teacher-list"
              className="bg-white rounded-xl shadow-lg p-8 text-center h-48 flex flex-col justify-center transform hover:scale-105 transition-all duration-300 hover:shadow-xl"
            >
              <FaChalkboardTeacher className="text-4xl mx-auto text-[#1C628F]" />
              <h2 className="text-4xl font-bold my-2">10</h2>
              <p className="text-gray-600 font-semibold text-lg">Teachers</p>
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
            <h3 className="text-2xl font-semibold text-[#226CD1] mb-4">User Activity Analytics</h3>
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

          {/* CSV/Excel Export */}
          <div className="mb-10">
            <CSVLink
              data={projects}
              filename="projects_report.csv"
              className="bg-green-500 text-white px-6 py-2 rounded-full hover:bg-green-600 transition"
            >
              Export Projects Report (CSV)
            </CSVLink>
          </div>

          {/* Upcoming Events Calendar */}
          <div className="mb-10">
            <h3 className="text-2xl font-semibold text-[#226CD1] mb-4">Upcoming Events</h3>
            <Calendar
              onChange={setSelectedDate}
              value={selectedDate}
              className="w-full shadow-lg rounded-lg"
            />
            <div className="mt-4">
              <h4 className="text-xl font-semibold">Scheduled Events</h4>
              {events.map((event, index) => (
                <div key={index} className="mt-2">
                  <span className="font-bold">{event.date}:</span> {event.event}
                </div>
              ))}
            </div>
          </div>

          {/* Audit Logs */}
          <div className="bg-white rounded-xl shadow-lg p-6 mb-6">
            <h3 className="text-2xl font-semibold text-[#226CD1] mb-4">Audit Logs</h3>
            <ul>
              {userLogs.map((log, index) => (
                <li key={index} className="text-sm text-gray-700">{log}</li>
              ))}
            </ul>
          </div>

          {/* System Health Dashboard */}
          <div className="bg-white rounded-xl shadow-lg p-6">
            <h3 className="text-2xl font-semibold text-[#226CD1] mb-4">System Health Dashboard</h3>
            <div className="flex gap-6">
              <div className="w-1/2">
                <h4>Uptime:</h4>
                <p>{systemHealth.uptime}</p>
              </div>
              <div className="w-1/2">
                <h4>Response Time:</h4>
                <p>{systemHealth.responseTime}</p>
              </div>
            </div>
            <div className="mt-4">
              <h4>Recent System Updates</h4>
              <ul>
                {systemHealth.recentUpdates.map((update, index) => (
                  <li key={index}>{update}</li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};

export default AdminDashboard;
