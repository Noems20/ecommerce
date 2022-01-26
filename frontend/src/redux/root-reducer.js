import { combineReducers } from 'redux';

import localOrderReducer from './local-orders/local-orders-reducer';
import addressesReducer from './addresses/addressesReducer';
import productsReducer from './products/productsReducer';
import ordersReducer from './orders/orders-reducer';
import cartReducer from './cart/cartReducer';
import userReducer from './user/userReducer';
import uiReducer from './ui/uiReducer';

const rootReducer = combineReducers({
  addresses: addressesReducer,
  localOrders: localOrderReducer,
  products: productsReducer,
  orders: ordersReducer,
  cart: cartReducer,
  user: userReducer,
  ui: uiReducer,
});

export default rootReducer;
