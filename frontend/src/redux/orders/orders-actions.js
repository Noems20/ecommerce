import axios from 'axios';
import { SET_UI_ERRORS, SET_UI_LOADING, CLEAR_UI_ERRORS } from '../ui/uiTypes';
import { SET_ORDERS, UPDATE_ORDER } from './orders-types';

// -----------------------------------------------------------
// CREATE ORDER
// -----------------------------------------------------------
export const createOrder = (addressIdx) => async (dispatch) => {
  try {
    dispatch({
      type: SET_UI_LOADING,
      payload: { firstLoader: true },
    });
    const config = {
      headers: {
        'Content-Type': 'application/json',
      },
    };

    // 1) Get checkout session from API
    const { data } = await axios.post(
      `/api/v1/orders/checkout-session`,
      { addressIdx },
      config
    );

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

// -----------------------------------------------------------
// FETCH MY ORDERS
// -----------------------------------------------------------
export const fetchMyOrders = (status) => async (dispatch) => {
  try {
    dispatch({
      type: SET_UI_LOADING,
      payload: { fetchLoader: true },
    });

    // 1) Get current logged user orders
    const { data } = await axios.get(`/api/v1/orders/my-orders/${status}`);

    dispatch({
      type: SET_ORDERS,
      payload: data.data,
    });
    dispatch({
      type: SET_UI_LOADING,
      payload: { fetchLoader: false },
    });
  } catch (error) {
    console.log(error);
    dispatch({
      type: SET_UI_LOADING,
      payload: { fetchLoader: false },
    });
  }
};

// -----------------------------------------------------------
// UPDATE ORDER ADDRESS
// -----------------------------------------------------------
export const updateOrderAddress =
  (
    id,
    state,
    city,
    suburb,
    postalcode,
    address,
    phone,
    references,
    instructions
  ) =>
  async (dispatch) => {
    try {
      dispatch({
        type: SET_UI_LOADING,
        payload: { firstLoader: true },
      });

      const config = {
        headers: {
          'Content-Type': 'application/json',
        },
      };

      // 1) Get current logger user orders
      const { data } = await axios.patch(
        `/api/v1/orders/my-orders/${id}`,
        {
          state,
          city,
          suburb,
          postalcode,
          address,
          phone,
          references,
          instructions,
        },
        config
      );

      dispatch({
        type: UPDATE_ORDER,
        payload: data.data,
      });
      dispatch({
        type: CLEAR_UI_ERRORS,
      });
      dispatch({
        type: SET_UI_LOADING,
        payload: { firstLoader: false },
      });
    } catch (error) {
      dispatch({
        type: SET_UI_ERRORS,
        payload: { errorsOne: error.response.data.uiErrors },
      });
      dispatch({
        type: SET_UI_LOADING,
        payload: { firstLoader: false },
      });
    }
  };
