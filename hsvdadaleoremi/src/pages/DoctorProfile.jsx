import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import NavBar from "../components/NavBar";
import Calendar from "react-calendar";
import 'react-calendar/dist/Calendar.css';

const DB_PORT = import.meta.env.VITE_DB_PORT;

const DoctorProfile = () => {
    const { id } = useParams();
    const [medecin, setMedecin] = useState(null);
    const [error, setError] = useState("");
    const [loading, setLoading] = useState(true);
    const [date, setDate] = useState(new Date());
    const [selectedSlot, setSelectedSlot] = useState(null);
    const [success, setSuccess] = useState("");
    const [slots, setSlots] = useState([]);
    const [bookedSlots, setBookedSlots] = useState([]);

    useEffect(() => {
        const fetchMedecin = async () => {
            try {
                const res = await axios.get(`http://localhost:${DB_PORT}/api/medecins/${id}`);
                setMedecin(res.data);
            } catch (err) {
                setError("Médecin non trouvé.");
            } finally {
                setLoading(false);
            }
        };
        fetchMedecin();
    }, [id]);

    // Générer les créneaux horaires d'1h de 8h à 18h pour la date sélectionnée
    useEffect(() => {
        const startHour = 8;
        const endHour = 18;
        const slotsArr = [];
        for (let h = startHour; h < endHour; h++) {
            slotsArr.push({
                heure: `${h.toString().padStart(2, '0')}:00 - ${(h+1).toString().padStart(2, '0')}:00`,
                value: `${h}:00`
            });
        }
        setSlots(slotsArr);
        setSelectedSlot(null);
    }, [date]);

    // Récupérer les créneaux déjà réservés pour ce médecin et cette date
    useEffect(() => {
        const fetchBookedSlots = async () => {
            try {
                const res = await axios.get(`http://localhost:${DB_PORT}/api/bookings/medecin/${id}`);
                const dateStr = date.toISOString().split('T')[0];
                const booked = res.data.filter(b => b.date === dateStr).map(b => b.heure);
                setBookedSlots(booked);
            } catch (err) {
                setBookedSlots([]);
            }
        };
        fetchBookedSlots();
    }, [id, date]);

    const handleReserve = async () => {
        setSuccess("");
        try {
            const user = JSON.parse(localStorage.getItem('user'));
            if (!user || !user.id) {
                setSuccess("Erreur : utilisateur non connecté.");
                return;
            }
            const res = await axios.post(`http://localhost:${DB_PORT}/api/bookings`, {
                patientId: user.id,
                medecinId: medecin._id,
                date: date.toISOString().split('T')[0],
                heure: selectedSlot
            });
            setSuccess("Créneau réservé avec succès !");
        } catch (err) {
            setSuccess(err.response?.data?.message || "Erreur lors de la réservation du créneau.");
        }
    };

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
                <div className="group"><b>Spécialité :</b> {medecin.specialite}</div>
                <div className="group"><b>Date de création :</b> {new Date(medecin.dateCreation).toLocaleString()}</div>
                <hr style={{margin: '2rem 0'}}/>
                <h2>Réserver un créneau</h2>
                <div style={{display: 'flex', gap: '2rem', alignItems: 'flex-start', flexWrap: 'wrap'}}>
                    <div>
                        <Calendar onChange={setDate} value={date} minDate={new Date()} />
                    </div>
                    <div style={{minWidth: 220}}>
                        <h3>Créneaux disponibles pour le {date.toLocaleDateString()}</h3>
                        <ul style={{listStyle: 'none', padding: 0}}>
                            {slots.map(slot => {
                                const isBooked = bookedSlots.includes(slot.value);
                                return (
                                    <li key={slot.value} style={{marginBottom: 10}}>
                                        <button
                                            style={{
                                                padding: '8px 16px',
                                                borderRadius: 8,
                                                border: selectedSlot === slot.value ? '2px solid #3498db' : '1px solid #ccc',
                                                background: isBooked ? '#eee' : (selectedSlot === slot.value ? '#e8f1f9' : '#fff'),
                                                color: isBooked ? '#aaa' : '#222',
                                                cursor: isBooked ? 'not-allowed' : 'pointer',
                                                width: '100%',
                                                fontWeight: selectedSlot === slot.value ? 'bold' : 'normal',
                                                opacity: isBooked ? 0.6 : 1
                                            }}
                                            onClick={() => !isBooked && setSelectedSlot(slot.value)}
                                            disabled={isBooked}
                                        >
                                            <span>{slot.heure}</span>
                                            {isBooked && <span style={{marginLeft: 8, fontSize: '0.95em'}}>(Réservé)</span>}
                                        </button>
                                    </li>
                                );
                            })}
                        </ul>
                        <button
                            disabled={!selectedSlot}
                            style={{
                                background: '#3498db',
                                color: '#fff',
                                border: 'none',
                                borderRadius: 8,
                                padding: '10px 20px',
                                fontWeight: 'bold',
                                cursor: selectedSlot ? 'pointer' : 'not-allowed',
                                marginTop: 10
                            }}
                            onClick={handleReserve}
                        >
                            Réserver ce créneau
                        </button>
                        {success && <div style={{color: success.includes('succès') ? 'green' : 'red', marginTop: 10}}>{success}</div>}
                    </div>
                </div>
            </div> 
        </div>
    );
};

export default DoctorProfile; 