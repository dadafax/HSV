import React from "react";
import NavBar from "../NavBar";

const DashboardPage = () => {
    return (
        <div className="dashboard-container">
            <NavBar/>
            <h2>Bienvenue sur le site</h2>
            <div className="button-container">
                <button className="search-button">
                    Rechercher
                </button>
                <button className="appointment-button">
                    Prendre rendez-vous
                </button>
            </div>
        </div>
    );
}

export default DashboardPage;