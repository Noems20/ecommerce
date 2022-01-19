import express from 'express';
import {
  getAllProducts,
  getProduct,
  createProduct,
  resizeProductImage,
  uploadProductImages,
  updateProduct,
  deleteProduct,
  aliasTopProducts,
  getProductStats,
  findBySlug,
} from '../controllers/productsController.js';

import { protect, restrictTo } from '../controllers/authController.js';

import reviewRouter from '../routes/reviewRoutes.js';

const router = express.Router();

// router.param('id', productController.checkID)

router.use('/:productId/reviews', reviewRouter);
router.route('/top-10-cheap').get(aliasTopProducts, getAllProducts);
router.route('/product-stats/:productId').get(getProductStats);
router.route('/product/:slug').get(findBySlug);

router
  .route('/')
  .get(getAllProducts)
  .post(
    protect,
    restrictTo('admin'),
    uploadProductImages,
    createProduct,
    resizeProductImage
  );

router
  .route('/:id')
  .get(getProduct)
  .patch(
    protect,
    restrictTo('admin'),
    uploadProductImages,
    updateProduct,
    resizeProductImage
  )
  .delete(protect, restrictTo('admin'), deleteProduct);

export default router;
