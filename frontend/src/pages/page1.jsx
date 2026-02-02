import React from 'react';
import { useNavigate } from 'react-router-dom';
import './page1.css';

const Page1 = () => {
  const navigate = useNavigate();

  return (
    <div className="page-wrapper">
      <div className="speech-bubble">
        <h1 className="welcome-text">WELCOME TO <br/><span>VIBE CHECK!</span></h1>
        <p className="description">Tell me everything... or just what you had for lunch. I'm listening.</p>
        <div className="bubble-tail"></div>
      </div>

      <div className="btn-container">
        <div className="nope-badge">NOPE!</div>
        <button className="start-btn" onClick={() => navigate('/analyze')}>
          START ANALYZING
        </button>
      </div>
    </div>
  );
};

export default Page1;