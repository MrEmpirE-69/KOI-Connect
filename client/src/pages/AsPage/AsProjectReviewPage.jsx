import React, { useState } from "react";
import AsSideMenu from "../../AsComponents/AsSideMenu/AsSideMenu";
import AsTopNavbar from "../../AsComponents/AsTopNavbar/AsTopNavbar";
import { FaFileAlt } from "react-icons/fa";
import { PieChart, Pie, Cell, Legend, Tooltip } from "recharts";

// Dummy project data
const projectsData = [
  {
    student: "Rohan Poudel",
    title: "Implication Of AI In KOI",
    date: "2025/09/19",
    status: "Pending",
    progress: 72,
  },
  {
    student: "Kushal Nepal",
    title: "Upgrade Of Student Portal",
    date: "2025/08/17",
    status: "Pending",
    progress: 54,
  },
  {
    student: "Gagan Bohara",
    title: "Adding New Features In Moodle",
    date: "2025/04/12",
    status: "Reviewed",
    progress: 85,
  },
];

const statusColors = {
  Pending: "#FF6F61",
  Reviewed: "#00B0FF",
};

// The actual page component
const AsProjectReviewPage = () => {
  const [filter, setFilter] = useState("");
  const [selectedProject, setSelectedProject] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);
  const projectsPerPage = 3;

  // Filtering projects based on student name, project title, or status
  const filteredProjects = projectsData.filter(
    (project) =>
      project.student.toLowerCase().includes(filter.toLowerCase()) ||
      project.title.toLowerCase().includes(filter.toLowerCase()) ||
      project.status.toLowerCase().includes(filter.toLowerCase())
  );

  // Paginate projects
  const indexOfLastProject = currentPage * projectsPerPage;
  const indexOfFirstProject = indexOfLastProject - projectsPerPage;
  const currentProjects = filteredProjects.slice(
    indexOfFirstProject,
    indexOfLastProject
  );

  const handlePageChange = (pageNum) => setCurrentPage(pageNum);

  return (
    <div className="flex h-screen w-full bg-[#f9f9f9] overflow-hidden">
      {/* Sidebar */}
      <AsSideMenu />

      {/* Main Content */}
      <div className="flex flex-col flex-1 h-full overflow-hidden">
        <AsTopNavbar />

        {/* Page Content */}
        <div className="flex-1 overflow-y-auto p-6 space-y-12">
          <h1 className="text-4xl font-semibold text-[#226CD1] text-center animate__animated animate__fadeIn">
            Project Review Page
          </h1>

          {/* Search Bar */}
          <div className="mb-8 max-w-lg mx-auto">
            <input
              type="text"
              className="w-full p-4 rounded-md border border-gray-300 shadow-lg focus:outline-none focus:ring-2 focus:ring-[#6C63FF] transition-all duration-300"
              placeholder="Search by Student Name, Project Title, or Status"
              value={filter}
              onChange={(e) => setFilter(e.target.value)}
            />
          </div>

          {/* Table of Submitted Projects */}
          <div className="overflow-x-auto bg-white shadow-xl rounded-xl p-6 animate__animated animate__fadeIn">
            <h2 className="text-2xl font-bold text-center mb-8 text-[#226CD1]">
              List of Submitted Projects
            </h2>
            <table className="min-w-full table-auto text-center">
              <thead>
                <tr className="bg-gray-200">
                  <th className="px-4 py-2">Student</th>
                  <th className="px-4 py-2">Project Title</th>
                  <th className="px-4 py-2">Publishing Date</th>
                  <th className="px-4 py-2">Status</th>
                  <th className="px-4 py-2">Action</th>
                </tr>
              </thead>
              <tbody>
                {currentProjects.map((project, index) => (
                  <tr
                    key={index}
                    className="border-b hover:bg-gray-50 transition duration-300"
                  >
                    <td className="px-4 py-2">{project.student}</td>
                    <td className="px-4 py-2">{project.title}</td>
                    <td className="px-4 py-2">{project.date}</td>
                    <td className="px-4 py-2">
                      <span
                        className={`px-4 py-2 rounded-full ${
                          statusColors[project.status]
                        } text-white`}
                      >
                        {project.status}
                      </span>
                    </td>
                    <td className="px-4 py-2">
                      <button
                        className={`px-4 py-2 rounded-full text-white ${
                          project.status === "Pending"
                            ? "bg-green-500 hover:bg-green-600"
                            : "bg-blue-500 hover:bg-blue-600"
                        } transition duration-300`}
                        onClick={() => setSelectedProject(project)}
                      >
                        {project.status === "Pending"
                          ? "Review"
                          : "Re-review"}
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {/* Pagination */}
          <div className="flex justify-center mt-8 space-x-4">
            <button
              className="px-4 py-2 bg-gray-300 text-sm rounded-full hover:bg-gray-400"
              onClick={() => handlePageChange(currentPage - 1)}
              disabled={currentPage === 1}
            >
              Previous
            </button>
            <span className="text-lg font-semibold">{currentPage}</span>
            <button
              className="px-4 py-2 bg-gray-300 text-sm rounded-full hover:bg-gray-400"
              onClick={() => handlePageChange(currentPage + 1)}
              disabled={currentPage * projectsPerPage >= filteredProjects.length}
            >
              Next
            </button>
          </div>

          {/* Pie chart for Project Progress */}
          {selectedProject && (
            <div className="mt-8 bg-white p-6 rounded-lg shadow-md">
              <h3 className="text-2xl font-bold text-[#226CD1] text-center mb-6">
                Project Progress: {selectedProject.title}
              </h3>
              <div className="flex justify-center items-center">
                <PieChart width={300} height={300}>
                  <Pie
                    data={[
                      { name: "Completed", value: selectedProject.progress },
                      {
                        name: "Remaining",
                        value: 100 - selectedProject.progress,
                      },
                    ]}
                    cx={150}
                    cy={150}
                    innerRadius={60}
                    outerRadius={80}
                    fill="#8884d8"
                    paddingAngle={5}
                    dataKey="value"
                  >
                    <Cell fill="#00FF00" />
                    <Cell fill="#FF0000" />
                  </Pie>
                  <Tooltip />
                  <Legend />
                </PieChart>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default AsProjectReviewPage;
