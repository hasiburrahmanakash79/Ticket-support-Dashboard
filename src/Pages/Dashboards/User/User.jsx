"use client";

import { useState } from "react";
import CommonModal from "../../../components/Common/CommonModal";
import { FaSearch } from "react-icons/fa";
import { FaRegTrashCan } from "react-icons/fa6";
import apiClient from "../../../lib/api-client";
import useUser from "../../../components/hook/useUser";

const User = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedOwner, setSelectedOwner] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [modalType, setModalType] = useState("view");
  const [isDeleting, setIsDeleting] = useState(false);

  const { users, loading, error, refetch } = useUser();

  if (loading) return <div>Loading users...</div>;
  if (error) return <div>Error loading users!</div>;

  // Data validation function
  const validateUserData = (user) => {
    return {
      ...user,
      name: user.name && user.name.trim() !== "" ? user.name : "N/A",
      email: user.email && user.email.trim() !== "" ? user.email : "N/A",
      number: user.number && user.number.trim() !== "" ? user.number : "N/A",
      role: user.role && user.role.trim() !== "" ? user.role : "N/A",
    };
  };

  // Validate all users data
  const validatedUsers = users?.map(validateUserData) || [];

  const handleViewOwner = (owner) => {
    setSelectedOwner(owner);
    setModalType("view");
    setIsModalOpen(true);
  };

  const handleDeleteClick = (owner) => {
    console.log(owner);
    setSelectedOwner(owner);
    setModalType("delete");
    setIsModalOpen(true);
  };

  const handleDeleteConfirm = async () => {
    if (!selectedOwner?._id) return;

    setIsDeleting(true);
    try {
      await apiClient.delete(`/user/${selectedOwner._id}`, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("accessToken")}`,
        },
      });

      await refetch();
      setIsModalOpen(false);
      setSelectedOwner(null);
    } catch (error) {
      console.error(
        "Error deleting user:",
        error.response?.data || error.message
      );
      alert("Failed to delete user. Please try again.");
    } finally {
      setIsDeleting(false);
    }
  };

  // Enhanced search function - searches by name, email, and phone number
  const filteredUsers = validatedUsers.filter((user) => {
    const searchLower = searchTerm.toLowerCase();
    return (
      user.name.toLowerCase().includes(searchLower) ||
      user.email.toLowerCase().includes(searchLower) ||
      user.number.toLowerCase().includes(searchLower)
    );
  });

  console.log("Filtered Users:", filteredUsers);

  return (
    <div className="overflow-x-auto border border-gray-200 rounded-xl p-5">
      <div className="mb-4 flex justify-between items-center">
        <h2 className="text-2xl font-semibold">User List</h2>
        <div className="relative w-72">
          <FaSearch className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
          <input
            type="text"
            placeholder="Search by name, email, or phone..."
            className="w-full border border-gray-300 rounded-full py-2 pl-10 pr-4 focus:outline-none focus:ring-2 focus:ring-blue-400"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
      </div>

      <table className="min-w-full bg-white rounded-xl text-center">
        <thead>
          <tr className="text-sm bg-blue-50">
            <th className="p-4 text-left">User Name</th>
            <th className="p-4">Email</th>
            <th className="p-4">Number</th>
            <th className="p-4">User Type</th>
            <th className="p-4">Action</th>
          </tr>
        </thead>
        <tbody className="text-sm text-center">
          {filteredUsers.length > 0 ? (
            filteredUsers.map((user, index) => (
              <tr
                key={user._id || user.id || index}
                className="border-t border-gray-200"
              >
                <td className="py-3 px-4 text-left">
                  <button
                    className="hover:text-blue-500 transition-colors"
                    onClick={() => handleViewOwner(user)}
                  >
                    {user.name}
                  </button>
                </td>
                <td className="py-4 px-4">{user.email}</td>
                <td className="py-3 px-4">{user.number}</td>
                <td className="py-3 px-4">{user.role}</td>
                <td className="py-5 px-4 flex justify-center items-center">
                  <FaRegTrashCan
                    className="text-red-500 cursor-pointer hover:text-red-700 transition-colors"
                    onClick={() => handleDeleteClick(user)}
                  />
                </td>
              </tr>
            ))
          ) : (
            <tr>
              <td
                colSpan={5}
                className="py-10 text-gray-400 text-center font-medium"
              >
                {searchTerm
                  ? "No users found matching your search."
                  : "No users found."}
              </td>
            </tr>
          )}
        </tbody>
      </table>

      {/* Common Modal */}
      <CommonModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        title={modalType === "view" ? "" : "Confirm Delete"}
      >
        {selectedOwner && modalType === "view" && (
          <div className="space-y-3 text-center">
            <p className="text-xl pb-2">{selectedOwner.name}</p>
            <p>{selectedOwner.email}</p>
            <p>{selectedOwner.number}</p>
            <p>User Type: {selectedOwner.role}</p>
          </div>
        )}

        {selectedOwner && modalType === "delete" && (
          <div className="text-center space-y-6">
            <p className="text-gray-700">
              Are you sure you want to remove{" "}
              <span className="font-semibold">{selectedOwner.name}</span>?
            </p>
            <div className="flex justify-center gap-4">
              <button
                onClick={() => setIsModalOpen(false)}
                className="px-5 py-2 bg-gray-300 text-gray-800 rounded-md hover:bg-gray-400 transition-colors"
                disabled={isDeleting}
              >
                Cancel
              </button>
              <button
                onClick={handleDeleteConfirm}
                className="px-5 py-2 bg-red-500 text-white rounded-md hover:bg-red-600 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                disabled={isDeleting}
              >
                {isDeleting ? "Removing..." : "Remove"}
              </button>
            </div>
          </div>
        )}
      </CommonModal>
    </div>
  );
};

export default User;
