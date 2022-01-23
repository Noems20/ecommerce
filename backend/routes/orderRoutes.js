import express from 'express';

import { getCheckoutSession } from '../controllers/orderController.js';

import { protect } from '../controllers/authController.js';

const router = express.Router();

router.post('/checkout-session', protect, getCheckoutSession);

export default router;
