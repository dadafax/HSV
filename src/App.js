import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

import HomePage from './pages/HomePage';
import DashboardPage from './pages/DashboardPage';
import BookPage from './pages/BookPage';

function App() {
 return (
    <Router>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/book" element={<BookPage />} />
        <Route path="/dashboard" element={<DashboardPage />} />

      </Routes>
    </Router>
  );
}

export default App;