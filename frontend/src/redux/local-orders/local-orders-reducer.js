import {
  SET_ORDERS,
  SET_ORDERS_PAGES,
  SET_ORDER,
  ADD_ORDER,
  UPDATE_ORDER,
  DELETE_ORDER,
  COMPLETE_ORDER,
  CLEAR_ORDERS,
} from './local-orders-types';
import { addItem, updateItem, deleteItem } from '../utils/reducerUtils';

const initialState = {
  orders: [],
  order: null,
  pages: 1,
};

const localOrderReducer = (state = initialState, action) => {
  switch (action.type) {
    case SET_ORDERS:
      return {
        ...state,
        orders: [...action.payload],
      };
    case SET_ORDERS_PAGES:
      return {
        ...state,
        pages: action.payload,
      };
    case SET_ORDER:
      return {
        ...state,
        order: action.payload,
      };
    case ADD_ORDER:
      return {
        ...state,
        orders: addItem(action.payload, state.orders),
      };
    case UPDATE_ORDER:
      return {
        ...state,
        orders: updateItem(action.payload, state.orders),
      };
    case DELETE_ORDER:
    case COMPLETE_ORDER:
      return {
        ...state,
        orders: deleteItem(action.payload, state.orders),
      };
    case CLEAR_ORDERS:
      return initialState;
    default:
      return state;
  }
};

export default localOrderReducer;
