import React, { useState } from "react";
import AsSideMenu from "../../AsComponents/AsSideMenu/AsSideMenu";
import AsTopNavbar from "../../AsComponents/AsTopNavbar/AsTopNavbar";
import { PieChart, Pie, Cell, Tooltip, Legend } from "recharts";

const projects = [
  {
    id: 1,
    student: "Rohan Poudel",
    title: "Implication Of AI In KOI",
    date: "2025/09/19",
    status: "Pending",
    description:
      "Project focused on the implications of AI technology in education systems, particularly in the KOI university context.",
    comments: [
      "Looks good, but needs more research.",
      "Please include a case study.",
    ],
    files: ["file1.pdf", "file2.docx"],
    reviewer: "Academic Supervisor",
    progress: 72,
  },
  {
    id: 2,
    student: "Kushal Nepal",
    title: "Upgrade Of Student Portal",
    date: "2025/08/17",
    status: "Pending",
    description: "Revamping the student portal for better user experience.",
    comments: [],
    files: ["studentPortalDesign.pdf"],
    reviewer: "Academic Supervisor",
    progress: 54,
  },
  {
    id: 3,
    student: "Gagan Bohara",
    title: "Adding New Features In Moodle",
    date: "2025/06/12",
    status: "Pending",
    description:
      "Improving the Moodle platform with additional features for better functionality.",
    comments: ["Seems promising!"],
    files: ["moodleFeatures.docx"],
    reviewer: "Academic Supervisor",
    progress: 85,
  },
  {
    id: 2,
    student: "Kushal Nepal",
    title: "Upgrade Of Student Portal",
    date: "2025/08/17",
    status: "Pending",
    description: "Revamping the student portal for better user experience.",
    comments: [],
    files: ["studentPortalDesign.pdf"],
    reviewer: "Academic Supervisor",
    progress: 54,
  },
  {
    id: 3,
    student: "Gagan Bohara",
    title: "Adding New Features In Moodle",
    date: "2025/06/12",
    status: "Pending",
    description:
      "Improving the Moodle platform with additional features for better functionality.",
    comments: ["Seems promising!"],
    files: ["moodleFeatures.docx"],
    reviewer: "Academic Supervisor",
    progress: 85,
  },
  {
    id: 4,
    student: "Ankit Parajuli",
    title: "Student Portal Redesign",
    date: "2025/04/15",
    status: "Rejected",
    description: "Redesigning the student portal for a more modern interface.",
    comments: ["The design is too similar to the previous one."],
    files: ["portalRedesign.png"],
    reviewer: "Academic Supervisor",
    progress: 40,
  },
  {
    id: 5,
    student: "Sajeet Kc",
    title: "Blockchain Integration for KOI",
    date: "2025/05/01",
    status: "Approved",
    description:
      "Exploring how blockchain can be integrated into KOI's system.",
    comments: ["Great research."],
    files: ["blockchainIntegration.pdf"],
    reviewer: "Academic Supervisor",
    progress: 95,
  },
];

const statusColors = {
  Pending: "#FF6F61",
  Reviewed: "#00B0FF",
  Approved: "#00FF00",
  Rejected: "#FF0000",
};

const AssessmentReview = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedProject, setSelectedProject] = useState(null);
  const [newComment, setNewComment] = useState("");
  const [isReviewing, setIsReviewing] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);

  // Filtering projects
  const filteredProjects = projects.filter(
    (project) =>
      project.student.toLowerCase().includes(searchQuery.toLowerCase()) ||
      project.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      project.status.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const projectsPerPage = 5;
  const totalPages = Math.ceil(filteredProjects.length / projectsPerPage);
  const currentProjects = filteredProjects.slice(
    (currentPage - 1) * projectsPerPage,
    currentPage * projectsPerPage
  );

  const handleProjectClick = (projectId) => {
    const project = projects.find((p) => p.id === projectId);
    setSelectedProject(project);
    setIsReviewing(true); // Start reviewing mode when a project is clicked
  };

  const handleCommentSubmit = () => {
    if (newComment.trim()) {
      const updatedProject = {
        ...selectedProject,
        comments: [...selectedProject.comments, newComment],
      };
      setSelectedProject(updatedProject);
      setNewComment(""); // Clear comment input
    }
  };

  const handleFileDownload = (fileName) => {
    alert(`Downloading: ${fileName}`);
  };

  const handleStatusChange = (newStatus) => {
    // Update the status of the selected project
    const updatedProjects = projects.map((project) =>
      project.id === selectedProject.id
        ? { ...project, status: newStatus }
        : project
    );

    // Update the selected project state as well
    const updatedSelectedProject = { ...selectedProject, status: newStatus };
    setSelectedProject(updatedSelectedProject);

    // Updating the projects list to reflect the change
    const updatedProjectsState = projects.map((project) =>
      project.id === selectedProject.id
        ? { ...project, status: newStatus }
        : project
    );
    projects.splice(0, projects.length, ...updatedProjectsState); // In-place update for the project state

    // Close the review section after approving/rejecting the project
    setIsReviewing(false);
  };

  return (
    <div className="flex h-screen w-full bg-[#f9f9f9]">
      {/* Sidebar */}
      <AsSideMenu currentPage="projectReview" />

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
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
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
                    onClick={() => handleProjectClick(project.id)}
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
                        onClick={() => handleProjectClick(project.id)}
                      >
                        {project.status === "Pending" ? "Review" : "Re-review"}
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
              onClick={() => setCurrentPage(currentPage - 1)}
              disabled={currentPage === 1}
            >
              Previous
            </button>
            <span className="text-lg font-semibold">{currentPage}</span>
            <button
              className="px-4 py-2 bg-gray-300 text-sm rounded-full hover:bg-gray-400"
              onClick={() => setCurrentPage(currentPage + 1)}
              disabled={currentPage * 5 >= filteredProjects.length}
            >
              Next
            </button>
          </div>

          {/* Pie chart for Project Progress */}
          {isReviewing && selectedProject && (
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

              {/* Comments Section */}
              <div className="mt-6">
                <textarea
                  placeholder="Add a comment"
                  value={newComment}
                  onChange={(e) => setNewComment(e.target.value)}
                  className="w-full p-4 border rounded-md mb-4"
                ></textarea>
                <button
                  onClick={handleCommentSubmit}
                  className="bg-blue-500 text-white px-6 py-2 rounded-full"
                >
                  Submit Comment
                </button>
              </div>

              {/* File Downloads */}
              <div className="mt-6">
                <h4 className="text-xl font-semibold text-[#226CD1] mb-4">
                  Files
                </h4>
                <ul>
                  {selectedProject.files.map((file, index) => (
                    <li key={index} className="mb-2">
                      <button
                        onClick={() => handleFileDownload(file)}
                        className="text-blue-500 hover:text-blue-700"
                      >
                        {file}
                      </button>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Approve/Reject Button */}
              <div className="mt-6 flex justify-between">
                <button
                  onClick={() => handleStatusChange("Approved")}
                  className="bg-green-500 text-white px-6 py-2 rounded-full"
                >
                  Approve
                </button>
                <button
                  onClick={() => handleStatusChange("Rejected")}
                  className="bg-red-500 text-white px-6 py-2 rounded-full"
                >
                  Reject
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default AssessmentReview;
