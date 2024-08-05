const mongoose = require('mongoose');

const BookingSchema = new mongoose.Schema({
  employerId: { type: mongoose.Schema.Types.ObjectId, ref: 'Employer', required: true },
  nannyId: { type: mongoose.Schema.Types.ObjectId, ref: 'Nanny', required: true },
  date: { type: Date, required: true },
  time: { type: String, required: true },
  status: { type: String, enum: ['pending', 'confirmed', 'completed', 'cancelled'], default: 'pending' },
  createdAt: { type: Date, default: Date.now },
  updatedAt: { type: Date, default: Date.now },
});

const Booking = mongoose.model('Booking', BookingSchema);

module.exports = Booking;
