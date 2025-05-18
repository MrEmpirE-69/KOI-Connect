import React, { useEffect, useState } from "react";
import StudentsSideMenu from "../../StudentComponents/StudentsSideMenu/StudentsSideMenu";
import StudentTopNavbar from "../../StudentComponents/StudentTopNavbar/StudentTopNavbar";
import { BASE_URL, FILE_BASE_URL } from "../../utils/config";
import { adminRequest } from "../../utils/requestMethods";
import toast, { Toaster } from "react-hot-toast";

const StudentsProjectPage = () => {
  const [activeTab, setActiveTab] = useState("projects");
  const [projects, setProjects] = useState([]);
  const [projectSubmissions, setProjectSubmissions] = useState([]);
  const [showSubmitModal, setShowSubmitModal] = useState(false);
  const [showViewModal, setShowViewModal] = useState(false);
  const [selectedProjectId, setSelectedProjectId] = useState(null);
  const [selectedProject, setSelectedProject] = useState(null);
  const [uploadFile, setUploadFile] = useState(null);

  const fetchProjects = async () => {
    try {
      const response = await adminRequest.get(`${BASE_URL}/project/assigned`);
      setProjects(response.data.data);
    } catch (error) {
      console.log("Project list not found");
    }
  };

  const fetchProjectSubmissions = async () => {
    try {
      const response = await adminRequest.get(
        `${BASE_URL}/project/mySubmissions`
      );
      setProjectSubmissions(response.data.data);
    } catch (error) {
      console.log("Project submissions not found");
    }
  };

  useEffect(() => {
    fetchProjects();
    fetchProjectSubmissions();
  }, []);

  const openSubmitDialog = (projectId) => {
    setSelectedProjectId(projectId);
    setShowSubmitModal(true);
  };

  const closeSubmitModal = () => {
    setShowSubmitModal(false);
    setUploadFile(null);
  };

  const handleFileChange = (e) => {
    setUploadFile(e.target.files[0]);
  };

  const handleSubmitProject = async () => {
    if (!uploadFile) {
      toast.error("Please select a file to submit.");
      return;
    }

    const formData = new FormData();
    formData.append("data", JSON.stringify({ projectId: selectedProjectId }));
    formData.append("file", uploadFile);

    try {
      toast.loading("Submitting project...");

      const response = await adminRequest.post(
        `${BASE_URL}/project/submit`,
        formData
      );

      toast.dismiss();
      toast.success(response.data.message || "Project submitted successfully!");

      closeSubmitModal();
      fetchProjects();
      fetchProjectSubmissions();
    } catch (err) {
      toast.dismiss();

      const errorMessage =
        err?.response?.data?.message || "Failed to submit project.";
      toast.error(errorMessage);
    }
  };

  return (
    <div className="flex h-screen w-full bg-gradient-to-br from-[#f7fafd] to-[#edf2f8] overflow-hidden">
      <StudentsSideMenu />
      <div className="flex flex-col flex-1 h-full overflow-hidden">
        <StudentTopNavbar />
        <div className="p-6 overflow-y-auto">
          <div className="mb-6 flex gap-4">
            <button
              className={`px-4 py-2 rounded-lg ${
                activeTab === "projects"
                  ? "bg-blue-500 text-white"
                  : "bg-gray-200 text-gray-700"
              }`}
              onClick={() => setActiveTab("projects")}
            >
              My Projects
            </button>
            <button
              className={`px-4 py-2 rounded-lg ${
                activeTab === "submissions"
                  ? "bg-blue-500 text-white"
                  : "bg-gray-200 text-gray-700"
              }`}
              onClick={() => setActiveTab("submissions")}
            >
              My Submissions
            </button>
          </div>

          {activeTab === "projects" ? (
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
                      {project.supervisor.fullName}
                    </td>
                    <td className="p-3 text-sm">
                      {new Date(project.deadline).toLocaleDateString()}
                    </td>
                    <td className="p-3 text-sm">{project.status}</td>
                    <td className="p-3 text-sm text-right">
                      <div className="flex justify-end gap-2">
                        <button
                          onClick={() => openSubmitDialog(project.id)}
                          className="px-3 py-1 rounded text-sm transition bg-blue-500 text-white cursor-pointer"
                        >
                          Submit
                        </button>
                        <button
                          onClick={() => {
                            setSelectedProject(project);
                            setShowViewModal(true);
                          }}
                          className="px-3 py-1 rounded text-sm transition bg-green-500 text-white cursor-pointer"
                        >
                          View
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          ) : (
            <table className="w-full table-auto border-collapse bg-white shadow rounded-2xl overflow-auto">
              <thead>
                <tr className="bg-gray-200 text-left">
                  <th className="p-3 text-sm font-semibold">Title</th>
                  <th className="p-3 text-sm font-semibold">Supervisor</th>
                  <th className="p-3 text-sm font-semibold">Submitted Date</th>
                  <th className="p-3 text-sm font-semibold">Status</th>
                  <th className="p-3 text-sm font-semibold">Grade</th>
                  <th className="p-3 text-sm font-semibold">Feedback</th>
                </tr>
              </thead>
              <tbody>
                {projectSubmissions.map((submission) => (
                  <tr
                    key={submission.id}
                    className="border-b border-b-gray-200 hover:bg-gray-100"
                  >
                    <td className="p-3 text-sm">{submission.project.title}</td>
                    <td className="p-3 text-sm">
                      {submission.project.supervisor.fullName}
                    </td>
                    <td className="p-3 text-sm">
                      {new Date(submission.createdAt).toLocaleDateString()}
                    </td>
                    <td className="p-3 text-sm">{submission.status}</td>
                    <td className="p-3 text-sm">{submission.grade || "-"}</td>
                    <td className="p-3 text-sm">
                      {submission.feedback || "-"}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          )}

          {/* Submit Modal */}
          {showSubmitModal && (
            <div className="fixed inset-0 bg-transparent backdrop-blur flex items-center justify-center z-50">
              <div className="bg-white rounded-xl p-6 w-full max-w-md shadow-lg">
                <h3 className="text-xl font-semibold mb-4">Submit Project</h3>
                <div className="mb-4">
                  <label className="block text-sm font-medium text-gray-600 mb-1">
                    Upload File
                  </label>
                  <input
                    type="file"
                    onChange={handleFileChange}
                    className="w-full border rounded px-3 py-2 focus:outline-none focus:ring focus:ring-blue-300"
                  />
                </div>
                <div className="flex justify-end gap-3">
                  <button
                    onClick={closeSubmitModal}
                    className="px-4 py-2 bg-gray-300 text-gray-700 rounded hover:bg-gray-400"
                  >
                    Cancel
                  </button>
                  <button
                    onClick={handleSubmitProject}
                    className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
                  >
                    Submit
                  </button>
                </div>
              </div>
            </div>
          )}

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
                    {selectedProject.supervisor?.fullName}
                  </p>
                  <p>
                    <strong>Client:</strong> {selectedProject.client?.fullName}
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
      <Toaster position="top-right" reverseOrder={false} />
    </div>
  );
};

export default StudentsProjectPage;
