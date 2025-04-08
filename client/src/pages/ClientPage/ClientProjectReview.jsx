import React, { useState } from "react";
import { FaChevronDown, FaFileAlt, FaStar, FaRegStar } from "react-icons/fa";
import { BsBell } from "react-icons/bs";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  Cell,
} from "recharts";
import logo from "../../assets/koi.png";
import avatar from "../../assets/user1.png";
import ClientSideMenu from "./ClientSideMenu"; // Import the ClientSideMenu component

const initialProjects = [
  {
    id: 1,
    student: "Rohan Poudel",
    title: "Implication Of AI In KOI",
    date: "2025/09/19",
    status: "Under Review",
    feedback: "Pending",
    comment: "",
    rating: 0,
    file: "#",
    description: "Explores AI integration in KOI admin systems.",
  },
  {
    id: 2,
    student: "Kushal Nepal",
    title: "Upgrade Of Student Portal",
    date: "2025/08/17",
    status: "Submitted",
    feedback: "Pending",
    comment: "",
    rating: 0,
    file: "#",
    description: "Improves dashboard UI/UX for students.",
  },
  {
    id: 3,
    student: "Gagan Bohara",
    title: "Moodle Feature Enhancements",
    date: "2025/04/12",
    status: "Approved",
    feedback: "Given",
    comment: "Brilliant improvements in collaboration tools!",
    rating: 5,
    file: "#",
    description: "Adds group features and discussion polls.",
  },
];

