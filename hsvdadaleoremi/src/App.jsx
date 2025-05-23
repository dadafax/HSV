import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import MainMenu from "./components/MainMenu";
import LoginPage from "./Auth/LoginPage";
import RegisterPage from "./Auth/RegisterPage";
import HomePage from './pages/HomePage';
import DoctorProfile from './pages/DoctorProfile';
import BookPage from './pages/BookPage';
import SearchPage from './pages/SearchPage';
import DashboardPage from "./pages/DashboardPage";
import './App.css';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<MainMenu />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/register" element={<RegisterPage />} />
        <Route path="/HomePage" element={<HomePage />} />
        <Route path="/book" element={<BookPage />} />
        <Route path="/medecin/:id" element={<DoctorProfile />} />
        <Route path="/SearchPage" element={<SearchPage/>} />
        <Route path="/DashboardPage" element={<DashboardPage />} />
      </Routes>
    </Router>
  );
}

export default App;