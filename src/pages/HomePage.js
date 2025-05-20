import React from "react";
import NavBar from "../NavBar";
import { Button } from "../components/Button";
import LoginPatient from "../Auth/LoginPatient";
import LoginMedecin from "../Auth/LoginMedecin";
import LoginPage from "../Auth/LoginPage";

const HomePage = () => {
    return (
        <div>
            {/*<Button page="../Auth/LoginMedecin" text="Medecin"></Button>
            <Button page="../Auth/LoginPatient" text="Patient"></Button>*/}
            <LoginPage/>
        </div>
    );
}

export default HomePage;