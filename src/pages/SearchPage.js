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
            <NavBar/>
        <div className="search-container">
            <input
                type="search"
                id="site-search"
                name="q"
                className="search-input"
                placeholder="Search the site..."
            />
            <button type="button" className="search-button">Search</button>
        </div>


        </div>
    );
};

export default SearchPage;