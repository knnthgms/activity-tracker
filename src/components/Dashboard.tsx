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
const COLORS = [
  "#C0C999",
  "#fd96a9",
  "#60e1e0",
  "#6883ba",
  "#B88E8D",
  "#6369D1",
];

const Dashboard: React.FC<DashboardProps> = ({ data }) => {
  // Helper: Aggregate total time spent per activity
  const getTotalTimePerActivity = () =>
    Object.entries(
      data.reduce((acc, activity) => {
        acc[activity.name] = (acc[activity.name] || 0) + activity.duration;
        return acc;
      }, {} as Record<string, number>)
    ).map(([name, duration]) => ({ name, duration }));

  // Helper: Aggregate daily activity trend for each activity
  const getDailyActivityTrend = () => {
    // Create an object where each activity has its own durations per day
    const result: Record<string, { date: string; duration: number }[]> = {};

    data.forEach((activity) => {
      if (!result[activity.name]) {
        result[activity.name] = [];
      }
      result[activity.name].push({
        date: activity.date,
        duration: activity.duration,
      });
    });

    // Convert the object into an array of objects where each object represents a day and includes durations for each activity
    const allDates = Array.from(new Set(data.map((activity) => activity.date)));

    const mergedData = allDates.map((date) => {
      const mergedEntry: { date: string; [key: string]: number } = { date };
      Object.entries(result).forEach(([activity, durations]) => {
        const activityData = durations.find((entry) => entry.date === date);
        mergedEntry[activity] = activityData ? activityData.duration : 0;
      });
      return mergedEntry;
    });

    return mergedData;
  };

  // Data for visualizations
  const totalTimePerActivity = getTotalTimePerActivity();
  const dailyActivityTrend = getDailyActivityTrend();
  const uniqueActivities = Array.from(
    new Set(data.map((activity) => activity.name))
  );

  if (data.length === 0) {
    return (
      <p className="text-gray-500 text-center">No activities logged yet.</p>
    );
  }

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
            <Bar dataKey="duration" fill={COLORS[3]} />
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
            <Legend />
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

            {uniqueActivities.map((activity, index) => (
              <Line
                key={activity}
                type="monotone"
                dataKey={activity}
                stroke={COLORS[index % COLORS.length]}
                activeDot={{ r: 8 }}
              />
            ))}
          </LineChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
};

export default Dashboard;
