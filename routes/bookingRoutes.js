const express = require('express');
const {
  createBooking,
  getAllBookings,
  getBookingById,
  updateBooking,
  deleteBooking,
} = require('../controllers/bookingController');
const { protect } = require('../middlewares/authMiddleware');
const router = express.Router();

// Create Booking
router.post('/', protect, createBooking);

// Get All Bookings
router.get('/', getAllBookings);

// Get Booking by ID
router.get('/:id', getBookingById);

// Update Booking
router.put('/:id', protect, updateBooking);

// Delete Booking
router.delete('/:id', protect, deleteBooking);

module.exports = router;
