import { Link } from "react-router-dom";
import useTicket from "../../../components/hook/useTicket";

const RecentTicket = () => {

  const { tickets, loading } = useTicket([]);

    const sliceTicket = tickets.slice(0, 6);

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

  if (loading) return <div>Loading...</div>;

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
              <td className="py-3 px-4 text-left hover:text-blue-500 hover:underline">
                  <Link to={`/ticket_details/${ticket._id}`}>{ticket._id}</Link>
                </td>
                <td className="py-3 px-4">{ticket.userProfile?.fullName}</td>
                <td className="py-3 px-4">
                  {Array.isArray(ticket.issue) ? (
                    ticket.issue.length <= 1 ? (
                      ticket.issue
                        .map((issue, index) => `${index + 1}. ${issue}`)
                        .join(", ")
                    ) : (
                      <>
                        {ticket.issue
                          .slice(0, 1)
                          .map((issue, index) => `${index + 1}. ${issue}`)
                          .join(", ")}
                        {` +${ticket.issue.length - 1} more`}
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
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default RecentTicket;
