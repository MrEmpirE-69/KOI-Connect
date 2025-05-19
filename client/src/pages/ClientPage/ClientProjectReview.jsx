import React, { useEffect, useState } from "react";
import ClientSideMenu from "./ClientSideMenu";
import ClientTopNavbar from "./ClientTopNavbar";
import { BASE_URL, FILE_BASE_URL } from "../../utils/config";
import { adminRequest } from "../../utils/requestMethods";

const ClientProjectReview = () => {
  const [projects, setProjects] = useState([]);
  const [selectedProject, setSelectedProject] = useState(null);
  const [showViewModal, setShowViewModal] = useState(false);

  const fetchProjects = async () => {
    try {
      const response = await adminRequest.get(
        `${BASE_URL}/project/assigned/client`
      );
      setProjects(response.data.data);
    } catch (error) {
      console.error("Error fetching client projects:", error);
    }
  };

  useEffect(() => {
    fetchProjects();
  }, []);

  return (
    <div className="flex h-screen bg-gradient-to-br from-[#f7fafd] to-[#edf2f8] overflow-hidden font-sans">
      <ClientSideMenu currentPage="project-review" />
      <div className="flex flex-col flex-1 h-full overflow-hidden">
        <ClientTopNavbar />
        <div className="p-6 overflow-y-auto">
          <h1 className="text-3xl font-bold mb-6 ">Your Projects</h1>

          <table className="w-full table-auto border-collapse bg-white shadow rounded-2xl overflow-auto">
            <thead>
              <tr className="bg-gray-200 text-left">
                <th className="p-3 text-sm font-semibold">Title</th>
                <th className="p-3 text-sm font-semibold">Supervisor</th>
                <th className="p-3 text-sm font-semibold">Due Date</th>
                <th className="p-3 text-sm font-semibold">Status</th>
                <th className="p-3 text-sm font-semibold text-right">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody>
              {projects.map((project) => (
                <tr
                  key={project.id}
                  className="border-b border-b-gray-200 hover:bg-gray-100"
                >
                  <td className="p-3 text-sm">{project.title}</td>
                  <td className="p-3 text-sm">
                    {project.supervisor?.fullName || "N/A"}
                  </td>
                  <td className="p-3 text-sm">
                    {new Date(project.deadline).toLocaleDateString()}
                  </td>
                  <td className="p-3 text-sm">{project.status}</td>
                  <td className="p-3 text-sm text-right">
                    <button
                      onClick={() => {
                        setSelectedProject(project);
                        setShowViewModal(true);
                      }}
                      className="px-3 py-1 rounded text-sm transition bg-blue-600 text-white hover:bg-blue-700"
                    >
                      View
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>

          {/* View Modal */}
          {showViewModal && selectedProject && (
            <div className="fixed inset-0 bg-opacity-30 backdrop-blur-sm flex items-center justify-center z-50">
              <div className="bg-white rounded-xl p-6 w-full max-w-xl shadow-xl">
                <h2 className="text-xl font-semibold mb-4">Project Details</h2>
                <div className="space-y-2 text-sm text-gray-700">
                  <p>
                    <strong>Title:</strong> {selectedProject.title}
                  </p>
                  <p>
                    <strong>Description:</strong> {selectedProject.description}
                  </p>
                  <p>
                    <strong>Category:</strong> {selectedProject.category}
                  </p>
                  <p>
                    <strong>Status:</strong> {selectedProject.status}
                  </p>
                  <p>
                    <strong>Deadline:</strong>{" "}
                    {new Date(selectedProject.deadline).toLocaleDateString()}
                  </p>
                  <p>
                    <strong>Supervisor:</strong>{" "}
                    {selectedProject.supervisor?.fullName || "N/A"}
                  </p>
                  <p>
                    <strong>Client:</strong>{" "}
                    {selectedProject.client?.fullName || "You"}
                  </p>
                  {selectedProject.fileUrl && (
                    <p>
                      <strong>File:</strong>{" "}
                      <a
                        href={`${FILE_BASE_URL}${selectedProject.fileUrl}`}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-blue-600 underline"
                      >
                        View File
                      </a>
                    </p>
                  )}
                </div>
                <div className="flex justify-end mt-6">
                  <button
                    onClick={() => setShowViewModal(false)}
                    className="px-4 py-2 bg-gray-300 text-gray-700 rounded hover:bg-gray-400"
                  >
                    Close
                  </button>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default ClientProjectReview;
