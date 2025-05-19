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

const RecentTicket = () => {

    const sliceTicket = ticketData.slice(0, 6);

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
      <h2 className="text-2xl font-semibold mb-3">Recent Ticket</h2>

      <table className="min-w-full bg-white rounded-xl text-center">
        <thead>
          <tr className="text-sm bg-blue-50">
            <th className="p-4 text-left">Ticket ID</th>
            <th className="p-4">User Name</th>
            <th className="p-4">Issue Type</th>
            <th className="p-4">Status</th>
          </tr>
        </thead>
        <tbody className="text-sm text-center">
          {sliceTicket.map((ticket) => (
            <tr key={ticket.id} className="border-t border-gray-200">
              <td className="py-3 px-4 text-left">{ticket.id}</td>
              <td className="py-3 px-4">{ticket.name}</td>
              <td className="py-3 px-4">{ticket.issueType}</td>
              <td
                className={`py-3 px-4 font-medium ${getStatusColor(
                  ticket.status
                )}`}
              >
                {ticket.status}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default RecentTicket;
