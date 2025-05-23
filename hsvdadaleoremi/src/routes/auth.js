const express = require('express');
const router = express.Router();
const User = require('../models/User');

// Route d'inscription
router.post('/inscription', async (req, res) => {
  try {
    const { nom, prenom, email, motDePasse, role, specialite } = req.body;

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
      motDePasse,
      role,
      ...(role === 'medecin' && { specialite })
    });

    // Sauvegarder l'utilisateur
    await nouvelUtilisateur.save();

    res.status(201).json({ 
      message: 'Inscription réussie',
      utilisateur: {
        id: nouvelUtilisateur._id,
        nom: nouvelUtilisateur.nom,
        prenom: nouvelUtilisateur.prenom,
        email: nouvelUtilisateur.email,
        role: nouvelUtilisateur.role,
        specialite: nouvelUtilisateur.specialite
      }
    });
  } catch (error) {
    console.error('Erreur lors de l\'inscription:', error);
    res.status(500).json({ message: 'Erreur lors de l\'inscription' });
  }
});

// Route de connexion
router.post('/connexion', async (req, res) => {
  try {
    const { email, motDePasse } = req.body;

    // Vérifier si l'utilisateur existe
    const utilisateur = await User.findOne({ email });
    if (!utilisateur) {
      return res.status(400).json({ message: 'Email ou mot de passe incorrect' });
    }

    // Vérifier le mot de passe
    if (motDePasse !== utilisateur.motDePasse) {
      return res.status(400).json({ message: 'Email ou mot de passe incorrect' });
    }

    res.json({
      message: 'Connexion réussie',
      utilisateur: {
        id: utilisateur._id,
        nom: utilisateur.nom,
        prenom: utilisateur.prenom,
        email: utilisateur.email,
        role: utilisateur.role
      }
    });
  } catch (error) {
    console.error('Erreur lors de la connexion:', error);
    res.status(500).json({ message: 'Erreur lors de la connexion' });
  }
});


module.exports = router; 