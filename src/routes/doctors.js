const express = require('express');
const router = express.Router();
const User = require('../models/User');
const Medecin = require('../models/Medecin');

// Route de recherche de médecins par nom ou spécialité
router.get('/recherche', async (req, res) => {
  try {
    const { nom, specialite } = req.query;
    let query = { role: 'medecin' };

    if (nom) {
      query.$or = [
        { nom: { $regex: nom, $options: 'i' } },
        { prenom: { $regex: nom, $options: 'i' } }
      ];
    }

    if (specialite) {
      query.specialite = { $regex: specialite, $options: 'i' };
    }

    const medecins = await User.find(query).select('-motDePasse');
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

// Route de recherche de médecins
router.get('/search', async (req, res) => {
  try {
    const { query, specialite } = req.query;
    let searchQuery = { role: 'medecin' };

    if (query) {
      searchQuery.$or = [
        { nom: { $regex: query, $options: 'i' } },
        { prenom: { $regex: query, $options: 'i' } }
      ];
    }

    if (specialite) {
      searchQuery.specialite = { $regex: specialite, $options: 'i' };
    }

    const medecins = await User.find(searchQuery).limit(10).select('-motDePasse');
    res.json(medecins);
  } catch (error) {
    console.error('Erreur lors de la recherche :', error);
    res.status(500).json({ message: 'Erreur lors de la recherche' });
  }
});

module.exports = router; 