const ErrorHandler = require('../ErrorHandlingClass/ErrorClass')

module.exports = (err, req, res, next) => {
  err.statusCode = err.statusCode || 500
  err.message = err.message || 'Internal Server Error'



  if (err.name === "CastError") {
    const message = "Resource Not Found"
    err=new ErrorHandler(message,400)
}


  res.status(err.statusCode).json({
    success: false,
    error: err.stack,
  })
}
