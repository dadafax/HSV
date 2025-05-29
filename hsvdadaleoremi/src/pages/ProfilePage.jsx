import React, { useEffect, useState } from "react";
import NavBar from "../components/NavBar";

const ProfilePage = () => {
    // Récupérer l'utilisateur connecté depuis le localStorage
    const [user, setUser] = useState(() => {
        const stored = localStorage.getItem('user');
        return stored ? JSON.parse(stored) : {};
    });
    // Initialiser la liste des rendez-vous à vide
    const [rendezvous, setRendezvous] = useState([]);

    // Ici, on pourrait faire un fetch des vraies données avec useEffect

    return (
        <div className="profile-page">
            <NavBar />
            <div className="profile-container">
                <h1>Mon Profil</h1>
                <div className="profile-info">
                    <p><b>Nom :</b> {user.nom}</p>
                    <p><b>Prénom :</b> {user.prenom}</p>
                    <p><b>Email :</b> {user.email}</p>
                    <p><b>Rôle :</b> {user.role}</p>
                </div>
                <div className="profile-rdv">
                    <h2>Prochains rendez-vous</h2>
                    {rendezvous.length === 0 ? (
                        <p>Aucun rendez-vous à venir.</p>
                    ) : (
                        <ul>
                            {rendezvous.map(rdv => (
                                <li key={rdv.id} className="rdv-item">
                                    <b>{rdv.date} à {rdv.heure}</b> avec {rdv.medecin} ({rdv.specialite})
                                </li>
                            ))}
                        </ul>
                    )}
                </div>
            </div>
        </div>
    );
};

export default ProfilePage; 