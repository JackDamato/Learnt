// src/components/SubmissionReviews.js

import React from 'react';
import { useLocation } from 'react-router-dom';

const SubmissionReviews = () => {
  const location = useLocation();
  const { formData } = location.state || {}; // Get the form data passed via navigate

  return (
    <div>
      <h1>Submission Review</h1>
      {formData ? (
        <div>
          <h2>Review Your Submission</h2>
          <p><strong>Subject/Class Name:</strong> {formData.subjectClassName}</p>
          <p><strong>Topic of Exam:</strong> {formData.topicOfExam}</p>
          <p><strong>Learning Goals:</strong> {formData.learningGoals}</p>
          <p><strong>Test Date:</strong> {formData.testDate}</p>
          <p><strong>Available Study Sessions:</strong> {formData.availableStudySessions}</p>
          <p><strong>Work Time Per Session:</strong> {formData.workTimePerSession}</p>
        </div>
      ) : (
        <p>No submission data available.</p>
      )}
    </div>
  );
};

export default SubmissionReviews;
