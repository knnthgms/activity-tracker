import { Activity } from "@/App";
import React from "react";

import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  CartesianGrid,
  PieChart,
  Pie,
  Cell,
  LineChart,
  Line,
  ResponsiveContainer,
  Legend,
} from "recharts";

interface DashboardProps {
  data: Activity[];
}

// Define color palette for charts
const COLORS = ["#0088FE", "#00C49F", "#FFBB28", "#FF8042"];

const Dashboard: React.FC<DashboardProps> = ({ data }) => {
  // Helper: Aggregate total time spent per activity
  const getTotalTimePerActivity = () =>
    Object.entries(
      data.reduce((acc, activity) => {
        acc[activity.name] = (acc[activity.name] || 0) + activity.duration;
        return acc;
      }, {} as Record<string, number>)
    ).map(([name, duration]) => ({ name, duration }));

  // Helper: Aggregate daily activity trend
  const getDailyActivityTrend = () =>
    Object.entries(
      data.reduce((acc, activity) => {
        acc[activity.date] = (acc[activity.date] || 0) + activity.duration;
        return acc;
      }, {} as Record<string, number>)
    ).map(([date, duration]) => ({ date, duration }));

  // Data for visualizations
  const totalTimePerActivity = getTotalTimePerActivity();
  const dailyActivityTrend = getDailyActivityTrend();

  return (
    <div className="dashboard grid gap-8">
      {/* Total Time Spent Per Activity */}
      <div>
        <h2 className="text-lg font-semibold">Total Time Spent Per Activity</h2>
        <ResponsiveContainer width="100%" height={300}>
          <BarChart data={totalTimePerActivity}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="name" />
            <YAxis />
            <Tooltip />
            <Legend />
            <Bar dataKey="duration" fill="#82ca9d" />
          </BarChart>
        </ResponsiveContainer>
      </div>

      {/* Activity Distribution */}
      <div>
        <h2 className="text-lg font-semibold">Activity Distribution</h2>
        <ResponsiveContainer width="100%" height={300}>
          <PieChart>
            <Pie
              data={totalTimePerActivity}
              dataKey="duration"
              nameKey="name"
              cx="50%"
              cy="50%"
              outerRadius={100}
              fill="#8884d8"
              label
            >
              {totalTimePerActivity.map((_, index) => (
                <Cell
                  key={`cell-${index}`}
                  fill={COLORS[index % COLORS.length]}
                />
              ))}
            </Pie>
            <Tooltip />
          </PieChart>
        </ResponsiveContainer>
      </div>

      {/* Daily Activity Trend */}
      <div>
        <h2 className="text-lg font-semibold">Daily Activity Trend</h2>
        <ResponsiveContainer width="100%" height={300}>
          <LineChart data={dailyActivityTrend}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="date" />
            <YAxis />
            <Tooltip />
            <Legend />
            <Line type="monotone" dataKey="duration" stroke="#ff7300" />
          </LineChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
};

export default Dashboard;
