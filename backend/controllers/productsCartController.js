import User from '../models/userModel.js';
import Product from '../models/productModel.js';

import catchAsync from '../utils/catchAsync.js';
import AppError from '../utils/appError.js';
// -------------------------------------------------------------------------------
// GET LOGGED USER CART PRODUCTS
// -------------------------------------------------------------------------------

export const getUserCartProducts = catchAsync(async (req, res, next) => {
  res.status(200).json({
    status: 'success',
    results: req.user.productsCart.length,
    data: req.user.productsCart,
  });
});

// -------------------------------------------------------------------------------
// ADD-REMOVE CART PRODUCT
// -------------------------------------------------------------------------------

export const updateCartProducts = catchAsync(async (req, res, next) => {
  // Info
  const { product, quantity, colorname, size } = req.body;

  // Check if quantity is an integer
  if (!Number.isInteger(quantity)) {
    return next(
      new AppError(quantity + ' is not an integer value', 404, {
        quantity: 'Debe ser un número entero',
      })
    );
  }

  // Check if product exists
  const doc = await Product.findById(product);
  if (!doc) {
    return next(
      new AppError('No document found with that ID', 404, {
        product: 'No existe un producto con ese id',
      })
    );
  }

  let valid = false;
  let productSize = {};
  let productColor = {};

  // Check if is a valid product (Color and size)
  for (let color of doc.subcategory.color) {
    if (color.colorname === colorname) {
      productColor = color;
      for (let colorSize of color.sizes) {
        if (colorSize.size === size) {
          valid = true;
          productSize = colorSize;
          break;
        }
      }
      break;
    }
  }

  if (!valid) {
    return next(
      new AppError('The cart product you try to add is not valid', 404, {
        product: 'No es un producto valido',
      })
    );
  }

  const productsCart = req.user.productsCart;

  // Check if product already in cart
  let exists = false;
  for (let idx in productsCart) {
    if (
      productsCart[idx].product == product &&
      productsCart[idx].colorname === colorname &&
      productsCart[idx].size === size
    ) {
      if (productsCart[idx].quantity + quantity > productSize.quantity) {
        return next(
          new AppError('Quantity exceeds existence', 400, {
            quantity: 'La cantidad excede la existencia',
          })
        );
      } else if (productsCart[idx].quantity + quantity <= 0) {
        productsCart.splice(idx, 1);
      } else {
        productsCart[idx].quantity += quantity;
        productsCart[idx].totalprice =
          Math.round(doc.price * productsCart[idx].quantity * 100) / 100;
      }
      exists = true;
      break;
    }
  }

  if (!exists && quantity > 0) {
    if (quantity > productSize.quantity) {
      return next(
        new AppError('Quantity exceeds existence', 400, {
          quantity: 'La cantidad excede la existencia',
        })
      );
    }
    const totalprice = quantity * doc.price;
    productsCart.push({
      product,
      name: doc.name,
      slug: doc.slug,
      for: doc.for,
      image: productColor.image,
      quantity,
      price: Math.round(doc.price * 100) / 100,
      totalprice: Math.round(totalprice * 100) / 100,
      colorname,
      size,
    });
  }

  const updatedUser = await User.findByIdAndUpdate(
    req.user.id,
    { productsCart },
    {
      new: true,
      runValidators: true,
    }
  );

  res.status(200).json({
    status: 'success',
    results: productsCart.length,
    data: updatedUser.productsCart,
  });
});
