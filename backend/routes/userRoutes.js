import express from 'express';

// Controllers
import {
  getAllUsers,
  updateMe,
  uploadUserPhoto,
  resizeUserPhoto,
  sendContactMail,
  deleteUser,
  changeUserRole,
  updateAddress,
  removeAddress,
  makePredetermined,
} from '../controllers/userController.js';

// USER
import {
  signup,
  login,
  logout,
  protect,
  restrictTo,
  isLoggedIn,
  updatePassword,
  forgotPassword,
  resetPassword,
  verifyAccount,
} from '../controllers/authController.js';

// PRODUCTS CART
import {
  getUserCartProducts,
  updateCartProducts,
} from '../controllers/productsCartController.js';

const router = express.Router();

router.post('/signup', signup);
router.post('/login', login);
router.get('/logout', logout);
router.route('/logged').get(isLoggedIn);
router.post('/forgotPassword', forgotPassword);
router.post('/sendContactMail', sendContactMail);
router.patch('/resetPassword/:token', resetPassword);
router.patch('/verifyAccount/:token', verifyAccount);

router.use(protect);

// CART PRODUCTS
router
  .route('/cartProducts')
  .get(getUserCartProducts)
  .patch(updateCartProducts);

// USER ADDRESSES
router.route('/address/:idx').patch(updateAddress).delete(removeAddress);
router.route('/address/makePredetermined/:idx').patch(makePredetermined);

// USER
router.patch('/updateMyPassword', updatePassword);
router.patch('/changeUserRole/:id', restrictTo('admin'), changeUserRole);
router.patch('/updateMe', uploadUserPhoto, updateMe, resizeUserPhoto);
// router.get('/me', getMe, getUser);
// router.delete('/deleteMe', deleteMe);

// ----------- GENERIC ROUTES --------
router.route('/').get(restrictTo('admin'), getAllUsers);
router.route('/:id').delete(restrictTo('admin'), deleteUser);

export default router;
