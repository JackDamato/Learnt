import React from 'react';
import { useLocation } from 'react-router-dom';
import "../styles/SubmissionReviews.css";

const SubmissionReviews = () => {
  const location = useLocation();
  const { formData, studyGuide, studyPlanner } = location.state || {}; // Get the form data passed via navigate

  return (
    <div>
      {formData ? (
        <div className="submission-body">
          <div className="study-guide-wrapper">
            <h3>Study Guide for {formData.subject}</h3>
            <pre>{studyGuide}</pre>
          </div>
          <div className="study-planner-wrapper">
            <h3>Study Planner</h3>
            <pre>{studyPlanner}</pre>
          </div>
        </div>
      ) : (
        <p>No submission data available. Please submit the form to generate study materials.</p>
      )}
    </div>
  );
};

export default SubmissionReviews;
