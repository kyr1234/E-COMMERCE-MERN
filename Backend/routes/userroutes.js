const express = require('express')
const router = express.Router()
const {
  CreateUser,
  LoginUser,
  forgetPassword,
  Logout,
} = require('../RoutesFunction/UserFunctions')

router.route('/register').post(CreateUser)
router.route('/login').post(LoginUser)
router.route('/password/forgetpassword').post(forgetPassword)
router.route('/logout').post(Logout)

module.exports = router
