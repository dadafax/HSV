const express = require('express');
const cors = require('cors');
const connectDB = require('./db');
const authRoutes = require('./routes/auth');
const medecinRoutes = require('./routes/doctors');
const bookingRoutes = require('./routes/booking');

require("dotenv").config();
const app = express();

// Connexion à la base de données
connectDB();

// Middleware
app.use(cors());
app.use(express.json());

// Routes
app.use('/api/auth', authRoutes);
app.use('/api/medecins', medecinRoutes);
app.use('/api/bookings', bookingRoutes);

const PORT = 4200;
app.listen(PORT, () => {
  console.log(`🚀 Serveur est bien lancé sur le port ${PORT}`);
});

