import {
  SET_ORDERS,
  SET_ORDERS_PAGES,
  UPDATE_ORDER,
  DELETE_ORDER,
  CLEAR_ORDERS,
} from './orders-types';
import { updateItem, deleteItem } from '../utils/reducerUtils';

const initialState = {
  orders: [],
  pages: 1,
};

const ordersReducer = (state = initialState, action) => {
  switch (action.type) {
    case SET_ORDERS:
      return { ...state, orders: action.payload };
    case SET_ORDERS_PAGES:
      return { ...state, pages: action.payload };
    case CLEAR_ORDERS:
      return initialState;
    case UPDATE_ORDER:
      return { ...state, orders: updateItem(action.payload, state.orders) };
    case DELETE_ORDER:
      return { ...state, orders: deleteItem(action.payload, state.orders) };
    default:
      return state;
  }
};

export default ordersReducer;
