


import { useState } from "react";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  CartesianGrid,
  Cell,
} from "recharts";

const weeklyData = [
  { month: "W1", value: 1 },
  { month: "W2", value: 2 },
  { month: "W3", value: 1 },
  { month: "W4", value: 3 },
];

const monthlyData = [
  { month: "Feb", value: 1 },
  { month: "Mar", value: 2 },
  { month: "Apr", value: 1 },
  { month: "May", value: 3 },
  { month: "Jun", value: 2 },
];

const yearlyData = [
  { month: "Jan", value: 1 },
  { month: "Feb", value: 2 },
  { month: "Mar", value: 2 },
  { month: "Apr", value: 1 },
  { month: "May", value: 3 },
  { month: "Jun", value: 2 },
  { month: "Jul", value: 1 },
  { month: "Aug", value: 3 },
  { month: "Sep", value: 2 },
  { month: "Oct", value: 2 },
  { month: "Nov", value: 3 },
  { month: "Dec", value: 1 },
];

const CustomTooltip = ({ active, payload, label }) => {
  if (active && payload && payload.length) {
    return (
      <div className="bg-white border border-gray-200 rounded-lg shadow-md px-3 py-2 text-sm text-gray-900">
        <p className="font-semibold">{label}</p>
        <p className="flex items-center gap-2">
          <span className="w-2 h-2 rounded-full bg-blue-500"></span>
          Level: {payload[0].value}
        </p>
      </div>
    );
  }
  return null;
};

const MonthlySummary = () => {
  const [selectedRange, setSelectedRange] = useState("Monthly");

  const getChartData = () => {
    switch (selectedRange) {
      case "Weekly":
        return weeklyData;
      case "Monthly":
        return monthlyData;
      case "Yearly":
        return yearlyData;
      default:
        return monthlyData;
    }
  };

  const data = getChartData();

  return (
    <div className="">
      <div className="pb-3 text-gray-500 flex items-center justify-between">
        <h4 className="text-gray-500 font-medium">Growth Trend </h4>
        <select
          className="text-text-sm px-2 py-1 rounded-md outline-none text-gray-700"
          value={selectedRange}
          onChange={(e) => setSelectedRange(e.target.value)}
        >
          <option value="Weekly">Weekly</option>
          <option value="Monthly">Monthly</option>
          <option value="Yearly">Yearly</option>
        </select>
      </div>

      <ResponsiveContainer width="100%" height={250}>
        <BarChart data={data} barCategoryGap={25}>
          <XAxis
            dataKey="month"
            tick={{ fontSize: 12, fill: "#9CA3AF" }}
            axisLine={false}
            tickLine={false}
          />
          <YAxis
            domain={[0, 3]}
            ticks={[0, 1, 2, 3]}
            tickFormatter={(value) => `LV ${value}`}
            tick={{ fontSize: 12, fill: "#9CA3AF" }}
            axisLine={false}
            tickLine={false}
            width={40}
          />
          <CartesianGrid vertical={false} strokeDasharray="3 3" stroke="#F3F4F6" />
          <Tooltip content={<CustomTooltip />} cursor={{ fill: "transparent" }} />
          <Bar dataKey="value" radius={[8, 8, 0, 0]}>
            {data.map((_, index) => (
              <Cell key={index} fill="url(#blueGradient)" />
            ))}
          </Bar>
          <defs>
            <linearGradient id="blueGradient" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor="#7cb9ff" />
              <stop offset="100%" stopColor="#3286ff" />
            </linearGradient>
          </defs>
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
};

export default MonthlySummary;