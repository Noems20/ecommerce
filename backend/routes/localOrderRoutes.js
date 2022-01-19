import express from 'express';

import {
  createLocalOrder,
  getAllLocalOrders,
  getLocalOrder,
  updateLocalOrder,
  deleteLocalOrder,
  setOrderUserIds,
  checkDate,
} from '../controllers/localOrderController.js';

import { protect, restrictTo } from '../controllers/authController.js';

const router = express.Router({ mergeParams: true });

router.use(protect);
router.use(restrictTo('admin'));
router
  .route('/')
  .get(getAllLocalOrders)
  .post(setOrderUserIds, checkDate, createLocalOrder);

router
  .route('/:id')
  .get(getLocalOrder)
  .patch(updateLocalOrder)
  .delete(deleteLocalOrder);

export default router;
