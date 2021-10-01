import React, { useState, useContext, useEffect } from 'react'
import { TaskListContext } from '../contexts/TaskListContext'

const TaskForm = () => {
  const { addTask, clearList, editTask, editItem } = useContext(TaskListContext)
  const [title, setTitle] = useState('')
  const [date, setDate] = useState('')
  const [time, setTime] = useState('')

  const handleSubmit = e => {
    e.preventDefault()
    if (!editItem) {
      addTask(title, date, time)
      setTitle('')
      setDate('')
      setTime('')
    } else {
      editTask(title, date, time, editItem.id)
    }
  }

  const handleTitleChange = e => {
    setTitle(e.target.value)
  }

  const handleDateChange = e => {
    setDate(e.target.value)
  }

  const handleTimeChange = e => {
    setTime(e.target.value)
  }

  useEffect(() => {
    if (editItem) {
      setTitle(editItem.title)
      setDate(editItem.date)
      setTime(editItem.time)
      console.log(editItem)
    } else {
      setTitle('')
      setDate('')
      setTime('')
    }
  }, [editItem])

  return (
    <form onSubmit={handleSubmit} className="form">
      <div className='imput-1'>
        <input
          type="text"
          placeholder="Add Task..."
          value={title}
          onChange={handleTitleChange}
          required
          className="title-input"
        />
      </div>
      <div className='imput-2'>
       <input
          type="text"
          placeholder="Add Date..."
          value={date}
          onChange={handleDateChange}
          required
          className="date-input"
        />
        <input
          type="text"
          placeholder="Add Time..."
          value={time}
          onChange={handleTimeChange}
          required
          className="time-input"
        />
      </div>
      <div className="buttons">
        <button type="submit" className="btn add-task-btn">
          {editItem ? 'Edit Task' : 'Add Task'}
        </button>
        <button className="btn clear-btn" onClick={clearList}>
          Clear
        </button>
      </div>
    </form>
  )
}

export default TaskForm
