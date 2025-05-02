import React, { useState } from "react";
import TopNavbar from "../../components/TopNavbar/TopNavbar";
import SideMenu from "../../components/SideMenu/SideMenu";
import { CSVLink } from "react-csv";
import { Link } from "react-router-dom";

// Mocked example data
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
    reviewer: "Admin 1",
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
    reviewer: "Admin 2",
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
    reviewer: "Admin 3",
  },
  {
    id: 4,
    student: "Ayesha Khan",
    title: "Blockchain Integration for KOI",
    date: "2025/05/01",
    status: "Approved",
    description:
      "Exploring how blockchain can be integrated into KOI's system.",
    comments: ["Great research."],
    files: ["blockchainIntegration.pdf"],
    reviewer: "Admin 4",
  },
  {
    id: 5,
    student: "Sita Gurung",
    title: "Student Portal Redesign",
    date: "2025/04/15",
    status: "Rejected",
    description: "Redesigning the student portal for a more modern interface.",
    comments: ["The design is too similar to the previous one."],
    files: ["portalRedesign.png"],
    reviewer: "Admin 5",
  },
];

const AdminProjectReview = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedProject, setSelectedProject] = useState(null);
  const [newComment, setNewComment] = useState("");
  const [currentPage, setCurrentPage] = useState(1);

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

  const handleStatusChange = (newStatus) => {
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
    // Here, we update the state of the projects in the parent component as well
    projects.splice(0, projects.length, ...updatedProjectsState); // In place update for the project state
  };

  const handleFileDownload = (fileName) => {
    alert(`Downloading: ${fileName}`);
  };

  return (
    <div className="flex min-h-screen bg-[#f9f9f9]">
      {/* Sidebar */}
      <div className="w-auto animate-fade-in-left duration-500">
        <SideMenu currentPage="projectReview" />
      </div>

      {/* Main Content */}
      <main className="flex-1 flex flex-col px-8 overflow-hidden">
        <TopNavbar />

        {/* Page Title */}
        <h1 className="text-4xl font-bold text-[#226CD1] text-left my-10 animate-fade-in-down">
          Project Review Page
        </h1>

        {/* Search Bar */}
        <div className="flex mb-4">
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search by student, title, or status"
            className="px-4 py-2 border rounded-md"
          />
        </div>

        {/* Assignment Table */}
        <div className="bg-[#fefafa] rounded-2xl shadow-md w-full max-w-6xl mx-auto p-6 border border-gray-200 animate-fade-in-up">
          <h2 className="text-2xl font-bold text-center mb-6 text-black">
            List of Submitted Assignments
          </h2>

          <div className="overflow-x-auto">
            <table className="w-full text-sm text-left text-gray-700">
              <thead className="border-b text-black font-semibold">
                <tr>
                  <th
                    className="py-3 px-4"
                    onClick={() => setSortBy("student")}
                  >
                    Student
                  </th>
                  <th className="py-3 px-4" onClick={() => setSortBy("title")}>
                    Project Title
                  </th>
                  <th className="py-3 px-4" onClick={() => setSortBy("date")}>
                    Publishing Date
                  </th>
                  <th className="py-3 px-4" onClick={() => setSortBy("status")}>
                    Status
                  </th>
                  <th className="py-3 px-4">Action</th>
                </tr>
              </thead>
              <tbody>
                {currentProjects.map((project) => (
                  <tr
                    key={project.id}
                    className="border-b hover:bg-gray-50 transition-all duration-300"
                    onClick={() => handleProjectClick(project.id)}
                  >
                    <td className="py-3 px-4">{project.student}</td>
                    <td className="py-3 px-4">{project.title}</td>
                    <td className="py-3 px-4">{project.date}</td>
                    <td className="py-3 px-4">
                      <span
                        className={`px-3 py-1 rounded-full text-xs font-semibold ${
                          project.status === "Approved"
                            ? "bg-green-100 text-green-700"
                            : project.status === "Rejected"
                            ? "bg-red-100 text-red-700"
                            : "bg-yellow-100 text-yellow-700"
                        }`}
                      >
                        {project.status}
                      </span>
                    </td>
                    <td className="py-3 px-4">
                      <button className="bg-green-500 text-white px-4 py-1 rounded hover:bg-green-600 transition">
                        Review
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {/* Pagination */}
          <div className="flex justify-center mt-4">
            {currentPage > 1 && (
              <button
                onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}
                className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700"
              >
                Previous
              </button>
            )}
            <span className="px-4 py-2">
              Page {currentPage} of {totalPages}
            </span>
            <button
              onClick={() =>
                setCurrentPage((prev) => Math.min(prev + 1, totalPages))
              }
              className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700"
            >
              Next
            </button>
          </div>

          {/* Export to CSV */}
          <div className="mt-6 flex justify-center">
            <CSVLink
              data={projects}
              filename="projects_report.csv"
              className="bg-green-500 text-white px-6 py-2 rounded-full hover:bg-green-600 transition"
            >
              Export to CSV
            </CSVLink>
          </div>
        </div>

        {/* Detailed Project View Modal */}
        {selectedProject && (
          <div className="fixed top-0 left-0 w-full h-full bg-gray-500 bg-opacity-50 flex justify-center items-center">
            <div className="bg-white p-6 rounded-md shadow-lg w-1/3">
              <h2 className="text-xl font-bold text-[#226CD1] mb-4">
                {selectedProject.title}
              </h2>
              <p className="mb-4">
                <strong>Description:</strong> {selectedProject.description}
              </p>

              <h3 className="text-lg font-semibold mb-2">Comments:</h3>
              <ul className="mb-4">
                {selectedProject.comments.map((comment, index) => (
                  <li key={index} className="border-b py-2">
                    {comment}
                  </li>
                ))}
              </ul>

              {/* Comment Section */}
              <textarea
                value={newComment}
                onChange={(e) => setNewComment(e.target.value)}
                placeholder="Leave a comment"
                className="w-full p-2 border rounded-md mb-4"
              ></textarea>
              <button
                onClick={handleCommentSubmit}
                className="bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700"
              >
                Add Comment
              </button>

              <h3 className="text-lg font-semibold mt-4">Files:</h3>
              <ul className="mb-4">
                {selectedProject.files.map((file, index) => (
                  <li
                    key={index}
                    className="text-blue-500 cursor-pointer"
                    onClick={() => handleFileDownload(file)}
                  >
                    {file}
                  </li>
                ))}
              </ul>

              <div className="mt-4 flex justify-between">
                <button
                  onClick={() => setSelectedProject(null)}
                  className="bg-gray-500 text-white px-4 py-2 rounded-md"
                >
                  Close
                </button>
                <Link
                  to="/admin-projectreview"
                  className="bg-green-500 text-white px-4 py-2 rounded-md"
                >
                  Approve
                </Link>
                <button
                  onClick={() => handleStatusChange("Rejected")}
                  className="bg-red-500 text-white px-4 py-2 rounded-md"
                >
                  Reject
                </button>
              </div>
            </div>
          </div>
        )}
      </main>
    </div>
  );
};

export default AdminProjectReview;
