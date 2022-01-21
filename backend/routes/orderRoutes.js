import express from 'express';

import { getCheckoutSession } from '../controllers/orderController.js';

import { protect } from '../controllers/authController.js';

const router = express.Router();

router.get('/checkout-session', protect, getCheckoutSession);

export default router;
