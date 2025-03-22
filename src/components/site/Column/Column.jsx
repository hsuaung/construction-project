import React, { useState } from "react";
import { Task } from "../Task/Task";
import Edit from "../Edit"; // Import modal component
import "./column.scss";

export default function Column({ tasks, refetchSiteList }) {
  const [showEditModelBox, setShowEditModelBox] = useState(false);
  const [selectedTaskId, setSelectedTaskId] = useState(null);

  const handleEditModelBox = (id) => {
    console.log("Editing task:", id);
    setShowEditModelBox(true);
    setSelectedTaskId(id); // Store only the ID, not an object
  };

  const closeModal = () => {
    // setShowEditModelBox(false); // Hide modal
    setSelectedTaskId(null);
    if (refetchSiteList) {
      refetchSiteList();
    }
  };

  return (
    <div className="scrollable">
      <div className="siteListData">
        {tasks.map((task) => (
          <Task
            key={task.id}
            id={task.id}
            name={task.name}
            businesspartner={task.Businesspartner.name}
            staff={task.Staff.name}
            startDate={task.startDate}
            endDate={task.endDate}
            status={task.status}
            onSuccess={refetchSiteList}
            onClick={() => handleEditModelBox(task.id)}
          />
        ))}
      </div>

      {/* Show Modal Only When Needed */}
      {showEditModelBox && (
        <Edit
          showEditModelBox={showEditModelBox}
          setShowEditModelBox={setShowEditModelBox}
          id={selectedTaskId}
          closeModal={closeModal} // Ensure modal can close
          onSuccess={refetchSiteList}
        />
      )}
    </div>
  );
}
