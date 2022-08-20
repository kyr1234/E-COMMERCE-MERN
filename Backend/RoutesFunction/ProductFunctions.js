const ErrorHandler = require('../utils/ErrorClass')
const catchAsync = require('../catchAsyncError/catchAsync')
const Products = require('../models/ProductModel')
const ApiFeature = require('../utils/Apifeatures')
/** Admin Functions*/

exports.createProduct = catchAsync(async (req, res, next) => {
  req.body.AdminId = req.user.id
  req.body.AdminName = req.user.name

  const product = await Products.create(req.body)
  res.status(201).json({
    message: 'Success',
    product,
  })
})

exports.updateproduct = catchAsync(async (req, res, next) => {
  let product = await Products.findById(req.params.id)

  if (!product) {
    return next(new ErrorHandler('The Product is not listed', 500))
  }

  product = await Products.findByIdAndUpdate(req.params.id, req.body, {
    new: true,
    runValidators: true,
  })

  res.status(200).json({
    message: 'THE PRODUCT IS UPDATED',
    product,
  })
})

exports.deleteproduct = catchAsync(async (req, res, next) => {
  let product = await Products.findById(req.params.id)

  if (!product) {
    return next(new ErrorHandler('Product Not Found', 500))
  }

  await product.remove()

  res.status(200).json({
    message: 'THE PRODUCT IS Deleted',
    product,
  })
})

/**OPEN GET CALLS*/
exports.allproducts = catchAsync(async (req, res, next) => {
  const productcount = await Products.countDocuments()
  const itemsperpage = 5
  const apifeature = new ApiFeature(Products.find(), req.query)
    .search()
    .filter()
    .pagination(itemsperpage)
  const allitems = await apifeature.query
  res.status(200).json({
    message: 'Success',
    allitems,
    productcount,
  })
})

exports.getProductDetails = catchAsync(async (req, res, next) => {
  const product = await Products.findById(req.params.id)
  if (!product) {
    return next(new ErrorHandler('Product Not Found', 500))
  }

  res.status(200).json({
    success: true,
    product,
  })
})

exports.addReviewsAndUpdate = catchAsync(async (req, res, next) => {
  const { rating, comment, productId } = req.body
  const review = {
    user: req.user._id,
    name: req.user.name,
    rating: Number(rating),
    comment,
  }

  const product = await Products.findById(productId)

  const isReviwed = product.review.forEach(
    (rev) => rev.user.toString() === req.user._id,
  )

  if (isReviwed) {
    product.review.forEach((rev) => {
      if (rev.user.toString() === req.user._id) {
        rev.rating = Number(rating)
        rev.comment = comment
      }
    })
  } else {
    product.review.push(review)
  }

  product.noOfReviews = product.review.length

  let avgrating = 0

  product.rating =
    product.review.forEach((rev) => {
      avgrating += rev.rating
    }) / product.rating.length

  await product.save({ validateBeforeSave: false })

  res.status(200).json({
    success: true,
    product,
  })
})

exports.deleteReview = catchAsync(async (req, res, next) => {
  const product = await Products.findById(req.query.productid)
  if (!product) {
    return next(new ErrorHandler('Product Not Found'))
  }

  const reviews = product.review.filter((rev) => {
    rev._id.toString() !== req.query.id.toString() && rev.user !== req.user.name
  })
  product.review = reviews
  let avg = 0
  const rating =
    reviews.forEach((rev) => {
      avg += rev.rating
    }) / reviews.length

  const noOfReviews = reviews.length

  await product.findByIdAndUpdate(req.query.productid, {
    reviews,
    rating,
    noOfReviews,
  })

  res.status(200).json({
    success: true,
    review: product.review,
  })
})

exports.getallreviews = catchAsync(async (req, res, next) => {
  const product = await Products.findById(req.query.id)

  if (!product) {
    return next(new ErrorHandler('Product Not Found'))
  }

  res.status(200).json({
    success: true,
    reviews: product.review,
  })
})
