const express = require('express');
const router = express.Router();
const User = require('../models/User');

// Route d'inscription
router.post('/inscription', async (req, res) => {
  try {
    const { nom, prenom, email, role } = req.body;

    // Vérifier si l'utilisateur existe déjà
    const utilisateurExistant = await User.findOne({ email });
    if (utilisateurExistant) {
      return res.status(400).json({ message: 'Cet email est déjà utilisé' });
    }

    // Créer un nouvel utilisateur
    const nouvelUtilisateur = new User({
      nom,
      prenom,
      email,
      role
    });

    // Sauvegarder l'utilisateur
    await nouvelUtilisateur.save();

    res.status(201).json({ 
      message: 'Inscription réussie',
      utilisateur: nouvelUtilisateur 
    });
  } catch (error) {
    console.error('Erreur lors de l\'inscription:', error);
    res.status(500).json({ message: 'Erreur lors de l\'inscription' });
  }
});

module.exports = router; 