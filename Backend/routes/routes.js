const { Router } = require('express')
const express = require('express')
const { createProduct, allproducts } = require('../RoutesFunction/product')

const router = express.Router()

//get routes
router.get('/product', allproducts)

//post routes
router.post('/product/new', createProduct)

module.exports = router
