import React, { useEffect, useState } from "react";
import { MoreVertical } from "lucide-react";
import AsSideMenu from "../../AsComponents/AsSideMenu/AsSideMenu";
import AsTopNavbar from "../../AsComponents/AsTopNavbar/AsTopNavbar";
import { Link } from "react-router-dom";
import { BASE_URL } from "../../utils/config";
import { adminRequest } from "../../utils/requestMethods";
import toast, { Toaster } from "react-hot-toast";
import Swal from "sweetalert2";

export default function AssessmentReview() {
  const [activeTab, setActiveTab] = useState("supervisor");
  const [supervisorAssessments, setSupervisorAssessments] = useState([]);
  const [studentAssessments, setStudentAssessments] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [currentSubmissionId, setCurrentSubmissionId] = useState(null);
  const [reviewData, setReviewData] = useState({ grade: "", feedback: "" });
  const [showEditModal, setShowEditModal] = useState(false);
  const [currentEditAssessment, setCurrentEditAssessment] = useState(null);
  const [editData, setEditData] = useState({
    title: "",
    description: "",
    deadline: "",
    status: "OPEN",
  });

  const openReviewDialog = (submissionId) => {
    setCurrentSubmissionId(submissionId);
    setShowModal(true);
  };
  const [showViewModal, setShowViewModal] = useState(false);
  const [viewData, setViewData] = useState(null);

  const openViewDialog = (assessment) => {
    setViewData(assessment);
    setShowViewModal(true);
  };

  const closeViewModal = () => {
    setShowViewModal(false);
    setViewData(null);
  };

  const closeModal = () => {
    setShowModal(false);
    setReviewData({ grade: "", feedback: "" });
  };

  const openEditDialog = (assessment) => {
    setCurrentEditAssessment(assessment);
    setEditData({
      title: assessment.title || "",
      description: assessment.description || "",
      deadline: assessment.deadline?.split("T")[0] || "",
      status: assessment.status || "OPEN",
    });
    setShowEditModal(true);
  };

  const closeEditModal = () => {
    setShowEditModal(false);
    setCurrentEditAssessment(null);
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

    const request = adminRequest.post(`${BASE_URL}/assessmentSubmit/review`, {
      submissionId: currentSubmissionId,
      grade: reviewData.grade,
      feedback: reviewData.feedback,
    });

    toast.promise(
      request,
      {
        loading: "Submitting review...",
        success: (res) => {
          fetchAssessmentByStudents(); // refresh the list
          closeModal();
          return res.data.message || "Review submitted successfully.";
        },
        error: (err) =>
          err.response?.data?.message || "Failed to submit review.",
      },
      {
        success: { duration: 1500 },
        error: { duration: 2000 },
      }
    );

    try {
      await request;
    } catch (err) {}
  };

  const fetchAssessments = async () => {
    try {
      const response = await adminRequest.get(`${BASE_URL}/assessment/list`);
      setSupervisorAssessments(response.data.data);
    } catch (error) {
      console.log("assessment list not found");
    }
  };

  useEffect(() => {
    fetchAssessments();
  }, []);

  const fetchAssessmentByStudents = async () => {
    try {
      const response = await adminRequest.get(
        `${BASE_URL}/assessmentSubmit/list`
      );
      setStudentAssessments(response.data.data);
    } catch (error) {
      console.log("assessment list not found");
    }
  };

  useEffect(() => {
    fetchAssessmentByStudents();
  }, []);

  const handleDeleteAssessment = (assessmentId) => {
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
          const res = await adminRequest.post(`${BASE_URL}/assessment/delete`, {
            assessmentId,
          });

          toast.success(res.data.message || "Assessment deleted successfully");
          fetchAssessments();
        } catch (err) {
          toast.error(
            err.response?.data?.message || "Failed to delete assessment"
          );
        }
      }
    });
  };

  return (
    <div className="flex h-screen bg-[#f5f6fa] overflow-hidden">
      <AsSideMenu currentPage="projectReview" />
      <main className="flex-1 flex flex-col overflow-hidden p-6">
        <AsTopNavbar />
        <div className="mb-6 flex justify-between items-center py-6">
          <h2 className="text-2xl font-semibold">Assessments</h2>
          <Link to="/create-assessment">
            <button className="bg-blue-500 cursor-pointer text-white px-4 py-2 rounded-lg hover:bg-blue-600 shadow hover:scale-105 transition-transform duration-200">
              Create Assessment
            </button>
          </Link>
        </div>

        <div className="mb-4 flex gap-4">
          <button
            className={`px-4 py-2 rounded-lg ${
              activeTab === "supervisor"
                ? "bg-blue-500 text-white"
                : "bg-gray-200 text-gray-700"
            }`}
            onClick={() => setActiveTab("supervisor")}
          >
            Assessments
          </button>
          <button
            className={`px-4 py-2 rounded-lg ${
              activeTab === "student"
                ? "bg-blue-500 text-white"
                : "bg-gray-200 text-gray-700"
            }`}
            onClick={() => setActiveTab("student")}
          >
            Student Submissions
          </button>
        </div>

        <div className="bg-white rounded-2xl shadow p-6 overflow-visible min-h-fit">
          {activeTab === "supervisor" ? (
            <table className="w-full table-auto border-collapse">
              <thead>
                <tr className="bg-gray-200 text-left">
                  <th className="p-3 text-sm font-semibold">Title</th>
                  <th className="p-3 text-sm font-semibold">Due Date</th>
                  <th className="p-3 text-sm font-semibold">Status</th>
                  <th className="p-3 text-sm font-semibold text-right">
                    Actions
                  </th>
                </tr>
              </thead>
              <tbody>
                {supervisorAssessments.map((assessment) => (
                  <tr
                    key={assessment.id}
                    className="border-b border-b-gray-200 hover:bg-gray-100"
                  >
                    <td className="p-3 text-sm">{assessment.title}</td>
                    <td className="p-3 text-sm">
                      {new Date(assessment.deadline).toLocaleDateString()}
                    </td>
                    <td className="p-3 text-sm">
                      <span
                        className={`px-2 py-1 rounded-full text-xs font-medium ${
                          assessment.status === "Open"
                            ? "bg-green-100 text-green-800"
                            : "bg-red-100 text-red-800"
                        }`}
                      >
                        {assessment.status}
                      </span>
                    </td>
                    <td className="p-3 text-sm text-right relative">
                      <div className="relative inline-block">
                        <button
                          className="p-2 hover:bg-gray-200 rounded"
                          onClick={() => {
                            const menu = document.getElementById(
                              `menu-${assessment.id}`
                            );
                            menu.classList.toggle("hidden");
                          }}
                        >
                          <MoreVertical size={18} />
                        </button>
                        <div
                          id={`menu-${assessment.id}`}
                          className="absolute right-0 mt-2 w-40 bg-white border border-gray-200 rounded shadow-lg z-50 hidden"
                        >
                          <button
                            className="w-full text-left px-4 py-2 hover:bg-gray-100"
                            onClick={() => openViewDialog(assessment)}
                          >
                            View
                          </button>

                          <button
                            className="w-full text-left px-4 py-2 hover:bg-gray-100"
                            onClick={() => openEditDialog(assessment)}
                          >
                            Edit
                          </button>
                          <button
                            className="w-full text-left px-4 py-2 hover:bg-gray-100 text-red-600"
                            onClick={() =>
                              handleDeleteAssessment(assessment.id)
                            }
                          >
                            Delete
                          </button>
                        </div>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          ) : (
            <table className="w-full table-auto border-collapse">
              <thead>
                <tr className="bg-gray-200 text-left">
                  <th className="p-3 text-sm font-semibold">Title</th>
                  <th className="p-3 text-sm font-semibold">Student</th>
                  <th className="p-3 text-sm font-semibold">Submitted Date</th>
                  <th className="p-3 text-sm font-semibold">Due Date</th>
                  <th className="p-3 text-sm font-semibold">Status</th>
                  <th className="p-3 text-sm font-semibold text-right">
                    Actions
                  </th>
                </tr>
              </thead>
              <tbody>
                {studentAssessments.map((submission) => (
                  <tr
                    key={submission.id}
                    className="border-b border-b-gray-200 hover:bg-gray-100"
                  >
                    <td className="p-3 text-sm">
                      {submission.assessment.title}
                    </td>
                    <td className="p-3 text-sm">
                      {submission.student.fullName}
                    </td>
                    <td className="p-3 text-sm">
                      {new Date(submission.submittedAt).toLocaleDateString()}
                    </td>
                    <td className="p-3 text-sm">
                      {new Date(
                        submission.assessment.deadline
                      ).toLocaleDateString()}
                    </td>
                    <td className="p-3 text-sm">
                      <span
                        className={`px-2 py-1 rounded-full text-xs font-medium ${
                          submission.status === "Reviewed"
                            ? "bg-green-100 text-green-800"
                            : "bg-yellow-100 text-yellow-800"
                        }`}
                      >
                        {submission.status}
                      </span>
                    </td>
                    <td className="p-3 text-sm text-right">
                      <button
                        onClick={() => openReviewDialog(submission.id)}
                        disabled={submission.status === "REVIEWED"}
                        className={`px-3 py-1 rounded text-sm transition ${
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
        </div>
        {showModal && (
          <div className="fixed inset-0  bg-transparent backdrop-blur flex items-center justify-center z-50">
            <div className="bg-white rounded-xl p-6 w-full max-w-md shadow-lg">
              <h3 className="text-xl font-semibold mb-4">Review Submission</h3>

              <div className="mb-4">
                <label className="block text-sm font-medium text-gray-600 mb-1">
                  Grade
                </label>
                <input
                  type="text"
                  name="grade"
                  value={reviewData.grade}
                  onChange={handleReviewChange}
                  className="w-full border rounded px-3 py-2 focus:outline-none focus:ring focus:ring-blue-300"
                  placeholder="Enter grade (e.g. A, B+)"
                />
              </div>

              <div className="mb-4">
                <label className="block text-sm font-medium text-gray-600 mb-1">
                  Feedback
                </label>
                <textarea
                  name="feedback"
                  value={reviewData.feedback}
                  onChange={handleReviewChange}
                  rows="4"
                  className="w-full border rounded px-3 py-2 focus:outline-none focus:ring focus:ring-blue-300"
                  placeholder="Write feedback..."
                ></textarea>
              </div>

              <div className="flex justify-end gap-3">
                <button
                  onClick={closeModal}
                  className="px-4 py-2 bg-gray-300 text-gray-700 rounded hover:bg-gray-400"
                >
                  Cancel
                </button>
                <button
                  onClick={handleSubmitReview}
                  className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
                >
                  Submit
                </button>
              </div>
            </div>
          </div>
        )}
        {showEditModal && (
          <div className="fixed inset-0 bg-transparent backdrop-blur flex items-center justify-center z-50">
            <div className="bg-white rounded-xl p-6 w-full max-w-md shadow-lg">
              <h3 className="text-xl font-semibold mb-4">Edit Assessment</h3>

              <div className="mb-4">
                <label className="block text-sm font-medium text-gray-600 mb-1">
                  Title
                </label>
                <input
                  type="text"
                  name="title"
                  value={editData.title}
                  onChange={(e) =>
                    setEditData({ ...editData, title: e.target.value })
                  }
                  className="w-full border rounded px-3 py-2 focus:outline-none focus:ring focus:ring-blue-300"
                  placeholder="Assessment title"
                />
              </div>

              <div className="mb-4">
                <label className="block text-sm font-medium text-gray-600 mb-1">
                  Description
                </label>
                <textarea
                  name="description"
                  value={editData.description}
                  onChange={(e) =>
                    setEditData({ ...editData, description: e.target.value })
                  }
                  rows="3"
                  className="w-full border rounded px-3 py-2 focus:outline-none focus:ring focus:ring-blue-300"
                  placeholder="Description"
                ></textarea>
              </div>

              <div className="mb-4">
                <label className="block text-sm font-medium text-gray-600 mb-1">
                  Deadline
                </label>
                <input
                  type="date"
                  name="deadline"
                  value={editData.deadline}
                  onChange={(e) =>
                    setEditData({ ...editData, deadline: e.target.value })
                  }
                  className="w-full border rounded px-3 py-2 focus:outline-none focus:ring focus:ring-blue-300"
                />
              </div>

              <div className="mb-4">
                <label className="block text-sm font-medium text-gray-600 mb-1">
                  Status
                </label>
                <select
                  name="status"
                  value={editData.status}
                  onChange={(e) =>
                    setEditData({ ...editData, status: e.target.value })
                  }
                  className="w-full border rounded px-3 py-2 focus:outline-none focus:ring focus:ring-blue-300"
                >
                  <option value="OPEN">OPEN</option>
                  <option value="CLOSED">CLOSED</option>
                </select>
              </div>

              <div className="flex justify-end gap-3">
                <button
                  onClick={closeEditModal}
                  className="px-4 py-2 bg-gray-300 text-gray-700 rounded hover:bg-gray-400"
                >
                  Cancel
                </button>
                <button
                  onClick={async () => {
                    if (
                      !editData.title ||
                      !editData.description ||
                      !editData.deadline ||
                      !editData.status
                    ) {
                      toast.error("All fields are required");
                      return;
                    }

                    const request = adminRequest.post(
                      `${BASE_URL}/assessment/edit`,
                      {
                        assessmentId: currentEditAssessment.id,
                        ...editData,
                      }
                    );

                    toast.promise(
                      request,
                      {
                        loading: "Updating assessment...",
                        success: (res) => {
                          fetchAssessments(); // Refresh list
                          closeEditModal();
                          return res.data.message || "Assessment updated.";
                        },
                        error: (err) =>
                          err.response?.data?.message ||
                          "Failed to update assessment.",
                      },
                      {
                        success: { duration: 1500 },
                        error: { duration: 2000 },
                      }
                    );

                    try {
                      await request;
                    } catch (err) {}
                  }}
                  className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
                >
                  Save Changes
                </button>
              </div>
            </div>
          </div>
        )}
        {showViewModal && viewData && (
          <div className="fixed inset-0 bg-transparent backdrop-blur flex items-center justify-center z-50">
            <div className="bg-white rounded-xl p-6 w-full max-w-lg shadow-lg">
              <h3 className="text-xl font-semibold mb-4">Assessment Details</h3>

              <div className="mb-3">
                <label className="block text-sm text-gray-500">Title</label>
                <p className="text-md font-medium text-gray-800">
                  {viewData.title}
                </p>
              </div>

              <div className="mb-3">
                <label className="block text-sm text-gray-500">
                  Description
                </label>
                <p className="text-md text-gray-800">{viewData.description}</p>
              </div>

              <div className="mb-3">
                <label className="block text-sm text-gray-500">Deadline</label>
                <p className="text-md text-gray-800">
                  {new Date(viewData.deadline).toLocaleDateString()}
                </p>
              </div>

              <div className="mb-3">
                <label className="block text-sm text-gray-500">Status</label>
                <p
                  className={`text-md font-semibold ${
                    viewData.status === "OPEN"
                      ? "text-green-600"
                      : "text-red-600"
                  }`}
                >
                  {viewData.status}
                </p>
              </div>

              <div className="mb-3">
                <label className="block text-sm text-gray-500">File</label>
                <a
                  href={viewData.fileUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-blue-600 underline"
                >
                  view File
                </a>
              </div>

              <div className="flex justify-end mt-6">
                <button
                  onClick={closeViewModal}
                  className="px-4 py-2 bg-gray-300 text-gray-700 rounded hover:bg-gray-400"
                >
                  Close
                </button>
              </div>
            </div>
          </div>
        )}
      </main>
      <Toaster position="top-right" reverseOrder={false} />
    </div>
  );
}
