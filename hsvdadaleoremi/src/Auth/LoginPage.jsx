
import React, { useState } from "react";
import axios from "axios";
import { Button } from "../components/Button";
import NavBar from "../components/NavBar";
import { useNavigate } from "react-router-dom";
const DB_PORT = import.meta.env.VITE_DB_PORT;

const LoginPage = () => {
    const [formData, setFormData] = useState({
        email: '',
        motDePasse: ''
    });

    const [message, setMessage] = useState('');
    const navigate = useNavigate();

    const handleChange = (e) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value
        });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await axios.post(`http://localhost:${DB_PORT}/api/auth/connexion`, formData);
            setMessage('Connexion réussie !');
            console.log('Connexion réussie:', response.data);

            // Réinitialiser le formulaire
            setFormData({
                email: '',
                motDePasse: ''
            });

            // Redirection vers HomePage
            navigate('/HomePage');
        } catch (error) {
            setMessage(error.response?.data?.message || 'Erreur lors de la connexion');
            console.log(PORT);
            console.error('Erreur:', error);
        }
    };

    return (
        <div className="login-container">
            <form onSubmit={handleSubmit}>
                <h1>Page de connexion</h1>
                {message && <div className="message">{message}</div>}

                <div className="group">
                    <label htmlFor="email">Email</label>
                    <input
                        type="email"
                        name="email"
                        value={formData.email}
                        onChange={handleChange}
                        placeholder="Votre email"
                        required
                    />
                </div>

                <div className="group">
                    <label htmlFor="motDePasse">Mot de passe</label>
                    <input
                        type="password"
                        name="motDePasse"
                        value={formData.motDePasse}
                        onChange={handleChange}
                        placeholder="Votre mot de passe"
                        required
                    />
                </div>

                <div className="group">
                    <Button type="submit" text="Se connecter" />
                </div>
            </form>
        </div>
    );
};

export default LoginPage;