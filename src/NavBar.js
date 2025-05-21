import React from "react";
import { Link } from 'react-router-dom';


const NavBar = () => {
    return (
        <nav>
            <ul>
                <li><Link to="/">Déconnexion</Link></li>
                <li><Link to="/book">Réserver</Link></li>
                <li><Link to="/search">Rechercher</Link></li>
                <li><Link to="/DashboardPage">Tableau de bord</Link></li>
            </ul>
        </nav>
    );
}

export default NavBar;