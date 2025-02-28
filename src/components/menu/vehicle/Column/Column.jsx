import React, { useState } from "react";
import { Task } from "../Task/Task";
import Entry from "../Entry"; // Import modal component
import "./column.scss";
import { useNavigate } from "react-router-dom";

export default function Column({ tasks }) {
    const [showEditModelBox, setShowEditModelBox] = useState(false);
  const [selectedTaskId, setSelectedTaskId] = useState(null);
  const navigate = useNavigate();

  const handleEditModelBox = async(id) => {
    
    setShowEditModelBox(true); // Show modal when editing task
    // const taskId = await tasks.find(task => task.id === id); // Store selected task details
    console.log("Editing task:", id);
    setSelectedTaskId(id); 
    navigate(`/vehicle/edit/${id}`)
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
            image={task.image}
            name={task.name}
            groupId={task.groupId}
            inspectionExpiry={task.inspectionExpiry}
            insuranceExpiry={task.insuranceExpiry}
            status={task.status}
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