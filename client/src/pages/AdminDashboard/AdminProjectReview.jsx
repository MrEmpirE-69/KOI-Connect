import React, { useState } from "react";
import TopNavbar from "../../components/TopNavbar/TopNavbar";
import SideMenu from "../../components/SideMenu/SideMenu";
import { CSVLink } from "react-csv";

const AdminProjectReview = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [sortOrder, setSortOrder] = useState("asc");
  const [sortBy, setSortBy] = useState("date");
  const [currentPage, setCurrentPage] = useState(1);

  const projects = [
    {
      id: 1,
      student: "Rohan Poudel",
      title: "Implication Of AI In KOI",
      date: "2025/09/19",
      status: "Pending",
    },
    {
      id: 2,
      student: "Kushal Nepal",
      title: "Upgrade Of Student Portal",
      date: "2025/08/17",
      status: "Pending",
    },
    {
      id: 3,
      student: "Gagan Bohara",
      title: "Adding New features In Moodle",
      date: "2025/06/12",
      status: "Pending",
    },
    {
      id: 4,
      student: "Ayesha Khan",
      title: "Blockchain Integration for KOI",
      date: "2025/05/01",
      status: "Approved",
    },
    {
      id: 5,
      student: "Sita Gurung",
      title: "Student Portal Redesign",
      date: "2025/04/15",
      status: "Rejected",
    },
    {
      id: 6,
      student: "Rajesh Sharma",
      title: "Enhancing User Experience in KOI",
      date: "2025/03/10",
      status: "Approved",
    },
    {
      id: 7,
      student: "Anjali Thapa",
      title: "New Features in KOI Admin Panel",
      date: "2025/07/20",
      status: "Pending",
    },
    {
      id: 8,
      student: "Pradeep Rai",
      title: "Developing New API for KOI",
      date: "2025/01/25",
      status: "Approved",
    },
    {
      id: 9,
      student: "Shiva Prasad",
      title: "KOI Dashboard Improvement",
      date: "2025/02/13",
      status: "Pending",
    },
    {
      id: 10,
      student: "Maya Rathi",
      title: "Upgrade of Student Feedback System",
      date: "2025/03/22",
      status: "Pending",
    },
  ];

  const filteredProjects = projects.filter((project) =>
    project.student.toLowerCase().includes(searchQuery.toLowerCase()) ||
    project.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
    project.status.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const sortedProjects = filteredProjects.sort((a, b) => {
    if (sortOrder === "asc") {
      return a[sortBy] > b[sortBy] ? 1 : -1;
    } else {
      return a[sortBy] < b[sortBy] ? 1 : -1;
    }
  });

  const projectsPerPage = 5;
  const totalPages = Math.ceil(sortedProjects.length / projectsPerPage);
  const currentProjects = sortedProjects.slice(
    (currentPage - 1) * projectsPerPage,
    currentPage * projectsPerPage
  );

  const handleStatusChange = (id, newStatus) => {
    const updatedProjects = projects.map((project) =>
      project.id === id ? { ...project, status: newStatus } : project
    );
    setCurrentPage(updatedProjects);
  };

  return (
    <div className="flex min-h-screen bg-[#f9f9f9]">
      {/* Sidebar */}
      <div className="w-auto animate-fade-in-left duration-500">
        <SideMenu currentPage="projectReview" />
      </div>

      {/* Main Content */}
      <main className="flex-1 px-6 md:px-10 pt-4 overflow-y-auto animate-fade-in-up duration-700">
        <TopNavbar />

        {/* Page Title */}
        <h1 className="text-4xl font-bold text-[#226CD1] text-center my-10 animate-fade-in-down">
          Project Review Page
        </h1>

        {/* Search Bar */}
        <div className="flex justify-center mb-4">
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search by student, title, or status"
            className="px-4 py-2 border rounded-md w-full max-w-md"
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
                  <th className="py-3 px-4" onClick={() => setSortBy("student")}>Student</th>
                  <th className="py-3 px-4" onClick={() => setSortBy("title")}>Project Title</th>
                  <th className="py-3 px-4" onClick={() => setSortBy("date")}>Publishing Date</th>
                  <th className="py-3 px-4" onClick={() => setSortBy("status")}>Status</th>
                  <th className="py-3 px-4">Action</th>
                </tr>
              </thead>
              <tbody>
                {currentProjects.map((project) => (
                  <tr
                    key={project.id}
                    className="border-b hover:bg-gray-50 transition-all duration-300"
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
            {/* Conditionally show Previous button only on the second page */}
            {currentPage > 1 && (
              <button onClick={() => setCurrentPage(prev => Math.max(prev - 1, 1))} className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700">
                Previous
              </button>
            )}
            <span className="px-4 py-2">Page {currentPage} of {totalPages}</span>
            <button onClick={() => setCurrentPage(prev => Math.min(prev + 1, totalPages))} className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700">
              Next
            </button>
          </div>

          {/* Export to CSV */}
          <div className="mt-6 flex justify-center">
            <CSVLink
              data={projects}
              filename="projects.csv"
              className="bg-green-500 text-white px-6 py-2 rounded-full hover:bg-green-600 transition"
            >
              Export to CSV
            </CSVLink>
          </div>
        </div>
      </main>
    </div>
  );
};

export default AdminProjectReview;
