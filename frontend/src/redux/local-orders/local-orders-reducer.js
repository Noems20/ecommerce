import {
  SET_LOCAL_ORDERS,
  SET_LOCAL_ORDERS_PAGES,
  SET_LOCAL_ORDER,
  ADD_LOCAL_ORDER,
  UPDATE_LOCAL_ORDER,
  DELETE_LOCAL_ORDER,
  COMPLETE_LOCAL_ORDER,
  CLEAR_LOCAL_ORDERS,
} from './local-orders-types';
import { addItem, updateItem, deleteItem } from '../utils/reducerUtils';

const initialState = {
  orders: [],
  order: null,
  pages: 1,
};

const localOrderReducer = (state = initialState, action) => {
  switch (action.type) {
    case SET_LOCAL_ORDERS:
      return {
        ...state,
        orders: [...action.payload],
      };
    case SET_LOCAL_ORDERS_PAGES:
      return {
        ...state,
        pages: action.payload,
      };
    case SET_LOCAL_ORDER:
      return {
        ...state,
        order: action.payload,
      };
    case ADD_LOCAL_ORDER:
      return {
        ...state,
        orders: addItem(action.payload, state.orders),
      };
    case UPDATE_LOCAL_ORDER:
      return {
        ...state,
        orders: updateItem(action.payload, state.orders),
      };
    case DELETE_LOCAL_ORDER:
    case COMPLETE_LOCAL_ORDER:
      return {
        ...state,
        orders: deleteItem(action.payload, state.orders),
      };
    case CLEAR_LOCAL_ORDERS:
      return initialState;
    default:
      return state;
  }
};

export default localOrderReducer;
