import React, { useState } from "react";
import axios from "axios";
import { Button } from "../components/Button";

<<<<<<< Updated upstream:src/Auth/LoginMedecin.js
const LoginMedecin = () => {
    return (
        <form>
            <h1>Page de connexion du Medecin</h1>
=======
const Login = () => {
    const [login, setLogin] = useState("");
    const [password, setPassword] = useState("");

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await axios.post("http://localhost:5000/api/login", {
                login,
                password
            });
            console.log("✅ Connexion réussie :", response.data);
            // Tu peux stocker l'utilisateur ou un token ici
        } catch (error) {
            console.error("❌ Échec de la connexion :", error.response?.data || error.message);
            alert("Identifiants invalides.");
        }
    };

    return (
        <form onSubmit={handleSubmit}>
>>>>>>> Stashed changes:src/Auth/Login.js
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

<<<<<<< Updated upstream:src/Auth/LoginMedecin.js
export default LoginMedecin
=======
export default Login;
>>>>>>> Stashed changes:src/Auth/Login.js
