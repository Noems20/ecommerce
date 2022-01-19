import {
  SET_PRODUCTS,
  SET_PRODUCT,
  SET_PRODUCT_LOADED,
  CLEAR_PRODUCTS,
  SET_PRODUCT_REVIEWS,
  ADD_REVIEW,
  UPDATE_REVIEW,
  DELETE_REVIEW,
  SET_PRODUCTS_PAGES,
} from './productsTypes';

import { SET_USER_REVIEW } from '../user/userTypes';

import {
  SET_UI_LOADING,
  SET_UI_ERRORS,
  CLEAR_UI_ERRORS,
  SET_SUCCESS,
} from '../ui/uiTypes';
import { batch } from 'react-redux';
import axios from 'axios';

// ------------------------------------------------------------------------
//  CLEAR PRODUCTS
// ------------------------------------------------------------------------
export const clearProducts = () => async (dispatch) => {
  dispatch({
    type: CLEAR_PRODUCTS,
  });
  dispatch({
    type: SET_SUCCESS,
    payload: false,
  });
};

// ------------------------------------------------------------------------
//  FETCH PRODUCT BY SLUG
// ------------------------------------------------------------------------
export const fetchProductBySlug = (slug) => async (dispatch, getState) => {
  try {
    dispatch({
      type: SET_PRODUCT_LOADED,
      payload: false,
    });

    const { data } = await axios.get(`/api/v1/products/product/${slug}`);
    const { user } = getState().user;

    if (data.data && user) {
      const { data: reviewData } = await axios.get(
        `/api/v1/reviews/MyReview/${data.data.id}`
      );
      dispatch({
        type: SET_USER_REVIEW,
        payload: reviewData.data,
      });
    }

    if (data.data) {
      data.data.stats = data.stats;
    }

    batch(() => {
      dispatch({
        type: SET_PRODUCT,
        payload: data.data,
      });
      dispatch({
        type: SET_PRODUCT_LOADED,
        payload: true,
      });
    });
  } catch (error) {
    console.log(error);
    dispatch({
      type: SET_PRODUCT_LOADED,
      payload: false,
    });
  }
};

// ------------------------------------------------------------------------
//  FETCH PRODUCTS
// ------------------------------------------------------------------------
export const fetchProducts =
  (
    catalog = null,
    quantity,
    page = 1,
    orderBy = '-sold',
    filterRating = 1,
    filterPrice = null,
    excludeId = null,
    keyword
  ) =>
  async (dispatch) => {
    try {
      dispatch({
        type: SET_UI_LOADING,
        payload: { fetchLoader: true },
      });

      //ratingsAverage[gte]
      const keywordString = keyword ? `&keyword=${keyword}` : '';
      const catalogString = catalog ? `&catalog=${catalog}` : '';
      const excludePriceString = filterPrice
        ? `&price[lte]=${filterPrice}`
        : '';
      const excludeString = excludeId ? `_id[ne]=${excludeId}` : '';

      const { data } = await axios.get(
        `/api/v1/products?${excludeString}${excludePriceString}${catalogString}${keywordString}&page=${page}&limit=${quantity}&ratingsAverage[gte]=${filterRating}&fields=name,slug,catalog,price,ratingsAverage,subcategory&sort=${orderBy},-createdAt`
      );

      batch(() => {
        dispatch({
          type: SET_PRODUCTS,
          payload: data.data,
        });
        dispatch({
          type: SET_PRODUCTS_PAGES,
          payload: data.pages,
        });
        dispatch({
          type: SET_UI_LOADING,
          payload: { fetchLoader: false },
        });
        dispatch({
          type: SET_SUCCESS,
          payload: true,
        });
      });
    } catch (error) {
      console.log(error);
    }
  };

