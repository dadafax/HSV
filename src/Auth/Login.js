import React from "react";
import { Form } from "react-router-dom";
import { Button } from "../components/Button";

const Login = () => {
    return (
        <form>
            <div className="group">
                <label htmlFor="login">Identifiant</label>
                <input type="text" name="login"/>
            </div>
            <div clasName="group">
                <label htmlFor="password">Mot de passe</label>
                <input type="text" name="password"/>
            </div>
            <div className="group">
                <Button/>
            </div>
        </form>
    )
}

export default Login