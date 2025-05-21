const express = require('express');
const router = express.Router();
const User = require('../models/User');

// Route de recherche de médecins par nom
router.get('/recherche', async (req, res) => {
  try {
    const { nom } = req.query;
    if (!nom) {
      return res.status(400).json({ message: 'Le nom est requis' });
    }
    // Recherche insensible à la casse, partielle
    const medecins = await User.find({
      role: 'medecin',
      nom: { $regex: nom, $options: 'i' }
    }).select('-motDePasse'); // Ne pas retourner le mot de passe

    res.json(medecins);
  } catch (error) {
    console.error('Erreur lors de la recherche de médecins :', error);
    res.status(500).json({ message: 'Erreur lors de la recherche' });
  }
});

// Route pour obtenir le profil d'un médecin par ID
router.get('/:id', async (req, res) => {
  try {
    const medecin = await User.findOne({ _id: req.params.id, role: 'medecin' }).select('-motDePasse');
    if (!medecin) {
      return res.status(404).json({ message: 'Médecin non trouvé' });
    }
    res.json(medecin);
  } catch (error) {
    console.error('Erreur lors de la récupération du profil :', error);
    res.status(500).json({ message: 'Erreur lors de la récupération du profil' });
  }
});

module.exports = router; 