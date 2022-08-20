const express = require('express')
const { isAuthenticated, authorisedRole } = require('../Middleware/auth')
const router = express.Router()
const {
  CreateUser,
  LoginUser,
  forgetPassword,
  SingleUserToAdmin,
  UserDetails,
  resetpassword,
  updatePassword,
  AlluserToAdmin,
  updateProfile,
  deleteUserFromAdmin,
  updateuserByAdmin,
  Logout,
} = require('../RoutesFunction/UserFunctions')

router.route('/register').post(CreateUser)
router.route('/login').post(LoginUser)
router.route('/password/forgetpassword').post(forgetPassword)
router.route('/password/reset/:token').put(resetpassword)
router.route('/me').get(isAuthenticated, UserDetails)
router.route('/update/password').put(isAuthenticated, updatePassword)
router.route('/update/profile').put(isAuthenticated, updateProfile)
router.route('/logout').post(Logout)

router
  .route('/admin/getallusers')
  .get(isAuthenticated, authorisedRole('admin'), AlluserToAdmin)
router
  .route('/admin/user/:id')
  .get(isAuthenticated, authorisedRole('admin'), SingleUserToAdmin)
  .post(isAuthenticated, authorisedRole('admin'), deleteUserFromAdmin)
  .put(isAuthenticated, authorisedRole('admin'), updateuserByAdmin)

module.exports = router
