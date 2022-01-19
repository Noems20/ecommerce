import axios from 'axios';
import { SET_UI_ERRORS } from '../ui/uiTypes';

import { SET_CART } from './cartTypes';

export const setCart =
  (product, colorname, size, quantity) => async (dispatch) => {
    try {
      const config = {
        headers: {
          'Content-Type': 'application/json',
        },
      };

      const { data } = await axios.patch(
        '/api/v1/users/cartProducts',
        {
          product,
          colorname,
          size,
          quantity,
        },
        config
      );

      dispatch({
        type: SET_CART,
        payload: data.data,
      });
    } catch (error) {
      dispatch({
        type: SET_UI_ERRORS,
        payload: { errorsOne: error.response.data.uiErrors },
      });
    }
  };
