import React, { useState, useEffect } from "react";
import NavBar from "../NavBar";
import axios from "axios";

const specialites = [
    "Cardiologue",
    "Pneumologue",
    "Neurologue",
    "Dermatologue",
    "Rhumatologue",
    "Néphrologue"
];

const colors = ["lightblue", "lightgreen", "lightyellow", "lightcoral", "Plum", "Magenta", "GreenYellow"];

const SearchPage = () => {
    const [searchQuery, setSearchQuery] = useState("");
    const [specialite, setSpecialite] = useState("");
    const [medecins, setMedecins] = useState([]);
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        const searchMedecins = async () => {
            if (searchQuery.length < 2 && !specialite) {
                setMedecins([]);
                return;
            }
            setLoading(true);
            try {
                const response = await axios.get(`/api/medecins/recherche`, {
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
        <div>
            <NavBar />

            <div className="search-container">
                <input
                    type="search"
                    id="site-search"
                    name="q"
                    className="search-input"
                    placeholder="Rechercher un médecin..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                />
                <select
                    className="specialite-select"
                    value={specialite}
                    onChange={(e) => setSpecialite(e.target.value)}
                >
                    <option value="">Toutes les spécialités</option>
                    {specialites.map((spec, idx) => (
                        <option key={idx} value={spec}>{spec}</option>
                    ))}
                </select>
            </div>

            <div className="medecins-list">
                {loading ? (
                    <p className="loading">Chargement en cours...</p>
                ) : medecins.length === 0 ? (
                    <p>Aucun médecin trouvé.</p>
                ) : (
                    <div className="medecins-grid">
                        {medecins.map((medecin, index) => {
                            const backgroundColor = colors[index % colors.length];
                            return (
                                <div
                                    key={medecin.id || index}
                                    className="medecin-card"
                                    style={{ backgroundColor }}
                                >
                                    <h3>{medecin.nom}</h3>
                                    <p>Spécialité : {medecin.specialite}</p>
                                    <p>Ville : {medecin.ville}</p>
                                </div>
                            );
                        })}
                    </div>
                )}
            </div>
        </div>
    );
};

export default SearchPage;
