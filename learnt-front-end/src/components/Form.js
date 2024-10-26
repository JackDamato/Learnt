import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import "../styles/Form.css";
import Loading from './Loading';

function Form() {
  const [subjectClassName, setSubjectClassName] = useState('');
  const [topicOfExam, setTopicOfExam] = useState('');
  const [learningGoals, setLearningGoals] = useState('');
  const [testDate, setTestDate] = useState('');
  const [availableStudySessions, setAvailableStudySessions] = useState('');
  const [workTimePerSession, setWorkTimePerSession] = useState('');
  const [loading, setLoading] = useState(false);

  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    const formData = {
      subject: subjectClassName,
      topics: topicOfExam,
      learning_goals: learningGoals,
      date: testDate,
      number: availableStudySessions,
      length: workTimePerSession,
    };
  
    try {
      const response = await fetch('/materials', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });
  
      if (response.ok) {
        const data = await response.json();
        const studyGuideContent = data["Study Guide"];
        const studyPlannerContent = data["Study Planner"];
  
        // Save the study guide information in localStorage
        const studyGuides = JSON.parse(localStorage.getItem('studyGuides')) || [];
        const newGuide = {
          subject: subjectClassName,
          date: new Date().toLocaleDateString(),
          studyGuide: studyGuideContent,
          studyPlanner: studyPlannerContent,
        };
        studyGuides.push(newGuide);
        localStorage.setItem('studyGuides', JSON.stringify(studyGuides));

        // Navigate to review page
        navigate('/submission-review', {
          state: {
            formData,
            studyGuide: studyGuideContent,
            studyPlanner: studyPlannerContent,
          },
        });
      } else {
        console.error('Failed to create study guide');
      }
    } catch (error) {
      console.error('Error:', error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div>
      {loading && <Loading />}
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
          placeholder="Exam Topics/Material"
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
          placeholder="Average Time Per Session (in Hours)"
          value={workTimePerSession}
          onChange={(e) => setWorkTimePerSession(e.target.value)}
          required
        />
        <button type="submit" className="submit-button">Submit</button>
      </form>
    </div>
  );
}

export default Form;
