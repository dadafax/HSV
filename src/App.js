import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

const HomePage = () => <h2>Accueil</h2>;
const BookPage = () => <h2>Réserver</h2>;
const DashboardPage = () => <h2>Tableau de bord</h2>;

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