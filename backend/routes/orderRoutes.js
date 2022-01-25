import express from 'express';

import {
  getCheckoutSession,
  getMyOrders,
} from '../controllers/orderController.js';

import { protect } from '../controllers/authController.js';

const router = express.Router();

router.use(protect);

router.post('/checkout-session', getCheckoutSession);
router.get('/my-orders', getMyOrders);

export default router;
