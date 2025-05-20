import React from "react";
import { Form } from "react-router-dom";
import { Button } from "../components/Button";

const LoginPage = () => {
    return (
        <form>
            <h1>Page d'inscription</h1>
            <div className="group">
                <label htmlFor="login" ></label>
                <input type="text" name="login" placeholder="adresse mail"/>
            </div>
            <div clasName="group">
                <label htmlFor="password" ></label>
                <input type="text" name="password" placeholder="Mot de passe"/>
            </div>
            <div className="group">
                <Button page="../Auth/LoginPage" text="Inscription"></Button>
            </div>
        </form>
    )
}

export default LoginPage