const jwt = require('jsonwebtoken')
const catchAsync = require('../catchAsyncError/catchAsync')
const Users = require('../models/UserModel')
const ErrorHandler = require('../utils/ErrorClass')

exports.isAuthenticated = catchAsync(async (req, res, next) => {
  const { token } = req.cookies
  console.log(token)

  if (token === ' ') {
    return next(new ErrorHandler('Please Login ', 401))
  }

  const decodeddata = jwt.verify(token, process.env.SECRET_KEY)
  /* console.log(decodeddata) */

  req.user = await Users.findById(decodeddata.id)
  next()
})

exports.authorisedRole = (...roles) => {
  return (req, res, next) => {
    if (!roles.includes(req.user.role)) {
      return next(
        new ErrorHandler(
          `You Have the Acces Right of ${req.user.role} not roles`,
          403,
        ),
      )
    }
    next()
  }
}
