const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
require("dotenv").config();

const app = express();
app.use(express.json());
app.use(cors());

// Modèle utilisateur
const User = mongoose.model("User", new mongoose.Schema({
    login: String,
    password: String,
}));

// Connexion MongoDB
mongoose.connect(process.env.MONGO_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
}).then(() => console.log("✅ Connecté à MongoDB"))
  .catch((err) => console.error("❌ MongoDB :", err));

// Route de login
app.post("/api/login", async (req, res) => {
    const { login, password } = req.body;
    const user = await User.findOne({ login, password });

    if (!user) {
        return res.status(401).json({ message: "Identifiants invalides" });
    }

    res.status(200).json({ message: "Connexion réussie", user });
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`🚀 Serveur sur le port ${PORT}`));
