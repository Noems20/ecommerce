import Stripe from 'stripe';
import catchAsync from '../utils/catchAsync.js';
import AppError from '../utils/appError.js';

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY);

// -------------------------------------------------------------------------------
// GET CHECKOUT SESSION
// -------------------------------------------------------------------------------
export const getCheckoutSession = catchAsync(async (req, res, next) => {
  // 1) Get current cart
  const { productsCart } = req.user;

  // 2) Format cart products
  const formatedCartProducts = productsCart.map((cartProduct) => {
    return {
      name: `${cartProduct.name}`,
      // description: tour.summary,
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
    success_url: url,
    cancel_url: url + 'carrito',
    customer_email: req.user.email,
    // client_reference_id: req.params.tourId,
    // shipping_address_collection: {
    //   allowed_countries: ['MX'],
    // },
    line_items: formatedCartProducts,
  });

  // 4) Create session as response
  res.status(200).json({
    status: 'success',
    // cart: formatedCartProducts,
    session,
  });
});
