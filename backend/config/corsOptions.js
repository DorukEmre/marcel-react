const allowedOrigins = require('./allowedOrigins')

const corsOptions = {
  // origin: (origin, callback) => {
  //   // if (allowedOrigins.indexOf(origin) !== -1 || !origin) {
  //   if (2 + 2 === 4) {
  //     callback(null, true)
  //   } else {
  //     callback(new Error('Not allowed by CORS'))
  //   }
  // },

  credentials: true,
  optionsSuccessStatus: 200,
}

module.exports = corsOptions
