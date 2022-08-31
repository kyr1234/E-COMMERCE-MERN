const ErrorHandler = require('../utils/ErrorClass')
const catchAsync = require('../catchAsyncError/catchAsync')
const Users = require('../models/UserModel')
const sendToken = require('../utils/token')
const sendmail = require('../utils/sendmail')
const crypto = require('crypto')
const { error } = require('console')

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
  console.log(req.body)
  const user = await Users.findOne({ email: req.body.email })

  if (!user) {
    return next(new ErrorHandler('User not found', 404))
  }

  const resettoken = user.getResetToken()
  await user.save({ validateBeforeSave: false })

  const urltosendinmail = `${req.protocol}://${req.get(
    'host',
  )}/password/reset/${resettoken}`

  const message = `This is the Password Recovery token that is being generated and the token is valid for 15 Minutes ${urltosendinmail} `

  const subject = 'E-COMMERCE'
  const email = user.email
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
    console.log(err)
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

exports.UserDetails = catchAsync(async (req, res, next) => {
  const user = await Users.findById(req.user.id)

  res.status(201).json({
    message: 'User Details',
    user,
  })
})

exports.updatePassword = catchAsync(async (req, res, next) => {
  const user = await Users.findById(req.user.id)

  const oldpassword = req.body.oldpassword
  const newpassword = req.body.newpassword
  const confirmpassword = req.body.confirmpassword

  const isOldPasswordMatched = user.comparePassword(oldpassword)

  if (!isOldPasswordMatched) {
    return next(new ErrorHandler('ENTER PROPER CURRENT PASSWORD', 400))
  }

  if (newpassword !== confirmpassword) {
    return next(
      new ErrorHandler('NEW PASSWORD AND CONFIRM PASSWORD DO NOT MATCH', 400),
    )
  }

  user.password = newpassword
  await user.save()

  sendToken(user, res, 200)
})

exports.updateProfile = catchAsync(async (req, res, next) => {
  const options = {
    name: req.body.name,
    email: req.body.email,
  }

  const user = await Users.findByIdAndUpdate(req.user.id, options, {
    new: true,
    runValidators: true,
    useFindAndModify: false,
  })

  res.status(201).json({
    success: true,
    message: 'Profile Updated',
  })
})

//Get all users for admin

exports.AlluserToAdmin = catchAsync(async (req, res, next) => {
  const users = await Users.find()

  res.status(200).json({
    success: true,
    users,
  })
})

exports.SingleUserToAdmin = catchAsync(async (req, res, next) => {
  const user = await Users.findById(req.params.id)

  if (!user) {
    return next(new ErrorHandler('User Not Found', 400))
  }

  res.status(200).json({
    success: true,
    user,
  })
})

exports.deleteUserFromAdmin = catchAsync(async (req, res, next) => {
  const userid = req.params.id
  const user = await Users.findById(userid)
  if (!user) {
    return next(new ErrorHandler('User Not Exist', 400))
  }
  await user.remove()

  res.status(200).json({
    success: true,
    message: 'The User is Deleted',
  })
})

exports.updateuserByAdmin = catchAsync(async (req, res, next) => {
  const newData = {
    name: req.body.name,
    email: req.body.email,
    role: req.body.role,
  }

  const user = await Users.findByIdAndUpdate(req.params.id, newData, {
    new: true,
    runValidators: true,
    useFindAndModify: false,
  })

  res.status(201).json({
    success: true,
    user,
  })
})
