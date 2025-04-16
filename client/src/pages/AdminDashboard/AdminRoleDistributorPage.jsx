import React, { useState } from "react";
import SideMenu from "../../components/SideMenu/SideMenu";
import TopNavbar from "../../components/TopNavbar/TopNavbar";
import { FaEdit, FaTrash } from "react-icons/fa";

// Example users with initials
const usersData = [
  { id: 1, name: "Kushal Nepal", role: "Student", email: "12202457@students.koi.edu.au", status: "Active", initials: "KN" },
  { id: 2, name: "Gagan Bohara", role: "Student", email: "12202423@students.koi.edu.au", status: "Inactive", initials: "GB" },
  { id: 3, name: "Rohan Poudel", role: "Student", email: "12202475@students.koi.edu.au", status: "Inactive", initials: "RP" },
  { id: 4, name: "Sajit KC", role: "Student", email: "12203368@students.koi.edu.au", status: "Active", initials: "SKC" },
  { id: 5, name: "Harry Magar", role: "Admin", email: "harrymagar@koi.edu.au", status: "Active", initials: "HM" },
  { id: 6, name: "Burno Shrestha", role: "Academic Supervisor", email: "burnostha@koi.edu.au", status: "Active", initials: "BS" },
  { id: 7, name: "Cristiano Maharjan", role: "Admin", email: "cristianomaharjan@koi.edu.au", status: "Inactive", initials: "CM" },
  { id: 8, name: "Messi Limbu", role: "Client", email: "limbumessi@hotmail.com", status: "Active", initials: "ML" },
  { id: 9, name: "Lamine Yamal", role: "Client", email: "laminey@hotmail.com", status: "Active", initials: "LY" },
  { id: 10, name: "Rafi Ana", role: "Client", email: "rafiii@hotmail.com", status: "Active", initials: "RF" },
  { id: 11, name: "Ankit Parajuli", role: "Client", email: "parajuliankit@hotmail.com", status: "Active", initials: "AP" },
  { id: 12, name: "Neymar Jung Rana", role: "Client", email: "NaymarJr@hotmail.com", status: "Active", initials: "NJR" },
  { id: 13, name: "Pablo Gavi", role: "Client", email: "Gavides@hotmail.com", status: "Active", initials: "PG" },
  { id: 14, name: "Vini Jr", role: "Client", email: "crybaby@hotmail.com", status: "Active", initials: "VJR" },
  { id: 15, name: "Kilian Mbappe", role: "Client", email: "Ninjaturtle@hotmail.com", status: "Active", initials: "KM" },
  { id: 16, name: "Pedri González", role: "Client", email: "nextxavi@hotmail.com", status: "Active", initials: "PG" },
  { id: 17, name: "Wojciech Szczęsny", role: "Client", email: "smokey@hotmail.com", status: "Active", initials: "WS" },
  { id: 18, name: "Robert Lewandowski", role: "Client", email: "golski@hotmail.com", status: "Active", initials: "RL" },
  { id: 19, name: "Frenkie de Jong", role: "Client", email: "Frankieyee@hotmail.com", status: "Active", initials: "FDJ" },
  { id: 20, name: "Alejandro Balde", role: "Client", email: "jordiregen@hotmail.com", status: "Active", initials: "AB" },
];

