import express from 'express';

import {
  getCheckoutSession,
  getMyOrders,
  getOrders,
  createOrder,
  updateOrder,
  deleteOrder,
  checkIfAuthor,
  updateOrderAddress,
  cancelOrder,
} from '../controllers/orderController.js';

import { protect, restrictTo } from '../controllers/authController.js';

const router = express.Router();

router.use(protect);
router.post('/checkout-session', getCheckoutSession);
router.get('/my-orders/:status', getMyOrders);
router
  .route('/my-orders/:id')
  .patch(checkIfAuthor, updateOrderAddress)
  .delete(checkIfAuthor, cancelOrder);

router.use(restrictTo('admin'));
router.route('/').get(getOrders).post(createOrder);
router.route('/:id').patch(updateOrder).delete(deleteOrder);

export default router;
