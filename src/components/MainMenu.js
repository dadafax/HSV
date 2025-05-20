import React from "react";
import { useNavigate } from "react-router-dom";
import "../App.css";
import LoginPage from "../Auth/LoginPage";

const MainMenu = () => {
    const navigate = useNavigate();

    return (
        <div>
            <LoginPage/>
        </div>
    );
};

export default MainMenu; 