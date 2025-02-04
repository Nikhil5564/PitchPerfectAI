import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { HomePage } from './pages/HomePage';
import { ProspectDashboard } from './pages/ProspectDashboard';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/prospect/:id" element={<ProspectDashboard />} />
      </Routes>
    </Router>
  );
}

export default App;