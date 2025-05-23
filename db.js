const mongoose = require('mongoose');
const path = require('path');
require('dotenv').config({ path: path.join(__dirname, 'server', '.env') });

const connectDB = async () => {
  try {
    await mongoose.connect('mongodb+srv://Leo:1234@cluster0.rfsaemr.mongodb.net/', {
      useNewUrlParser: true,
      useUnifiedTopology: true
    });
    console.log('✅ MongoDB connecté');
  } catch (error) {
    console.error('❌ Erreur de connexion MongoDB :', error.message);
    process.exit(1);
  }
};

module.exports = connectDB;