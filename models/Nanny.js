const mongoose = require('mongoose');

const NannySchema = new mongoose.Schema({
    userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
    name: { type: String, required: true },
    photo: { type: String },
    age: { type: Number, required: true },
    experience: { type: Number, required: true },
    skills: [String],
    location: {
        city: { type: String, required: true },
        state: { type: String, required: true },
        country: { type: String, required: true },
    },
    availability: {
        start: { type: Date, required: true },
        end: { type: Date, required: true },
    },
    requirements: { type: String, required: true },
    ratings: { type: Number, default: 0 },
    reviews: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Review' }],
    createdAt: { type: Date, default: Date.now },
    updatedAt: { type: Date, default: Date.now },
});

const Nanny = mongoose.model('Nanny', NannySchema);

module.exports = Nanny;
