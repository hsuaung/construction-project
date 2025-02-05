import React, { useState } from "react";
import { Task } from "../Task/Task";
import Entry from "../Entry"; // Import modal component
import "./column.scss";

export default function Column({ tasks }) {
    const [showEditModelBox, setShowEditModelBox] = useState(false);
  const [selectedTaskId, setSelectedTaskId] = useState(null);

  const handleEditModelBox = (id) => {
    console.log("Editing task:", id);
    setShowEditModelBox(true); // Show modal when editing task
    setSelectedTaskId(tasks.find(task => task.id === id)); // Store selected task details
  };

  const closeModal = () => {
    setSelectedTaskId(null); // Reset when closing modal
  };

  return (
    <div className="scrollable">
      <div className="vehicleListData">
        {tasks.map((task) => (
          <Task
            key={task.id}
            id={task.id}
            name={task.user_name}
            group={task.user_email}
            onClick={() => handleEditModelBox(task.id)} // Pass function correctly
          />
        ))}
      </div>

      {/* Show Modal Only When a Task is Selected */}
      {showEditModelBox && (
        <Entry showEditModelBox={showEditModelBox} setShowEditModelBox={setShowEditModelBox} id={selectedTaskId} />
      )}
    </div>
  );
}