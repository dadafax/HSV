const express = require('express');
const router = express.Router();
const Booking = require('./models/Booking');

// Route pour créer une réservation
router.post('/', async (req, res) => {
  try {
    const { patientId, medecinId, date, heure } = req.body;

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

module.exports = router;