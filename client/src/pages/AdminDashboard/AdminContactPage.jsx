import React, { useEffect, useState } from "react";
import SideMenu from "../../components/SideMenu/SideMenu";
import TopNavbar from "../../components/TopNavbar/TopNavbar";
import { adminRequest } from "../../utils/requestMethods";
import toast from "react-hot-toast";

const AdminContactPage = () => {
  const [contacts, setContacts] = useState([]);
  const [selectedContact, setSelectedContact] = useState(null);
  const [reply, setReply] = useState("");

  useEffect(() => {
    fetchContacts();
  }, []);

  const fetchContacts = async () => {
    try {
      const res = await adminRequest.get("/contact/list");
      setContacts(res.data.data);
    } catch (error) {
      toast.error("Failed to fetch contact list");
    }
  };

  const handleReply = async () => {
    if (!reply.trim()) return toast.error("Reply cannot be empty");
    try {
      const res = await adminRequest.post("/contact/reply", {
        contactId: selectedContact.id,
        reply,
      });
      toast.success(res.data.message);
      setReply("");
      setSelectedContact(null);
      fetchContacts();
    } catch (err) {
      toast.error("Failed to send reply");
    }
  };

  return (
    <div className="flex h-screen bg-gray-50">
      <SideMenu currentPage="contacts" />
      <main className="flex-1 flex flex-col">
        <TopNavbar />
        <div className="p-6 overflow-y-auto">
          <h2 className="text-2xl font-semibold text-gray-800 mb-4">
            Contact Requests
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {contacts.map((contact) => (
              <div
                key={contact.id}
                className="bg-white p-4 rounded-xl shadow hover:shadow-lg transition cursor-pointer"
                onClick={() => setSelectedContact(contact)}
              >
                <h3 className="text-lg font-semibold text-blue-600">
                  {contact.subject}
                </h3>
                <p className="text-sm text-gray-700">{contact.fullName}</p>
                <p className="text-sm text-gray-500">{contact.email}</p>
                <p className="text-sm text-gray-600 mt-2 truncate">
                  {contact.message}
                </p>
                <p className="text-xs text-gray-400 mt-1">
                  Status: {contact.status}
                </p>
              </div>
            ))}
          </div>

          {selectedContact && (
            <div className="fixed inset-0 bg-black/30 backdrop-blur-sm flex items-center justify-center z-50 px-4">
              <div className="bg-white p-6 rounded-xl max-w-lg w-full shadow-xl">
                <h3 className="text-xl font-bold text-blue-700 mb-2">
                  {selectedContact.subject}
                </h3>
                <p className="text-sm mb-1">
                  <strong>From:</strong> {selectedContact.fullName} (
                  {selectedContact.email})
                </p>
                <p className="text-sm mb-4 text-gray-700">
                  {selectedContact.message}
                </p>
                <textarea
                  value={reply}
                  onChange={(e) => setReply(e.target.value)}
                  className="w-full border px-4 py-2 rounded mb-4"
                  placeholder="Write your reply here..."
                  rows="4"
                ></textarea>
                <div className="flex justify-end gap-3">
                  <button
                    onClick={() => setSelectedContact(null)}
                    className="bg-gray-200 px-4 py-2 rounded hover:bg-gray-300"
                  >
                    Cancel
                  </button>
                  <button
                    onClick={handleReply}
                    className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
                  >
                    Send Reply
                  </button>
                </div>
              </div>
            </div>
          )}
        </div>
      </main>
    </div>
  );
};

export default AdminContactPage;
