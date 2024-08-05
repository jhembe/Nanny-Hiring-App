const mongoose = require('mongoose');

const EmployerSchema = new mongoose.Schema({
    userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
    name: { type: String, required: true },
    phone: { type: String, required: true },
    location: {
        city: { type: String, required: true },
        state: { type: String, required: true },
        country: { type: String, required: true },
    },
    reviews: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Review' }],
    createdAt: { type: Date, default: Date.now },
    updatedAt: { type: Date, default: Date.now },
});

const Employer = mongoose.model('Employer', EmployerSchema);

module.exports = Employer;
