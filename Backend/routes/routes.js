const { Router } = require('express')
const express = require('express')
const { isAuthenticated, authorisedRole } = require('../Middleware/auth')
const {
  createProduct,
  allproducts,
  updateproduct,
  deleteproduct,
  getProductDetails,
} = require('../RoutesFunction/product')

const router = express.Router()

//post routes
router.post(
  '/product/new',
  isAuthenticated,
  authorisedRole('admin'),
  createProduct,
)

//get routes
router.get('/products', allproducts)

router
  .route('/product/:id')
  .put(isAuthenticated, authorisedRole('admin'), updateproduct)
  .delete(isAuthenticated, authorisedRole('admin'), deleteproduct)
  .get(getProductDetails)

module.exports = router
