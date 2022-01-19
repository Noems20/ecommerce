export const addItemToCart = (cartItems, cartItemToAdd) => {
  const existingCartItem = cartItems.find(
    (cartItem) => cartItem._id === cartItemToAdd._id
  );

  if (existingCartItem) {
    return cartItems.map((cartItem) =>
      cartItem._id === cartItemToAdd._id
        ? { ...cartItem, qty: cartItem.qty + 1 }
        : cartItem
    );
  }

  return [...cartItems, { ...cartItemToAdd, qty: 1 }];
};

export const countCartItems = (cartItems) => {
  let count = 0;
  let price = 0;
  for (let product of cartItems) {
    count += product.quantity;
    price += product.totalprice;
  }
  return {
    price: Math.round(price * 100) / 100,
    count,
  };
};
