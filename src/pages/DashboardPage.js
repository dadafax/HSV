import React from "react";
import NavBar from "../NavBar";
import { DEFAULT_STATS } from "webpack-dev-server";

const DashboardPage = () => {
    return (
        <div>
            <NavBar/>
            <h2>Bienvenue sur le site</h2>
        </div>
    );
}

export default DashboardPage;