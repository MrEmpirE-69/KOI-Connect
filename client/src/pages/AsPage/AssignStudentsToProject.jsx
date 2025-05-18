import React, { useEffect, useState } from "react";
import { BASE_URL } from "../../utils/config";
import { adminRequest } from "../../utils/requestMethods";
import toast, { Toaster } from "react-hot-toast";
import AsSideMenu from "../../AsComponents/AsSideMenu/AsSideMenu";
import AsTopNavbar from "../../AsComponents/AsTopNavbar/AsTopNavbar";
import { ArrowLeft } from "lucide-react";

const AssignStudentsToProject = () => {
  const [projects, setProjects] = useState([]);
  const [students, setStudents] = useState([]);
  const [selectedProjectId, setSelectedProjectId] = useState(null);
  const [assignedStudents, setAssignedStudents] = useState([]);

  useEffect(() => {
    fetchProjects();
    fetchStudents();
  }, []);

  const fetchProjects = async () => {
    try {
      const res = await adminRequest.get(`${BASE_URL}/project/list`);
      setProjects(res.data.data);
    } catch (error) {
      toast.error("Failed to fetch projects");
    }
  };

  const fetchStudents = async () => {
    try {
      const res = await adminRequest.get(`${BASE_URL}/student/list`);
      setStudents(res.data.data);
    } catch (error) {
      toast.error("Failed to fetch students");
    }
  };

  const onDropStudent = (e) => {
    const studentId = e.dataTransfer.getData("studentId");
    if (studentId && !assignedStudents.includes(studentId)) {
      setAssignedStudents((prev) => [...prev, studentId]);
    }
  };

  const handleAssign = async () => {
    if (!selectedProjectId || assignedStudents.length === 0) {
      toast.error("Please select a project and assign at least one student");
      return;
    }
    try {
      const res = await adminRequest.post(`${BASE_URL}/project/assign`, {
        projectId: selectedProjectId,
        studentIds: assignedStudents.map((id) => parseInt(id)),
      });
      toast.success(res.data.message);
      setAssignedStudents([]);
    } catch (error) {
      toast.error("Assignment failed");
    }
  };

  return (
    <div className="flex h-screen w-full bg-[#f5f6fa]">
      <AsSideMenu currentPage="assignProject" />
      <main className="flex-1 flex flex-col p-6 overflow-y-auto">
        <AsTopNavbar />
        <div className="mb-2">
          <button
            onClick={() => window.history.back()}
            className="flex items-center gap-2 text-sm mt-8 text-gray-600 bg-white px-4 py-2 rounded-full shadow hover:bg-gray-100 hover:scale-105 transition-all duration-300"
          >
            <ArrowLeft />
            Back
          </button>
        </div>
        <h2 className="text-2xl font-semibold mb-6">
          Assign Students to Project
        </h2>

        <div className="flex gap-6">
          {/* Project Selector */}
          <div className="flex-1">
            <label className="block mb-2 font-medium text-gray-700">
              Select Project
            </label>
            <select
              value={selectedProjectId || ""}
              onChange={(e) => setSelectedProjectId(e.target.value)}
              className="w-full px-4 py-2 border rounded-lg"
            >
              <option value="">-- Select a project --</option>
              {projects.map((project) => (
                <option key={project.id} value={project.id}>
                  {project.title}
                </option>
              ))}
            </select>
          </div>
        </div>

        <div className="flex gap-8 mt-10">
          {/* Students List */}
          <div className="flex-1">
            <h3 className="text-lg font-semibold mb-2">Students</h3>
            <div className="min-h-[300px] border rounded-lg p-4 bg-white shadow">
              {students.map((student) => (
                <div
                  key={student.id}
                  className="cursor-move p-2 mb-2 bg-blue-100 rounded hover:bg-blue-200"
                  draggable
                  onDragStart={(e) =>
                    e.dataTransfer.setData("studentId", student.id)
                  }
                >
                  {student.fullName} ({student.studentId})
                </div>
              ))}
            </div>
          </div>

          {/* Droppable Project Area */}
          <div className="flex-1">
            <h3 className="text-lg font-semibold mb-2">Assigned Students</h3>
            <div
              className="min-h-[300px] border rounded-lg p-4 bg-white shadow"
              onDragOver={(e) => e.preventDefault()}
              onDrop={onDropStudent}
            >
              {assignedStudents.length === 0 && (
                <p className="text-gray-400">Drop students here</p>
              )}
              {assignedStudents.map((id) => {
                const student = students.find((s) => s.id === parseInt(id));
                return (
                  <div
                    key={id}
                    className="p-2 mb-2 bg-orange-300 rounded hover:bg-orange-400"
                  >
                    {student?.fullName} ({student?.studentId})
                  </div>
                );
              })}
            </div>
          </div>
        </div>

        <div className="mt-6">
          <button
            onClick={handleAssign}
            className="px-6 py-3 bg-blue-500 text-white rounded-lg shadow hover:bg-blue-600"
          >
            Assign Students
          </button>
        </div>
        <Toaster position="top-right" reverseOrder={false} />
      </main>
    </div>
  );
};

export default AssignStudentsToProject;
