import { SET_ADDRESSES } from './addressesTypes';

const initialState = [];

const addressesReducer = (state = initialState, action) => {
  switch (action.type) {
    case SET_ADDRESSES:
      return action.payload;
    default:
      return state;
  }
};

export default addressesReducer;
