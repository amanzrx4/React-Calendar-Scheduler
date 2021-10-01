import React, { useContext } from 'react'
import { TaskListContext } from '../contexts/TaskListContext'

const Task = ({ task }) => {
  const { completeTask, removeTask, findItem } = useContext(TaskListContext)
  return (
    <li className="list-item">
      <span>{task.title} on {task.date} at {task.time}</span>
      <div>
        <button className="btn-complete task-btn" onClick={() => completeTask(task.id)}>
          <i className="fas fa-check-circle"></i>
        </button>{' '}
        <button className="btn-delete task-btn" onClick={() => removeTask(task.id)}>
          <i className="fas fa-trash-alt"></i>
        </button>{' '}
        <button className="btn-edit task-btn" onClick={() => findItem(task.id)}>
          <i className="fas fa-pen"></i>
        </button>
      </div>
    </li>
  )
}

export default Task
