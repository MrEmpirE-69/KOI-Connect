import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import ClientSideMenu from "./ClientSideMenu";
import ClientTopNavbar from "./ClientTopNavbar";
import { FaUserShield } from "react-icons/fa";
import { toast } from "react-hot-toast";
import { BASE_URL } from "../../utils/config";
import { adminRequest } from "../../utils/requestMethods";
import { Eye, EyeOff } from "lucide-react";

const ClientSettingAccount = () => {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    oldPassword: "",
    newPassword: "",
    confirmPassword: "",
  });

  const [showPassword, setShowPassword] = useState({
    oldPassword: false,
    newPassword: false,
    confirmPassword: false,
  });

  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (formData.newPassword !== formData.confirmPassword) {
      toast.error("New password and confirm password do not match.");
      return;
    }

    const request = adminRequest.post(
      `${BASE_URL}/client/changePassword`,
      formData
    );

    toast.promise(
      request,
      {
        loading: "Processing...",
        success: (res) => {
          setFormData({
            oldPassword: "",
            newPassword: "",
            confirmPassword: "",
          });
          setTimeout(() => {
            sessionStorage.clear();
            navigate("/login", { state: { fromChangePassword: true } });
          }, 500);
          return res.data.message;
        },
        error: (err) =>
          err.response?.data?.message || "Failed to change password.",
      },
      {
        success: { duration: 1500 },
        error: { duration: 2000 },
      }
    );

    try {
      setLoading(true);
      await request;
    } catch (_) {
      // handled by toast
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex h-screen bg-[#f4f6fa] overflow-hidden">
      <ClientSideMenu currentPage="setting" />
      <main className="flex-1 flex flex-col h-full">
        <ClientTopNavbar />
        <section className="flex-1 overflow-y-auto p-6 md:p-10 animate-fade-in-up duration-700">
          <h1 className="text-4xl font-extrabold text-[#226CD1] text-center mb-12">
            Security
          </h1>

          <div className="flex flex-col lg:flex-row gap-10 items-start justify-center max-w-6xl mx-auto">
            <div className="w-full lg:w-auto flex justify-center">
              <FaUserShield className="text-6xl text-[#226CD1]" />
            </div>

            <div className="flex-1 min-w-[280px] w-full max-w-md">
              <h2 className="text-xl font-semibold text-[#333] mb-4">
                Change Password
              </h2>
              <form onSubmit={handleSubmit} className="space-y-4">
                {["oldPassword", "newPassword", "confirmPassword"].map(
                  (field) => (
                    <div key={field} className="relative">
                      <input
                        type={showPassword[field] ? "text" : "password"}
                        name={field}
                        placeholder={
                          field === "oldPassword"
                            ? "Old Password"
                            : field === "newPassword"
                            ? "New Password"
                            : "Confirm New Password"
                        }
                        value={formData[field]}
                        onChange={handleChange}
                        required
                        className="w-full px-4 py-2 border rounded-md focus:ring-2 focus:ring-blue-300"
                      />
                      <button
                        type="button"
                        onClick={() =>
                          setShowPassword((prev) => ({
                            ...prev,
                            [field]: !prev[field],
                          }))
                        }
                        className="absolute inset-y-0 right-3 flex items-center text-gray-500 hover:text-gray-700"
                      >
                        {showPassword[field] ? (
                          <EyeOff size={20} />
                        ) : (
                          <Eye size={20} />
                        )}
                      </button>
                    </div>
                  )
                )}

                <button
                  type="submit"
                  disabled={loading}
                  className={`w-full mt-4 px-6 py-2 rounded-full text-lg shadow transition-transform duration-200 ${
                    loading
                      ? "bg-gray-400 cursor-not-allowed"
                      : "bg-[#226CD1] text-white hover:bg-blue-600 hover:scale-105"
                  }`}
                >
                  {loading ? "Processing..." : "Save"}
                </button>
              </form>
            </div>
          </div>
        </section>
      </main>
    </div>
  );
};

export default ClientSettingAccount;
