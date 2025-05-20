const express = require('express');
const connectDB = require('./db');

const app = express();
const PORT = 5000;

connectDB();

app.use(express.json());

app.listen(PORT, () => {
  console.log(`🚀 Serveur lancé sur le port ${PORT}`);
});
