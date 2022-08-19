const ErrorHandler = require('../Classes/ErrorClass')
const catchAsync = require('../catchAsyncError/catchAsync')
const Users = require('../models/UserModel')
const sendToken = require('../Classes/token')
exports.CreateUser = catchAsync(async (req, res, next) => {
  const { name, email, password } = req.body

  const user = await Users.create({
    name,
    email,
    password,
    avatar: {
      public_id: 'this is temp id',
      url: 'sdassd',
    },
  })
  sendToken(user, res, 201)
})

exports.LoginUser = catchAsync(async (req, res, next) => {
  const { email, password } = req.body
  if (!email || !password) {
    return next(new ErrorHandler('Provide Correct Crediantials', 400))
  }

  const user = await Users.findOne({ email })

  const isPasswordMatched = user.comparePassword(password)

  if (!isPasswordMatched) {
    return next(new ErrorHandler('Provide Correct Email Or Password', 400))
  }
  sendToken(user, res, 200)
})

exports.Logout = catchAsync(async (req, res, next) => {
  res.cookie('token', ' ', {
    expire: new Date(Date.now()),
    httpOnly: true,
  })

  res.status(200).json({
    success: true,
    message: 'TOKEN DISABLED',
  })
})
