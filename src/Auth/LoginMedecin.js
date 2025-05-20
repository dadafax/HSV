import React, { useState } from "react";
import axios from "axios";
import { Button } from "../components/Button";

const LoginMedecin = () => {
    return (
        <form>
            <h1>Page de connexion du Medecin</h1>
            <div className="group">
                <label htmlFor="login">Adresse mail</label>
                <input
                    type="text"
                    name="login"
                    value={login}
                    onChange={(e) => setLogin(e.target.value)}
                    placeholder="Adresse mail"
                />
            </div>
            <div className="group">
                <label htmlFor="password">Mot de passe</label>
                <input
                    type="password"
                    name="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    placeholder="Mot de passe"
                />
            </div>
            <div className="group">
                <Button type="submit" text="Se connecter" />
            </div>
        </form>
    );
};

export default LoginMedecin
