const { Router } = require('express')
const express = require('express')
const { isAuthenticated } = require('../Middleware/auth')
const {
  createProduct,
  allproducts,
  updateproduct,
  deleteproduct,
  getProductDetails,
} = require('../RoutesFunction/product')

const router = express.Router()

//post routes
router.post('/product/new', createProduct)

//get routes
router.get('/products', isAuthenticated, allproducts)

router
  .route('/product/:id')
  .put(updateproduct)
  .delete(deleteproduct)
  .get(getProductDetails)

module.exports = router
