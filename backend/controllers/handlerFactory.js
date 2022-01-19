import catchAsync from '../utils/catchAsync.js';
import AppError from '../utils/appError.js';
import APIFeatures from '../utils/apiFeatures.js';

export const deleteOne = (Model) =>
  catchAsync(async (req, res, next) => {
    const { id: docID } = req.params;
    const doc = await Model.findByIdAndDelete(docID);

    if (!doc) {
      return next(new AppError('No document found with that ID', 404));
    }

    res.status(204).json({ status: 'success', data: null });
  });

export const updateOne = (Model) =>
  catchAsync(async (req, res, next) => {
    const { id: docID } = req.params;
    // new: true -> Is for return the updated object and not the old
    const doc = await Model.findByIdAndUpdate(docID, req.body, {
      new: true,
      runValidators: true,
    });

    if (!doc) {
      return next(new AppError('No doc found with that ID', 404));
    }

    res.status(200).json({
      status: 'success',
      data: doc,
    });
  });

export const createOne = (Model) =>
  catchAsync(async (req, res, next) => {
    const doc = await Model.create(req.body);
    res.status(201).json({
      status: 'success',
      data: doc,
    });
  });

export const getOne = (Model, popOptions) =>
  catchAsync(async (req, res, next) => {
    const { id: docID } = req.params;
    let query = Model.findById(docID);
    if (popOptions) {
      query.populate(popOptions);
    }
    const doc = await query;

    if (!doc) {
      return next(new AppError('No document found with that ID', 404));
    }
    res.status(200).json({
      status: 'success',
      data: doc,
    });
  });

export const getAll = (Model) =>
  catchAsync(async (req, res, next) => {
    // To allow for nested GET reviews on product
    let filter = {};
    if (req.params.productId) filter = { product: req.params.productId };
    if (req.query.keyword) {
      filter = {
        ...filter,
        name: {
          $regex: req.query.keyword,
          $options: 'i',
        },
      };
    }
    // Execute query
    const features = new APIFeatures(Model.find(filter), req.query)
      .filter()
      .sort()
      .limitFields()
      .paginate();

    // MAKE COUNT
    const queryObj = { ...req.query };
    const excludedFields = ['page', 'sort', 'limit', 'fields'];
    excludedFields.forEach((el) => delete queryObj[el]);
    let queryStr = JSON.stringify(queryObj);
    queryStr = queryStr.replace(
      /\b(gte|gt|lte|lt|ne)\b/g,
      (match) => `$${match}`
    );

    const count = await Model.countDocuments({
      ...JSON.parse(queryStr),
      ...filter,
    });

    // GET PAGES
    let pages = 1;
    if (req.query.limit) {
      pages = Math.ceil(count / req.query.limit);
    }

    const doc = await features.query;
    res.status(200).json({
      status: 'success',
      results: doc.length,
      pages,
      data: doc,
    });
  });