// ------------------------------------------------------------------------
//  FETCH CLOTHING PRODUCTS
// ------------------------------------------------------------------------
export const fetchClothingProducts =
  (
    forW,
    category,
    quantity,
    page = 1,
    orderBy = '-sold',
    filterRating = 1,
    filterPrice = null
  ) =>
  async (dispatch) => {
    try {
      dispatch({
        type: SET_UI_LOADING,
        payload: { fetchLoader: true },
      });

      const categoryString = category === 'todo' ? '' : `&category=${category}`;
      const forString = forW === 'general' ? '' : `&for=${forW}`;
      const excludePriceString = filterPrice
        ? `&price[lte]=${filterPrice}`
        : '';

      const { data } = await axios.get(
        `/api/v1/products?catalog=ropa${categoryString}${forString}${excludePriceString}&page=${page}&limit=${quantity}&ratingsAverage[gte]=${filterRating}&fields=name,slug,catalog,price,ratingsAverage,subcategory&sort=${orderBy},-createdAt`
      );

      batch(() => {
        dispatch({
          type: SET_PRODUCTS,
          payload: data.data,
        });
        dispatch({
          type: SET_PRODUCTS_PAGES,
          payload: data.pages,
        });
        dispatch({
          type: SET_UI_LOADING,
          payload: { fetchLoader: false },
        });
      });
    } catch (error) {
      console.log(error);
    }
  };

// ------------------------------------------------------------------------
//  FETCH PRODUCT REVIEWS
// ------------------------------------------------------------------------
export const fetchProductReviews = (productId, filter) => async (dispatch) => {
  try {
    dispatch({
      type: SET_UI_LOADING,
      payload: { secondFetchLoader: false },
    });

    const getFilterString = () => {
      switch (filter) {
        case 5:
          return '?rating=5';
        case 4:
          return '?rating=4';
        case 3:
          return '?rating=3';
        case 2:
          return '?rating=2';
        case 1:
          return '?rating=1';
        default:
          return '';
      }
    };

    const filterString = getFilterString();

    const { data } = await axios.get(
      `/api/v1/products/${productId}/reviews${filterString}`
    );

    batch(() => {
      dispatch({
        type: SET_PRODUCT_REVIEWS,
        payload: data.data,
      });
      dispatch({
        type: SET_UI_LOADING,
        payload: { secondFetchLoader: true },
      });
    });
  } catch (error) {
    console.log(error);
  }
};

// ------------------------------------------------------------------------
//  CREATE PRODUCT REVIEW
// ------------------------------------------------------------------------
export const createProductReview =
  (product, title, rating, review) => async (dispatch) => {
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

      const { data } = await axios.post(
        `/api/v1/products/${product}/reviews`,
        { title, rating, review },
        config
      );

      batch(() => {
        dispatch({
          type: ADD_REVIEW,
          payload: data.data,
        });
        dispatch({
          type: SET_USER_REVIEW,
          payload: data.data,
        });
        dispatch({
          type: SET_UI_LOADING,
          payload: { secondLoader: false },
        });
      });
    } catch (error) {
      dispatch({
        type: SET_UI_ERRORS,
        payload: { errorsTwo: error.response.data.uiErrors },
      });
      dispatch({
        type: SET_UI_LOADING,
        payload: { secondLoader: false },
      });
    }
  };
// ------------------------------------------------------------------------
//  UPDATE PRODUCT REVIEW
// ------------------------------------------------------------------------
export const updateProductReview =
  (id, title, rating, review) => async (dispatch) => {
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

      const { data } = await axios.patch(
        `/api/v1/reviews/${id}`,
        {
          title,
          rating,
          review,
        },
        config
      );

      batch(() => {
        dispatch({
          type: SET_USER_REVIEW,
          payload: data.data,
        });
        dispatch({
          type: UPDATE_REVIEW,
          payload: data.data,
        });
        dispatch({
          type: SET_UI_LOADING,
          payload: { secondLoader: false },
        });
        dispatch({
          type: CLEAR_UI_ERRORS,
        });
      });
    } catch (error) {
      dispatch({
        type: SET_UI_ERRORS,
        payload: { errorsTwo: error.response.data.uiErrors },
      });
      dispatch({
        type: SET_UI_LOADING,
        payload: { secondLoader: false },
      });
      // checkUserPermissions(error, dispatch);
    }
  };

// ------------------------------------------------------------------------
//  DELETE PRODUCT REVIEW
// ------------------------------------------------------------------------
export const deleteProductReview = (id) => async (dispatch) => {
  try {
    await axios.delete(`/api/v1/reviews/${id}`);
    batch(() => {
      dispatch({
        type: SET_USER_REVIEW,
        payload: null,
      });
      dispatch({
        type: DELETE_REVIEW,
        payload: id,
      });
    });
  } catch (error) {
    if (
      error.response.data.message ===
      'You are not logged in! Please log in to get access'
    ) {
      window.location.reload();
    }
  }
};
