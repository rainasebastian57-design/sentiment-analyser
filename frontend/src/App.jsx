import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Page1 from './pages/page1';
import Page2 from './pages/page2';
import './App.css';

/**
 * App Component
 * Handles the navigation logic for the Mood Analyzer.
 * The 'app-container' provides the consistent blue theme across all pages.
 */
function App() {
  return (
    <Router>
      <div className="app-container">
        <Routes>
          {/* Landing / Opening Page */}
          <Route path="/" element={<Page1 />} />
          
          {/* Main Analysis Page */}
          <Route path="/analyze" element={<Page2 />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
