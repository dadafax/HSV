import React, { useState, useEffect } from "react";
import NavBar from "../components/NavBar";
import axios from "axios";
import { useNavigate } from "react-router-dom";

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
            <NavBar/>
            <div className="search-container">
                <input
                    type="search"
                    id="site-search"
                    name="q"
                    className="search-input"
                    placeholder="Rechercher un médecin..."
                    value={searchQuery}
                    onChange={e => setSearchQuery(e.target.value)}
                />
                <button type="button" className="search-button">Rechercher</button>
            </div>

            {loading && <div>Chargement...</div>}

            {medecins.length > 0 && (
                <ul className="search-suggestions" style={{marginTop: "20px", listStyle: "none", padding: 0}}>
                    {medecins.map(medecin => (
                        <li
                            key={medecin._id}
                            style={{padding: "8px 0", borderBottom: "1px solid #eee", cursor: "pointer"}}
                            onClick={() => navigate(`/medecin/${medecin._id}`)}
                        >
                            <strong>{medecin.nom} {medecin.prenom}</strong> — {medecin.specialite}
                        </li>
                    ))}
                </ul>
            )}
        </div>
    );
};

export default SearchPage;