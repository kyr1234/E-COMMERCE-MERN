const express = require('express')
const { isAuthenticated, authorisedRole } = require('../Middleware/auth')
const {
  createProduct,
  allproducts,
  updateproduct,
  deleteproduct,
  getProductDetails,
  getallreviews,
  deleteReview,
  addReviewsAndUpdate,
} = require('../RoutesFunction/ProductFunctions')

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
router.route('/product/:id').get(getProductDetails)

router
  .route('/admin/product/:id')
  .put(isAuthenticated, authorisedRole('admin'), updateproduct)
  .delete(isAuthenticated, authorisedRole('admin'), deleteproduct)

router.route('/reviews').put(isAuthenticated, addReviewsAndUpdate)

router.route('/review').get(getallreviews).delete(isAuthenticated, deleteReview)

module.exports = router
