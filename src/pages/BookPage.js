import React, { useState } from "react";
import NavBar from "../NavBar";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const BookPage = () => {
    const [specialite, setSpecialite] = useState("");
    const [medecins, setMedecins] = useState([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState("");
    const navigate = useNavigate();

    const handleChange = async (e) => {
        const value = e.target.value;
        setSpecialite(value);
        setMedecins([]);
        setError("");
        if (value) {
            setLoading(true);
            try {
                const res = await axios.get(`http://localhost:5000/api/medecins/recherche?specialite=${encodeURIComponent(value)}`);
                setMedecins(res.data);
            } catch (err) {
                setError("Erreur lors de la récupération des médecins.");
            } finally {
                setLoading(false);
            }
        }
    };

    const handleMedecinClick = (medecinId) => {
        navigate(`/medecin/${medecinId}`);
    };

    return (
        <div className="book-container">
            <NavBar/>
            <div className="book-content">
                <h1>Prendre rendez-vous</h1>
                <div className="specialite-selector">
                    <label htmlFor="specialite">Choisissez une spécialité :</label>
                    <select 
                        name="specialite" 
                        id="specialite" 
                        value={specialite} 
                        onChange={handleChange}
                        className="specialite-select"
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

                {loading && <div className="loading">Chargement des médecins...</div>}
                {error && <div className="error">{error}</div>}
                
                {medecins.length > 0 && (
                    <div className="medecins-list">
                        <h2>Médecins disponibles :</h2>
                        <div className="medecins-grid">
                            {medecins.map((medecin) => (
                                <div 
                                    key={medecin._id} 
                                    className="medecin-card"
                                    onClick={() => handleMedecinClick(medecin._id)}
                                >
                                    <h3>Dr. {medecin.nom} {medecin.prenom}</h3>
                                    <p>Spécialité : {medecin.specialite}</p>
                                    <p>Email : {medecin.email}</p>
                                </div>
                            ))}
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
};

export default BookPage;