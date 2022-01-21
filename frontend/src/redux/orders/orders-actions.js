import axios from 'axios';
import { SET_UI_LOADING } from '../ui/uiTypes';
// import stripe from 'stripe';

export const createOrder = () => async (dispatch) => {
  try {
    dispatch({
      type: SET_UI_LOADING,
      payload: { firstLoader: true },
    });
    // 1) Get checkout session from API
    const { data } = await axios.get(`/api/v1/orders/checkout-session`);
    console.log(data.session);

    window.location.replace(data.session.url);
    dispatch({
      type: SET_UI_LOADING,
      payload: { firstLoader: false },
    });

    // 2) Create checkout form + charge credit card
  } catch (error) {
    console.log(error);
    dispatch({
      type: SET_UI_LOADING,
      payload: { firstLoader: false },
    });
  }
};
