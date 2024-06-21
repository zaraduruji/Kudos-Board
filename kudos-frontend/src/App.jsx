import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import HomePage from './HomePage';
import BoardPage from './BoardPage'; // Ensure this is the correct path

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/boards/:id" element={<BoardPage />} />
      </Routes>
    </Router>
  );
}

export default App;
