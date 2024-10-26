import { React, useEffect, useState } from 'react';
import { jsPDF } from 'jspdf'; // Import jsPDF
import "../styles/SubmissionReviews.css";

const SubmissionReviews = () => {
  const [studyGuide, setStudyGuide] = useState('');
  const [studyPlanner, setStudyPlanner] = useState('');
  const [subject, setSubject] = useState('');
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch('/data'); // Make sure to replace with the correct URL if necessary
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        const data = await response.json();
        setStudyGuide(data.study_guide);
        setStudyPlanner(data.study_planner);
        setSubject(data.user_data.subject);
      } catch (error) {
        setError(error.message);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  const saveToPDF = () => {
    const doc = new jsPDF();

    doc.setFontSize(18);
    doc.text(`Study Guide for ${subject}`, 10, 10);
    doc.setFontSize(12);
    doc.text(`\nStudy Guide:\n${studyGuide}`, 10, 20);
    
    doc.addPage();
    doc.text(`Study Planner:\n${studyPlanner}`, 10, 10);

    doc.save(`${subject} Study Guide.pdf`);
  };

  if (loading) {
    return <p>Loading...</p>;
  }

  if (error) {
    return <p>Error fetching data: {error}</p>;
  }

  return (
    <div>
      {studyGuide ? (
        <>
        <div className='pdf-button-wrapper'>
          <button onClick={saveToPDF} className='study-guide-pdf-button'>
            Download {subject} Study Guide pdf
          </button>
        </div>
        <div className="submission-body">
          <div className="study-guide-wrapper">
            <h3>Study Guide for {subject}</h3>
            <pre>{studyGuide}</pre>
          </div>
          <div className="study-planner-wrapper">
            <h3>Study Planner</h3>
            <pre>{studyPlanner}</pre>
          </div>
        </div>

        </>
      ) : (
        <p>No submission data available. Please submit the form to generate study materials.</p>
      )}
    </div>
  );
};

export default SubmissionReviews;
