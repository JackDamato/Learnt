import React from 'react';
import '../styles/SubjectCards.css';

function SubjectCards() {
  const subjects = [
    { title: 'Math', completed: 4, total: 10 },
    { title: 'Physics', completed: 6, total: 10 },
    { title: 'Chemistry', completed: 3, total: 10 },
    { title: 'Biology', completed: 5, total: 10 },
    { title: 'History', completed: 7, total: 10 },
    { title: 'English', completed: 2, total: 10 },
  ];

  return (
    <div className="subject-cards">
      {subjects.map((subject, index) => (
        <div key={index} className="subject-card">
          <h4>{subject.title}</h4>
          <p>{subject.completed} out of {subject.total} items completed</p>
        </div>
      ))}
    </div>
  );
}

export default SubjectCards;