const AdminRoleDistributorPage = () => {
  const [users, setUsers] = useState(usersData); // Store users in state
  const [selectedUsers, setSelectedUsers] = useState([]);
  const [roleFilter, setRoleFilter] = useState(''); // Track role filter
  const [statusFilter, setStatusFilter] = useState(''); // Track status filter
  const [editingUserId, setEditingUserId] = useState(null); // Track user being edited
  const [newStatus, setNewStatus] = useState(""); // Track new status for editing
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false); // For delete confirmation
  const [userToDelete, setUserToDelete] = useState(null); // For the user to be deleted

  // Handle status change after editing
  const handleEdit = (userId, currentStatus) => {
    setEditingUserId(userId); // Set the current user being edited
    setNewStatus(currentStatus); // Set the current status of the user
  };

  const handleStatusUpdate = () => {
    if (newStatus) {
      setUsers((prevUsers) =>
        prevUsers.map((user) =>
          user.id === editingUserId ? { ...user, status: newStatus } : user
        )
      );
      setEditingUserId(null); // Reset after editing
      setNewStatus(""); // Reset new status
    }
  };

  // Handle delete (open confirmation modal)
  const handleDelete = (userId) => {
    setIsDeleteModalOpen(true);
    setUserToDelete(userId);
  };

  // Confirm deletion of the user
  const confirmDelete = () => {
    setUsers((prevUsers) => prevUsers.filter((user) => user.id !== userToDelete));
    setIsDeleteModalOpen(false);
    setUserToDelete(null);
  };

  // Cancel delete operation
  const cancelDelete = () => {
    setIsDeleteModalOpen(false);
    setUserToDelete(null);
  };

  // Handle role change
  const handleRoleChange = (userId, newRole) => {
    setUsers((prevUsers) =>
      prevUsers.map((user) =>
        user.id === userId ? { ...user, role: newRole } : user
      )
    );
  };

  // Filter users based on role and status
  const filteredUsers = users.filter((user) => {
    return (
      (roleFilter ? user.role === roleFilter : true) &&
      (statusFilter ? user.status === statusFilter : true)
    );
  });

  return (
    <div className="flex h-screen bg-[#f9f9f9]">
      {/* Sidebar */}
      <SideMenu currentPage="roleDistributor" />

      {/* Main Content */}
      <main className="flex-1 flex flex-col overflow-hidden">
        <TopNavbar />

        <div className="flex-1 overflow-y-auto p-6 md:p-10">
          {/* Page Heading */}
          <div className="text-center mb-8">
            <h1 className="text-4xl font-bold text-[#226CD1] mb-2">Role Distributor</h1>
            <p className="text-lg text-gray-600">Manage user roles and permissions</p>
          </div>

          {/* Filter by Role and Status */}
          <div className="flex justify-between mb-6">
            <div className="flex gap-4 items-center">
              {/* Filter by Role */}
              <select
                value={roleFilter}
                onChange={(e) => setRoleFilter(e.target.value)}
                className="px-4 py-2 border rounded-md text-sm focus:outline-none focus:ring-2 focus:ring-[#6C63FF]"
              >
                <option value="">All Roles</option>
                <option value="Admin">Admin</option>
                <option value="Student">Student</option>
                <option value="Academic Supervisor">Academic Supervisor</option>
                <option value="Client">Client</option>
              </select>

              {/* Filter by Status */}
              <select
                value={statusFilter}
                onChange={(e) => setStatusFilter(e.target.value)}
                className="px-4 py-2 border rounded-md text-sm focus:outline-none focus:ring-2 focus:ring-[#6C63FF]"
              >
                <option value="">All Statuses</option>
                <option value="Active">Active</option>
                <option value="Inactive">Inactive</option>
              </select>
            </div>
          </div>

          {/* Table Container */}
          <div className="w-full max-w-6xl mx-auto bg-white shadow-2xl rounded-2xl overflow-hidden">
            <table className="w-full text-sm text-left text-gray-700">
              <thead className="bg-[#f2f4fc] text-[#333] text-md border-b">
                <tr>
                  <th className="py-4 px-6">
                    <input
                      type="checkbox"
                      onChange={(e) => {
                        if (e.target.checked) {
                          setSelectedUsers(users.map((user) => user.id));
                        } else {
                          setSelectedUsers([]);
                        }
                      }}
                    />
                  </th>
                  <th className="py-4 px-6">Initials</th>
                  <th className="py-4 px-6">Name</th>
                  <th className="py-4 px-6">Current Role</th>
                  <th className="py-4 px-6">Email</th>
                  <th className="py-4 px-6 text-center">Action</th>
                  <th className="py-4 px-6 text-center">Status</th>
                </tr>
              </thead>
              <tbody>
                {filteredUsers.map((user, idx) => (
                  <tr
                    key={idx}
                    className="border-t hover:bg-[#f7faff] transition-all duration-300"
                  >
                    <td className="py-3 px-6">
                      <input
                        type="checkbox"
                        checked={selectedUsers.includes(user.id)}
                        onChange={() => {
                          setSelectedUsers((prev) =>
                            prev.includes(user.id)
                              ? prev.filter((id) => id !== user.id)
                              : [...prev, user.id]
                          );
                        }}
                      />
                    </td>
                    <td className="py-3 px-6 font-semibold bg-[#e0f2ff] text-[#226CD1] rounded-full w-8 h-8 flex items-center justify-center">
                      {user.initials}
                    </td>
                    <td className="py-3 px-6 font-semibold">{user.name}</td>
                    <td className="py-3 px-6">
                      <select
                        value={user.role}
                        onChange={(e) => handleRoleChange(user.id, e.target.value)} // Trigger role change here
                        className="px-2 py-1 border rounded"
                      >
                        <option value="Admin">Admin</option>
                        <option value="Student">Student</option>
                        <option value="Academic Supervisor">Academic Supervisor</option>
                        <option value="Client">Client</option>
                      </select>
                    </td>
                    <td className="py-3 px-6">{user.email}</td>
                    <td className="py-3 px-6 text-center">
                      <div className="flex justify-center gap-4">
                        <button
                          title="Edit"
                          className="text-blue-600 hover:text-blue-800 transition-all hover:scale-110"
                          onClick={() => handleEdit(user.id, user.status)} // Trigger Edit functionality
                        >
                          <FaEdit />
                        </button>
                        <button
                          title="Delete"
                          className="text-red-500 hover:text-red-700 transition-all hover:scale-110"
                          onClick={() => handleDelete(user.id)} // Trigger Delete functionality
                        >
                          <FaTrash />
                        </button>
                      </div>
                    </td>
                    <td className="py-3 px-6 text-center">
                      <button
                        onClick={() => handleStatusToggle(user.id)}
                        className={`px-4 py-1 rounded-full text-xs font-semibold ${
                          user.status === "Active"
                            ? "bg-green-100 text-green-700"
                            : "bg-red-100 text-red-700"
                        }`}
                      >
                        {user.status}
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {/* Edit Status Modal */}
          {editingUserId && (
            <div className="fixed top-0 left-0 w-full h-full bg-gray-500 bg-opacity-50 flex justify-center items-center">
              <div className="bg-white p-6 rounded-md shadow-lg w-1/3">
                <h2 className="text-lg font-semibold mb-4">Edit Status</h2>
                <select
                  value={newStatus}
                  onChange={(e) => setNewStatus(e.target.value)}
                  className="px-4 py-2 border rounded-md w-full"
                >
                  <option value="Active">Active</option>
                  <option value="Inactive">Inactive</option>
                </select>
                <div className="mt-4 flex justify-between">
                  <button
                    onClick={handleStatusUpdate}
                    className="px-4 py-2 bg-green-500 text-white rounded-md"
                  >
                    Update
                  </button>
                  <button
                    onClick={() => setEditingUserId(null)}
                    className="px-4 py-2 bg-gray-500 text-white rounded-md"
                  >
                    Cancel
                  </button>
                </div>
              </div>
            </div>
          )}

          {/* Delete Confirmation Modal */}
          {isDeleteModalOpen && (
            <div className="fixed top-0 left-0 w-full h-full bg-gray-500 bg-opacity-50 flex justify-center items-center">
              <div className="bg-white p-6 rounded-md shadow-lg w-1/3">
                <h2 className="text-lg font-semibold mb-4">Confirm Deletion</h2>
                <p>Are you sure you want to delete this user?</p>
                <div className="mt-4 flex justify-between">
                  <button
                    onClick={confirmDelete}
                    className="px-4 py-2 bg-red-500 text-white rounded-md"
                  >
                    Confirm
                  </button>
                  <button
                    onClick={cancelDelete}
                    className="px-4 py-2 bg-gray-500 text-white rounded-md"
                  >
                    Cancel
                  </button>
                </div>
              </div>
            </div>
          )}

          {/* Footer */}
          <div className="mt-10 text-center text-gray-400 text-sm">
            &copy; {new Date().getFullYear()} KOI Connect • Role Management
          </div>
        </div>
      </main>
    </div>
  );
};

export default AdminRoleDistributorPage;
