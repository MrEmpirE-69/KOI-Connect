// AsProjectReviewPage.jsx
import React, { useState, useEffect } from "react";
import AsSideMenu from "../../AsComponents/AsSideMenu/AsSideMenu";
import AsTopNavbar from "../../AsComponents/AsTopNavbar/AsTopNavbar";
import { BASE_URL } from "../../utils/config";
import { adminRequest } from "../../utils/requestMethods";
import toast from "react-hot-toast";
import Swal from "sweetalert2";
import {
  FileText,
  CalendarDays,
  Info,
  BadgeCheck,
  XCircle,
  Pencil,
  AlignLeft,
  Settings,
} from "lucide-react";

import { Link } from "react-router-dom";

const AsProjectReviewPage = () => {
  const [activeTab, setActiveTab] = useState("projects");
  const [projects, setProjects] = useState([]);
  const [submissions, setSubmissions] = useState([]);
  const [showReviewModal, setShowReviewModal] = useState(false);
  const [currentSubmissionId, setCurrentSubmissionId] = useState(null);
  const [reviewData, setReviewData] = useState({ grade: "", feedback: "" });
  const [showViewModal, setShowViewModal] = useState(false);
  const [viewData, setViewData] = useState(null);
  const [showEditModal, setShowEditModal] = useState(false);
  const [currentEditProject, setCurrentEditProject] = useState(null);
  const [editData, setEditData] = useState({
    title: "",
    description: "",
    deadline: "",
    status: "PUBLISHED",
  });

  useEffect(() => {
    fetchProjects();
    fetchSubmissions();
  }, []);

  const fetchProjects = async () => {
    try {
      const response = await adminRequest.get(`${BASE_URL}/project/list`);
      setProjects(response.data.data);
    } catch (error) {
      console.error("Failed to load projects");
    }
  };

  const fetchSubmissions = async () => {
    try {
      const response = await adminRequest.get(
        `${BASE_URL}/project/submissions`
      );
      setSubmissions(response.data.data);
    } catch (error) {
      console.error("Failed to load submissions");
    }
  };

  const openViewDialog = (project) => {
    setViewData(project);
    setShowViewModal(true);
  };

  const closeViewModal = () => {
    setShowViewModal(false);
    setViewData(null);
  };

  const openEditDialog = (project) => {
    setCurrentEditProject(project);
    setEditData({
      title: project.title || "",
      description: project.description || "",
      deadline: project.deadline?.split("T")[0] || "",
      status: project.status || "PUBLISHED",
    });
    setShowEditModal(true);
  };

  const closeEditModal = () => {
    setShowEditModal(false);
    setCurrentEditProject(null);
  };

  const handleEditSubmit = async () => {
    if (!editData.title || !editData.description || !editData.deadline) {
      toast.error("All fields are required");
      return;
    }
    try {
      const res = await adminRequest.post(`${BASE_URL}/project/edit`, {
        projectId: currentEditProject.id,
        ...editData,
      });
      toast.success(res.data.message || "Project updated successfully");
      fetchProjects();
      closeEditModal();
    } catch (err) {
      toast.error(err.response?.data?.message || "Failed to update project");
    }
  };

  const handleDeleteProject = (projectId) => {
    Swal.fire({
      title: "Are you sure?",
      text: "This action cannot be undone.",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, delete it!",
    }).then(async (result) => {
      if (result.isConfirmed) {
        try {
          const res = await adminRequest.post(`${BASE_URL}/project/delete`, {
            projectId,
          });
          toast.success(res.data.message || "Project deleted successfully");
          fetchProjects();
        } catch (err) {
          toast.error(
            err.response?.data?.message || "Failed to delete project"
          );
        }
      }
    });
  };

  const openReviewDialog = (submissionId) => {
    setCurrentSubmissionId(submissionId);
    setShowReviewModal(true);
  };

  const closeReviewDialog = () => {
    setReviewData({ grade: "", feedback: "" });
    setShowReviewModal(false);
  };

  const handleReviewChange = (e) => {
    const { name, value } = e.target;
    setReviewData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmitReview = async () => {
    if (!reviewData.grade || !reviewData.feedback) {
      toast.error("Both grade and feedback are required.");
      return;
    }

    try {
      const response = await adminRequest.post(`${BASE_URL}/project/review`, {
        submissionId: currentSubmissionId,
        grade: reviewData.grade,
        feedback: reviewData.feedback,
      });
      toast.success(response.data.message);
      closeReviewDialog();
      fetchSubmissions();
    } catch (error) {
      toast.error("Failed to submit review");
    }
  };

  return (
    <div className="flex h-screen w-full bg-[#f9f9f9]">
      <AsSideMenu currentPage="projectReview" />
      <div className="flex flex-col flex-1 h-full overflow-hidden">
        <AsTopNavbar />
        <div className="p-6">
          <div className="mb-6 flex justify-between items-center py-6">
            <h2 className="text-2xl font-semibold">Project List</h2>
            <div className="flex gap-3">
              <Link to="/create-project">
                <button className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 shadow">
                  Create Project
                </button>
              </Link>
              <Link to="/assign-project">
                <button className="bg-orange-600 text-white px-4 py-2 rounded hover:bg-orange-700 shadow">
                  Assign Project
                </button>
              </Link>
            </div>
          </div>

          <div className="flex gap-4 mb-4">
            <button
              className={`px-4 py-2 rounded-lg ${
                activeTab === "projects"
                  ? "bg-blue-500 text-white"
                  : "bg-gray-200"
              }`}
              onClick={() => setActiveTab("projects")}
            >
              Projects
            </button>
            <button
              className={`px-4 py-2 rounded-lg ${
                activeTab === "submissions"
                  ? "bg-blue-500 text-white"
                  : "bg-gray-200"
              }`}
              onClick={() => setActiveTab("submissions")}
            >
              Student Submissions
            </button>
          </div>

          {/* TABLE DISPLAY */}
          {activeTab === "projects" ? (
            <table className="w-full table-auto bg-white shadow rounded-xl">
              <thead className="bg-gray-200 text-left">
                <tr>
                  <th className="p-3">Title</th>
                  <th className="p-3">Deadline</th>
                  <th className="p-3">Status</th>
                  <th className="p-3 text-right">Actions</th>
                </tr>
              </thead>
              <tbody>
                {projects.map((project) => (
                  <tr key={project.id} className="border-b hover:bg-gray-50">
                    <td className="p-3">{project.title}</td>
                    <td className="p-3">
                      {new Date(project.deadline).toLocaleDateString()}
                    </td>
                    <td className="p-3">
                      <span
                        className={`px-2 py-1 text-xs rounded-full ${
                          project.status === "Open"
                            ? "bg-green-100 text-green-700"
                            : "bg-red-100 text-red-700"
                        }`}
                      >
                        {project.status}
                      </span>
                    </td>
                    <td className="p-3 text-right">
                      <div className="inline-flex gap-1">
                        <button
                          onClick={() => openViewDialog(project)}
                          className="text-blue-500 hover:underline"
                        >
                          View
                        </button>
                        <button
                          onClick={() => openEditDialog(project)}
                          className="text-yellow-500 hover:underline"
                        >
                          Edit
                        </button>
                        <button
                          onClick={() => handleDeleteProject(project.id)}
                          className="text-red-500 hover:underline"
                        >
                          Delete
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          ) : (
            <table className="w-full table-auto bg-white shadow rounded-xl">
              <thead className="bg-gray-200 text-left">
                <tr>
                  <th className="p-3">Project</th>
                  <th className="p-3">Student</th>
                  <th className="p-3">Submitted</th>
                  <th className="p-3">Grade</th>
                  <th className="p-3 text-right">Actions</th>
                </tr>
              </thead>
              <tbody>
                {submissions.map((submission) => (
                  <tr key={submission.id} className="border-b hover:bg-gray-50">
                    <td className="p-3">{submission.project.title}</td>
                    <td className="p-3">{submission.student.fullName}</td>
                    <td className="p-3">
                      {new Date(submission.createdAt).toLocaleDateString()}
                    </td>
                    <td className="p-3">{submission.grade || "-"}</td>
                    <td className="p-3 text-right">
                      <button
                        onClick={() => openReviewDialog(submission.id)}
                        disabled={submission.status === "REVIEWED"}
                        className={`px-3 py-1 rounded text-sm ${
                          submission.status === "REVIEWED"
                            ? "bg-gray-300 text-gray-600 cursor-not-allowed"
                            : "bg-blue-500 text-white hover:bg-blue-600"
                        }`}
                      >
                        Review
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          )}

          {/* Review Modal */}
          {showReviewModal && (
            <div className="fixed inset-0 bg-black/30 backdrop-blur-sm flex items-center justify-center z-50">
              <div className="backdrop-blur-lg bg-white/70 border border-gray-300/30 p-6 rounded-2xl w-full max-w-md shadow-lg">
                <h3 className="text-xl font-semibold mb-4 text-gray-800">
                  Review Submission
                </h3>
                <input
                  name="grade"
                  value={reviewData.grade}
                  onChange={handleReviewChange}
                  placeholder="Grade (e.g. A, B+)"
                  className="w-full mb-4 border border-gray-300/50 bg-white/60 px-4 py-2 rounded-lg placeholder-gray-500 text-gray-800 focus:outline-none focus:ring-2 focus:ring-blue-400"
                />
                <textarea
                  name="feedback"
                  value={reviewData.feedback}
                  onChange={handleReviewChange}
                  placeholder="Feedback"
                  rows="4"
                  className="w-full mb-4 border border-gray-300/50 bg-white/60 px-4 py-2 rounded-lg placeholder-gray-500 text-gray-800 focus:outline-none focus:ring-2 focus:ring-blue-400"
                />
                <div className="flex justify-end gap-3">
                  <button
                    onClick={closeReviewDialog}
                    className="px-4 py-2 bg-gray-200 text-gray-700 rounded-lg hover:bg-gray-300 transition"
                  >
                    Cancel
                  </button>
                  <button
                    onClick={handleSubmitReview}
                    className="px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition"
                  >
                    Submit
                  </button>
                </div>
              </div>
            </div>
          )}

          {showViewModal && viewData && (
            <div className="fixed inset-0  backdrop-blur-sm flex items-center justify-center z-50 px-4">
              <div className="backdrop-blur-lg bg-white/80 border border-gray-200/50 p-6 rounded-2xl w-full max-w-lg shadow-xl">
                <div className="flex items-center justify-between mb-6">
                  <h3 className="text-2xl font-semibold text-gray-800 flex items-center gap-2">
                    <Info className="w-6 h-6 text-blue-500" />
                    Project Overview
                  </h3>
                  <button onClick={closeViewModal}>
                    <XCircle className="w-6 h-6 text-gray-500 hover:text-red-500 transition" />
                  </button>
                </div>

                <div className="space-y-5 text-gray-700">
                  <div className="flex items-start gap-3">
                    <FileText className="w-5 h-5 mt-1 text-blue-600" />
                    <div>
                      <p className="text-sm text-gray-500">Title</p>
                      <p className="text-base font-medium">{viewData.title}</p>
                    </div>
                  </div>

                  <div className="flex items-start gap-3">
                    <Info className="w-5 h-5 mt-1 text-green-600" />
                    <div>
                      <p className="text-sm text-gray-500">Description</p>
                      <p className="text-base">
                        {viewData.description || "No description provided."}
                      </p>
                    </div>
                  </div>

                  <div className="flex items-start gap-3">
                    <CalendarDays className="w-5 h-5 mt-1 text-indigo-600" />
                    <div>
                      <p className="text-sm text-gray-500">Deadline</p>
                      <p className="text-base">
                        {new Date(viewData.deadline).toLocaleDateString()}
                      </p>
                    </div>
                  </div>

                  <div className="flex items-start gap-3">
                    <BadgeCheck className="w-5 h-5 mt-1 text-purple-600" />
                    <div>
                      <p className="text-sm text-gray-500">Status</p>
                      <p
                        className={`text-base font-semibold ${
                          viewData.status === "PUBLISHED"
                            ? "text-green-600"
                            : "text-red-600"
                        }`}
                      >
                        {viewData.status}
                      </p>
                    </div>
                  </div>
                </div>

                <div className="flex justify-end mt-8">
                  <button
                    onClick={closeViewModal}
                    className="px-5 py-2 text-sm bg-gray-200 text-gray-800 rounded-lg hover:bg-gray-300 transition"
                  >
                    Close
                  </button>
                </div>
              </div>
            </div>
          )}
          {/* Edit Modal */}
          {showEditModal && (
            <div className="fixed inset-0 bg-black/30 backdrop-blur-sm flex items-center justify-center z-50 px-4">
              <div className="backdrop-blur-lg bg-white/80 border border-gray-300/40 p-6 rounded-2xl w-full max-w-lg shadow-xl">
                <div className="flex items-center justify-between mb-6">
                  <h3 className="text-2xl font-semibold text-gray-800 flex items-center gap-2">
                    <Pencil className="w-6 h-6 text-blue-500" />
                    Edit Project
                  </h3>
                  <button onClick={closeEditModal}>
                    <XCircle className="w-6 h-6 text-gray-500 hover:text-red-500 transition" />
                  </button>
                </div>

                <div className="space-y-4 text-gray-700">
                  {/* Title */}
                  <label className=" text-sm font-medium text-gray-600 flex items-center gap-2">
                    <FileText className="w-4 h-4" />
                    Title
                  </label>
                  <input
                    value={editData.title}
                    onChange={(e) =>
                      setEditData({ ...editData, title: e.target.value })
                    }
                    placeholder="Enter project title"
                    className="w-full border border-gray-300/50 bg-white/60 px-4 py-2 rounded-lg placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-400"
                  />

                  {/* Description */}
                  <label className=" text-sm font-medium text-gray-600 flex items-center gap-2">
                    <AlignLeft className="w-4 h-4" />
                    Description
                  </label>
                  <textarea
                    value={editData.description}
                    onChange={(e) =>
                      setEditData({ ...editData, description: e.target.value })
                    }
                    placeholder="Enter description..."
                    rows="3"
                    className="w-full border border-gray-300/50 bg-white/60 px-4 py-2 rounded-lg placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-400"
                  />

                  {/* Deadline */}
                  <label className=" text-sm font-medium text-gray-600 flex items-center gap-2">
                    <CalendarDays className="w-4 h-4" />
                    Deadline
                  </label>
                  <input
                    type="date"
                    value={editData.deadline}
                    onChange={(e) =>
                      setEditData({ ...editData, deadline: e.target.value })
                    }
                    className="w-full border border-gray-300/50 bg-white/60 px-4 py-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
                  />

                  {/* Status */}
                  <label className=" text-sm font-medium text-gray-600 flex items-center gap-2">
                    <Settings className="w-4 h-4" />
                    Status
                  </label>
                  <select
                    value={editData.status}
                    onChange={(e) =>
                      setEditData({ ...editData, status: e.target.value })
                    }
                    className="w-full border border-gray-300/50 bg-white/60 px-4 py-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
                  >
                    <option value="PUBLISHED">PUBLISHED</option>
                    <option value="IN_PROGRESS">IN PROGRESS</option>
                    <option value="COMPLETED">COMPLETED</option>
                    <option value="CANCELLED">CANCELLED</option>
                  </select>
                </div>

                <div className="flex justify-end gap-3 mt-6">
                  <button
                    onClick={closeEditModal}
                    className="px-4 py-2 bg-gray-200 text-gray-800 rounded-lg hover:bg-gray-300 transition"
                  >
                    Cancel
                  </button>
                  <button
                    onClick={handleEditSubmit}
                    className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition"
                  >
                    Save Changes
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

export default AsProjectReviewPage;
