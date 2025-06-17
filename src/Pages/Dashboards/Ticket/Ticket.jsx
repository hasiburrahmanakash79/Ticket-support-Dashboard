import { useState, useEffect } from "react";
import { FaSearch } from "react-icons/fa";
import { FaRegPenToSquare, FaRegTrashCan } from "react-icons/fa6";
import { Link } from "react-router-dom";
import CommonModal from "../../../components/Common/CommonModal";
import useTicket from "../../../components/hook/useTicket";
import apiClient from "../../../lib/api-client";
import toast from "react-hot-toast";

// Debounce hook for search optimization
const useDebounce = (value, delay) => {
  const [debouncedValue, setDebouncedValue] = useState(value);

  useEffect(() => {
    const handler = setTimeout(() => {
      setDebouncedValue(value);
    }, delay);

    return () => {
      clearTimeout(handler);
    };
  }, [value, delay]);

  return debouncedValue;
};

const Ticket = () => {
  const [page, setPage] = useState(1);
  const [searchInput, setSearchInput] = useState("");

  // Debounce search term to avoid excessive API calls
  const debouncedSearchTerm = useDebounce(searchInput, 500);

  const { tickets, loading, error, totalPages, refetch } = useTicket({
    page,
    searchTerm: debouncedSearchTerm,
  });

  const [deleteTicket, setDeleteTicket] = useState(null);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);

  const [editTicket, setEditTicket] = useState(null);
  const [editStatus, setEditStatus] = useState("");
  const [originalStatus, setOriginalStatus] = useState("");
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [isUpdating, setIsUpdating] = useState(false);
  const [updateError, setUpdateError] = useState("");
  const [rejectedReason, setRejectedReason] = useState("");

  // Reset page when search or status changes
  useEffect(() => {
    setPage(1);
  }, [debouncedSearchTerm]);

  const handleDelete = (ticket) => {
    setDeleteTicket(ticket);
    setIsDeleteModalOpen(true);
  };

  const confirmDelete = async () => {
    try {
      if (!deleteTicket?._id) return;
      await apiClient.delete(`/ticket/${deleteTicket._id}`);
      setIsDeleteModalOpen(false);
      setDeleteTicket(null);
      refetch();
    } catch (err) {
      console.error("Failed to delete ticket", err);
      alert(err.response?.data?.message || "Failed to delete ticket");
    }
  };

  const handleEdit = (ticket) => {
    setEditTicket(ticket);
    setEditStatus(ticket.status);
    setOriginalStatus(ticket.status);
    setIsEditModalOpen(true);
  };

  const saveEdit = async () => {
    if (!editTicket) return;

    if (originalStatus === "Solved" && editStatus === "Rejected") {
      setUpdateError("Solved ticket cannot be changed to Rejected.");
      return;
    }

    if (originalStatus === editStatus && editStatus !== "Rejected") {
      closeEditModal();
      return;
    }

    if (editStatus === "Rejected" && !rejectedReason.trim()) {
      setUpdateError("Please provide a reason for rejection.");
      return;
    }

    setIsUpdating(true);
    setUpdateError("");

    try {
      const payload = {
        status: editStatus,
        rejectedReason: editStatus === "Rejected" ? rejectedReason : "",
      };

      if (editStatus === "Rejected") {
        payload.rejectedReason = rejectedReason;
      }

      const response = await apiClient.patch(
        `/ticket/${editTicket._id}`,
        payload
      );

      if (response.status === 200) {
        closeEditModal();
        refetch();
        toast.success("Status change successfully!", {
          duration: 4000,
          position: "top-right",
        });
      }
    } catch (error) {
      console.error("Failed to update ticket", error);
      const errorMessage =
        error.response?.data?.message || "Failed to update ticket";
      setUpdateError(errorMessage);
    } finally {
      setIsUpdating(false);
    }
  };

  const closeEditModal = () => {
    setIsEditModalOpen(false);
    setEditTicket(null);
    setEditStatus("");
    setOriginalStatus("");
    setUpdateError("");
    setIsUpdating(false);
    setRejectedReason("");
  };

  const getStatusColor = (status) => {
    switch (status) {
      case "Pending":
        return "text-gray-500";
      case "InProgress":
        return "text-yellow-500";
      case "Solved":
        return "text-green-600";
      default:
        return "text-red-500";
    }
  };

  // Check if status has actually changed
  const hasStatusChanged = originalStatus !== editStatus;
  const canSave = hasStatusChanged && !isUpdating;

  if (loading) return <p>Loading tickets...</p>;
  if (error) return <p>Error: {error}</p>;

  return (
    <div className="overflow-x-auto border border-gray-200 rounded-xl p-5">
      <div className="mb-4 flex justify-between items-center">
        <h2 className="text-2xl font-semibold">Ticket List</h2>
        <div className="relative w-72">
          <FaSearch className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
          <input
            type="text"
            placeholder="Search by email..."
            className="w-full border border-gray-300 rounded-full py-2 pl-10 pr-4 focus:outline-none focus:ring-2 focus:ring-blue-400"
            value={searchInput}
            onChange={(e) => setSearchInput(e.target.value)}
          />
          {/* Show searching indicator */}
          {searchInput !== debouncedSearchTerm && (
            <div className="absolute right-3 top-1/2 -translate-y-1/2">
              <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-blue-600"></div>
            </div>
          )}
        </div>
      </div>

      <table className="min-w-full bg-white rounded-xl text-center">
        <thead>
          <tr className="text-sm bg-blue-50">
            <th className="p-4 text-left">Ticket ID</th>
            <th className="p-4">User Name</th>
            <th className="p-4">Email</th>
            <th className="p-4">Issue Type</th>
            <th className="p-4">Status</th>
            <th className="p-4">Action</th>
          </tr>
        </thead>
        <tbody className="text-sm text-center">
          {tickets.length > 0 ? (
            tickets.map((ticket) => (
              <tr key={ticket._id} className="border-t border-gray-200">
                <td className="py-3 px-4 text-left hover:text-blue-500 hover:underline">
                  <Link to={`/ticket_details/${ticket._id}`}>{ticket._id}</Link>
                </td>
                <td className="py-3 px-4">{ticket.userProfile?.fullName}</td>
                <td className="py-3 px-4">{ticket.userProfile?.user?.email}</td>
                <td className="py-3 px-4">
                  {Array.isArray(ticket.issue) ? (
                    ticket.issue.length <= 2 ? (
                      ticket.issue
                        .map((issue, index) => `${index + 1}. ${issue}`)
                        .join(", ")
                    ) : (
                      <>
                        {ticket.issue
                          .slice(0, 2)
                          .map((issue, index) => `${index + 1}. ${issue}`)
                          .join(", ")}
                        {` +${ticket.issue.length - 2} more`}
                      </>
                    )
                  ) : (
                    ticket.issue
                  )}
                </td>

                <td
                  className={`py-3 px-4 font-medium ${getStatusColor(
                    ticket.status
                  )}`}
                >
                  {ticket.status}
                </td>
                <td className="py-3 px-4 flex justify-center gap-10">
                  {(ticket.status === "Pending" ||
                    ticket.status === "InProgress") && (
                    <FaRegPenToSquare
                      className="text-blue-500 cursor-pointer"
                      onClick={() => handleEdit(ticket)}
                    />
                  )}
                  <FaRegTrashCan
                    className="text-red-500 cursor-pointer"
                    onClick={() => handleDelete(ticket)}
                  />
                </td>
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan={6} className="py-6 text-gray-400">
                No tickets found.
              </td>
            </tr>
          )}
        </tbody>
      </table>

      {totalPages > 1 && (
        <div className="flex justify-center mt-4 space-x-2">
          {Array.from({ length: totalPages }, (_, i) => (
            <button
              key={i}
              onClick={() => setPage(i + 1)}
              className={`px-3 py-1 rounded ${
                page === i + 1
                  ? "bg-blue-500 text-white"
                  : "bg-gray-200 text-gray-700"
              }`}
            >
              {i + 1}
            </button>
          ))}
        </div>
      )}

      <CommonModal
        isOpen={isDeleteModalOpen}
        onClose={() => setIsDeleteModalOpen(false)}
      >
        <div className="text-center space-y-4 px-4 py-3">
          <p className="text-lg font-medium">
            Are you sure you want to delete this ticket?
          </p>
          <div className="flex justify-center gap-4">
            <button
              onClick={() => setIsDeleteModalOpen(false)}
              className="px-5 py-2 bg-gray-300 text-gray-800 rounded-md hover:bg-gray-400"
            >
              Cancel
            </button>
            <button
              onClick={confirmDelete}
              className="bg-red-500 text-white px-6 py-2 rounded hover:bg-red-600"
            >
              Remove
            </button>
          </div>
        </div>
      </CommonModal>

      <CommonModal isOpen={isEditModalOpen} onClose={closeEditModal}>
        {editTicket && (
          <div className="space-y-4 px-4 py-2">
            <h2 className="text-xl font-semibold">Ticket Details</h2>

            {/* Error message display */}
            {updateError && (
              <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded">
                {updateError}
              </div>
            )}

            {/* Status change indicator */}
            {hasStatusChanged && (
              <div className="bg-blue-50 border border-blue-200 text-blue-700 px-4 py-3 rounded">
                Status will change from <strong>{originalStatus}</strong> to{" "}
                <strong>{editStatus}</strong>
              </div>
            )}

            <div className="space-y-4 text-sm">
              <p>
                <strong>Ticket ID:</strong> {editTicket._id}
              </p>
              <p>
                <strong>Name:</strong> {editTicket.userProfile?.fullName}
              </p>
              <p>
                <strong>Email:</strong> {editTicket.userProfile?.user?.email}
              </p>
              <p>
                <strong>Issue Type:</strong> {editTicket.issue}
              </p>
              <p>
                <strong>Issue Date:</strong>{" "}
                {new Date(editTicket.createdAt).toLocaleDateString()}
              </p>
              <div className="flex gap-3 items-center">
                <label className="block font-medium mb-1">Status:</label>
                <select
                  className="border border-gray-300 rounded px-2 w-full"
                  value={editStatus}
                  onChange={(e) => setEditStatus(e.target.value)}
                >
                  <option value="Pending">Pending</option>
                  <option value="InProgress">In Progress</option>
                  <option value="Solved">Solved</option>
                  <option
                    value="Rejected"
                    disabled={originalStatus === "Solved"}
                  >
                    Rejected
                  </option>
                </select>
              </div>
              {editStatus === "Rejected" && (
                <div className="mt-3">
                  <label className="block font-medium mb-1">
                    Rejection Reason:
                  </label>
                  <textarea
                    rows={3}
                    className="w-full border border-gray-300 rounded px-2 py-1"
                    placeholder="Enter rejection reason"
                    value={rejectedReason}
                    onChange={(e) => setRejectedReason(e.target.value)}
                  ></textarea>
                </div>
              )}
            </div>
            <div className="flex justify-center gap-4 pt-4 w-full">
              <button
                onClick={closeEditModal}
                className="border border-blue-500 text-blue-500 px-6 py-2 rounded hover:bg-blue-50 w-full"
                disabled={isUpdating}
              >
                Cancel
              </button>
              <button
                onClick={saveEdit}
                className={`px-6 py-2 rounded w-full transition-colors ${
                  canSave
                    ? "bg-blue-500 text-white hover:bg-blue-600"
                    : "bg-gray-300 text-gray-500 cursor-not-allowed"
                }`}
                disabled={!canSave}
                title={!hasStatusChanged ? "No changes to save" : ""}
              >
                {isUpdating
                  ? "Saving..."
                  : hasStatusChanged
                  ? "Save Changes"
                  : "No Changes"}
              </button>
            </div>
          </div>
        )}
      </CommonModal>
    </div>
  );
};

export default Ticket;
