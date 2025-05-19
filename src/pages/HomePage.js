import React from "react";
import NavBar from "../NavBar";
import { Button } from "../components/Button";
import LoginPatient from "../Auth/LoginPatient";
import LoginMedecin from "../Auth/LoginMedecin";

const HomePage = () => {
    return (
        <div>
            <NavBar/>
            <h2>Bienvenue</h2>
            <LoginPatient/>
            <LoginMedecin/>
            
        </div>
    );
}

export default HomePage;