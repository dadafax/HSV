import React, { useEffect, useState } from "react";
import NavBar from "../components/NavBar";

const ProfilePage = () => {
    // Simuler les données utilisateur et rendez-vous
    const [user, setUser] = useState({
        nom: "Dupont",
        prenom: "Jean",
        email: "jean.dupont@email.com",
        role: "patient"
    });
    const [rendezvous, setRendezvous] = useState([
        { id: 1, medecin: "Dr. Dorian Dorian", specialite: "Cardiologue", date: "2024-06-20", heure: "10:00" },
        { id: 2, medecin: "Dr. Y Y", specialite: "Cardiologue", date: "2024-06-25", heure: "14:30" }
    ]);

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