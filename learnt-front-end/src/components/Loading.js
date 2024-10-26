import React from 'react';
import '../styles/Loading.css';

const Loading = () => {
  return (
    <div className="loading-overlay">
      <img src={`${process.env.PUBLIC_URL}/logo.png`} alt="Loading..." className="spinner-image" />
      <p className="loading-text">Generating . . .</p>  
    </div>
  );
};

export default Loading;
