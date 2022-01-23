import Stripe from 'stripe';
import User from '../models/userModel.js';
import Order from '../models/orderModel.js';
import catchAsync from '../utils/catchAsync.js';
import {
  createOne,
  getOne,
  getAll,
  updateOne,
  deleteOne,
} from './handlerFactory.js';

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY);

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
      name: `${cartProduct.name} - ${cartProduct.for}#${cartProduct.colorname}`,
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
  stripe.checkout.sessions.listLineItems(
    session.id,
    // { limit: 5 },
    function (err, lineItems) {
      console.log(lineItems.data);
    }
  );
  // const totalPrice = session.amount_total / 100;
  // await Order.create({ user: user._id, shippingAddress, totalPrice });
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
