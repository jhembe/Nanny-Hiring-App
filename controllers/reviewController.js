const Review = require('../models/Review');
const asyncHandler = require('express-async-handler');

// Create Review
exports.createReview = asyncHandler(async (req, res) => {
  const { nannyId, employerId, rating, comment } = req.body;

  const review = new Review({
    userId: req.user._id,
    nannyId,
    employerId,
    rating,
    comment
  });

  await review.save();
  res.status(201).json(review);
});

// Get Reviews by Nanny ID
exports.getReviewsByNannyId = asyncHandler(async (req, res) => {
  const reviews = await Review.find({ nannyId: req.params.nannyId });

  if (!reviews) {
    res.status(404);
    throw new Error('Reviews not found');
  }

  res.status(200).json(reviews);
});

// Get Reviews by Employer ID
exports.getReviewsByEmployerId = asyncHandler(async (req, res) => {
  const reviews = await Review.find({ employerId: req.params.employerId });

  if (!reviews) {
    res.status(404);
    throw new Error('Reviews not found');
  }

  res.status(200).json(reviews);
});

// Update Review
exports.updateReview = asyncHandler(async (req, res) => {
  const { rating, comment } = req.body;

  const review = await Review.findById(req.params.id);

  if (!review) {
    res.status(404);
    throw new Error('Review not found');
  }

  if (review.userId.toString() !== req.user._id.toString()) {
    res.status(401);
    throw new Error('Not authorized');
  }

  review.rating = rating || review.rating;
  review.comment = comment || review.comment;

  await review.save();
  res.status(200).json(review);
});

// Delete Review
exports.deleteReview = asyncHandler(async (req, res) => {
  const review = await Review.findById(req.params.id);

  if (!review) {
    res.status(404);
    throw new Error('Review not found');
  }

  if (review.userId.toString() !== req.user._id.toString()) {
    res.status(401);
    throw new Error('Not authorized');
  }

  await review.remove();
  res.status(200).json({ message: 'Review removed' });
});
