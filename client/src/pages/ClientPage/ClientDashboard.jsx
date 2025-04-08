import React, { useState } from "react";
import { FaRegStar, FaStar } from "react-icons/fa";
import { BsBell, BsDownload } from "react-icons/bs";
import { PieChart, Pie, Cell, Tooltip, Legend } from "recharts";
import Papa from "papaparse";
import logo from "../../assets/koi.png";
import avatar1 from "../../assets/user1.png";
import ClientSideMenu from "./ClientSideMenu"; // Import the ClientSideMenu component

const ClientDashboard = () => {
  const [selectedStars, setSelectedStars] = useState(0);
  const [hoveredStars, setHoveredStars] = useState(0);
  const [comment, setComment] = useState("");
  const [selectedProject, setSelectedProject] = useState("");
  const [recentActivities, setRecentActivities] = useState([
    { message: "Given Feedback Of Sample 1", time: "12 Jan 2025 • 03:45 pm" },
  ]);
  const [feedbackHistory, setFeedbackHistory] = useState([]);
  const [messages] = useState([
    {
      from: "Supervisor",
      message: "Check Project 2 updates",
      time: "2h ago",
    },
    {
      from: "Admin",
      message: "Feedback pending on Project 3",
      time: "1d ago",
    },
  ]);

  const handleStarClick = (index) => setSelectedStars(index + 1);
  const handleStarHover = (index) => setHoveredStars(index + 1);
  const handleMouseLeave = () => setHoveredStars(0);

  const getFormattedDateTime = () => {
    const now = new Date();
    const date = now.toLocaleDateString("en-GB", {
      day: "2-digit",
      month: "short",
      year: "numeric",
    });
    const time = now.toLocaleTimeString([], {
      hour: "2-digit",
      minute: "2-digit",
    });
    return `${date} • ${time}`;
  };

  const handleReviewSubmit = () => {
    if (!selectedProject) return alert("Please select a project.");
    if (selectedStars === 0) return alert("Please rate the project.");

    const newActivity = {
      message: `Reviewed ${selectedProject}`,
      time: getFormattedDateTime(),
    };

    setRecentActivities((prev) => [newActivity, ...prev]);
    setFeedbackHistory((prev) => [
      {
        project: selectedProject,
        rating: selectedStars,
        comment: comment || "No comment provided",
        date: newActivity.time,
      },
      ...prev,
    ]);

    setSelectedStars(0);
    setHoveredStars(0);
    setComment("");
    setSelectedProject("");
  };

  const ratingCounts = [1, 2, 3, 4, 5].map((num) => ({
    name: `${num}★`,
    value: feedbackHistory.filter((r) => r.rating === num).length,
  }));

  const pieColors = ["#FF8042", "#FFBB28", "#00C49F", "#0088FE", "#AA33FF"];

  const exportToCSV = () => {
    const csv = Papa.unparse(feedbackHistory);
    const blob = new Blob([csv], { type: "text/csv;charset=utf-8;" });
    const link = document.createElement("a");
    link.href = URL.createObjectURL(blob);
    link.setAttribute("download", "feedback_reviews.csv");
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return (
    <div className="flex h-screen bg-[#f9f9f9] overflow-hidden">
      {/* Sidebar using ClientSideMenu component */}
      <ClientSideMenu currentPage="dashboard" />

      {/* Main Content */}
      <main className="flex-1 p-8 overflow-y-auto">
        {/* Header */}
        <div className="flex justify-between items-center mb-8">
          <input
            type="text"
            placeholder="Search projects..."
            className="border px-4 py-2 rounded-md w-[300px]"
          />
          <div className="flex items-center gap-4">
            <BsBell className="text-xl text-[#6C63FF]" />
            <div className="text-right">
              <p className="font-semibold">John</p>
              <p className="text-sm text-gray-500">Client</p>
            </div>
            <img
              src={avatar1}
              alt="avatar"
              className="w-10 h-10 rounded-full shadow hover:ring-2 ring-[#226CD1] transition"
            />
          </div>
        </div>

        {/* Quick Stats */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
          {[
            {
              label: "Total Reviews",
              value: feedbackHistory.length,
              color: "bg-blue-100 text-blue-800",
            },
            {
              label: "Pending Feedback",
              value: 3 - feedbackHistory.length,
              color: "bg-yellow-100 text-yellow-800",
            },
            {
              label: "Rated Projects",
              value: feedbackHistory.filter((r) => r.rating > 0).length,
              color: "bg-green-100 text-green-800",
            },
          ].map((stat, i) => (
            <div
              key={i}
              className={`p-6 rounded-xl ${stat.color} text-center shadow-md transition-transform hover:scale-105`}
            >
              <p className="text-2xl font-bold">{stat.value}</p>
              <p>{stat.label}</p>
            </div>
          ))}
        </div>

        {/* Review Submission */}
        <div className="bg-white p-6 rounded-xl shadow mb-10">
          <h2 className="text-xl font-bold mb-4">Submit a Review</h2>
          <select
            value={selectedProject}
            onChange={(e) => setSelectedProject(e.target.value)}
            className="w-full p-2 mb-3 border rounded"
          >
            <option value="">Select Project</option>
            <option value="Project 1">Project 1</option>
            <option value="Project 2">Project 2</option>
          </select>

          <div className="flex gap-1 mb-3 text-[#f5b50a]">
            {[...Array(5)].map((_, i) => (
              <span
                key={i}
                onClick={() => handleStarClick(i)}
                onMouseEnter={() => handleStarHover(i)}
                onMouseLeave={handleMouseLeave}
                className="cursor-pointer text-xl"
              >
                {i < (hoveredStars || selectedStars) ? (
                  <FaStar />
                ) : (
                  <FaRegStar />
                )}
              </span>
            ))}
          </div>

          <textarea
            value={comment}
            onChange={(e) => setComment(e.target.value)}
            placeholder="Write your feedback"
            rows={3}
            className="w-full border rounded p-2 mb-4"
          />

          <button
            onClick={handleReviewSubmit}
            className="bg-[#226CD1] text-white px-6 py-2 rounded hover:bg-blue-700 transition"
          >
            Post Review
          </button>
        </div>

        {/* Feedback History */}
        <div className="bg-white p-6 rounded-xl shadow mb-10">
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-xl font-bold text-[#226CD1]">Review History</h2>
            <button
              onClick={exportToCSV}
              className="flex items-center gap-2 text-sm bg-gray-200 hover:bg-gray-300 px-4 py-2 rounded"
            >
              <BsDownload /> Export CSV
            </button>
          </div>
          <table className="w-full text-sm">
            <thead>
              <tr className="bg-gray-100">
                <th className="p-2">Project</th>
                <th className="p-2">Rating</th>
                <th className="p-2">Comment</th>
                <th className="p-2">Date</th>
              </tr>
            </thead>
            <tbody>
              {feedbackHistory.map((item, i) => (
                <tr key={i} className="border-b">
                  <td className="p-2">{item.project}</td>
                  <td className="p-2">
                    {[...Array(item.rating)].map((_, j) => (
                      <FaStar key={j} className="inline text-yellow-400" />
                    ))}
                  </td>
                  <td className="p-2">{item.comment}</td>
                  <td className="p-2">{item.date}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Pie Chart + Messages */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-10">
          <div className="bg-white p-6 rounded-xl shadow">
            <h2 className="text-xl font-bold text-[#226CD1] mb-4">
              Feedback Summary
            </h2>
            <PieChart width={350} height={250}>
              <Pie
                data={ratingCounts}
                dataKey="value"
                nameKey="name"
                cx="50%"
                cy="50%"
                outerRadius={80}
                label
              >
                {ratingCounts.map((_, i) => (
                  <Cell key={i} fill={pieColors[i]} />
                ))}
              </Pie>
              <Tooltip />
              <Legend />
            </PieChart>
          </div>

          <div className="flex flex-col gap-6">
            <div className="bg-white p-6 rounded-xl shadow">
              <h2 className="font-bold text-[#226CD1] mb-3">Messages</h2>
              {messages.map((m, i) => (
                <div key={i} className="text-sm mb-2">
                  <p className="font-semibold">{m.from}</p>
                  <p>{m.message}</p>
                  <p className="text-xs text-gray-500 italic">{m.time}</p>
                </div>
              ))}
            </div>

            <div className="bg-white p-6 rounded-xl shadow">
              <h2 className="font-bold text-[#226CD1] mb-3">
                Upcoming Actions
              </h2>
              <ul className="text-sm space-y-2">
                <li>📅 Review due for Project 2 in 2 days</li>
                <li>⚠️ Missing feedback for Project 3</li>
              </ul>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};

export default ClientDashboard;
