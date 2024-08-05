const Nanny = require('../models/Nanny');
const asyncHandler = require('express-async-handler');

// Create Nanny
exports.createNanny = asyncHandler(async (req, res) => {
  const { name, age, experience, skills, location, availability, photo } = req.body;

  try {
    const nanny = new Nanny({
      userId: req.user._id,
      name,
      age,
      experience,
      skills,
      location,
      availability,
      photo,
    });

    await nanny.save();
    res.status(201).json(nanny);
  } catch (error) {
    res.status(500).json({ message: 'Server error' });
  }
});

// Get All Nannies
exports.getAllNannies = asyncHandler(async (req, res) => {
  try {
    const nannies = await Nanny.find().populate('reviews');
    res.status(200).json(nannies);
  } catch (error) {
    res.status(500).json({ message: 'Server error' });
  }
});

// Get Nanny by ID
exports.getNannyById = asyncHandler(async (req, res) => {
  try {
    const nanny = await Nanny.findById(req.params.id).populate('reviews');

    if (!nanny) {
      return res.status(404).json({ message: 'Nanny not found' });
    }

    res.status(200).json(nanny);
  } catch (error) {
    res.status(500).json({ message: 'Server error' });
  }
});

// Update Nanny
exports.updateNanny = asyncHandler(async (req, res) => {
  const { name, age, experience, skills, location, availability, photo } = req.body;

  try {
    const nanny = await Nanny.findById(req.params.id);

    if (!nanny) {
      return res.status(404).json({ message: 'Nanny not found' });
    }

    if (nanny.userId.toString() !== req.user._id.toString()) {
      return res.status(401).json({ message: 'Not authorized' });
    }

    nanny.name = name || nanny.name;
    nanny.age = age || nanny.age;
    nanny.experience = experience || nanny.experience;
    nanny.skills = skills || nanny.skills;
    nanny.location = location || nanny.location;
    nanny.availability = availability || nanny.availability;
    nanny.photo = photo || nanny.photo;

    await nanny.save();
    res.status(200).json(nanny);
  } catch (error) {
    res.status(500).json({ message: 'Server error' });
  }
});

// Delete Nanny
exports.deleteNanny = asyncHandler(async (req, res) => {
  try {
    const nanny = await Nanny.findById(req.params.id);

    if (!nanny) {
      return res.status(404).json({ message: 'Nanny not found' });
    }

    if (nanny.userId.toString() !== req.user._id.toString()) {
      return res.status(401).json({ message: 'Not authorized' });
    }

    await nanny.remove();
    res.status(200).json({ message: 'Nanny removed' });
  } catch (error) {
    res.status(500).json({ message: 'Server error' });
  }
});
