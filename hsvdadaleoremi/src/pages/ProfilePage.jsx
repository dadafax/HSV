import React, { useEffect, useState } from "react";
import NavBar from "../components/NavBar";
import axios from "axios";

const DB_PORT = import.meta.env.VITE_DB_PORT;

const ProfilePage = () => {
    // Récupérer l'utilisateur connecté depuis le localStorage
    const [user, setUser] = useState(() => {
        const stored = localStorage.getItem('user');
        return stored ? JSON.parse(stored) : {};
    });
    // Initialiser la liste des rendez-vous à vide
    const [rendezvous, setRendezvous] = useState([]);
    const [loading, setLoading] = useState(true);
    const [cancelMsg, setCancelMsg] = useState("");

    useEffect(() => {
        const fetchRendezvous = async () => {
            if (!user.id) return;
            try {
                let res;
                if (user.role === 'medecin') {
                    res = await axios.get(`http://localhost:${DB_PORT}/api/bookings/medecin/${user.id}`);
                } else {
                    res = await axios.get(`http://localhost:${DB_PORT}/api/bookings/patient/${user.id}`);
                }
                setRendezvous(res.data);
            } catch (err) {
                setRendezvous([]);
            } finally {
                setLoading(false);
            }
        };
        fetchRendezvous();
    }, [user.id, user.role, cancelMsg]);

    const handleCancel = async (bookingId) => {
        setCancelMsg("");
        try {
            await axios.delete(`http://localhost:${DB_PORT}/api/bookings/${bookingId}`);
            setCancelMsg("Rendez-vous annulé.");
            setRendezvous(rendezvous.filter(rdv => rdv._id !== bookingId));
        } catch (err) {
            setCancelMsg("Erreur lors de l'annulation du rendez-vous.");
        }
    };

    return (
        <>
            <NavBar />
            <div className="profile-page">
                <div className="profile-container">
                    <h1>Mon Profil</h1>
                    <div className="profile-info">
                        <p><b>Nom :</b> {user.nom}</p>
                        <p><b>Prénom :</b> {user.prenom}</p>
                        <p><b>Email :</b> {user.email}</p>
                        <p><b>Rôle :</b> {user.role}</p>
                    </div>
                    <div className="profile-rdv">
                        <h2>{user.role === 'medecin' ? 'Rendez-vous de vos patients' : 'Prochains rendez-vous'}</h2>
                        {cancelMsg && <div style={{color: cancelMsg.includes('Erreur') ? 'red' : 'green', marginBottom: 10}}>{cancelMsg}</div>}
                        {loading ? (
                            <p>Chargement...</p>
                        ) : rendezvous.length === 0 ? (
                            <p>Aucun rendez-vous à venir.</p>
                        ) : (
                            <ul>
                                {rendezvous.map(rdv => (
                                    <li key={rdv._id} className="rdv-item" style={{display: 'flex', justifyContent: 'space-between', alignItems: 'center'}}>
                                        <span>
                                            <b>{rdv.date} à {rdv.heure}</b>
                                            {user.role === 'medecin' ? (
                                                <> avec {rdv.patientId?.nom} {rdv.patientId?.prenom}<br/>
                                                <span style={{fontSize: '0.95em', color: '#666'}}>{rdv.patientId?.email}</span></>
                                            ) : (
                                                <> avec Dr. {rdv.medecinId?.nom} {rdv.medecinId?.prenom} ({rdv.medecinId?.specialite})<br/>
                                                <span style={{fontSize: '0.95em', color: '#666'}}>{rdv.medecinId?.email}</span></>
                                            )}
                                        </span>
                                        <button
                                            style={{background: '#dc3545', color: '#fff', border: 'none', borderRadius: 8, padding: '8px 16px', cursor: 'pointer', marginLeft: 16}}
                                            onClick={() => handleCancel(rdv._id)}
                                        >
                                            Annuler
                                        </button>
                                    </li>
                                ))}
                            </ul>
                        )}
                    </div>
                </div>
            </div>
        </>
    );
};

export default ProfilePage; 