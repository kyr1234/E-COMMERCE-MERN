const mongoose = require('mongoose')

const products = mongoose.Schema({
  name: {
    type: String,
    required: [true, 'ENTER THE NAME'],
  },

  description: {
    type: String,
    required: [true, 'ENTER THE DESCRIPTION'],
  },
  price: {
    type: Number,
    maxLength: [6, 'ENTER A PRICE BELOW 6 FIGURES'],
    required: [true, 'ENTER THE PRICE'],
  },
  rating: {
    type: Number,
    default: 0,
  },
  AdminId: {
    type: mongoose.Schema.ObjectId,
    ref: 'Users',
    required: true,
  },
  AdminName: {
    type: String,
    requied: true,
  },

  image: [
    {
      public_id: {
        type: String,
        required: true,
      },
      url: {
        type: String,
        required: true,
      },
    },
  ],
  category: {
    type: String,
    required: [true, 'Enter the Category'],
  },
  Stock: {
    type: Number,
    required: [true, 'Enter the Product Stock'],
    maxLength: [5, 'SHOULD BE LESS THAN 10K'],
    default: 1,
  },

  noOfReviews: {
    type: Number,
    default: 0,
  },

  review: [
    {
      user: {
        type: mongoose.Schema.ObjectId,
        ref: 'Users',
        required: true,
      },
      name: {
        type: String,
        required: true,
      },
      rating: {
        type: Number,
        required: true,
      },
      comment: {
        type: String,
        required: true,
      },
    },
  ],
  createdAt: {
    type: Date,
    default: Date.now,
  },
})

module.exports = mongoose.model('Products', products)
