import { configureStore } from '@reduxjs/toolkit'
import { combineReducers, applyMiddleware } from 'redux'
import thunk from 'redux-thunk'
import { composeWithDevTools } from 'redux-devtools-extension'
import { productsReducer } from './reducers/productreducer'

const reducer = combineReducers({
  products: productsReducer,
})

let initialState = {}

const middleware = [thunk]

const store = configureStore({ reducer, initialState, middleware })

export default store
