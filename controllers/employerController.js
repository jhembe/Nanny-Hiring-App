const Employer = require('../models/Employer');
const asyncHandler = require('express-async-handler');

// Create Employer
exports.createEmployer = asyncHandler(async (req, res) => {
  const { name, phone, location, requirements } = req.body;

  try {
    const employer = new Employer({
      userId: req.user._id,
      name,
      phone,
      location,
      requirements
    });

    await employer.save();
    res.status(201).json(employer);
  } catch (error) {
    res.status(500).json({ message: 'Server error' });
  }
});

// Get All Employers
exports.getAllEmployers = asyncHandler(async (req, res) => {
  try {
    const employers = await Employer.find().populate('reviews');
    res.status(200).json(employers);
  } catch (error) {
    res.status(500).json({ message: 'Server error' });
  }
});

// Get Employer by ID
exports.getEmployerById = asyncHandler(async (req, res) => {
  try {
    const employer = await Employer.findById(req.params.id);

    if (!employer) {
      return res.status(404).json({ message: 'Employer not found' });
    }

    res.status(200).json(employer);
  } catch (error) {
    res.status(500).json({ message: 'Server error' });
  }
});

// Update Employer
exports.updateEmployer = asyncHandler(async (req, res) => {
  const { name, phone, location, requirements } = req.body;

  try {
    const employer = await Employer.findById(req.params.id);

    if (!employer) {
      return res.status(404).json({ message: 'Employer not found' });
    }

    if (employer.userId.toString() !== req.user._id.toString()) {
      return res.status(401).json({ message: 'Not authorized' });
    }

    employer.name = name || employer.name;
    employer.phone = phone || employer.phone;
    employer.location = location || employer.location;
    employer.requirements = requirements || employer.requirements;

    await employer.save();
    res.status(200).json(employer);
  } catch (error) {
    res.status(500).json({ message: 'Server error' });
  }
});

// Delete Employer
exports.deleteEmployer = asyncHandler(async (req, res) => {
  try {
    const employer = await Employer.findById(req.params.id);

    if (!employer) {
      return res.status(404).json({ message: 'Employer not found' });
    }

    if (employer.userId.toString() !== req.user._id.toString()) {
      return res.status(401).json({ message: 'Not authorized' });
    }

    await employer.remove();
    res.status(200).json({ message: 'Employer removed' });
  } catch (error) {
    res.status(500).json({ message: 'Server error' });
  }
});
