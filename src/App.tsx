import { useState } from "react";
import Dashboard from "@/components/Dashboard";
import ActivityList from "@/components/ActivityList";
import AddActivityModal from "@/components/AddActivityModal";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Button } from "./components/ui/button";

const data = [
  {
    name: "bloe",
    duration: 2,
    date: "20240412",
  },
];

export default function App() {
  const [isModalOpen, setModalOpen] = useState(false);
  const handleAddActivity = () => setModalOpen(true);
  return (
    <div className="min-h-screen">
      <header className="shadow px-4 py-2 flex justify-between items-center">
        <h1 className="text-lg font-semibold">Personal Activity Tracker</h1>
        <Button onClick={handleAddActivity}>Add Activity</Button>
      </header>

      <main className="px-4 py-6">
        <Tabs defaultValue="dashboard">
          <TabsList className="flex justify-center">
            <TabsTrigger value="dashboard">Dashboard</TabsTrigger>
            <TabsTrigger value="activity-list">Activity List</TabsTrigger>
          </TabsList>
          <TabsContent value="dashboard">
            <Dashboard />
          </TabsContent>
          <TabsContent value="activity-list">
            <ActivityList activities={data} />
          </TabsContent>
        </Tabs>
      </main>

      {isModalOpen && <AddActivityModal onClose={() => setModalOpen(false)} />}
    </div>
  );
}
