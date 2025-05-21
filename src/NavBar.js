import React from "react";
import { Link } from 'react-router-dom';
import DashboardPage from "./pages/DashboardPage";
import BookPage from "./pages/BookPage";

const NavBar = () => {
    return (
        <nav>
            <ul>
                <li><Link to="/">Déconnexion</Link></li>
                <li><Link to="./pages/BookPage">Réserver</Link></li>
                <li><Link to="/DashboardPage">Tableau de bord</Link></li>
            </ul>
        </nav>
    );
}

export default NavBar;