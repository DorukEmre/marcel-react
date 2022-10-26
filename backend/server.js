const express = require('express')
const app = express()
const session = require('express-session')
const MongoStore = require('connect-mongo')
const logger = require('morgan')
const path = require('path')
const cors = require('cors')
const connectDB = require('./config/database')
const corsOptions = require('./config/corsOptions')
const credentials = require('./middleware/credentials')

const authRoutes = require('./routes/auth.routes')
const mainRoutes = require('./routes/main.routes')
const postsRoutes = require('./routes/posts.routes')
const groupsRoutes = require('./routes/groups.routes')

const verifyJWT = require('./middleware/verifyJWT')
const cookieParser = require('cookie-parser')

//Use .env file
require('dotenv').config()

//Connect To Database
connectDB()

//Using EJS for views
// app.set('view engine', 'ejs')

//Static Folder
app.use(express.static('public'))

//Body Parsing
// extended option: false to parse the URL-encoded data with the query string library; true allows to parse nested JSON like objects and arrays (qs library)
app.use(express.urlencoded({ extended: true }))

// Handle options credentials check - before CORS!
// and fetch cookies credentials requirement
app.use(credentials)

// Cross Origin Resource Sharing
app.use(cors(corsOptions))

app.use(express.json())

//Logging
app.use(logger('dev'))

//middleware for cookies
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
//
// app.use((req, res, next) => {
//   res.locals.currentUser = req.session.passport
//     ? req.session.passport.user
//     : undefined
//   next()
// })

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

//Setup Routes For Which The Server Is Listening
app.use('/', authRoutes)
app.use('/', mainRoutes)
app.use(verifyJWT) // Every route after will use verifyJWT
app.use('/users', require('./routes/users.routes'))
app.use('/posts', postsRoutes)
app.use('/groups', groupsRoutes)

//Server Running
const port = process.env.PORT || 9191
app.listen(port, () => {
  console.log(`Server is running on port ${port}`)
})
