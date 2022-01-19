import multer from 'multer';
import sharp from 'sharp';
import fs from 'fs';
import mongoose from 'mongoose';

// MODELS
import Product from '../models/productModel.js';
import Review from '../models/reviewModel.js';

// UTILS
import catchAsync from '../utils/catchAsync.js';
import AppError from '../utils/appError.js';

// HANDLER FACTORY
import { getOne, getAll } from './handlerFactory.js';

export const aliasTopProducts = (req, res, next) => {
  req.query.limit = '10';
  req.query.sort = '-ratingsAverage,price';
  req.query.fields = 'name,price,ratingsAverage, ratingsQuantity,description';
  next();
};

// -----------------------------------------------------------------------
// GENERAL ROUTES
// -----------------------------------------------------------------------
export const getAllProducts = getAll(Product);
export const getProduct = getOne(Product, { path: 'reviews' });

// -----------------------------------------------------------------------
// CREATE PRODUCT
// -----------------------------------------------------------------------

// ----------------- FILE UPLOAD ----------------
// Image stores as a buffer
const multerStorage = multer.memoryStorage();

const multerFilter = (req, file, cb) => {
  if (file.mimetype.startsWith('image')) {
    cb(null, true);
  } else {
    cb(
      new AppError('Not an image! Please upload only images.', 400, {
        image: 'Por favor selecciona una imagen',
      }),
      false
    );
  }
};

const upload = multer({ storage: multerStorage, fileFilter: multerFilter });

export const uploadProductImages = upload.any();

// ----------------- CREATE SERVICE -----------------------
export const createProduct = catchAsync(async (req, res, next) => {
  if (req.files.length !== req.body.subcategory.color.length) {
    return next(
      new AppError('Must include correct image quantity', 400, {
        general: 'Necesitas incluir la cantidad adecuada de imágenes',
      })
    );
  }
  const doc = await Product.create(req.body);
  req.doc = doc;
  next();
});

// ----------------- RESIZE CREATED SERVICE IMAGE ----------------
export const resizeProductImage = catchAsync(async (req, res, next) => {
  let status = 201;
  if (req.update === true) {
    status = 200;
  }

  // console.log(req.files[0].fieldname.split('-')[1]);
  if (req.files.length > 0) {
    for (const colorIdx in req.files) {
      const realIdx = req.files[colorIdx].fieldname.split('-')[1];
      const imageFileName = `product-${req.doc.id}-${req.doc.subcategory.color[realIdx].colorname}.png`;
      await sharp(req.files[colorIdx].buffer)
        .resize({ width: 1280 })
        .withMetadata()
        .toFormat('png')
        .png({ quality: 100 })
        .toFile(`backend/public/img/products/${imageFileName}`);
    }
  }

  res.status(status).json({
    status: 'success',
    data: req.doc,
  });
});

// -----------------------------------------------------------------------
// UPDATE PRODUCT
// -----------------------------------------------------------------------
export const updateProduct = catchAsync(async (req, res, next) => {
  if (
    req.body.subcategory &&
    req.files.length !== req.body.subcategory.color.length
  ) {
    return next(
      new AppError('Must include correct image quantity', 400, {
        general: 'Necesitas incluir la cantidad adecuada de imágenes',
      })
    );
  }
  const { id: docID } = req.params;

  const doc = await Product.findById(docID);

  if (!doc) {
    return next(new AppError('No doc found with that ID', 404));
  }
  req.body.name && (doc.name = req.body.name);
  req.body.description && (doc.description = req.body.description);
  req.body.specifications && (doc.specifications = req.body.specifications);
  req.body.catalog && (doc.catalog = req.body.catalog);
  req.body.category && (doc.category = req.body.category);
  req.body.for && (doc.for = req.body.for);
  req.body.price && (doc.price = req.body.price);
  req.body.sold && (doc.sold = req.body.sold);
  req.body.subcategory && (doc.subcategory = req.body.subcategory);
  await doc.save();

  req.doc = doc;
  req.update = true;
  next();
});

// -----------------------------------------------------------------------
// DELETE PRODUCT
// -----------------------------------------------------------------------
export const deleteProduct = catchAsync(async (req, res, next) => {
  const { id: docID } = req.params;

  const doc = await Product.findByIdAndDelete(docID);

  if (!doc) {
    return next(new AppError('No document found with that ID', 404));
  }

  for (const color of doc.subcategory.color) {
    const filename = `${color.image}`;
    const path = `backend/public/img/products/${filename}`;

    fs.unlink(path, (err) => {
      if (err) {
        console.error(err);
        return;
      }
    });
  }

  res.status(204).json({ status: 'success', data: null });
});

// -----------------------------------------------------------------------
// FIND BY SLUG

// percent: {
//   $multiply: [{ $divide: [numReviews, '$ratingsQuantity'] }, 100],
// },
// -----------------------------------------------------------------------
export const findBySlug = catchAsync(async (req, res, next) => {
  const { slug: docSlug } = req.params;

  const doc = await Product.findOne({ slug: docSlug });

  const stats = {
    5: 0,
    4: 0,
    3: 0,
    2: 0,
    1: 0,
  };

  if (doc) {
    const statsAux = await Review.aggregate([
      {
        $match: { product: { $eq: doc._id } },
      },

      {
        $group: {
          _id: { $toLower: '$rating' },
          numReviews: { $sum: 1 },
        },
      },
      {
        $project: {
          numReviews: true,
        },
      },
      {
        $sort: { _id: -1 },
      },
    ]);

    statsAux.map((stat) => {
      stats[stat._id] = Math.round(
        (stat.numReviews / doc.ratingsQuantity) * 100
      );
    });
  }

  res.status(200).json({ status: 'success', data: doc, stats });
});

// -----------------------------------------------------------------------
// GET PRODUCT STATS
// -----------------------------------------------------------------------
export const getProductStats = catchAsync(async (req, res, next) => {
  let { productId } = req.params;
  productId = mongoose.Types.ObjectId(productId);

  const stats = await Review.aggregate([
    {
      $match: { product: { $eq: productId } },
    },
    {
      $group: {
        _id: { $toLower: '$rating' },
        numReviews: { $sum: 1 },
      },
    },
  ]);

  res.status(200).json({
    status: 'success',
    data: {
      stats,
    },
  });
});
