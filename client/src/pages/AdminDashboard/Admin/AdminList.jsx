import React, { useEffect, useState } from "react";
import TopNavbar from "../../../components/TopNavbar/TopNavbar";
import SideMenu from "../../../components/SideMenu/SideMenu";
import { ArrowLeft, Eye, Pencil, Trash2, X } from "lucide-react";
import { BASE_URL } from "../../../utils/config";
import { adminRequest } from "../../../utils/requestMethods";
import { Link } from "react-router-dom";
import Swal from "sweetalert2";
import toast from "react-hot-toast";

const AdminList = () => {
  const [rows, setRows] = useState([]);
  const [selectedUser, setSelectedUser] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const [editUser, setEditUser] = useState(null);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    mobileNumber: "",
    address: "",
  });

  const fetchUser = async () => {
    try {
      const response = await adminRequest.get(`${BASE_URL}/user/list`);
      setRows(response.data.data);
    } catch (error) {
      console.log("user list not found");
    }
  };

  useEffect(() => {
    fetchUser();
  }, []);

  const handleView = (user) => {
    setSelectedUser(user);
    setIsModalOpen(true);
  };

  const handleEdit = (user) => {
    setEditUser(user);
    setFormData({
      fullName: user.fullName || "",
      email: user.email || "",
      mobileNumber: user.mobileNumber || "",
      address: user.address || "",
    });
    setIsEditModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setSelectedUser(null);
  };

  const closeEditModal = () => {
    setIsEditModalOpen(false);
    setEditUser(null);
  };

  const handleDelete = async (userUuid) => {
    Swal.fire({
      title: "Are you sure?",
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, delete",
    }).then(async (result) => {
      if (result.isConfirmed) {
        try {
          const response = await adminRequest.post(`${BASE_URL}/user/delete`, {
            uuid: userUuid,
          });
          Swal.fire("Deleted!", response.data.message, "success");
          setRows((prevRows) =>
            prevRows.filter((user) => user.uuid !== userUuid)
          );
        } catch (error) {
          console.error("Error deleting user:", error);
          const errorMessage =
            error.response?.data?.message || "Failed to delete user.";
          Swal.fire("Error!", errorMessage, "error");
        }
      }
    });
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleEditSubmit = async (e) => {
    e.preventDefault();
    if (!editUser) return;

    try {
      const payload = {
        uuid: editUser.uuid,
        ...formData,
      };

      const response = await adminRequest.post(
        `${BASE_URL}/user/update`,
        payload
      );

      toast.success(response.data.message || "User updated successfully");

      setRows((prevRows) =>
        prevRows.map((user) =>
          user.uuid === editUser.uuid ? { ...user, ...formData } : user
        )
      );

      closeEditModal();
    } catch (error) {
      console.error("Error updating user:", error);
      toast.error(error.response?.data?.message || "Failed to update user");
    }
  };

  return (
    <div className="flex h-screen bg-[#f5f6fa] overflow-hidden">
      <SideMenu currentPage="dashboard" />
      <main className="flex-1 flex flex-col overflow-hidden p-6">
        <TopNavbar />
        <div className="mb-6">
          <button
            onClick={() => window.history.back()}
            className="flex items-center gap-2 text-sm mt-8 text-gray-600 bg-white px-4 py-2 rounded-full shadow hover:bg-gray-100 hover:scale-105 transition-all duration-300"
          >
            <ArrowLeft />
            Back
          </button>
        </div>

        <div className="bg-white rounded-2xl shadow p-6 overflow-auto">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-2xl font-semibold">Admin List</h2>
            <Link to="/create-admin">
              <button className="bg-blue-500 cursor-pointer text-white px-4 py-2 rounded-lg hover:bg-blue-600 shadow hover:scale-105 transition-transform duration-200">
                Add Admin
              </button>
            </Link>
          </div>

          <table className="w-full table-auto border-collapse">
            <thead>
              <tr className="bg-gray-200 text-left">
                <th className="p-3 text-sm font-semibold">Name</th>
                <th className="p-3 text-sm font-semibold">Email</th>
                <th className="p-3 text-sm font-semibold">Address</th>
                <th className="p-3 text-sm font-semibold">Status</th>
                <th className="p-3 text-sm font-semibold">Actions</th>
              </tr>
            </thead>
            <tbody>
              {rows.length > 0 ? (
                rows.map((user) => (
                  <tr
                    key={user.uuid}
                    className="border-b border-b-gray-200 hover:bg-gray-100"
                  >
                    <td className="p-3 text-sm">{user.fullName}</td>
                    <td className="p-3 text-sm">{user.email}</td>
                    <td className="p-3 text-sm">{user.address}</td>
                    <td className="p-3 text-sm">
                      <span
                        className={`px-2 py-1 rounded-full text-xs font-medium ${
                          user.status === "ACTIVE"
                            ? "bg-green-100 text-green-800"
                            : user.status === "PENDING"
                            ? "bg-red-100 text-red-800"
                            : "bg-yellow-100 text-yellow-800"
                        }`}
                      >
                        {user.status}
                      </span>
                    </td>
                    <td className="p-3 text-sm flex gap-2">
                      <button
                        className="hover:text-blue-600 cursor-pointer"
                        title="View"
                        onClick={() => handleView(user)}
                      >
                        <Eye size={18} />
                      </button>
                      <button
                        className="hover:text-green-600 cursor-pointer"
                        title="Edit"
                        onClick={() => handleEdit(user)}
                      >
                        <Pencil size={18} />
                      </button>
                      <button
                        className="hover:text-red-600 cursor-pointer"
                        title="Delete"
                        onClick={() => handleDelete(user.uuid)}
                      >
                        <Trash2 size={18} />
                      </button>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan="5" className="text-center py-4 text-gray-500">
                    No users found.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>

        {/* View User Modal */}
        {isModalOpen && selectedUser && (
          <div className="fixed inset-0 flex items-center justify-center bg-transparent backdrop-blur z-50">
            <div className="bg-white rounded-2xl shadow-lg max-w-md w-full p-6 relative">
              <button
                className="absolute top-4 right-4 text-gray-500 hover:text-gray-800"
                onClick={closeModal}
              >
                <X size={24} />
              </button>
              <div className="flex flex-col items-center text-center mb-6">
                <div className="w-24 h-24 rounded-full overflow-hidden mb-3">
                  <img
                    src={`https://ui-avatars.com/api/?name=${encodeURIComponent(
                      selectedUser.fullName
                    )}&background=random`}
                    alt={selectedUser.fullName}
                    className="object-cover w-full h-full"
                  />
                </div>
                <h3 className="text-xl font-semibold">
                  {selectedUser.fullName}
                </h3>
                <p className="text-sm text-gray-500">{selectedUser.email}</p>
                <div className="mt-2">
                  <span
                    className={`inline-flex items-center px-2 py-1 rounded-full text-xs font-medium ${
                      selectedUser.status === "ACTIVE"
                        ? "bg-green-100 text-green-800"
                        : selectedUser.status === "PENDING"
                        ? "bg-red-100 text-red-800"
                        : "bg-yellow-100 text-yellow-800"
                    }`}
                  >
                    {selectedUser.status}
                  </span>
                </div>
              </div>
              <div className="grid grid-cols-2 gap-4 text-sm text-gray-700">
                <div className="bg-gray-50 rounded-lg p-3">
                  <p className="text-xs text-gray-500">Phone</p>
                  <p>{selectedUser.mobileNumber || "N/A"}</p>
                </div>
                <div className="bg-gray-50 rounded-lg p-3">
                  <p className="text-xs text-gray-500">Address</p>
                  <p>{selectedUser.address || "N/A"}</p>
                </div>
                <div className="bg-gray-50 rounded-lg p-3">
                  <p className="text-xs text-gray-500">Super Admin</p>
                  <p>{selectedUser.isSuperAdmin ? "Yes" : "No"}</p>
                </div>
                <div className="bg-gray-50 rounded-lg p-3">
                  <p className="text-xs text-gray-500">Created At</p>
                  <p>{new Date(selectedUser.createdAt).toLocaleString()}</p>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Edit User Modal */}
        {isEditModalOpen && editUser && (
          <div className="fixed inset-0 flex items-center justify-center bg-transparent backdrop-blur z-50">
            <div className="bg-white rounded-2xl shadow-lg max-w-md w-full p-6 relative">
              <button
                className="absolute top-4 right-4 text-gray-500 hover:text-gray-800"
                onClick={closeEditModal}
              >
                <X size={24} />
              </button>
              <div className="flex flex-col items-center text-center mb-6">
                <div className="w-24 h-24 rounded-full overflow-hidden mb-3">
                  <img
                    src={`https://ui-avatars.com/api/?name=${encodeURIComponent(
                      editUser.fullName
                    )}&background=random`}
                    alt={editUser.fullName}
                    className="object-cover w-full h-full"
                  />
                </div>
                <h3 className="text-xl font-semibold">{editUser.fullName}</h3>
                <p className="text-sm text-gray-500">{editUser.email}</p>
              </div>
              <form
                onSubmit={handleEditSubmit}
                className="grid grid-cols-2 gap-4 text-sm text-gray-700"
              >
                <div className="bg-gray-50 rounded-lg p-3 flex flex-col">
                  <label className="text-xs text-gray-500 mb-1">
                    Full Name
                  </label>
                  <input
                    type="text"
                    name="fullName"
                    value={formData.fullName}
                    onChange={handleInputChange}
                    className="px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                    required
                  />
                </div>
                <div className="bg-gray-50 rounded-lg p-3 flex flex-col">
                  <label className="text-xs text-gray-500 mb-1">Email</label>
                  <input
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleInputChange}
                    className="px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                    required
                  />
                </div>
                <div className="bg-gray-50 rounded-lg p-3 flex flex-col">
                  <label className="text-xs text-gray-500 mb-1">
                    Mobile Number
                  </label>
                  <input
                    type="text"
                    name="mobileNumber"
                    value={formData.mobileNumber}
                    onChange={handleInputChange}
                    className="px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                    required
                  />
                </div>
                <div className="bg-gray-50 rounded-lg p-3 flex flex-col">
                  <label className="text-xs text-gray-500 mb-1">Address</label>
                  <input
                    type="text"
                    name="address"
                    value={formData.address}
                    onChange={handleInputChange}
                    className="px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                    required
                  />
                </div>
                <div className="col-span-2">
                  <button
                    type="submit"
                    className="w-full mt-4 bg-blue-500 text-white py-2 rounded-lg hover:bg-blue-600 transition"
                  >
                    Save Changes
                  </button>
                </div>
              </form>
            </div>
          </div>
        )}
      </main>
    </div>
  );
};

export default AdminList;
