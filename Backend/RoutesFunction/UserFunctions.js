const ErrorHandler = require('../utils/ErrorClass')
const catchAsync = require('../catchAsyncError/catchAsync')
const Users = require('../models/UserModel')
const sendToken = require('../utils/token')
const sendmail = require('../utils/sendmail')
const crypto = require('crypto')
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

exports.forgetPassword = catchAsync(async (req, res, next) => {
  const user = await Users.find({ email: req.body.email })
  console.log(user)
  if (!user) {
    return next(new ErrorHandler('User not found', 404))
  }

  const resettoken = user.getResetPasswordToken()
  await user.save({ validateBeforeSave: false })

  const urltosendinmail = `${req.protocol}://${req.get(
    'host',
  )}/password/reset/${resettoken}`

  const message = `This is the Password Recovery token that is being generated and the token is valid for 15 Minutes ${urltosendinmail} `

  const subject = 'E-COMMERCE'

  try {
    await sendmail({
      subject,
      message,
      email,
    })
    res.status(200).json({
      success: true,
      message: `Email sent to ${user.email} successfully`,
    })
  } catch (err) {
    user.resetPasswordToken = undefined
    user.resetPasswordExpire = undefined
    await user.save({ validateBeforeSave: false })

    next(new ErrorHandler(err.message, 500))
  }
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

exports.resetpassword = catchAsync(async (req, res, next) => {
  const hashedtoken = crypto
    .createHash('sha256')
    .update(req.params.token)
    .toString('hex')

  const user = await Users.find({
    resetPasswordToken: hashedtoken,
    resetPasswordExpire: { $gt: Date.now() },
  })

  if (!user) {
    return next(new ErrorHandler('Token is Expired', 404))
  }
  if (req.body.password != req.body.confirmpassword) {
    return next(new ErrorHandler('Both Password Do Not match', 400))
  }

  user.password = req.body.password 
  user.resetPasswordToken = undefined
  user.resetPasswordExpire = undefined

  await user.save()

  sendToken(user, res, 200)
})
