const express = require('express');
const {
  createEmployer,
  getAllEmployers,
  getEmployerById,
  updateEmployer,
  deleteEmployer,
} = require('../controllers/employerController');
const { protect } = require('../middlewares/authMiddleware');
const router = express.Router();

// Create Employer
router.post('/', protect, createEmployer);

// Get All Employers
router.get('/', getAllEmployers);

// Get Employer by ID
router.get('/:id', getEmployerById);

// Update Employer
router.put('/:id', protect, updateEmployer);

// Delete Employer
router.delete('/:id', protect, deleteEmployer);

module.exports = router;
