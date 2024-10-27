import { React, useEffect, useState } from 'react';
import { jsPDF } from 'jspdf';
import "../styles/SubmissionReviews.css";
import Loading from './Loading';

const SubmissionReviews = () => {
  const [studyGuide, setStudyGuide] = useState('');
  const [studyPlanner, setStudyPlanner] = useState('');
  const [subject, setSubject] = useState('');
  const [sessionNumber, setSessionNumber] = useState(1);
  const [practiceQuestions, setPracticeQuestions] = useState('');
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
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

  const generatePracticeQuestions = async () => {
    setLoading(true); 
    try {
      const response = await fetch('/questions', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ session_number: sessionNumber }), // Send session number
      });

      if (!response.ok) {
        throw new Error('Network response was not ok');
      }

      const data = await response.json();
      setPracticeQuestions(data); // Set the received questions
    } catch (error) {
      setError(error.message);
    } finally {
      setLoading(false);
    }
  };


  const saveToPDF = () => {
    const doc = new jsPDF();
    const margin = 10; 
    const pageWidth = doc.internal.pageSize.getWidth() - 2 * margin; 
    const titleYPosition = margin + 10;
    const bodyStartY = titleYPosition + 10;
    const lineSpacing = 6; 
  
    doc.setFontSize(18);
    doc.setFont("helvetica", "bold");
    doc.text(`Study Guide for ${subject}`, margin, titleYPosition);

    doc.setFontSize(12);
    doc.setFont("helvetica", "normal");
    
    const studyGuideLines = doc.splitTextToSize(studyGuide, pageWidth);
    let currentY = bodyStartY;
  
    studyGuideLines.forEach((line) => {
      if (currentY + lineSpacing > doc.internal.pageSize.height - margin) {
        doc.addPage();
        currentY = margin;
      }
      doc.text(line, margin, currentY);
      currentY += lineSpacing;
    });
  
    doc.addPage();
    doc.setFontSize(18);
    doc.setFont("helvetica", "bold");
    doc.text(`Study Plan:`, margin, titleYPosition);
  
    doc.setFontSize(12);
    doc.setFont("helvetica", "normal");
    
    const studyPlannerLines = doc.splitTextToSize(studyPlanner, pageWidth);
    currentY = bodyStartY;
  
    studyPlannerLines.forEach((line) => {
      if (currentY + lineSpacing > doc.internal.pageSize.height - margin) {
        doc.addPage();
        currentY = margin;
      }
      doc.text(line, margin, currentY);
      currentY += lineSpacing; 
    });


    doc.addPage();
    doc.setFontSize(18);
    doc.setFont("helvetica", "bold");
    doc.text(`Practice Questions for Session ${sessionNumber}:`, margin, titleYPosition);
  
    doc.setFontSize(12);
    doc.setFont("helvetica", "normal");
    
    const questionLines = doc.splitTextToSize(practiceQuestions, pageWidth);
    currentY = bodyStartY;
  
    questionLines.forEach((line) => {
      if (currentY + lineSpacing > doc.internal.pageSize.height - margin) {
        doc.addPage();
        currentY = margin;
      }
      doc.text(line, margin, currentY);
      currentY += lineSpacing; 
    });
  
    doc.save(`${subject} Study Guide.pdf`);
  };
  

  if (error) {
    return <p>Error fetching data: {error}</p>;
  }

  return (
    <div>
      {loading && <Loading />}
      <div className="button-wrapper" style={{ display: 'flex', justifyContent: 'space-between'}}>
        <div className="pdf-button-wrapper">
          <button onClick={saveToPDF} className="study-guide-pdf-button">
            Save {subject} Study Guide
          </button>
        </div>
        <div className="questions-button-wrapper">
          <button onClick={generatePracticeQuestions} className="generate-questions-button">
            Generate Practice Questions for Session {sessionNumber}
          </button>
          <select value={sessionNumber} onChange={(e) => setSessionNumber(e.target.value)}>
            {Array.from({ length: 4 }, (_, i) => ( // Adjust the length based on actual session numbers
              <option key={i + 1} value={i + 1}>
                Session {i + 1}
              </option>
            ))}
          </select>
        </div>
      </div>
      
      {practiceQuestions && (
        <div className="practice-question-wrapper" style={{ background: '#f9f9f9', padding: '10px', marginBottom: '20px', border: '1px solid #ccc', borderRadius: '5px' }}>
          <h4>Practice Questions for Session {sessionNumber}</h4>
          <pre className='questions-text'>{practiceQuestions}</pre>
        </div>
      )}

      {studyGuide ? (
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
      ) : (
        <p>No submission data available. Please submit the form to generate study materials.</p>
      )}
    </div>
  );
};

export default SubmissionReviews;