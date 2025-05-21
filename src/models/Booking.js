const mongoose = require('mongoose');

const bookingSchema = new mongoose.Schema({
  patientId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  medecinId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  date: {
    type: String,
    required: true
  },
  heure: {
    type: String,
    required: true
  }
});

module.exports = mongoose.model('Booking', bookingSchema);