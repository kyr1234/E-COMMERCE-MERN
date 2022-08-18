const mongoose = require('mongoose')
const bcrypt = require('bcryptjs')
const validator = require('validator')
const jwt = require('jsonwebtoken')
const Userschema = mongoose.Schema({
  name: {
    type: String,
    required: [true, 'Enter Your Name'],
    maxLength: [30, 'Enter the Name less than 30 Characters '],
    minLength: [3, 'Enter the Name more than 3 Characters '],
  },
  email: {
    type: String,
    unique: true,
    required: true,
    validate: [validator.isEmail, 'Enter a Valid Email'],
  },
  password: {
    type: String,
    required: [true, 'Enter the Password'],
    maxLength: [20, 'Password Should be less than 21 Characters'],
    minLength: [6, 'Password Should be more than 5 Characters'],
  },
  avatar: {
    public_id: {
      type: String,
      required: true,
    },
    url: {
      type: String,
      required: true,
    },
  },
  resetPasswordToken: String,
  resetPasswordExpire: Date,
})

//hash the password

Userschema.pre('save', async function (next) {
  if (!this.isModified('password')) {
    next()
  }
  this.password = await bcrypt.hash(this.password, 10)
})

Userschema.methods.getJWTToken = function () {
  return jwt.sign({ id: this._id }, process.env.SECRET_KEY, {
    expiresIn: process.env.EXPIRY,
  })
}

Userschema.methods.comparePassword = async function (enteredPassword) {
  return await bcrypt.compare(enteredPassword, this.password)
}

module.exports = mongoose.model('Users', Userschema)
