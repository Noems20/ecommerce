import { SET_CART } from './cartTypes';

import { countCartItems } from './cartUtils';

const initialState = {
  productsAmmount: 0,
  totalPrice: 0,
  cart: [],
};

const cartReducer = (state = initialState, action) => {
  switch (action.type) {
    case SET_CART:
      const { price, count } = countCartItems(action.payload);
      return {
        totalPrice: price,
        productsAmmount: count,
        cart: action.payload,
      };
    default:
      return state;
  }
};

export default cartReducer;
