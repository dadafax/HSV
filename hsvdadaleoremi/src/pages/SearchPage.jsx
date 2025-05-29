import React, { useState, useEffect } from "react";
import NavBar from "../components/NavBar";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const DB_PORT = import.meta.env.VITE_DB_PORT;

const specialites = [
    "Cardiologue",
    "Pneumologue",
    "Neurologue",
    "Dermatologue",
    "Rhumatologue",
    "Néphrologue"
];

const SearchPage = () => {
    const [searchQuery, setSearchQuery] = useState("");
    const [specialite, setSpecialite] = useState("");
    const [medecins, setMedecins] = useState([]);
    const [loading, setLoading] = useState(false);
    const navigate = useNavigate();

    useEffect(() => {
        const searchMedecins = async () => {
            if (searchQuery.length < 2 && !specialite) {
                setMedecins([]);
                return;
            }
            setLoading(true);
            try {
                const response = await axios.get(`http://localhost:${DB_PORT}/api/medecins/recherche`, {
                    params: {
                        nom: searchQuery,
                        specialite: specialite
                    }
                });
                setMedecins(response.data);
            } catch (error) {
                setMedecins([]);
                console.error("Erreur lors de la recherche:", error);
            }
            setLoading(false);
        };

        const timeoutId = setTimeout(searchMedecins, 300);
        return () => clearTimeout(timeoutId);
    }, [searchQuery, specialite]);

    return (
        <div className="search-page">
            <NavBar/>
            <div className="search-container">
                <div className="search-header">
                    <h1>Rechercher un Médecin</h1>
                </div>
                <div className="search-inputs">
                    <input
                        type="search"
                        id="site-search"
                        name="q"
                        className="search-input"
                        placeholder="Nom du médecin..."
                        value={searchQuery}
                        onChange={e => setSearchQuery(e.target.value)}
                    />
                    <select
                        className="search-select"
                        value={specialite}
                        onChange={e => setSpecialite(e.target.value)}
                    >
                        <option value="">Toutes les spécialités</option>
                        {specialites.map(spec => (
                            <option key={spec} value={spec}>{spec}</option>
                        ))}
                    </select>
                </div>

                {loading && (
                    <div className="loading-container">
                        <div className="loading-spinner"></div>
                        <p>Recherche en cours...</p>
                    </div>
                )}

                <div className="search-results-vertical">
                    {medecins.length > 0 && (
                        medecins.map(medecin => (
                            <div
                                key={medecin._id}
                                className="medecin-card"
                                onClick={() => navigate(`/medecin/${medecin._id}`)}
                            >
                                <div className="medecin-info">
                                    <h3>Dr. {medecin.nom} {medecin.prenom}</h3>
                                    <p className="specialite">{medecin.specialite}</p>
                                    <p className="email">{medecin.email}</p>
                                </div>
                                <div className="medecin-action">
                                    <span className="view-profile">Voir le profil →</span>
                                </div>
                            </div>
                        ))
                    )}

                    {!loading && searchQuery.length >= 2 && medecins.length === 0 && (
                        <div className="no-results">
                            <p>Aucun médecin trouvé pour votre recherche.</p>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
};

export default SearchPage;