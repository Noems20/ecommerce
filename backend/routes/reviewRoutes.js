import express from 'express';

import {
  getAllReviews,
  getMyReview,
  createReview,
  deleteReview,
  updateReview,
  setProductUserIds,
  checkIfAuthor,
  getReview,
} from '../controllers/reviewsController.js';

import { protect, restrictTo } from '../controllers/authController.js';

const router = express.Router({ mergeParams: true });

router
  .route('/')
  .get(getAllReviews)
  .post(protect, restrictTo('user', 'admin'), setProductUserIds, createReview);

router.use(protect);
router.get('/MyReview/:id', getMyReview);

router
  .route('/:id')
  .get(getReview)
  .patch(restrictTo('user', 'admin'), checkIfAuthor, updateReview)
  .delete(restrictTo('user', 'admin'), checkIfAuthor, deleteReview);

export default router;
