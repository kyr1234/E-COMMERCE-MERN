import axios from 'axios'
import {
  ALL_PRODUCT_FAIL,
  ALL_PRODUCT_REQUEST,
  ALL_PRODUCT_SUCCESS,
  PRODUCT_DETAILS_REQUEST,
  PRODUCT_DETAILS_SUCCESS,
  PRODUCT_DETAILS_FAIL,
  CLEAR_ERRORS,
} from '../constants/productconstant.js'

export const getProduct = () => {
  let link = `api/v1/products`
  return async (dispatch) => {
    dispatch({ type: ALL_PRODUCT_REQUEST })
    const { data } = await axios.get(link)
    dispatch({
      type: ALL_PRODUCT_SUCCESS,
      payload: data.data,
    })

    if (data.message != 'Success') {
      dispatch({
        type: ALL_PRODUCT_FAIL,
        payload: ' ',
      })
    }
  }
}
/* export const getProductDetails = (id) => {
  let link = `/api/v1/product/${id}`
  return async (dispatch) => {
    dispatch({ type: PRODUCT_DETAILS_REQUEST })
    const { data } = await axios.get(link)
    dispatch({
      type: PRODUCT_DETAILS_SUCCESS,
      payload: data.product,
    })

    if (data.message != 'Success') {
      dispatch({
        type: PRODUCT_DETAILS_FAIL,
        payload: ' ',
      })
    }
  }
} */

export const getProductDetails = (id) => async (dispatch) => {
  try {
    dispatch({ type: PRODUCT_DETAILS_REQUEST })

    const { data } = await axios.get(`/api/v1/product/${id}`)

    dispatch({
      type: PRODUCT_DETAILS_SUCCESS,
      payload: data.product,
    })
  } catch (error) {
    dispatch({
      type: PRODUCT_DETAILS_FAIL,
      payload: error.response.data.message,
    })
  }
}
export const clearErrors = () => async (dispatch) => {
  dispatch({ type: CLEAR_ERRORS })
}
