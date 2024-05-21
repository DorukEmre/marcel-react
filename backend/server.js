const express = require('express')
const app = express()
const session = require('express-session')
const MongoStore = require('connect-mongo')
const logger = require('morgan')
const path = require('path')
const cors = require('cors')
const helmet = require('helmet')

const connectDB = require('./config/database')
const corsOptions = require('./config/corsOptions')

const authRoutes = require('./routes/auth.routes')
const mainRoutes = require('./routes/main.routes')
const postsRoutes = require('./routes/posts.routes')
const groupsRoutes = require('./routes/groups.routes')
const profileRoutes = require('./routes/profile.routes')

const cookieParser = require('cookie-parser')

//Use .env file
require('dotenv').config()

//Body Parsing
// extended option: false to parse the URL-encoded data with the query string library; true allows to parse nested JSON like objects and arrays (qs library)
app.use(express.urlencoded({ extended: true }))

// Helmet middleware for setting security headers
app.use(
  helmet({
    contentSecurityPolicy: {
      directives: {
        defaultSrc: ["'self'"],
        scriptSrc: ["'self'", "'unsafe-inline'", "'unsafe-eval'"],
        styleSrc: ["'self'", "'unsafe-inline'"],
        imgSrc: ["'self'", 'data:', 'https://res.cloudinary.com'],
        connectSrc: ["'self'", 'https://res.cloudinary.com'],
        fontSrc: ["'self'"],
        objectSrc: ["'none'"],
        mediaSrc: ["'self'"],
        frameSrc: ["'none'"],
      },
    },
  }),
)

// Redirect HTTP to HTTPS
if (process.env.NODE_ENV === 'production') {
  app.use((req, res, next) => {
    if (req.headers['x-forwarded-proto'] !== 'https') {
      return res.redirect(301, 'https://' + req.headers.host + req.url)
    }
    next()
  })
}

// Cross Origin Resource Sharing
app.use(cors(corsOptions))

app.use(express.json())

// Logging
app.use(logger('dev'))

// Cookies
app.use(cookieParser())

// Setup Sessions - stored in MongoDB
app.use(
  session({
    secret: process.env.SECRET,
    resave: false,
    saveUninitialized: false,
    store: MongoStore.create({ mongoUrl: process.env.DB_STRING }),
  }),
)

//Static Folder
app.use(express.static('public'))

//Setup Routes For Which The Server Is Listening
app.use('/api/', authRoutes)
app.use('/api/', mainRoutes)
// (Every route after will use verifyJWT) - added directly to routes files instead
// app.use(verifyJWT)
app.use('/api/posts', postsRoutes)
app.use('/api/groups', groupsRoutes)
app.use('/api/profile', profileRoutes)

// Serve frontend
if (process.env.NODE_ENV === 'production') {
  app.use(express.static(path.join(__dirname, '../frontend/dist')))

  app.get('*', (req, res) =>
    res.sendFile(
      path.resolve(__dirname, '../', 'frontend', 'dist', 'index.html'),
    ),
  )
} else {
  app.get('/', (req, res) => res.send('Please set to production'))
}

//Server Running
const port = process.env.PORT || 9191

// If connection to database is successful, listen for requests
connectDB().then(() => {
  app.listen(port, () => {
    console.log(`Server is running on port ${port} -`)
  })
})
