import { useState } from "react";
import CommonModal from "../../../components/Common/CommonModal";
import { FaSearch } from "react-icons/fa";
import { FaRegPenToSquare, FaRegTrashCan } from "react-icons/fa6";

// Dummy Ticket Data
const ticketData = [
  {
    id: "TCKT001",
    name: "Alice Johnson",
    email: "alice@example.com",
    issueType: "Login Issue",
    issueDate: "2025-05-01",
    status: "Open",
  },
  {
    id: "TCKT002",
    name: "Bob Smith",
    email: "bob@example.com",
    issueType: "Payment Failed",
    issueDate: "2025-05-02",
    status: "In Progress",
  },
  {
    id: "TCKT003",
    name: "Carol Davis",
    email: "carol@example.com",
    issueType: "App Crash",
    issueDate: "2025-05-03",
    status: "Resolved",
  },
  {
    id: "TCKT004",
    name: "David Wilson",
    email: "david@example.com",
    issueType: "Slow Performance",
    issueDate: "2025-05-04",
    status: "Open",
  },
  {
    id: "TCKT005",
    name: "Eva Brown",
    email: "eva@example.com",
    issueType: "Missing Features",
    issueDate: "2025-05-05",
    status: "Open",
  },
  {
    id: "TCKT006",
    name: "Frank Miller",
    email: "frank@example.com",
    issueType: "Installation Problem",
    issueDate: "2025-05-06",
    status: "Resolved",
  },
  {
    id: "TCKT007",
    name: "Grace Lee",
    email: "grace@example.com",
    issueType: "Sync Issue",
    issueDate: "2025-05-07",
    status: "In Progress",
  },
  {
    id: "TCKT008",
    name: "Henry Clark",
    email: "henry@example.com",
    issueType: "Login Issue",
    issueDate: "2025-05-08",
    status: "Open",
  },
  {
    id: "TCKT009",
    name: "Ivy Hall",
    email: "ivy@example.com",
    issueType: "Password Reset",
    issueDate: "2025-05-09",
    status: "Resolved",
  },
  {
    id: "TCKT010",
    name: "Jack Turner",
    email: "jack@example.com",
    issueType: "Bug Report",
    issueDate: "2025-05-10",
    status: "In Progress",
  },
];

const Ticket = () => {
  const [tickets, setTickets] = useState(ticketData);
  const [searchTerm, setSearchTerm] = useState("");

  const [deleteTicket, setDeleteTicket] = useState(null);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);

  const [editTicket, setEditTicket] = useState(null);
  const [editStatus, setEditStatus] = useState("");
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);

  const handleDelete = (ticket) => {
    setDeleteTicket(ticket);
    setIsDeleteModalOpen(true);
  };

  const confirmDelete = () => {
    const updated = tickets.filter((t) => t.id !== deleteTicket.id);
    setTickets(updated);
    setIsDeleteModalOpen(false);
  };

  const handleEdit = (ticket) => {
    setEditTicket(ticket);
    setEditStatus(ticket.status);
    setIsEditModalOpen(true);
  };

  const saveEdit = () => {
    const updated = tickets.map((t) =>
      t.id === editTicket.id ? { ...t, status: editStatus } : t
    );
    setTickets(updated);
    setIsEditModalOpen(false);
  };

  const filteredTickets = tickets.filter((ticket) =>
    ticket.id.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const getStatusColor = (status) => {
    switch (status) {
      case "Open":
        return "text-red-500";
      case "In Progress":
        return "text-yellow-500";
      case "Resolved":
        return "text-green-600";
      default:
        return "text-gray-500";
    }
  };

  return (
    <div className="overflow-x-auto border border-gray-200 rounded-xl p-5">
      <div className="mb-4 flex justify-between items-center">
        <h2 className="text-2xl font-semibold">Ticket List</h2>
        <div className="relative w-72">
          <FaSearch className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
          <input
            type="text"
            placeholder="Search by Ticket ID..."
            className="w-full border border-gray-300 rounded-full py-2 pl-10 pr-4 focus:outline-none focus:ring-2 focus:ring-blue-400"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
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
          {filteredTickets.length > 0 ? (
            filteredTickets.map((ticket) => (
              <tr key={ticket.id} className="border-b border-gray-200">
                <td className="py-3 px-4 text-left">{ticket.id}</td>
                <td className="py-3 px-4">{ticket.name}</td>
                <td className="py-3 px-4">{ticket.email}</td>
                <td className="py-3 px-4">{ticket.issueType}</td>
                <td className={`py-3 px-4 font-medium ${getStatusColor(ticket.status)}`}>
                  {ticket.status}
                </td>
                <td className="py-3 px-4 flex justify-center gap-10">
                  <FaRegPenToSquare
                    className="text-blue-500 cursor-pointer"
                    onClick={() => handleEdit(ticket)}
                  />
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

      {/* 🗑️ Delete Modal */}
      <CommonModal isOpen={isDeleteModalOpen} onClose={() => setIsDeleteModalOpen(false)}>
        <div className="text-center space-y-4 px-4 py-3">
          <p className="text-lg font-medium">Are you sure you want to delete this ticket?</p>
          <div className="flex justify-center gap-4">
            <button
              onClick={() => setIsDeleteModalOpen(false)}
              className="border border-blue-500 text-blue-500 px-6 py-2 rounded hover:bg-blue-50"
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

      {/* ✏️ Edit Modal */}
      <CommonModal isOpen={isEditModalOpen} onClose={() => setIsEditModalOpen(false)}>
        {editTicket && (
          <div className="space-y-4 px-4 py-2">
            <h2 className="text-xl font-semibold">Ticket Details</h2>
            <div className="space-y-2 text-sm">
              <p><strong>Ticket ID:</strong> {editTicket.id}</p>
              <p><strong>Name:</strong> {editTicket.name}</p>
              <p><strong>Email:</strong> {editTicket.email}</p>
              <p><strong>Issue Type:</strong> {editTicket.issueType}</p>
              <p><strong>Issue Date:</strong> {editTicket.issueDate}</p>
              <div className="flex gap-3 items-center">
                <label className="block font-medium mb-1">Status:</label>
                <select
                  className=" border border-gray-100 rounded px-3 outline-none"
                  value={editStatus}
                  onChange={(e) => setEditStatus(e.target.value)}
                >
                  <option>Open</option>
                  <option>In Progress</option>
                  <option>Resolved</option>
                </select>
              </div>
            </div>
            <div className="flex justify-end gap-4 pt-4">
              <button
                onClick={() => setIsEditModalOpen(false)}
                className="border border-blue-500 text-blue-500 px-6 py-2 rounded hover:bg-blue-50"
              >
                Cancel
              </button>
              <button
                onClick={saveEdit}
                className="bg-blue-500 text-white px-6 py-2 rounded hover:bg-blue-600"
              >
                Save
              </button>
            </div>
          </div>
        )}
      </CommonModal>
    </div>
  );
};

export default Ticket;