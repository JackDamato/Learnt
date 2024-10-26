import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import "../styles/Form.css";

function Form() {
  const [subjectClassName, setSubjectClassName] = useState('');
  const [topicOfExam, setTopicOfExam] = useState('');
  const [learningGoals, setLearningGoals] = useState('');
  const [testDate, setTestDate] = useState('');
  const [availableStudySessions, setAvailableStudySessions] = useState('');
  const [workTimePerSession, setWorkTimePerSession] = useState('');
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    const formData = {
      subjectClassName,
      topicOfExam,
      learningGoals,
      testDate,
      availableStudySessions,
      workTimePerSession,
    };
    
    // Navigate to the review page, passing formData as state
    navigate('/submission-review', { state: { formData } });
  };

  return (
    <form className="form" onSubmit={handleSubmit}>
      <input
        type="text"
        placeholder="Class Name"
        value={subjectClassName}
        onChange={(e) => setSubjectClassName(e.target.value)}
        required
      />
      <input
        type="text"
        placeholder="Topic of Exam"
        value={topicOfExam}
        onChange={(e) => setTopicOfExam(e.target.value)}
        required
      />
      <input
        type="text"
        placeholder="Learning Goals"
        value={learningGoals}
        onChange={(e) => setLearningGoals(e.target.value)}
        required
      />
      <input
        type="date"
        value={testDate}
        onChange={(e) => setTestDate(e.target.value)}
        required
        max="2099-12-31"
      />
      <input
        type="number"
        placeholder="Available Study Sessions"
        value={availableStudySessions}
        onChange={(e) => setAvailableStudySessions(e.target.value)}
        required
      />
      <input
        type="text"
        placeholder="Average Time Per Session (in Minutes)"
        value={workTimePerSession}
        onChange={(e) => setWorkTimePerSession(e.target.value)}
        required
      />
      <button type="submit" className="submit-button">Submit</button>
    </form>
  );
}

export default Form;