import { SET_ORDERS, UPDATE_ORDER } from './orders-types';
import { updateItem } from '../utils/reducerUtils';

const initialState = {
  orders: [],
  pages: 1,
};

const ordersReducer = (state = initialState, action) => {
  switch (action.type) {
    case SET_ORDERS:
      return { ...state, orders: action.payload };
    case UPDATE_ORDER:
      return { ...state, orders: updateItem(action.payload, state.orders) };
    default:
      return state;
  }
};

export default ordersReducer;
