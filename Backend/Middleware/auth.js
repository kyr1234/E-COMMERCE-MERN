const jwt = require('jsonwebtoken')
const catchAsync = require('../catchAsyncError/catchAsync')
const Users = require('../models/UserModel')
const ErrorHandler = require('../Classes/ErrorClass')

exports.isAuthenticated = catchAsync(async (req, res, next) => {
  const { token } = req.cookies

  if (!token) {
    return next(new ErrorHandler('Please Login ', 401))
  }
  const decodeddata = jwt.verify(token, process.env.SECRET_KEY)

  req.user = await Users.findById(decodeddata.id)
  next()
})
