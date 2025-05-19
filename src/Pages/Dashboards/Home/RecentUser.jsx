import { useState } from "react";
import CommonModal from "../../../components/Common/CommonModal";
import { FaSearch } from "react-icons/fa";
import { FaRegTrashCan } from "react-icons/fa6";

const initialUsers = [
  {
    name: "Alice Johnson",
    email: "alice.johnson@example.com",
    number: "+12345678901",
    usertype: "customer",
  },
  {
    name: "Bob Smith",
    email: "bob.smith@example.com",
    number: "+12345678902",
    usertype: "distributor",
  },
  {
    name: "Carol Davis",
    email: "carol.davis@example.com",
    number: "+12345678903",
    usertype: "customer",
  },
  {
    name: "David Wilson",
    email: "david.wilson@example.com",
    number: "+12345678904",
    usertype: "distributor",
  },
  {
    name: "Eva Brown",
    email: "eva.brown@example.com",
    number: "+12345678905",
    usertype: "customer",
  },
  {
    name: "Frank Miller",
    email: "frank.miller@example.com",
    number: "+12345678906",
    usertype: "distributor",
  },
  {
    name: "Grace Lee",
    email: "grace.lee@example.com",
    number: "+12345678907",
    usertype: "customer",
  },
  {
    name: "Henry Clark",
    email: "henry.clark@example.com",
    number: "+12345678908",
    usertype: "distributor",
  },
  {
    name: "Ivy Hall",
    email: "ivy.hall@example.com",
    number: "+12345678909",
    usertype: "customer",
  },
  {
    name: "Jack Turner",
    email: "jack.turner@example.com",
    number: "+12345678910",
    usertype: "distributor",
  },
];

const RecentUser = () => {
  const [users, setUsers] = useState(initialUsers);
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedOwner, setSelectedOwner] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [modalType, setModalType] = useState("view");

  const handleViewOwner = (owner) => {
    setSelectedOwner(owner);
    setModalType("view");
    setIsModalOpen(true);
  };

  const handleDeleteClick = (owner) => {
    setSelectedOwner(owner);
    setModalType("delete");
    setIsModalOpen(true);
  };

  const handleDeleteConfirm = () => {
    setUsers((prev) =>
      prev.filter((user) => user.email !== selectedOwner.email)
    );
    setIsModalOpen(false);
  };

  const filteredUsers = users.filter((user) =>
    user.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="overflow-x-auto border border-gray-200 rounded-xl p-5">
      <div className="mb-4 flex justify-between items-center">
        <h2 className="text-2xl font-semibold">User List</h2>
        <div className="relative w-72">
          <FaSearch className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
          <input
            type="text"
            placeholder="Search by name..."
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
            filteredUsers.map((user, idx) => (
              <tr key={idx} className="border-t border-gray-200">
                <td className="py-3 px-4 text-left">
                  <button
                    onClick={() => handleViewOwner(user)}
                    className="hover:text-blue-500"
                  >
                    {user.name}
                  </button>
                </td>
                <td className="py-4 px-4">{user.email}</td>
                <td className="py-3 px-4">{user.number}</td>
                <td className="py-3 px-4">{user.usertype}</td>
                <td className="py-3 px-4 flex justify-center items-center">
                  <FaRegTrashCan
                    className="text-red-500 cursor-pointer"
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
                No users found.
              </td>
            </tr>
          )}
        </tbody>
      </table>

      {/* Common Modal */}
      <CommonModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        title={
          modalType === "view" ? "" : "Confirm Delete"
        }
      >
        {selectedOwner && modalType === "view" && (
          <div className="space-y-3 text-center">
            <p className="text-xl pb-2">{selectedOwner.name}</p>
            <p>{selectedOwner.email}</p>
            <p>{selectedOwner.number}</p>
            <p>User Type: {selectedOwner.usertype}</p>
          </div>
        )}

        {selectedOwner && modalType === "delete" && (
          <div className="text-center space-y-6">
            <p className="text-gray-700">
              Are you sure you want to remove{" "}
              <span className="font-semibold">
                {selectedOwner.name}
              </span>
              ?
            </p>
            <div className="flex justify-center gap-4">
              <button
                onClick={() => setIsModalOpen(false)}
                className="px-5 py-2 bg-gray-300 text-gray-800 rounded-md hover:bg-gray-400"
              >
                Cancel
              </button>
              <button
                onClick={handleDeleteConfirm}
                className="px-5 py-2 bg-red-500 text-white rounded-md hover:bg-red-600"
              >
                Remove
              </button>
            </div>
          </div>
        )}
      </CommonModal>
    </div>
  );
};

export default RecentUser;
