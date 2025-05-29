const express = require('express');
const router = express.Router();
const Booking = require('../models/Booking');

// Route pour créer une réservation
router.post('/', async (req, res) => {
  try {
    const { patientId, medecinId, date, heure } = req.body;

    // Vérifier si le créneau est déjà réservé
    const dejaPris = await Booking.findOne({ medecinId, date, heure });
    if (dejaPris) {
      return res.status(400).json({ message: 'Ce créneau est déjà réservé.' });
    }

    const nouvelleReservation = new Booking({ patientId, medecinId, date, heure });
    await nouvelleReservation.save();

    res.status(201).json({
      message: 'Rendez-vous réservé avec succès',
      booking: nouvelleReservation
    });
  } catch (error) {
    console.error('Erreur lors de la réservation :', error);
    res.status(500).json({ message: 'Erreur lors de la réservation' });
  }
});

// Route pour récupérer les rendez-vous d'un patient
router.get('/patient/:patientId', async (req, res) => {
  try {
    const bookings = await Booking.find({ patientId: req.params.patientId }).populate('medecinId', 'nom prenom specialite email');
    res.json(bookings);
  } catch (error) {
    console.error('Erreur lors de la récupération des rendez-vous patient :', error);
    res.status(500).json({ message: 'Erreur lors de la récupération des rendez-vous' });
  }
});

// Route pour récupérer les rendez-vous d'un médecin
router.get('/medecin/:medecinId', async (req, res) => {
  try {
    const bookings = await Booking.find({ medecinId: req.params.medecinId }).populate('patientId', 'nom prenom email');
    res.json(bookings);
  } catch (error) {
    console.error('Erreur lors de la récupération des rendez-vous médecin :', error);
    res.status(500).json({ message: 'Erreur lors de la récupération des rendez-vous' });
  }
});

// Route pour supprimer un rendez-vous
router.delete('/:id', async (req, res) => {
  try {
    await Booking.findByIdAndDelete(req.params.id);
    res.json({ message: 'Rendez-vous annulé avec succès' });
  } catch (error) {
    console.error('Erreur lors de l\'annulation du rendez-vous :', error);
    res.status(500).json({ message: 'Erreur lors de l\'annulation du rendez-vous' });
  }
});

module.exports = router;