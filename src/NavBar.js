import React from "react";
import { Link } from 'react-router-dom';

export const NavBar = () => {
    return (
        <nav>
            <ul>
                <li><Link to="/">Accueil</Link></li>
                <li><Link to="/book">Réserver</Link></li>
                <li><Link to="/dashboard">Tableau de bord</Link></li>
            </ul>
        </nav>
    );
}