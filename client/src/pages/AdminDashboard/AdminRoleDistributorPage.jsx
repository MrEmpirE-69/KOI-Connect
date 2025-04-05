import React from "react";
import SideMenu from "../../components/SideMenu/SideMenu";
import TopNavbar from "../../components/TopNavbar/TopNavbar";
import { FaEdit, FaTrash } from "react-icons/fa";

const users = [
  {
    name: "Kushal Nepal",
    role: "Student",
    email: "12202457@students.koi.edu.au",
    status: "Active",
  },
  {
    name: "Gagan Bohara",
    role: "Student",
    email: "12202423@students.koi.edu.au",
    status: "Inactive",
  },
  {
    name: "Rohan Poudel",
    role: "Student",
    email: "12202475@students.koi.edu.au",
    status: "Inactive",
  },
  {
    name: "Sajit KC",
    role: "Student",
    email: "12203368@students.koi.edu.au",
    status: "Active",
  },
  {
    name: "Harry Magar",
    role: "Admin",
    email: "harrymagar@koi.edu.au",
    status: "Active",
  },
  {
    name: "Burno Shrestha",
    role: "Academic Supervisor",
    email: "burnostha@koi.edu.au",
    status: "Active",
  },
  {
    name: "Cristiano Maharjan",
    role: "Admin",
    email: "cristianomaharjan@koi.edu.au",
    status: "Inactive",
  },
  {
    name: "Messi Limbu",
    role: "Client",
    email: "limbumessi@hotmail.com",
    status: "Active",
  },
];

const AdminRoleDistributorPage = () => {
  return (
    <div className="flex h-screen bg-[#f9f9f9]">
      {/* Side Menu */}
      <SideMenu currentPage="roleDistributor" />

      {/* Main Content */}
      <main className="flex-1 flex flex-col overflow-hidden">
        <TopNavbar />

        <div className="flex-1 overflow-y-auto p-6 md:p-10 animate-fadeInUp">
          {/* Page Heading */}
          <div className="text-center mb-8">
            <h1 className="text-4xl font-bold text-[#226CD1] mb-2 animate-fadeInDown">
              Role Distributor
            </h1>
            <p className="text-lg text-gray-600 animate-fadeInUp delay-200">
              Manage user roles and permissions
            </p>
          </div>

          {/* Table Container */}
          <div className="w-full max-w-6xl mx-auto bg-white shadow-2xl rounded-2xl overflow-hidden animate-fadeInUp">
            <table className="w-full text-sm text-left text-gray-700">
              <thead className="bg-[#f2f4fc] text-[#333] text-md border-b">
                <tr>
                  <th className="py-4 px-6">Name</th>
                  <th className="py-4 px-6">Current Role</th>
                  <th className="py-4 px-6">Email</th>
                  <th className="py-4 px-6 text-center">Action</th>
                  <th className="py-4 px-6 text-center">Status</th>
                </tr>
              </thead>
              <tbody>
                {users.map((user, idx) => (
                  <tr
                    key={idx}
                    className="border-t hover:bg-[#f7faff] transition-all duration-300"
                  >
                    <td className="py-3 px-6 font-semibold">{user.name}</td>
                    <td className="py-3 px-6">{user.role}</td>
                    <td className="py-3 px-6">{user.email}</td>
                    <td className="py-3 px-6 text-center">
                      <div className="flex justify-center gap-4">
                        <button
                          title="Edit"
                          className="text-blue-600 hover:text-blue-800 transition-all hover:scale-110"
                        >
                          <FaEdit />
                        </button>
                        <button
                          title="Delete"
                          className="text-red-500 hover:text-red-700 transition-all hover:scale-110"
                        >
                          <FaTrash />
                        </button>
                      </div>
                    </td>
                    <td className="py-3 px-6 text-center">
                      <span
                        className={`px-4 py-1 rounded-full text-xs font-semibold ${
                          user.status === "Active"
                            ? "bg-green-100 text-green-700"
                            : "bg-red-100 text-red-700"
                        }`}
                      >
                        {user.status}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

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
