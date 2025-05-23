import React from "react";
import { useNavigate } from "react-router-dom";
import "../App.css";

const MainMenu = () => {
    const navigate = useNavigate();

    return (
        <div className="mainmenu-root">
            <div className="mainmenu-header-flex">
                <button 
                    className="mainmenu-btn mainmenu-btn-blue"
                    onClick={() => navigate('/login')}
                >
                    Se connecter
                </button>
                <div className="mainmenu-login-wrapper">
                    <button 
                        className="mainmenu-btn mainmenu-btn-grey"
                        onClick={() => navigate('/register')}
                    >
                        S'inscrire
                    </button>
                </div>
            </div>
        </div>
    );
};

export default MainMenu; 