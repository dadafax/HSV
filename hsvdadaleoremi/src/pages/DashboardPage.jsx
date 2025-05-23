import React from "react";
import { Link } from "react-router-dom";
import NavBar from "../components/NavBar";

const DashboardPage = () => {
  return (
    <div>
      <NavBar />

      <div className="dashboard-container">
        <h2>Tableau de Bord</h2>

        <div className="button-container">
          <Link to="/search" className="search-button">
            Rechercher un établissement
          </Link>
          <Link to="/book" className="appointment-button">
            Prendre RDV
          </Link>
        </div>

        <div className="mainmenu-content">
          <div className="mainmenu-block mainmenu-block-grey">
            Tu mets un lieu random<br />genre le dentiste en bas de chez toi
          </div>
          <div className="mainmenu-block mainmenu-block-grey">
            Tu mets un avis des gens
          </div>
        </div>
      </div>
    </div>
  );
};

export default DashboardPage;