import React, { useContext } from "react";
import { TaskListContext } from "../contexts/TaskListContext";
import Task from "./Task";

const TaskList = () => {
  const { tasks } = useContext(TaskListContext);

  return (
    <div className = 'pending'>
      {tasks.length ? (
        <ul>
          {tasks.map(task => {
            return <Task task={task} key={task.id} />;
          })}
        </ul>
      ) : (
        <ul className="no-tasks-pending">No Tasks Pending</ul>
      )}
    </div>
  );
};

export default TaskList;
