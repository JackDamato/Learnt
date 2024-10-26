import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom'; // Import useNavigate for navigation

import '../styles/Dashboard.css';
import ProgressWheel from './ProgressWheel';
import ToDoList from './ToDoList';
import SubjectCards from './SubjectCards';

function Dashboard() {
  const [tasks, setTasks] = useState([
    { id: 1, text: 'Study Chapter 1', completed: false },
    { id: 2, text: 'Complete Assignment 2', completed: false },
    { id: 3, text: 'Revise Notes', completed: false },
    { id: 4, text: 'Practice Problems', completed: false },
    { id: 5, text: 'Group Study Session', completed: false },
  ]);

  const navigate = useNavigate(); // Create a navigate function

  const handleTaskChange = (updatedTasks) => {
    setTasks(updatedTasks);
  };

  const handleAddSubjectClick = () => {
    navigate('/form'); // Navigate directly to the form page
  };


  const completedTasks = tasks.filter(task => task.completed).length;
  const totalTasks = tasks.length;
  const progressPercentage = (completedTasks / totalTasks) * 100;

  return (
    <div className="dashboard">
      <div className="progress-section">
        <ProgressWheel percentage={progressPercentage} />
      </div>
      <div className="todo-section">
        <ToDoList tasks={tasks} setTasks={handleTaskChange} />
      </div>
      <div className="subject-section">
        {/* Directly navigate to form on button click */}
        <button onClick={handleAddSubjectClick}>Add Subject</button>
        <SubjectCards />
      </div>
    </div>
  );
}

export default Dashboard;
