import React from "react";
import NavBar from "../components/NavBar";

const HomePage = () => {
    return (
        <div>
            <NavBar/>
            <div className="homepage-container">
                <h2>Bienvenue sur le site</h2>
            </div>
        </div>
    );
}

export default HomePage;