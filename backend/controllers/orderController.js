import Stripe from 'stripe';
import User from '../models/userModel.js';
import Order from '../models/orderModel.js';
import Product from '../models/productModel.js';
import catchAsync from '../utils/catchAsync.js';
import AppError from '../utils/appError.js';
import slugify from 'slugify';
import { createOne, getAll, updateOne, deleteOne } from './handlerFactory.js';
import APIFeatures from '../utils/apiFeatures.js';

export const getOrders = getAll(Order);
export const createOrder = createOne(Order);
export const updateOrder = updateOne(Order);
export const deleteOrder = deleteOne(Order);

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY);

// -------------------------------------------------------------------------------
// FILTER OBJECT
// -------------------------------------------------------------------------------
const filterObj = (obj, ...allowedFields) => {
  const newObj = {};
  Object.keys(obj).forEach((el) => {
    if (allowedFields.includes(el)) newObj[el] = obj[el];
  });
  return newObj;
};

// -------------------------------------------------------------------------------
// CHECK IF AUTHOR
// -------------------------------------------------------------------------------
export const checkIfAuthor = catchAsync(async (req, res, next) => {
  const order = await Order.findById(req.params.id);
  if (req.user.role !== 'admin') {
    if (order.user.id !== req.user.id)
      return next(
        new AppError(`No puedes editar la orden de otra persona`, 403)
      );
  }
  next();
});

// -------------------------------------------------------------------------------
// GET LOGGED USER ORDERS
// -------------------------------------------------------------------------------
export const getMyOrders = catchAsync(async (req, res, next) => {
  const { status } = req.params;
  let filter = {
    user: req.user.id,
    status: status === 'active' ? { $ne: 'Entregado' } : { $eq: 'Entregado' },
  };

  // Execute query
  const features = new APIFeatures(Order.find(filter), req.query)
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

  const count = await Order.countDocuments({
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

// -------------------------------------------------------------------------------
// GET CHECKOUT SESSION
// -------------------------------------------------------------------------------
export const getCheckoutSession = catchAsync(async (req, res, next) => {
  // 1) Get current cart
  const { addressIdx } = req.body;
  const { productsCart, addresses } = req.user;

  const selectedAddress = JSON.parse(JSON.stringify(addresses[addressIdx]));
  delete selectedAddress.predetermined;
  delete selectedAddress._id;

  // 2) Format cart products
  const formatedCartProducts = productsCart.map((cartProduct) => {
    return {
      name: `${cartProduct.name} - ${cartProduct.for}|${cartProduct.size}|${cartProduct.colorname}`,
      price: cartProduct._id,
      images: [
        `https://copiasnoe-ecommerce.s3.amazonaws.com/products/${cartProduct.image}`,
      ],
      amount: cartProduct.price * 100,
      currency: 'mxn',
      quantity: cartProduct.quantity,
    };
  });

  // 3) Create checkout session
  let url;
  if (process.env.NODE_ENV === 'development') {
    url = `${req.protocol}://localhost:3000/`;
  } else {
    url = `${req.protocol}://${req.get('host')}/`;
  }

  const session = await stripe.checkout.sessions.create({
    payment_method_types: ['card'],
    mode: 'payment',
    success_url: url + 'perfil?tab=ordenes-activas',
    cancel_url: url + 'checkout',
    customer_email: req.user.email,
    // client_reference_id: req.params.tourId,
    // shipping_address_collection: {
    //   allowed_countries: ['MX'],
    // },
    line_items: formatedCartProducts,
    metadata: {
      address: JSON.stringify(selectedAddress),
    },
  });

  // 4) Create session as response
  res.status(200).json({
    status: 'success',
    // cart: formatedCartProducts,
    session,
  });
});

// -------------------------------------------------------------------------------
// CREATE ORDER CHECKOUT
// -------------------------------------------------------------------------------

const createOrderCheckout = async (session) => {
  const user = await User.findOne({ email: session.customer_email });
  const shippingAddress = JSON.parse(session.metadata.address);
  // Get line items from stripe session
  const items = await stripe.checkout.sessions.listLineItems(session.id);

  const fetchedProducts = {};

  // Get product id's for image and product field of orderModel
  for (const item of items.data) {
    const productInfo = item.description.split(' - ');
    const specification = productInfo[1].split('|');
    const key = `${productInfo[0]}-${specification[0]}`;
    if (!(key in fetchedProducts)) {
      const product = await Product.findOne({
        name: productInfo[0],
        for: specification[0],
      });
      fetchedProducts[key] = product.id;
    }
  }

  // Format line items retrieved from stripe session
  const formatedCartProducts = items.data.map((cartItem) => {
    const productInfo = cartItem.description.split(' - ');
    const specification = productInfo[1].split('|');
    const key = `${productInfo[0]}-${specification[0]}`;

    return {
      name: productInfo[0],
      product: fetchedProducts[key],
      slug: slugify(productInfo[0] + ' ' + specification[0], { lower: true }),
      image: `product-${fetchedProducts[key]}-${specification[2]}.png`,
      for: specification[0],
      size: specification[1],
      colorname: specification[2],
      quantity: cartItem.quantity,
      price: cartItem.price.unit_amount / 100,
      totalprice: cartItem.amount_total / 100,
    };
  });

  // Create order
  await Order.create({
    user: user._id,
    shippingAddress,
    orderItems: formatedCartProducts,
    totalPrice: session.amount_total / 100,
  });

  // Clear user cart
  await User.findByIdAndUpdate(
    user._id,
    { productsCart: [] },
    {
      new: true,
      runValidators: true,
    }
  );
};

// -------------------------------------------------------------------------------
// WEBHOOK CHECKOUT
// -------------------------------------------------------------------------------

export const webhookCheckout = (req, res, next) => {
  const signature = req.headers['stripe-signature'];

  let event;

  try {
    event = stripe.webhooks.constructEvent(
      req.body,
      signature,
      process.env.NODE_ENV === 'production'
        ? process.env.STRIPE_WEBHOOK_SECRET
        : process.env.STRIPE_WEBHOOK_SECRET_DEVELOPMENT
    );
  } catch (err) {
    return res.status(400).send(`Webhook error: ${err.message}`);
  }

  if (event.type === 'checkout.session.completed')
    createOrderCheckout(event.data.object);

  res.status(200).json({ received: true });
};

// -------------------------------------------------------------------------------
// UPDATE ORDER ADDRESS
// -------------------------------------------------------------------------------
export const updateOrderAddress = catchAsync(async (req, res, next) => {
  // const filteredBody = filterObj(
  //   req.body,
  //   'state',
  //   'city',
  //   'suburb',
  //   'postalcode',
  //   'address',
  //   'phone',
  //   'instructions',
  //   'references'
  // );
  const { id: docID } = req.params;

  const doc = await Order.findById(docID);

  if (!doc) {
    return next(new AppError('No doc found with that ID', 404));
  }

  if (doc.status === 'Entregado' || doc.status === 'En camino') {
    return next(
      new AppError('It is no longer possible to make a change of address', 403)
    );
  }

  doc.shippingAddress = req.body;
  await doc.save();

  res.status(200).json({
    status: 'success',
    data: doc,
  });
});

// -------------------------------------------------------------------------------
// CANCEL ORDER
// -------------------------------------------------------------------------------
export const cancelOrder = catchAsync(async (req, res, next) => {});
