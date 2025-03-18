import React, { useState } from "react";
import { Task } from "../Task/Task";
import Entry from "../Entry"; // Import modal component
import "./column.scss";
import { useNavigate } from "react-router-dom";

export default function Column({ tasks, refreshOPTypes }) {
  const [showEditModelBox, setShowEditModelBox] = useState(false);
  const [selectedTaskId, setSelectedTaskId] = useState(null);
  const navigate = useNavigate()

  const handleEditModelBox = (id) => {
    console.log("Editing task:", id);
    setShowEditModelBox(true); // Show modal when editing task
    setSelectedTaskId(id);
    navigate(`/operation-type/edit/${id}`) // Navigate to edit page with selected task id
  };

  const closeModal = () => {
    setSelectedTaskId(null); // Reset when closing modal
    if(refreshOPTypes){
      refreshOPTypes(); // Refresh the data when modal is closed
    }
  };

  return (
    <div className="scrollable">
      <div className="operationTypeListData">
        {tasks.map((task) => (
          <Task
            key={task.id}
            id={task.id}
            name={task.name}
            color={task.color}
            // numberOfSites={task.numberOfSites}
            onSuccess={refreshOPTypes}
            onClick={() => handleEditModelBox(task.id)} // Pass function correctly
          />
        ))}
      </div>

      {/* Show Modal Only When a Task is Selected */}
      {showEditModelBox && (
        <Entry
          showEditModelBox={showEditModelBox}
          setShowEditModelBox={setShowEditModelBox}
          id={selectedTaskId} onSuccess= {refreshOPTypes}
        />
      )}
    </div>
  );
}
