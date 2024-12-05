import React, { useState } from "react";
import { Button } from "./ui/button";

interface AddActivityModalProps {
  onClose: () => void;
  onSave?: (activity: { name: string; duration: number; date: string }) => void;
}

const AddActivityModal: React.FC<AddActivityModalProps> = ({
  onClose,
  onSave,
}) => {
  const [name, setName] = useState("");
  const [duration, setDuration] = useState("");
  const [date, setDate] = useState(
    () => new Date().toISOString().split("T")[0]
  ); // Default to today's date

  const handleSave = () => {
    if (!name || !duration || isNaN(Number(duration))) {
      alert("Please fill in all fields correctly!");
      return;
    }

    const newActivity = {
      name,
      duration: Number(duration),
      date,
    };

    if (onSave) {
      onSave(newActivity);
    }

    onClose();
  };

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
      <div className="bg-white rounded-lg shadow-lg w-96 p-6">
        <h2 className="text-xl font-semibold mb-4">Add Activity</h2>

        <div className="mb-4">
          <label
            htmlFor="activity-name"
            className="block text-sm font-medium text-gray-700"
          >
            Activity Name
          </label>
          <input
            id="activity-name"
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm"
            placeholder="e.g., Running, Reading"
          />
        </div>

        <div className="mb-4">
          <label
            htmlFor="duration"
            className="block text-sm font-medium text-gray-700"
          >
            Duration (minutes)
          </label>
          <input
            id="duration"
            type="number"
            value={duration}
            onChange={(e) => setDuration(e.target.value)}
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm"
            placeholder="Enter duration in minutes"
          />
        </div>

        <div className="mb-4">
          <label
            htmlFor="date"
            className="block text-sm font-medium text-gray-700"
          >
            Date
          </label>
          <input
            id="date"
            type="date"
            value={date}
            onChange={(e) => setDate(e.target.value)}
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm"
          />
        </div>

        <div className="flex justify-end space-x-4">
          <Button
            onClick={onClose}
            className="px-4 py-2 text-sm font-medium text-gray-700 bg-gray-200 rounded hover:bg-gray-300"
          >
            Cancel
          </Button>
          <Button
            onClick={handleSave}
            className="px-4 py-2 text-sm font-medium text-white bg-blue-500 rounded hover:bg-blue-600"
          >
            Save
          </Button>
        </div>
      </div>
    </div>
  );
};

export default AddActivityModal;
