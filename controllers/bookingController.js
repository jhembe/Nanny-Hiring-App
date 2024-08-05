const Booking = require('../models/Booking');
const asyncHandler = require('express-async-handler');

// Create Booking
exports.createBooking = async (req, res) => {
  const { employerId, nannyId, date, time } = req.body;

  try {
    const booking = new Booking({
      employerId: req.user._id,
      nannyId,
      date,
      time,
    });

    await booking.save();
    res.status(201).json(booking);
  } catch (error) {
    res.status(500).json({ message: 'Server error' });
  }
};

// Get All Bookings
exports.getAllBookings = asyncHandler(async (req, res) => {
  try {
    const bookings = await Booking.find().populate('employerId nannyId');
    res.status(200).json(bookings);
  } catch (error) {
    res.status(500).json({ message: 'Server error' });
  }
});

// Get Booking by ID
exports.getBookingById = asyncHandler(async (req, res) => {
  try {
    const booking = await Booking.findById(req.params.id).populate('employerId nannyId');

    if (!booking) {
      return res.status(404).json({ message: 'Booking not found' });
    }

    res.status(200).json(booking);
  } catch (error) {
    res.status(500).json({ message: 'Server error' });
  }
});

// Update Booking
exports.updateBooking = asyncHandler(async (req, res) => {
  const { date, time, status } = req.body;

  try {
    const booking = await Booking.findById(req.params.id);

    if (!booking) {
      return res.status(404).json({ message: 'Booking not found' });
    }

    if (booking.employerId.toString() !== req.user._id.toString() && booking.nannyId.toString() !== req.user._id.toString()) {
      return res.status(401).json({ message: 'Not authorized' });
    }

    booking.date = date || booking.date;
    booking.time = time || booking.time;
    booking.status = status || booking.status;

    await booking.save();
    res.status(200).json(booking);
  } catch (error) {
    res.status(500).json({ message: 'Server error' });
  }
});

// Delete Booking
exports.deleteBooking = asyncHandler(async (req, res) => {
  try {
    const booking = await Booking.findById(req.params.id);

    if (!booking) {
      return res.status(404).json({ message: 'Booking not found' });
    }

    if (booking.employerId.toString() !== req.user._id.toString() && booking.nannyId.toString() !== req.user._id.toString()) {
      return res.status(401).json({ message: 'Not authorized' });
    }

    await booking.remove();
    res.status(200).json({ message: 'Booking removed' });
  } catch (error) {
    res.status(500).json({ message: 'Server error' });
  }
});
