import React, { useState } from "react";
import { Button } from "./ui/button";

interface Activity {
  name: string;
  duration: number;
  date: string;
}

interface ActivityListProps {
  activities: Activity[];
}

const ActivityList: React.FC<ActivityListProps> = ({ activities }) => {
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 5;

  const totalPages = Math.ceil(activities.length / itemsPerPage);
  const paginatedActivities = activities.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  const handlePageChange = (page: number) => {
    if (page > 0 && page <= totalPages) {
      setCurrentPage(page);
    }
  };

  return (
    <div className="p-4">
      <h2 className="text-xl font-semibold mb-4">Activity List</h2>

      {activities.length === 0 ? (
        <p className="text-gray-500">No activities logged yet.</p>
      ) : (
        <>
          <table className="min-w-full bg-white border border-gray-300">
            <thead className="bg-gray-100">
              <tr>
                <th className="py-2 px-4 border-b text-left text-sm font-medium text-gray-700">
                  Activity Name
                </th>
                <th className="py-2 px-4 border-b text-left text-sm font-medium text-gray-700">
                  Duration (min)
                </th>
                <th className="py-2 px-4 border-b text-left text-sm font-medium text-gray-700">
                  Date
                </th>
              </tr>
            </thead>
            <tbody>
              {paginatedActivities.map((activity, index) => (
                <tr key={index}>
                  <td className="py-2 px-4 border-b text-sm text-gray-700">
                    {activity.name}
                  </td>
                  <td className="py-2 px-4 border-b text-sm text-gray-700">
                    {activity.duration}
                  </td>
                  <td className="py-2 px-4 border-b text-sm text-gray-700">
                    {activity.date}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>

          <div className="mt-4 flex justify-between items-center">
            <Button
              onClick={() => handlePageChange(currentPage - 1)}
              disabled={currentPage === 1}
              variant="outline"
            >
              Previous
            </Button>
            <span className="text-sm text-gray-700">
              Page {currentPage} of {totalPages}
            </span>
            <Button
              onClick={() => handlePageChange(currentPage + 1)}
              disabled={currentPage === totalPages}
              variant="outline"
            >
              Next
            </Button>
          </div>
        </>
      )}
    </div>
  );
};

export default ActivityList;
