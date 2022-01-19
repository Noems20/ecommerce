import mongoose from 'mongoose';
import Product from './productModel.js';

const ratingPercentages = new mongoose.Schema({
  fiveStars: Number,
  forStars: Number,
  threeStars: Number,
  twoStars: Number,
  oneStar: Number,
});

const reviewSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: [true, 'No puede estar vacío'],
    },
    review: {
      type: String,
      required: [true, 'No puede estar vacío'],
    },
    rating: {
      type: Number,
      enum: {
        values: [1, 2, 3, 4, 5],
        message: 'Debe de ser 1, 2, 3, 4 o 5',
      },
      required: [true, 'Debe tener una valoración'],
    },
    ratingPercentages: {
      type: ratingPercentages,
    },
    createdAt: {
      type: Date,
      default: Date.now,
    },
    product: {
      type: mongoose.Schema.ObjectId,
      ref: 'Product',
      required: [true, 'Debe pertenecer a un producto'],
    },
    user: {
      type: mongoose.Schema.ObjectId,
      ref: 'User',
      required: [true, 'Review must belong to a user'],
    },
  },
  {
    toJSON: { virtuals: true },
    toObject: { virtuals: true },
  }
);

reviewSchema.index(
  { product: 1, user: 1 },
  {
    unique: true,
  }
);

reviewSchema.pre(/^find/, function (next) {
  // this.populate('product', '-guides name');
  this.populate('user', 'name photo');
  next();
});

reviewSchema.statics.calcAverageRating = async function (productId) {
  // this -> Current model (Product)
  const stats = await this.aggregate([
    {
      $match: { product: productId },
    },
    {
      $group: {
        _id: '$product',
        numRating: { $sum: 1 },
        avgRating: { $avg: '$rating' },
      },
    },
  ]);

  if (stats.length > 0) {
    await Product.findByIdAndUpdate(productId, {
      ratingsQuantity: stats[0].numRating,
      ratingsAverage: stats[0].avgRating,
    });
  } else {
    await Product.findByIdAndUpdate(productId, {
      ratingsQuantity: 0,
      ratingsAverage: 4.5,
    });
  }
};

reviewSchema.post('save', function () {
  // This points to current review (Document), this.constructor points to model
  this.constructor.calcAverageRating(this.product);
});

// This works for both because the others are findById -> (uses findOne not findOneAnd)
// findByIdAndUpdate -> short hand of findOneAndUpdate
// findByIdAndDelete -> short hand of findOneAndDelete
reviewSchema.pre(/^findOneAnd/, async function (next) {
  this.r = await this.findOne().clone(); // this is a query with find can access the document
  next();
});

reviewSchema.post(/^findOneAnd/, async function () {
  // await this.findOne(); Does NOT work here, query has already executed
  await this.r.constructor.calcAverageRating(this.r.product);
});

const Review = mongoose.model('Review', reviewSchema);

export default Review;
