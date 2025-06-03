import { useEffect, useState } from "react";
import { LineChart } from "@mui/x-charts/LineChart";
import dayjs from "dayjs";
import useTicket from "../../../components/hook/useTicket";

const TicketSummary = () => {
  const [selectedRange, setSelectedRange] = useState("Monthly");
  const [chartData, setChartData] = useState([]);
  const { tickets, loading } = useTicket([]);

  useEffect(() => {
    if (loading || !tickets.length) return;

    const today = dayjs();

    const generateData = () => {
      if (selectedRange === "Daily") {
        return Array.from({ length: 7 }).map((_, i) => {
          const date = today.subtract(6 - i, "day").startOf("day");
          const label = date.format("DD MMM");

          const count = tickets.filter((ticket) =>
            dayjs(ticket.createdAt).isSame(date, "day")
          ).length;

          return { date: label, score: count };
        });
      }

      if (selectedRange === "Weekly") {
        return Array.from({ length: 6 }).map((_, i) => {
          const startOfWeek = today.subtract(5 - i, "week").startOf("week");
          const endOfWeek = startOfWeek.endOf("week");
          const label = startOfWeek.format("DD MMM");

          const count = tickets.filter((ticket) => {
            const ticketDate = dayjs(ticket.createdAt);
            return ticketDate.isAfter(startOfWeek.subtract(1, "day")) && ticketDate.isBefore(endOfWeek.add(1, "day"));
          }).length;

          return { date: label, score: count };
        });
      }

      if (selectedRange === "Monthly") {
        return Array.from({ length: 12 }).map((_, i) => {
          const date = today.subtract(11 - i, "month").startOf("month");
          const label = date.format("MMM");

          const count = tickets.filter((ticket) =>
            dayjs(ticket.createdAt).isSame(date, "month")
          ).length;

          return { date: label, score: count };
        });
      }

      return [];
    };

    const data = generateData();
    setChartData(data);
  }, [selectedRange, tickets, loading]);

  const xLabels = chartData.map((item) => item.date);
  const scores = chartData.map((item) => item.score);

  return (
    <div className="border-2 border-gray-100 p-5 rounded-xl">
      <div className="pb-3 flex items-center justify-between">
        <h4 className="font-semibold text-lg">Ticket Summary</h4>
        <select
          className="text-sm px-2 py-1 rounded-md outline-none text-gray-700"
          value={selectedRange}
          onChange={(e) => setSelectedRange(e.target.value)}
        >
          <option value="Daily">Daily</option>
          <option value="Weekly">Weekly</option>
          <option value="Monthly">Monthly</option>
        </select>
      </div>

      <LineChart
        height={300}
        xAxis={[
          {
            scaleType: "point",
            data: xLabels,
            tickLabelStyle: {
              fontSize: 12,
              fill: "#999",
            },
          },
        ]}
        yAxis={[
          {
            tickMinStep: 1,
            tickLabelStyle: {
              fontSize: 12,
              fill: "#999",
            },
          },
        ]}
        grid={{ horizontal: true, vertical: false }}
        series={[
          {
            data: scores,
            label: "Tickets",
            color: "#3B82F6",
            curve: "monotone",
          },
        ]}
        margin={{ top: 10, right: 20, bottom: 30, left: 40 }}
        sx={{
          ".MuiLineElement-root": {
            strokeWidth: 2,
          },
          ".MuiMarkElement-root": {
            display: "none",
          },
        }}
      />
    </div>
  );
};

export default TicketSummary;
