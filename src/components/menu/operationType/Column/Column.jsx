import React from "react";
import { Task } from "../Task/Task";
import "./column.scss";
export default function Column({ tasks }) {
  return (
    <div className="scrollable">
      <div className="operationTypeListData">
      {tasks.map((task) => (
        <Task key={task.id} id={task.id} name={task.user_name} group={task.user_email} />
      ))}
    </div>
    </div>
  );
}
