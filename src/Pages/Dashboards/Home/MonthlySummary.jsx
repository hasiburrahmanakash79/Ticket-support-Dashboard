import { useState } from "react";
import { LineChart } from "@mui/x-charts/LineChart";

const MonthlySummary = () => {
  const [selectedRange, setSelectedRange] = useState("Monthly");

  // Sample Data Sets
  const weeklyData = [
    { date: "Apr 01", score: 3 },
    { date: "Apr 08", score: 6 },
    { date: "Apr 15", score: 4 },
    { date: "Apr 22", score: 7 },
    { date: "Apr 29", score: 5 },
  ];

  const monthlyData = [
    { date: "Jan", score: 20 },
    { date: "Feb", score: 35 },
    { date: "Mar", score: 28 },
    { date: "Apr", score: 40 },
    { date: "May", score: 32 },
    { date: "Jun", score: 42 },
    { date: "Jul", score: 52 },
    { date: "Aug", score: 32 },
    { date: "Sep", score: 52 },
    { date: "Oct", score: 22 },
    { date: "Nov", score: 32 },
    { date: "Dec", score: 12 },
  ];

  const yearlyData = [
    { date: "2020", score: 180 },
    { date: "2021", score: 220 },
    { date: "2022", score: 210 },
    { date: "2023", score: 240 },
    { date: "2024", score: 250 },
  ];

  // Filter data based on selection
  const getFilteredData = () => {
    if (selectedRange === "Weekly") return weeklyData;
    if (selectedRange === "Monthly") return monthlyData;
    if (selectedRange === "Yearly") return yearlyData;
    return [];
  };

  const filteredData = getFilteredData();
  const xLabels = filteredData.map((item) => item.date);
  const scores = filteredData.map((item) => item.score);

  return (
    <div className="border-2 border-gray-100 p-5 rounded-xl">
      <div className="pb-3 flex items-center justify-between">
        <h4 className="font-semibold text-lg">Monthly Ticket Summary</h4>
        <select
          className="text-sm px-2 py-1 rounded-md outline-none text-gray-700"
          value={selectedRange}
          onChange={(e) => setSelectedRange(e.target.value)}
        >
          <option value="Weekly">Weekly</option>
          <option value="Monthly">Monthly</option>
          <option value="Yearly">Yearly</option>
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
            label: "Score",
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

export default MonthlySummary;
