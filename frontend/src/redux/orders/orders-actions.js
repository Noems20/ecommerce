import axios from 'axios';
import { SET_UI_ERRORS, SET_UI_LOADING, CLEAR_UI_ERRORS } from '../ui/uiTypes';
import {
  DELETE_ORDER,
  SET_ORDERS,
  SET_ORDERS_PAGES,
  CLEAR_ORDERS,
  UPDATE_ORDER,
} from './orders-types';

// ------------------------------------------------------------------------
//  CLEAR ORDERS
// ------------------------------------------------------------------------
export const clearOrders = () => async (dispatch) => {
  dispatch({
    type: CLEAR_ORDERS,
  });
};

// -----------------------------------------------------------
// FETCH ORDERS
// -----------------------------------------------------------
export const fetchOrders =
  (status, limit, page, admin = false) =>
  async (dispatch) => {
    try {
      dispatch({
        type: SET_UI_LOADING,
        payload: { fetchLoader: true },
      });

      let statusString;
      switch (status) {
        case 'Recibidos':
          statusString = '?status=Pedido recibido';
          break;
        case 'En preparación':
          statusString = '?status=Preparando pedido';
          break;
        case 'Para entregar':
          statusString = '?status=Listo para entregar';
          break;
        case 'En camino':
          statusString = '?status=En camino';
          break;
        case 'Entregados':
          statusString = '?status=Entregado';
          break;
        case 'active':
          statusString = '?status[ne]=Entregado';
          break;
        default:
          statusString = '';
          break;
      }

      let res;
      if (admin) {
        res = await axios.get(
          `/api/v1/orders${statusString}&limit=${limit}&page=${page}`
        );
      } else {
        res = await axios.get(
          `/api/v1/orders/my-orders${statusString}&limit=${limit}&page=${page}`
        );
      }
      const { data } = res;

      dispatch({
        type: SET_ORDERS,
        payload: data.data,
      });
      dispatch({
        type: SET_ORDERS_PAGES,
        payload: data.pages,
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

// -----------------------------------------------------------
// UPDATE ORDER STATUS -- ADMIN
// -----------------------------------------------------------
export const updateOrderStatus = (id, status) => async (dispatch) => {
  try {
    dispatch({
      type: SET_UI_LOADING,
      payload: { secondLoader: true },
    });

    const config = {
      headers: {
        'Content-Type': 'application/json',
      },
    };

    // 1) Get current logger user orders
    await axios.patch(
      `/api/v1/orders/${id}`,
      {
        status,
      },
      config
    );

    dispatch({
      type: DELETE_ORDER,
      payload: id,
    });
    dispatch({
      type: SET_UI_LOADING,
      payload: { secondLoader: false },
    });
  } catch (error) {
    dispatch({
      type: SET_UI_LOADING,
      payload: { secondLoader: false },
    });
  }
};

// -----------------------------------------------------------
// CANCEL ORDER
// -----------------------------------------------------------
export const cancelMyOrder = (id) => async (dispatch) => {
  try {
    await axios.delete(`/api/v1/orders/my-orders/${id}`);
    dispatch({
      type: DELETE_ORDER,
      payload: id,
    });
  } catch (error) {
    console.log(error);
  }
};
