import {
  SET_PRODUCTS,
  SET_PRODUCTS_PAGES,
  SET_PRODUCT,
  SET_PRODUCT_REVIEWS,
  SET_PRODUCT_LOADED,
  ADD_REVIEW,
  UPDATE_REVIEW,
  DELETE_REVIEW,
  CLEAR_PRODUCTS,
} from './productsTypes';

import { addItem, updateItem, deleteItem } from '../utils/reducerUtils';

const initialState = {
  products: [],
  product: null,
  reviews: [],
  productLoaded: false,
  pages: 1,
};

const productsReducer = (state = initialState, action) => {
  switch (action.type) {
    case SET_PRODUCTS:
      return {
        ...state,
        products: [...action.payload],
      };
    case SET_PRODUCTS_PAGES:
      return {
        ...state,
        pages: action.payload,
      };
    case SET_PRODUCT:
      return {
        ...state,
        product: action.payload,
      };
    case SET_PRODUCT_REVIEWS:
      return {
        ...state,
        reviews: action.payload,
      };
    case SET_PRODUCT_LOADED:
      return {
        ...state,
        productLoaded: action.payload,
      };
    case ADD_REVIEW:
      return {
        ...state,
        reviews: addItem(action.payload, state.reviews),
      };
    case UPDATE_REVIEW:
      return {
        ...state,
        reviews: updateItem(action.payload, state.reviews),
      };
    case DELETE_REVIEW:
      return {
        ...state,
        reviews: deleteItem(action.payload, state.reviews),
      };
    case CLEAR_PRODUCTS:
      return initialState;
    default:
      return state;
  }
};

export default productsReducer;
