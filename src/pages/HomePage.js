import React from "react";
import NavBar from "../NavBar";
import { Button } from "../components/Button";
import Login from "../Auth/Login";


const HomePage = () => {
    return (
        <div>
            <NavBar/>
            <h2>Bienvenue</h2>
            <Login/>
        </div>
    );
}

export default HomePage;