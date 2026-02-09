import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './page2.css';

const Page2 = () => {
  const navigate = useNavigate();
  const [text, setText] = useState("");
  const [result, setResult] = useState(null);
  const [loading, setLoading] = useState(false);

  const getVibeExtras = (emotion) => {
    const e = emotion.toLowerCase();
    if (e.includes('happy') || e.includes('joy')) return { emoji: "✨", color: "#FFD700", msg: "Main Character Energy!" };
    if (e.includes('angry') || e.includes('mad')) return { emoji: "🌋", color: "#FF4500", msg: "Spicy! Take a deep breath." };
    if (e.includes('sad')) return { emoji: "☁️", color: "#00E5FF", msg: "Big oof. Sending virtual cocoa." };
    return { emoji: "🤔", color: "#FF5F38", msg: "Interesting vibe you got there..." };
  };

  const analyzeSentiment = async () => {
    if (!text.trim()) return;
    setLoading(true);

    // This pulls the backend URL you will set in Render settings
    const BACKEND_URL = import.meta.env.VITE_API_URL || "http://127.0.0.1:5000";

    try {
      const response = await fetch(`${BACKEND_URL}/analyze`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ text }),
      });

      if (!response.ok) throw new Error("Server Error");

      const data = await response.json();
      const extras = getVibeExtras(data.emotion);
      setResult({ ...data, ...extras });
    } catch (error) {
      console.error("Connection error:", error);
      setResult({ emotion: "Error", msg: "Server is ghosting us!", emoji: "📵", color: "#FF0000" });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="page-wrapper">
      <button className="back-nav" onClick={() => navigate('/')}>← BACK</button>
      <div className="speech-bubble">
        <h1 className="title-text">SPILL THE TEA</h1>
        <p className="description">I'm locked in. Tell me your vibe...</p>
        <textarea 
          className="vibe-input" 
          placeholder="Today I feel like..."
          value={text}
          onChange={(e) => setText(e.target.value)}
        />
        {result && (
          <div className="result-container" style={{ borderColor: result.color }}>
            <span className="result-emoji">{result.emoji}</span>
            <div className="result-text">
              <div className="emotion-name">{result.emotion.toUpperCase()}</div>
              <div className="flavor-text">{result.msg}</div>
            </div>
          </div>
        )}
        <div className="bubble-tail"></div>
      </div>
      <div className="footer-actions">
        <button className="check-btn" onClick={analyzeSentiment} disabled={loading}>
          {loading ? "SCANNING..." : "CHECK MY VIBE"}
        </button>
        {text && <button className="clear-btn" onClick={() => {setText(""); setResult(null)}}>CLEAR</button>}
      </div>
    </div>
  );
};

export default Page2;