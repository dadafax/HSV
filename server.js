const express = require('express');
const cors = require('cors');
const connectDB = require('./db');
const authRoutes = require('./src/routes/auth');
const medecinRoutes = require('./src/routes/medecins');
const booking = require('./src/models/booking');

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

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`🚀 Serveur lancé sur le port ${PORT}`);
});
