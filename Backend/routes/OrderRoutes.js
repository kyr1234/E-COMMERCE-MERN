const express = require('express')
const router = express.Router()
const {
  createOrder,
  GetSingleOrder,
  myOrders,
  allorders,
  deleteOrder,
  updateOrderStatus,
} = require('../RoutesFunction/OrderFunctions')
const { isAuthenticated, authorisedRole } = require('../Middleware/auth')

router.route('/order/new').post(isAuthenticated, createOrder)
router.route('/order/:id').get(isAuthenticated, GetSingleOrder)
router.route('/order/myorders').get(isAuthenticated, myOrders)
router
  .route('/order/allorders')
  .get(isAuthenticated, authorisedRole('admin'), allorders)

router
  .route('/admin/order/:id')
  .put(isAuthenticated, authorisedRole('admin'), updateOrderStatus)
  .delete(isAuthenticated, authorisedRole('admin'), deleteOrder)

module.exports = router
