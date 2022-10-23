const express = require('express')
const app = express()
const passport = require('passport')
const session = require('express-session')
const MongoStore = require('connect-mongo')
const methodOverride = require('method-override')
const flash = require('express-flash')
const logger = require('morgan')
const cors = require('cors')
const connectDB = require('./config/database')
const mainRoutes = require('./routes/main.routes')
const postsRoutes = require('./routes/posts.routes')
const groupsRoutes = require('./routes/groups.routes')

//Use .env file in config folder
require('dotenv').config()

// Passport config
require('./config/passport')(passport)

//Connect To Database
connectDB()

//Using EJS for views
// app.set('view engine', 'ejs')

//Static Folder
app.use(express.static('public'))

//Body Parsing
app.use(express.urlencoded({ extended: true }))
app.use(cors())
app.use(express.json())

//Logging
app.use(logger('dev'))

//Use forms for put / delete - look for query parameter '_method' in incoming POST requests
app.use(methodOverride('_method'))

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
app.use((req, res, next) => {
  res.locals.currentUser = req.session.passport
    ? req.session.passport.user
    : undefined
  next()
})

// Passport middleware
app.use(passport.initialize())
app.use(passport.session())

//Use flash messages for errors, info, ect...
app.use(flash())

//Setup Routes For Which The Server Is Listening
app.use('/', mainRoutes)
app.use('/posts', postsRoutes)
app.use('/groups', groupsRoutes)

//Server Running
app.listen(process.env.PORT || 9191, () => {
  console.log(`Server is running, http://localhost:${process.env.PORT}/`)
})
