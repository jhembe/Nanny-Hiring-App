const express = require('express');
const {
  createNanny,
  getAllNannies,
  getNannyById,
  updateNanny,
  deleteNanny,
} = require('../controllers/nannyController');
const { protect } = require('../middlewares/authMiddleware');
const router = express.Router();

// Create Nanny
router.post('/', protect, createNanny);

// Get All Nannies
router.get('/', getAllNannies);

// Get Nanny by ID
router.get('/:id', getNannyById);

// Update Nanny
router.put('/:id', protect, updateNanny);

// Delete Nanny
router.delete('/:id', protect, deleteNanny);

module.exports = router;
