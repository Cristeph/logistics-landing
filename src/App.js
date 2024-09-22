import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import HomePage from 'pages/HomePage';
import TrackingPage from 'pages/TrackingPage';
import AuthPage from 'pages/AuthPage';

function App() {
  return (
    <Router>
      <Routes>
        {/* Home Page Route */}
        <Route path="/" element={<HomePage />} />
        {/* Tracking Page Route */}
        <Route path="/track/:trackingID" element={<TrackingPage />} />
        <Route path="/auth" element={<AuthPage />} />
      </Routes>
    </Router>
  );
}

export default App;
