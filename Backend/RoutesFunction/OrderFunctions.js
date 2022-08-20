const ErrorHandler = require('../utils/ErrorClass')
const catchAsync = require('../catchAsyncError/catchAsync')
const Products = require('../models/ProductModel')
const OrderModel = require('../models/OrderModel')

exports.createOrder = catchAsync(async (req, res, next) => {
  const {
    shippingInfo,
    orderItems,
    paymentInfo,
    ItemsPrice,
    taxPrice,
    shippingPrice,
    totalPrice,
  } = req.body

  const order = await OrderModel.create({
    shippingInfo,
    orderItems,
    paymentInfo,
    ItemsPrice,
    taxPrice,
    shippingPrice,
    totalPrice,
    paidAt: Date.now(),
    user: req.user._id,
  })
  res.status(200).json({
    success: true,
    message: order,
  })
})

exports.GetSingleOrder = catchAsync(async (req, res, next) => {
  const order = await OrderModel.findById(req.params.id).populate(
    'user',
    'name email',
  )
  if (!order) {
    return next(new ErrorHandler('Order Not Found', 400))
  }

  /*   if (order.user.toString() !== req.user._id.toString()) {
    return next(new ErrorHandler('You Are Not Allowed To Access This Order'))
  } */
  res.status(200).json({
    success: true,
    message: order,
  })
})

exports.myOrders = catchAsync(async (req, res, next) => {
  const order = await OrderModel.find({ user: req.user._id })
  if (!order) {
    return next(new ErrorHandler('Order Not Found', 404))
  }

  res.status(200).json({
    success: true,
    message: order,
  })
})

exports.allorders = catchAsync(async (req, res, next) => {
  const orders = await OrderModel.find()

  if (!orders) {
    return next(new ErrorHandler('Orders Not Found', 404))
  }
  let amount = 0

  orders.forEach((order) => {
    amount += order.totalPrice
  })
  res.status(200).json({
    success: true,
    orders,
    amount,
  })
})

exports.updateOrderStatus = catchAsync(async (req, res, next) => {
  const orders = await OrderModel.findById(req.params.id)
  if (!orders) {
    return next(new ErrorHandler('Order Not Found', 404))
  }

  if (orders.orderStatus === 'Delivered') {
    return next(new ErrorHandler('Order Is Already Delivered', 400))
  }

  //update the stock quantity in products
  orders.forEach(async (order) => {
    await updateStock(order.Product, order.quantity)
  })

  orders.orderStatus = req.body.status

  if (orders.orderStatus === 'Delivered') {
    orders.deliveredAt = Date.now()
  }

  await orders.save({ validateBeforeSave: false })
  res.status(200).json({
    success: true,
    orders,
  })
})

const updateStock = async (id, quantity) => {
  const product = await Products.findById(id)
  product.Stock -= quantity

  await product.save({ validateBeforeSave: false })
}

exports.deleteOrder = catchAsync(async (req, res, next) => {
  const order = await OrderModel.findById(req.params.id)

  if (!order) {
    return next(new ErrorHandler('Product Not Found', 500))
  }

  await order.remove()

  res.status(200).json({
    message: 'The Order Is Deleted',
    order,
  })
})
