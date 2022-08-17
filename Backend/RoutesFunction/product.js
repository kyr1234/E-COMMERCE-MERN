const Products = require('../models/ProductModel')

/** Admin Functions*/

exports.createProduct=async(req, res) =>{
  const product = await Products.create(req.body)

  res.status(201).json({
    message: 'Success',
    product,
  })
}

/**OPEN GET CALLS*/
exports.allproducts=async(req, res)=> {
  const allitems = await Products.find()
  res.status(200).json({
    message: 'Success',
    allitems,
  })
}

