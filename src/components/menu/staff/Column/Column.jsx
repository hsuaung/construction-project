import React from "react";
import { Task } from "../Task/Task";
import "./column.scss";
export default function Column({ tasks }) {
  return (
    <div className="scrollable">
      <div className="staffListData">
        {tasks.map((task) => (
          <Task
            key={task.key}
            id={task.id}
            image={task.image}
            name={task.user_name}
            email={task.user_email}
            team={task.team}
            staffType={task.staffType}
            status={task.status}
          />
        ))}
      </div>
      {/* <SortableContext items={tasks} strategy={verticalListSortingStrategy}>
            {tasks.map((task) => (
                <Task id={task.id} image={task.image} name={task.name} email={task.email} team={task.team} staffType={task.staffType} status={task.status}/>
            ))}
        </SortableContext> */}
    </div>
  );
}
