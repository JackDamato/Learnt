import React from 'react';
import '../styles/ToDoList.css';

function ToDoList({ tasks, setTasks }) {
  const handleCheckboxChange = (id) => {
    const updatedTasks = tasks.map((task) =>
      task.id === id ? { ...task, completed: !task.completed } : task
    );
    updatedTasks.sort((a, b) => a.completed - b.completed);
    setTasks(updatedTasks);
  };

  return (
    <div className="todo-list">
      <h3>To-Do List</h3>
      <ul>
        {tasks.map((task) => (
          <li key={task.id} className={task.completed ? 'completed' : ''}>
            <label>
              <input
                type="checkbox"
                checked={task.completed}
                onChange={() => handleCheckboxChange(task.id)}
              />
              {task.text}
            </label>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default ToDoList;
