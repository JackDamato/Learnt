import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom'; 
import '../styles/Dashboard.css';
import { jsPDF } from 'jspdf';

function Dashboard() {
  const navigate = useNavigate(); 
  const [studyGuides, setStudyGuides] = useState([]);

  useEffect(() => {
    // Load study guides from localStorage
    const savedStudyGuides = JSON.parse(localStorage.getItem('studyGuides')) || [];
    setStudyGuides(savedStudyGuides);
  }, []);

  const handleAddSubjectClick = () => {
    navigate('/form'); 
  };

  const downloadPDF = (guide) => {
    const { studyGuide, studyPlanner, subject } = guide;
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
    doc.text(`Study Plan:`, margin, titleYPosition);

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

    doc.save(`${subject} Study Guide.pdf`);
  };

  return (
    <div className="dashboard">
      <div className="previous-study-guides">
        <h2>Previous Study Guides</h2>
          {studyGuides.length > 0 ? (
            [...studyGuides].reverse().map((guide, index) => (
              <div key={index} className="study-guide-item">
                <p><strong>Subject:</strong> {guide.subject}</p>
                <p><strong>Date Created:</strong> {guide.date}</p>
                <button className="download-button" onClick={() => downloadPDF(guide)}>Download PDF</button>
              </div>
            ))
          ) : (
            <p>No study guides available. Create a new one!</p>
          )}
      </div>
      <div className="subject-section">
        <div className="button-wrapper">
          <button className="add-subject-button" onClick={handleAddSubjectClick}>
            Create New Study Guide
          </button>
        </div>
      </div>
    </div>
  );
}

export default Dashboard;
