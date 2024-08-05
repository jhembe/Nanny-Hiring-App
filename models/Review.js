const mongoose = require('mongoose');

const ReviewSchema = new mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  nannyId: { type: mongoose.Schema.Types.ObjectId, ref: 'Nanny', required: false },
  employerId: { type: mongoose.Schema.Types.ObjectId, ref: 'Employer', required: false },
  rating: { type: Number, required: true, min: 1, max: 5 },
  comment: { type: String, required: true }
}, { timestamps: true });

const Review = mongoose.model('Review', ReviewSchema);

module.exports = Review;
