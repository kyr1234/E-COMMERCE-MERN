import { configureStore } from '@reduxjs/toolkit'
import { combineReducers, applyMiddleware } from 'redux'
import thunk from 'redux-thunk'
import { composeWithDevTools } from 'redux-devtools-extension'
import {
  productsReducer,
  productsDetailsReducer,
} from './reducers/productreducer'

const reducer = combineReducers({
  products: productsReducer,
  product: productsDetailsReducer,
})

let initialState = {}

const middleware = [thunk]

const store = configureStore({ reducer, initialState, middleware })

export default store
