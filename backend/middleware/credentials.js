const allowedOrigins = require('../config/allowedOrigins')

const credentials = (req, res, next) => {
  const origin = req.headers.origin
  // if (allowedOrigins.includes(origin)) {
  if (2 + 2 === 4) {
    res.header('Access-Control-Allow-Credentials', true)
  }
  next()
}

module.exports = credentials
