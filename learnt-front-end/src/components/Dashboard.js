import React, { useState } from 'react';
import "../styles/Dashboard.css";

function Dashboard({ user }) {
  const [progress, setProgress] = useState(0);
  const [tasks, setTasks] = useState([
    { text: 'Task 1', completed: false },
    { text: 'Task 2', completed: false },
    { text: 'Task 3', completed: false },
  ]);

  const handleTaskCompletion = (index) => {
    const newTasks = tasks.map((task, i) => 
      i === index ? { ...task, completed: true } : task
    );
    setTasks(newTasks);
    setProgress((newTasks.filter(task => task.completed).length / tasks.length) * 100);
  };

  return (
    <div className="dashboard">
      <div className="dashboard-section progress">
        <h3>Study Plan Progress</h3>
        <div className="progress-circle">
          <span>{progress.toFixed(0)}%</span>
        </div>
      </div>
      <div className="dashboard-section todo">
        <h3>To-Do List</h3>
        <ul>
          {tasks.map((task, index) => (
            <li key={index} className={task.completed ? 'completed' : ''}>
              <input
                type="checkbox"
                checked={task.completed}
                onChange={() => handleTaskCompletion(index)}
                disabled={task.completed}
              />
              {task.text}
            </li>
          ))}
        </ul>
      </div>
      <div className="dashboard-section cards">
        <h3>Your Goals</h3>
        <div className="cards-container">
          <div className="card">
            <h4>Goal 1</h4>
            <p>2 out of 10 items completed</p>
          </div>
          <div className="card">
            <h4>Goal 2</h4>
            <p>5 out of 10 items completed</p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Dashboard;
