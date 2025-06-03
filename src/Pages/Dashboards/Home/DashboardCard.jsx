// import React from "react";
import {
  FaChartColumn,
  FaClipboardCheck,
  FaClipboardList,
  FaClipboardQuestion,
} from "react-icons/fa6";
import useTicket from "../../../components/hook/useTicket";

const DashboardCard = () => {
  const {tickets, loading,} = useTicket([])
  const resolvedTickets = tickets.filter(ticket => ticket.status === 'Solved');
  const pendingTickets = tickets.filter(ticket => ticket.status === 'Pending');
  const todaySubmittedTickets = tickets.filter(ticket => {
    const today = new Date();
    const ticketDate = new Date(ticket.createdAt);
    return (
      ticketDate.getDate() === today.getDate() &&
      ticketDate.getMonth() === today.getMonth() &&
      ticketDate.getFullYear() === today.getFullYear()
    );
  });

  if (loading) return <div>Loading...</div>;
  return (
    <div className="grid grid-cols-7 gap-7">
      <div className="col-span-5 grid grid-cols-3 gap-7">
        <div className="rounded-2xl p-10 text-white bg-[#5389E2]">
          <div className="flex items-center justify-center gap-5">
            <FaClipboardList className="text-6xl" />
            <div className="space-y-3">
              <p className="text-lg">Total Ticket</p>
              <h1 className="text-4xl font-semibold">{tickets.length}</h1>
            </div>
          </div>
        </div>
        <div className="rounded-2xl p-10 text-white bg-[#9280DA]">
          <div className="flex items-center justify-center gap-5">
            <FaClipboardQuestion className="text-6xl" />
            <div className="space-y-3">
              <p className="text-lg">Ticket Pending</p>
              <h1 className="text-4xl font-semibold">{pendingTickets.length}</h1>
            </div>
          </div>
        </div>
        <div className="rounded-2xl p-10 text-white bg-[#59BCBD]">
          <div className="flex items-center justify-center gap-5">
            <FaClipboardCheck className="text-6xl" />
            <div className="space-y-3">
              <p className="text-lg">Resolved Ticket</p>
              <h1 className="text-4xl font-semibold">{resolvedTickets.length}</h1>
            </div>
          </div>
        </div>
      </div>
      <div className="rounded-2xl p-10 text-white bg-[#70A9EA] col-span-2">
        <div className="flex items-center justify-center gap-5">
          <FaChartColumn className="text-6xl" />
          <div className="space-y-3">
            <p className="text-lg">New Submission Today</p>
            <h1 className="text-4xl font-semibold">{todaySubmittedTickets.length}</h1>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DashboardCard;
