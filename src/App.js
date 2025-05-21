import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import MainMenu from "./components/MainMenu";
import LoginPage from "./Auth/LoginPage";
import RegisterPage from "./Auth/RegisterPage";
import DashboardPage from './pages/DashboardPage';
import MedecinProfile from './pages/MedecinProfile';
import BookPage from './pages/BookPage';
import './App.css';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<MainMenu />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/register" element={<RegisterPage />} />
        <Route path="/DashboardPage" element={<DashboardPage />} />
        <Route path="/book" element={<BookPage />} />
        <Route path="/medecin/:id" element={<MedecinProfile />} />
      </Routes>
    </Router>
  );
}

export default App;