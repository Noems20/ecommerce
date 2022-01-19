import Review from '../models/reviewModel.js';
import AppError from '../utils/appError.js';
import catchAsync from '../utils/catchAsync.js';

// Handler factory
import {
  createOne,
  deleteOne,
  getAll,
  getOne,
  updateOne,
} from './handlerFactory.js';

export const setProductUserIds = (req, res, next) => {
  // Allow nested routes
  if (!req.body.product) req.body.product = req.params.productId;
  if (!req.body.user) req.body.user = req.user.id;
  next();
};

export const checkIfAuthor = catchAsync(async (req, res, next) => {
  const review = await Review.findById(req.params.id);
  if (req.user.role !== 'admin') {
    if (review.user.id !== req.user.id)
      return next(
        new AppError(`No puedes editar la reseña de otra persona`, 403)
      );
  }
  next();
});

export const getAllReviews = getAll(Review);
export const getReview = getOne(Review);
export const deleteReview = deleteOne(Review);
export const updateReview = updateOne(Review);

export const createReview = catchAsync(async (req, res, next) => {
  let doc = await Review.create(req.body);
  const obj = doc.toObject();
  const str = JSON.stringify(obj);
  const jsonDoc = JSON.parse(str);
  jsonDoc.user = { _id: doc.user };
  jsonDoc.user.name = req.user.name;
  jsonDoc.user.photo = req.user.photo;
  res.status(201).json({
    status: 'success',
    data: jsonDoc,
  });
});

// -------------------------- GET PRODUCT-USER REVIEWS -----------------
export const getMyReview = catchAsync(async (req, res, next) => {
  const { id: productId } = req.params;
  let review = await Review.findOne({
    user: req.user.id,
    product: productId,
  });

  return res.status(200).json({
    status: 'success',
    data: review,
  });
});
