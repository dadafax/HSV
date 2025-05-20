import React from "react";
import { useNavigate } from "react-router-dom";
import "../App.css";

const MainMenu = () => {
    const navigate = useNavigate();

    return (
        <div className="mainmenu-root">
            <div className="mainmenu-header-flex">
                <button className="mainmenu-btn mainmenu-btn-blue">Rechercher un établissement</button>
                <button className="mainmenu-btn mainmenu-btn-blue">Prendre RDV</button>
                <div className="mainmenu-login-wrapper">
                    <button className="mainmenu-btn mainmenu-btn-grey" onClick={() => navigate("/login")}>Login</button>
                </div>
            </div>
            <div className="mainmenu-content">
                <div className="mainmenu-block mainmenu-block-grey">
                    Tu mets un lieu random<br/>genre le dentiste en base<br/>de chez toi
                </div>
                <div className="mainmenu-block mainmenu-block-grey">
                    Tu mets un avis des gens
                </div>
            </div>
        </div>
    );
};

export default MainMenu; 