import React from "react";
import { Form } from "react-router-dom";
import { Button } from "../components/Button";

const LoginPatient = () => {
    return (
        <form>
            <h1>Page de connexion du Patient</h1>
            <div className="group">
                <label htmlFor="login" ></label>
                <input type="text" name="login" placeholder="adresse mail"/>
            </div>
            <div clasName="group">
                <label htmlFor="password" ></label>
                <input type="text" name="password" placeholder="Mot de passe"/>
            </div>
            <div className="group">
                <Button/>
            </div>
        </form>
    )
}

export default LoginPatient