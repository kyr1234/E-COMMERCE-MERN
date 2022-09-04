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

export const getProduct = (
  keyword = '',
  currentPage = 1,
  price,
  category,
) => async (dispatch) => {
  try {
    dispatch({ type: ALL_PRODUCT_REQUEST })

    let link = `/api/v1/products?keyword=${keyword}&page=${currentPage}&price[gte]=${price[0]}&price[lte]=${price[1]}`

    if (category) {
      link = `/api/v1/products?keyword=${keyword}&page=${currentPage}&price[gte]=${price[0]}&price[lte]=${price[1]}&category=${category}`
    }
    const { data } = await axios.get(link)
    console.log(data)
    dispatch({
      type: ALL_PRODUCT_SUCCESS,
      payload: data,
    })
  } catch (error) {
    dispatch({
      type: ALL_PRODUCT_FAIL,
      payload: error,
    })
  }
}

export const getProductDetails = (id) => async (dispatch) => {
  try {
    dispatch({ type: PRODUCT_DETAILS_REQUEST })

    const { data } = await axios.get(`/api/v1/product/${id}`)
    console.log(data)
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
/* export const getProduct = (keyword = '') => {
  console.log(keyword)
  let link = `api/v1/products?keyword=${keyword}`
  return async (dispatch) => {
    dispatch({ type: ALL_PRODUCT_REQUEST })
    const { data } = await axios.get(link)
    console.log()
    dispatch({
      type: ALL_PRODUCT_SUCCESS,
      payload: data,
    })

    if (data.message != 'Success') {
      dispatch({
        type: ALL_PRODUCT_FAIL,
        payload: ' ',
      })
    }
  }
} */
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