const ClientProjectReview = () => {
  const [projects, setProjects] = useState(initialProjects);
  const [expandedRow, setExpandedRow] = useState(null);
  const [selectedProject, setSelectedProject] = useState(null);
  const [rating, setRating] = useState(0);
  const [comment, setComment] = useState("");

  const handleFeedbackSubmit = () => {
    const updated = projects.map((p) =>
      p.id === selectedProject.id
        ? { ...p, feedback: "Given", comment, rating }
        : p
    );
    setProjects(updated);
    setSelectedProject(null);
    setRating(0);
    setComment("");
  };

  const ratingStats = [1, 2, 3, 4, 5].map((num) => ({
    name: `${num}★`,
    value: projects.filter((p) => p.rating === num).length,
  }));

  return (
    <div className="flex h-screen bg-[#f9f9f9] font-sans">
      {/* Sidebar using ClientSideMenu component */}
      <ClientSideMenu currentPage="project-review" />

      {/* Main Section */}
      <main className="flex-1 p-8 overflow-y-auto">
        {/* Navbar */}
        <div className="flex justify-between items-center mb-6">
          <input
            type="text"
            placeholder="Search here"
            className="px-4 py-2 border rounded-md w-[300px]"
          />
          <div className="flex items-center gap-4">
            <BsBell className="text-xl text-blue-600" />
            <p className="text-sm text-gray-600">
              Logged in as <strong>Client</strong>
            </p>
          </div>
        </div>

        <h1 className="text-3xl font-bold text-center text-[#226CD1] mb-8">
          Project Review Page
        </h1>

        {/* Table */}
        <div className="bg-white rounded-xl shadow p-6 overflow-x-auto">
          <table className="w-full text-sm text-left border-separate border-spacing-y-2">
            <thead>
              <tr className="text-gray-600 bg-gray-50 rounded-lg">
                <th className="p-3">Student</th>
                <th className="p-3">Title</th>
                <th className="p-3">Date</th>
                <th className="p-3">Status</th>
                <th className="p-3 text-center">File</th>
                <th className="p-3 text-center">Feedback</th>
                <th className="p-3 text-center">Details</th>
              </tr>
            </thead>
            <tbody>
              {projects.map((p) => (
                <React.Fragment key={p.id}>
                  <tr className="bg-white shadow-sm rounded-lg hover:shadow-md transition duration-300">
                    <td className="p-3 font-semibold text-gray-800">
                      {p.student}
                    </td>
                    <td className="p-3 text-gray-700">{p.title}</td>
                    <td className="p-3 text-gray-500">{p.date}</td>
                    <td className="p-3">
                      <span
                        className={`px-3 py-1 rounded-full text-xs font-semibold shadow-sm ${
                          p.status === "Approved"
                            ? "bg-green-100 text-green-700"
                            : p.status === "Submitted"
                            ? "bg-yellow-100 text-yellow-700"
                            : "bg-blue-100 text-blue-700"
                        }`}
                      >
                        {p.status}
                      </span>
                    </td>
                    <td className="text-center text-blue-600 text-lg">
                      <a
                        href={p.file}
                        title="Download file"
                        className="hover:text-blue-800 transition"
                      >
                        <FaFileAlt />
                      </a>
                    </td>
                    <td className="text-center">
                      {p.feedback === "Given" ? (
                        <span className="bg-green-500 text-white text-xs px-4 py-1 rounded-full font-semibold shadow-sm">
                          Given
                        </span>
                      ) : (
                        <button
                          onClick={() => setSelectedProject(p)}
                          className="bg-red-500 hover:bg-red-600 text-white text-xs px-4 py-1 rounded-full font-semibold shadow-sm transition"
                        >
                          Give Feedback
                        </button>
                      )}
                    </td>
                    <td className="text-center">
                      <button
                        onClick={() =>
                          setExpandedRow(expandedRow === p.id ? null : p.id)
                        }
                        className="hover:text-blue-500 transition"
                      >
                        <FaChevronDown className="inline" />
                      </button>
                    </td>
                  </tr>
                  {expandedRow === p.id && (
                    <tr className="animate-fadeIn bg-gray-50 rounded">
                      <td colSpan="7" className="p-4 text-sm text-gray-600">
                        <strong>Description:</strong> {p.description}
                      </td>
                    </tr>
                  )}
                </React.Fragment>
              ))}
            </tbody>
          </table>
        </div>

        {/* Feedback Modal */}
        {selectedProject && (
          <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex justify-center items-center">
            <div className="bg-white p-6 rounded-xl w-[400px] shadow-xl space-y-4 animate-fadeIn">
              <h2 className="text-xl font-bold text-blue-600">
                Review {selectedProject.title}
              </h2>
              <div className="flex justify-center text-yellow-500 text-xl">
                {[...Array(5)].map((_, idx) => (
                  <span
                    key={idx}
                    onClick={() => setRating(idx + 1)}
                    className="cursor-pointer"
                  >
                    {rating > idx ? <FaStar /> : <FaRegStar />}
                  </span>
                ))}
              </div>
              <textarea
                value={comment}
                onChange={(e) => setComment(e.target.value)}
                placeholder="Write your comment..."
                rows={3}
                className="w-full border p-2 rounded-md"
              />
              <div className="flex justify-end gap-3">
                <button
                  onClick={() => setSelectedProject(null)}
                  className="bg-gray-200 px-4 py-2 rounded"
                >
                  Cancel
                </button>
                <button
                  onClick={handleFeedbackSubmit}
                  className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
                >
                  Submit
                </button>
              </div>
            </div>
          </div>
        )}

        {/* 🔽 Enhanced Feedback Analytics Section 🔽 */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-10">
          <div className="bg-blue-100 p-5 rounded-xl text-center shadow-md hover:scale-105 transition">
            <p className="text-lg font-bold text-blue-800">Total Reviews</p>
            <p className="text-2xl font-semibold">
              {projects.filter((p) => p.feedback === "Given").length}
            </p>
          </div>
          <div className="bg-yellow-100 p-5 rounded-xl text-center shadow-md hover:scale-105 transition">
            <p className="text-lg font-bold text-yellow-800">Pending</p>
            <p className="text-2xl font-semibold">
              {projects.filter((p) => p.feedback === "Pending").length}
            </p>
          </div>
          <div className="bg-green-100 p-5 rounded-xl text-center shadow-md hover:scale-105 transition">
            <p className="text-lg font-bold text-green-800">Average Rating</p>
            <p className="text-2xl font-semibold">
              {(() => {
                const rated = projects.filter((p) => p.rating > 0);
                const avg = rated.length
                  ? rated.reduce((a, b) => a + b.rating, 0) / rated.length
                  : 0;
                return avg.toFixed(1) + " ★";
              })()}
            </p>
          </div>
        </div>

        {/* Chart and FAQ */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-10">
          <div className="bg-white p-6 rounded-xl shadow">
            <h2 className="text-xl font-bold text-blue-600 mb-4">
              Rating Breakdown
            </h2>
            <ResponsiveContainer width="100%" height={250}>
              <BarChart data={ratingStats}>
                <XAxis dataKey="name" />
                <YAxis allowDecimals={false} />
                <Tooltip />
                <Bar dataKey="value" fill="#3182CE">
                  {ratingStats.map((_, i) => (
                    <Cell key={i} fill={`hsl(${i * 70}, 70%, 60%)`} />
                  ))}
                </Bar>
              </BarChart>
            </ResponsiveContainer>
          </div>

          <div className="bg-yellow-50 border border-yellow-300 rounded-xl p-6 text-sm">
            <h3 className="font-bold text-yellow-700 mb-3">💡 Quick Tips</h3>
            <ul className="list-disc space-y-1 ml-4">
              <li>Use “Give Feedback” to rate and comment.</li>
              <li>Expand rows to see project descriptions.</li>
              <li>Ratings reflect in analytics below.</li>
              <li>Click file icon to download student work.</li>
            </ul>
          </div>
        </div>

        {/* Sample Reviews */}
        <div className="mt-10 bg-white p-6 rounded-xl shadow">
          <h2 className="text-xl font-bold text-blue-600 mb-4">
            Client Feedback Samples
          </h2>
          {projects
            .filter((p) => p.comment && p.feedback === "Given")
            .slice(0, 3)
            .map((p, i) => (
              <div
                key={i}
                className="mb-3 border-l-4 border-blue-500 bg-blue-50 pl-4 py-2 rounded"
              >
                <p className="text-sm italic text-gray-800">"{p.comment}"</p>
                <p className="text-xs text-gray-500">
                  — {p.student}, {p.rating}★
                </p>
              </div>
            ))}
        </div>
      </main>
    </div>
  );
};

export default ClientProjectReview;
