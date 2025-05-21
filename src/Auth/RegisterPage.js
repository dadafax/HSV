import React, { useState } from "react";
import axios from "axios";
import { Button } from "../components/Button";
import NavBar from "../NavBar";
import { useNavigate } from "react-router-dom";

const RegisterPage = () => {
    const [formData, setFormData] = useState({
        nom: '',
        prenom: '',
        email: '',
        motDePasse: '',
        role: 'patient',
        specialite: ''
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
            const dataToSend = { ...formData };
            if (formData.role !== 'medecin') {
                delete dataToSend.specialite;
            }
            const response = await axios.post('http://localhost:5000/api/auth/inscription', dataToSend);
            setMessage('Inscription réussie !');
            console.log('Inscription réussie:', response.data);

            // Réinitialiser le formulaire
            setFormData({
                nom: '',
                prenom: '',
                email: '',
                motDePasse: '',
                role: 'patient',
                specialite: ''
            });

            // Redirection vers la page de connexion
            navigate('/login');
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

                {formData.role === 'medecin' && (
                    <div className="group">
                        <label htmlFor="specialite">Spécialité</label>
                        <select
                            name="specialite"
                            value={formData.specialite}
                            onChange={handleChange}
                            required
                        >
                            <option value="">--Choisissez une spécialité--</option>
                            <option value="Cardiologue">Cardiologue</option>
                            <option value="Pneumologue">Pneumologue</option>
                            <option value="Neurologue">Neurologue</option>
                            <option value="Dermatologue">Dermatologue</option>
                            <option value="Rhumatologue">Rhumatologue</option>
                            <option value="Néphrologue">Néphrologue</option>
                        </select>
                    </div>
                )}

                <div className="group">
                    <button type="submit">S'inscrire</button>
                </div>
            </form>
        </div>
    );
};

export default RegisterPage; 