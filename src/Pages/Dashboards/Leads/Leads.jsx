import { useState } from "react";
import { FaPhoneAlt, FaMapMarkerAlt, FaEnvelope } from "react-icons/fa";
import CommonModal from "../../../components/Common/CommonModal";
import { FaRegPenToSquare, FaRegTrashCan } from "react-icons/fa6";

const leadData = [
  {
    name: "John Doe",
    status: "Qualified",
    motivation: 7,
    painPoint: "Divorce",
    urgency: "High",
    email: "john@example.com",
    phone: "+1234567890",
    location: "New York, NY",
  },
  {
    name: "Jane Smith",
    status: "Contacted",
    motivation: 4,
    painPoint: "Financial Issues",
    urgency: "Medium",
    email: "jane@example.com",
    phone: "+1987654321",
    location: "Dallas, TX",
  },
  {
    name: "Michael Johnson",
    status: "Interested",
    motivation: 9,
    painPoint: "Job Relocation",
    urgency: "High",
    email: "michael@example.com",
    phone: "+1123456789",
    location: "Los Angeles, CA",
  },
  {
    name: "Emily Davis",
    status: "Qualified",
    motivation: 5,
    painPoint: "Medical Bills",
    urgency: "Medium",
    email: "emily@example.com",
    phone: "+1444555666",
    location: "Austin, TX",
  },
  {
    name: "Robert Wilson",
    status: "Qualified",
    motivation: 2,
    painPoint: "Foreclosure",
    urgency: "Low",
    email: "robert@example.com",
    phone: "+1555666777",
    location: "Miami, FL",
  },
  {
    name: "Sarah Lee",
    status: "Qualified",
    motivation: 8,
    painPoint: "Downsizing",
    urgency: "High",
    email: "sarah@example.com",
    phone: "+1222333444",
    location: "Chicago, IL",
  },
  {
    name: "David Brown",
    status: "Contacted",
    motivation: 3,
    painPoint: "Inherited Property",
    urgency: "Low",
    email: "david@example.com",
    phone: "+1666777888",
    location: "Phoenix, AZ",
  },
  {
    name: "Ashley Miller",
    status: "Interested",
    motivation: 6,
    painPoint: "Divorce",
    urgency: "Medium",
    email: "ashley@example.com",
    phone: "+1777888999",
    location: "Seattle, WA",
  },
  {
    name: "Chris Martinez",
    status: "Interested",
    motivation: 10,
    painPoint: "Retirement",
    urgency: "High",
    email: "chris@example.com",
    phone: "+1999000111",
    location: "Denver, CO",
  },
  {
    name: "Olivia Anderson",
    status: "Qualified",
    motivation: 4,
    painPoint: "Too Much Maintenance",
    urgency: "Low",
    email: "olivia@example.com",
    phone: "+1888777666",
    location: "Atlanta, GA",
  },
  {
    name: "Daniel Thomas",
    status: "Interested",
    motivation: 1,
    painPoint: "Unpaid Taxes",
    urgency: "Low",
    email: "daniel@example.com",
    phone: "+1555444333",
    location: "Las Vegas, NV",
  },
  {
    name: "Sophia Garcia",
    status: "Contacted",
    motivation: 6,
    painPoint: "Moving Out of State",
    urgency: "Medium",
    email: "sophia@example.com",
    phone: "+1444222111",
    location: "Orlando, FL",
  },
];

const Leads = () => {
  const [selectedOwner, setSelectedOwner] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleViewOwner = (owner) => {
    setSelectedOwner(owner);
    setIsModalOpen(true);
  };
  return (
    <div className="overflow-x-auto">
      <h2 className="text-2xl font-bold mb-4">Lead Dashboard</h2>
      <table className="min-w-full bg-white rounded-xl shadow text-center">
        <thead>
          <tr className="bg-gray-100 text-sm text-gray-600 uppercase">
            <th className="py-3 px-4 text-left">Owner</th>
            <th className="py-3 px-4">Quick Action</th>
            <th className="py-3 px-4">Status</th>
            <th className="py-3 px-4">Motivation</th>
            <th className="py-3 px-4">Action</th>
            <th className="py-3 px-4">Pain Point</th>
            <th className="py-3 px-4">Urgency</th>
          </tr>
        </thead>
        <tbody className="text-sm text-gray-700">
          {leadData.map((lead, idx) => (
            <tr key={idx} className="hover:bg-blue-50">
              <td className="py-3 px-4 font-semibold text-left">
                <button
                  onClick={() => handleViewOwner(lead)}
                  className="hover:text-blue-500"
                >
                  {lead.name}
                </button>
              </td>
              <td className="py-4 px-4">
                <div className="flex justify-center gap-4">
                  <a href={`tel:${lead.phone}`}>
                    <FaPhoneAlt />
                  </a>
                  <a
                    href={`https://www.google.com/maps/search/${lead.location}`}
                    target="_blank"
                  >
                    <FaMapMarkerAlt />
                  </a>
                  <a href={`mailto:${lead.email}`}>
                    <FaEnvelope />
                  </a>
                </div>
              </td>
              <td className="py-3 px-4">
                <span
                  className={`px-2 py-1 rounded text-xs ${
                    lead.status === "Contacted"
                      ? "text-green-500 bg-green-100 p-3 rounded-full"
                      : lead.status === "Interested"
                      ? "text-yellow-500 bg-yellow-100 p-3 rounded-full"
                      : lead.status === "Qualified"
                      ? "text-blue-500 bg-blue-100 p-3 rounded-full"
                      : "text-red-500 bg-red-100 p-3 rounded-full "
                  }`}
                >
                  {lead.status}
                </span>
              </td>
              <td className="py-3 px-4">{lead.motivation}</td>
              <td className="py-3 px-4">{lead.status}</td>
              <td className="py-3 px-4">{lead.painPoint}</td>
              <td className="py-3 px-4">
                <span
                  className={`px-2 py-1 rounded text-xs ${
                    lead.urgency === "High"
                      ? "text-red-500"
                      : lead.urgency === "Medium"
                      ? "text-yellow-400"
                      : "text-green-500"
                  }`}
                >
                  {lead.urgency}
                </span>
                <FaRegPenToSquare />
                <FaRegTrashCan />

              </td>
            </tr>
          ))}
        </tbody>
      </table>

      {/* Common Modal */}
      <CommonModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        title="Owner's Details"
      >
        {selectedOwner && (
          <div className="space-y-3 text-center">
            <p className="text-xl pb-2">{selectedOwner.name}</p>
            <p>{selectedOwner.location}</p>
            <p>{selectedOwner.phone}</p>
            <p>{selectedOwner.painPoint}</p>
            <p>Priority: {selectedOwner.urgency}</p>
            <p>Motivation: {selectedOwner.motivation}/10</p>
          </div>
        )}
      </CommonModal>
    </div>
  );
};

export default Leads;
