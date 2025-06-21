"use client";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
} from "recharts";

const data = [
  { name: "Jan", value: 400 },
  { name: "Feb", value: 300 },
  { name: "Mar", value: 200 },
  { name: "Apr", value: 278 },
  { name: "May", value: 189 },
];

export default function Dashboard() {
  return (
    <div className="bg-zinc-900 rounded-lg p-6 shadow-lg w-full h-full max-h-[700px] flex flex-col">
      <h2 className="text-xl font-bold mb-4 text-white">Analytics Dashboard</h2>
      <div className="flex-1 min-h-[400px]">
        <ResponsiveContainer width="100%" height="100%">
          <LineChart data={data}>
            <XAxis dataKey="name" stroke="#fff" />
            <YAxis stroke="#fff" />
            <Tooltip
              contentStyle={{ background: "#222", border: "none" }}
              labelStyle={{ color: "#fff" }}
            />
            <Line
              type="monotone"
              dataKey="value"
              stroke="#38bdf8"
              strokeWidth={2}
              dot={{ r: 4 }}
            />
          </LineChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}
