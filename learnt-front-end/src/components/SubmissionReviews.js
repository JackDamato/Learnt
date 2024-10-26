// src/components/SubmissionReviews.js

import React from 'react';
import { useLocation } from 'react-router-dom';

const SubmissionReviews = () => {
  const location = useLocation();
  const { formData, studyGuide, studyPlanner } = location.state || {}; // Get the form data passed via navigate

  return (
    <div>
      <h1>Submission Review</h1>
      {formData ? (
        <div>
          <h2>Review Your Submission</h2>
          <p><strong>Subject/Class Name:</strong> {formData.subject}</p>
          <p><strong>Topic of Exam:</strong> {formData.topics}</p>
          <p><strong>Learning Goals:</strong> {formData.learning_goals}</p>
          <p><strong>Test Date:</strong> {formData.date}</p>
          <p><strong>Available Study Sessions:</strong> {formData.number}</p>
          <p><strong>Work Time Per Session:</strong> {formData.length}</p>
          <h3>Generated Study Guide:</h3>
          <pre>{studyGuide}</pre>
          <h3>Generated Study Planner:</h3>
          <pre>{studyPlanner}</pre>
        </div>
      ) : (
        <p>No submission data available.</p>
      )}
    </div>
  );
};

export default SubmissionReviews;
