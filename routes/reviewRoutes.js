const express = require('express');
const {
  createReview,
  getReviewsByNannyId,
  getReviewsByEmployerId,
  updateReview,
  deleteReview
} = require('../controllers/reviewController');
const { protect } = require('../middlewares/authMiddleware');
const router = express.Router();

router.post('/', protect, createReview);
router.get('/nanny/:nannyId', getReviewsByNannyId);
router.get('/employer/:employerId', getReviewsByEmployerId);
router.put('/:id', protect, updateReview);
router.delete('/:id', protect, deleteReview);

module.exports = router;
