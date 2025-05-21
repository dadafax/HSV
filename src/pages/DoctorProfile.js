import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import NavBar from "../NavBar";

const DoctorProfile = () => {
    const { id } = useParams();
    const [medecin, setMedecin] = useState(null);
    const [error, setError] = useState("");
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchMedecin = async () => {
            try {
                const res = await axios.get(`http://localhost:5000/api/medecins/${id}`);
                setMedecin(res.data);
            } catch (err) {
                setError("Médecin non trouvé.");
            } finally {
                setLoading(false);
            }
        };
        fetchMedecin();
    }, [id]);

    if (loading) return <div style={{textAlign: 'center', marginTop: '40px'}}>Chargement...</div>;
    if (error) return <div style={{color: 'red', textAlign: 'center', marginTop: '40px'}}>{error}</div>;
    if (!medecin) return null;

    return (

        <div>
            <NavBar/>    
            <div className="login-container">  
                <h1>Profil du Médecin</h1>     
                <div className="group"><b>Nom :</b> {medecin.nom}</div>
                <div className="group"><b>Prénom :</b> {medecin.prenom}</div>
                <div className="group"><b>Email :</b> {medecin.email}</div>
                <div className="group"><b>Rôle :</b> {medecin.role}</div>
                <div className="group"><b>Date de création :</b> {new Date(medecin.dateCreation).toLocaleString()}</div>
            </div> 
        </div>
    );
};

export default DoctorProfile; 