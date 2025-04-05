import React from "react";
import TopNavbar from "../../components/TopNavbar/TopNavbar";
import SideMenu from "../../components/SideMenu/SideMenu";

const AdminProjectReview = () => {
  const projects = [
    {
      student: "Rohan Poudel",
      title: "Implication Of AI In KOI",
      date: "2025/09/19",
      status: "Pending",
    },
    {
      student: "Kushal Nepal",
      title: "Upgrade Of Student Portal",
      date: "2025/08/17",
      status: "Pending",
    },
    {
      student: "Gagan Bohara",
      title: "Adding New features In Moodle",
      date: "2025/06/12",
      status: "Pending",
    },
  ];

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

        {/* Assignment Table */}
        <div className="bg-[#fefafa] rounded-2xl shadow-md w-full max-w-6xl mx-auto p-6 border border-gray-200 animate-fade-in-up">
          <h2 className="text-2xl font-bold text-center mb-6 text-black">
            List of Submitted Assignments
          </h2>

          <div className="overflow-x-auto">
            <table className="w-full text-sm text-left text-gray-700">
              <thead className="border-b text-black font-semibold">
                <tr>
                  <th className="py-3 px-4">Student</th>
                  <th className="py-3 px-4">Project Title</th>
                  <th className="py-3 px-4">Publishing Date</th>
                  <th className="py-3 px-4">Status</th>
                  <th className="py-3 px-4">Action</th>
                </tr>
              </thead>
              <tbody>
                {projects.map((project, idx) => (
                  <tr
                    key={idx}
                    className="border-b hover:bg-gray-50 transition-all duration-300"
                  >
                    <td className="py-3 px-4">{project.student}</td>
                    <td className="py-3 px-4">{project.title}</td>
                    <td className="py-3 px-4">{project.date}</td>
                    <td className="py-3 px-4">{project.status}</td>
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

          {/* View More Button */}
          <div className="mt-6 flex justify-center">
            <button className="bg-gray-200 text-gray-700 px-6 py-2 rounded-full hover:bg-gray-300 transition flex items-center gap-1">
              View More
              <svg
                className="w-4 h-4"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M19 9l-7 7-7-7"
                />
              </svg>
            </button>
          </div>
        </div>
      </main>
    </div>
  );
};

export default AdminProjectReview;
