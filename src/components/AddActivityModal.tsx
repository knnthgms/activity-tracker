import React, { useState } from "react";
import { Button } from "./ui/button";
import { Input } from "./ui/input";
import DatePicker from "./ui/datepicker";
import { Activity } from "@/App";

interface AddActivityModalProps {
  onClose: () => void;
  onAddActivity?: (activity: Activity) => void;
}

const AddActivityModal: React.FC<AddActivityModalProps> = ({
  onClose,
  onAddActivity,
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
      id: Date.now().toString(),
      name,
      duration: Number(duration),
      date,
    };

    if (onAddActivity) {
      onAddActivity(newActivity);
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
          <Input
            id="activity-name"
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            className="mt-1"
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
          <Input
            id="duration"
            type="number"
            value={duration}
            onChange={(e) => setDuration(e.target.value)}
            className="mt-1"
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
          <DatePicker value={date} onChange={(date) => setDate(date)} />
        </div>

        <div className="flex justify-end space-x-4">
          <Button onClick={onClose} variant="secondary">
            Cancel
          </Button>
          <Button onClick={handleSave} variant="default">
            Save
          </Button>
        </div>
      </div>
    </div>
  );
};

export default AddActivityModal;
