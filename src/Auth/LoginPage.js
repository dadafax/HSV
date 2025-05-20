import React, { useState } from "react";
import axios from "axios";
import { Button } from "../components/Button";
import NavBar from "../NavBar";
import { useNavigate } from "react-router-dom"; // 👈 Ajout

const LoginPage = () => {
    const [formData, setFormData] = useState({
        nom: '',
        prenom: '',
        email: '',
        role: 'patient'
    });

    const [message, setMessage] = useState('');
    const navigate = useNavigate(); // 👈 Initialisation

    const handleChange = (e) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value
        });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await axios.post('http://localhost:5000/api/auth/inscription', formData);
            setMessage('Inscription réussie !');
            console.log('Inscription réussie:', response.data);

            // Réinitialiser le formulaire
            setFormData({
                nom: '',
                prenom: '',
                email: '',
                role: 'patient'
            });

            // ✅ Redirection vers Dashboard
            navigate('/DashboardPage');
        } catch (error) {
            setMessage(error.response?.data?.message || 'Erreur lors de l\'inscription');
            console.error('Erreur:', error);
        }
    };

    return (
        <div className="login-container">
            <form onSubmit={handleSubmit}>
                <h1>Page d'inscription</h1>
                {message && <div className="message">{message}</div>}

                <div className="group">
                    <label htmlFor="nom">Nom</label>
                    <input
                        type="text"
                        name="nom"
                        value={formData.nom}
                        onChange={handleChange}
                        placeholder="Votre nom"
                        required
                    />
                </div>

                <div className="group">
                    <label htmlFor="prenom">Prénom</label>
                    <input
                        type="text"
                        name="prenom"
                        value={formData.prenom}
                        onChange={handleChange}
                        placeholder="Votre prénom"
                        required
                    />
                </div>

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
                    <label htmlFor="role">Type de compte</label>
                    <select
                        name="role"
                        value={formData.role}
                        onChange={handleChange}
                        required
                    >
                        <option value="patient">Patient</option>
                        <option value="medecin">Médecin</option>
                    </select>
                </div>

                <div className="group">
                    <Button type="submit" text="S'inscrire" />
                </div>
            </form>
        </div>
    );
};

export default LoginPage;
