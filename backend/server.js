const express = require('express')
const app = express()
const session = require('express-session')
const MongoStore = require('connect-mongo')
const logger = require('morgan')
const path = require('path')
const cors = require('cors')
const connectDB = require('./config/database')
const corsOptions = require('./config/corsOptions')

const authRoutes = require('./routes/auth.routes')
const mainRoutes = require('./routes/main.routes')
const postsRoutes = require('./routes/posts.routes')
const groupsRoutes = require('./routes/groups.routes')
const profileRoutes = require('./routes/profile.routes')

const cookieParser = require('cookie-parser')
const { Console } = require('console')

//Use .env file
require('dotenv').config()

//Body Parsing
// extended option: false to parse the URL-encoded data with the query string library; true allows to parse nested JSON like objects and arrays (qs library)
app.use(express.urlencoded({ extended: true }))

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

//Static Folder
app.use(express.static('public'))

//Setup Routes For Which The Server Is Listening
app.use('/api/', authRoutes)
app.use('/api/', mainRoutes)
// Every route after will use verifyJWT, added directly to route file instead
// app.use(verifyJWT)
app.use('/api/posts', postsRoutes)
app.use('/api/groups', groupsRoutes)
app.use('/api/profile', profileRoutes)

console.log(path.resolve(__dirname))
const testFolder = './frontend'
const fs = require('fs')

fs.readdirSync(testFolder).forEach((file) => {
  console.log(file)
})

console.log(process.env.NODE_ENV)
console.log(`I read you`)

// Serve frontend
if (process.env.NODE_ENV === 'production') {
  app.use(express.static(path.join(__dirname, '../frontend/dist')))
  console.log(path.resolve(__dirname))

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

// Connect To Database first, then listen for requests
connectDB().then(() => {
  // client.connect(async (err) => {
  //Connect To Database
  // if (err) {
  //   console.error(err)
  //   return false
  // }
  // connection to mongo is successful, listen for requests
  app.listen(port, () => {
    console.log(`yes`)
    console.log(`Server is running on port ${port} -`)
  })
  // })
})
