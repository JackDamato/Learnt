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

  const handleSubmit = async (e) => {
    e.preventDefault();
    const formData = {
      subject: subjectClassName,
      topics: topicOfExam,
      learning_goals: learningGoals,
      date: testDate,
      number: availableStudySessions,
      length: workTimePerSession,
    };

    try {
      const response = await fetch('/', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      if (response.ok) {
        const data = await response.json();
        console.log('Study Guide:', data.Content);
        // Navigate to the review page, passing the data to it
        navigate('/submission-review', {
          state: {
            formData,
            studyGuide: data.Content,
            studyPlanner: data["Study Guide"], // Assuming this is the key for the study planner
          },
        });
      } else {
        console.error('Failed to create study guide');
      }
    } catch (error) {
      console.error('Error:', error);
    }
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
