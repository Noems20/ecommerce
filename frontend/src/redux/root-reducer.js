import { combineReducers } from 'redux';

import localOrderReducer from './orders/ordersReducer';
import addressesReducer from './addresses/addressesReducer';
import productsReducer from './products/productsReducer';
import cartReducer from './cart/cartReducer';
import userReducer from './user/userReducer';
import uiReducer from './ui/uiReducer';

const rootReducer = combineReducers({
  addresses: addressesReducer,
  orders: localOrderReducer,
  products: productsReducer,
  cart: cartReducer,
  user: userReducer,
  ui: uiReducer,
});

export default rootReducer;
