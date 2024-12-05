import React from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { Button } from "./ui/button";
import { Input } from "./ui/input";
import DatePicker from "./ui/datepicker";
import { Activity } from "@/App";

interface AddActivityModalProps {
  onClose: () => void;
  onAddActivity?: (activity: Activity) => void;
}

const activitySchema = z.object({
  name: z.string().nonempty("Activity name is required."),
  duration: z
    .number({
      required_error: "Duration is required.",
      invalid_type_error: "Duration must be a number.",
    })
    .positive("Duration must be greater than 0."),
  date: z.string().nonempty("Date is required."),
});

type ActivityFormValues = z.infer<typeof activitySchema>;

const AddActivityModal: React.FC<AddActivityModalProps> = ({
  onClose,
  onAddActivity,
}) => {
  const {
    register,
    handleSubmit,
    formState: { errors },
    setValue,
  } = useForm<ActivityFormValues>({
    resolver: zodResolver(activitySchema),
    defaultValues: {
      name: "",
      duration: 0,
      date: new Date().toISOString().split("T")[0],
    },
  });

  const onSubmit = (data: ActivityFormValues) => {
    const newActivity: Activity = {
      id: Date.now().toString(),
      ...data,
      duration: Number(data.duration),
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

        <form onSubmit={handleSubmit(onSubmit)}>
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
              {...register("name")}
              className="mt-1"
              placeholder="e.g., Running, Reading"
            />
            {errors.name && (
              <p className="text-red-500 text-sm mt-1">{errors.name.message}</p>
            )}
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
              {...register("duration", { valueAsNumber: true })}
              className="mt-1"
              placeholder="Enter duration in minutes"
            />
            {errors.duration && (
              <p className="text-red-500 text-sm mt-1">
                {errors.duration.message}
              </p>
            )}
          </div>

          <div className="mb-4">
            <label
              htmlFor="date"
              className="block text-sm font-medium text-gray-700"
            >
              Date
            </label>
            <DatePicker
              value={new Date().toISOString().split("T")[0]}
              onChange={(date) => setValue("date", date)}
            />
            {errors.date && (
              <p className="text-red-500 text-sm mt-1">{errors.date.message}</p>
            )}
          </div>

          <div className="flex justify-end space-x-4">
            <Button onClick={onClose} variant="secondary" type="button">
              Cancel
            </Button>
            <Button variant="default" type="submit">
              Save
            </Button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default AddActivityModal;
