const passport = require('passport')
const validator = require('validator')
const bcrypt = require('bcrypt')
const User = require('../models/User.model')

exports.getLogin = (req, res) => {
  if (req.user) {
    return res.redirect('/')
  }
  res.render('login', { title: 'Login' })
}

exports.postLogin = (req, res, next) => {
  const validationErrors = []
  if (!validator.isEmail(req.body.email))
    validationErrors.push({ msg: 'Please enter a valid email address.' })
  if (validator.isEmpty(req.body.password))
    validationErrors.push({ msg: 'Password cannot be blank.' })

  if (validationErrors.length) {
    req.flash('errors', validationErrors)
    return res.redirect('/login')
  }
  req.body.email = validator.normalizeEmail(req.body.email, {
    gmail_remove_dots: false,
  })

  passport.authenticate('local', (err, user, info) => {
    if (err) {
      return next(err)
    }
    if (!user) {
      req.flash('errors', info)
      return res.redirect('/login')
    }
    req.logIn(user, (err) => {
      if (err) {
        return next(err)
      }
      req.flash('success', { msg: 'Success! You are logged in.' })
      res.redirect(req.session.returnTo || '/')
    })
  })(req, res, next)
}

exports.logout = (req, res, next) => {
  req.logout((err) => {
    if (err) {
      return next(err)
    }
    console.log('User has logged out.')
    req.session.destroy((err) => {
      if (err)
        console.log('Error : Failed to destroy the session during logout.', err)
      req.user = null
      res.redirect('/')
    })
  })
}

// exports.getSignup = (req, res) => {
// if (req.user) {
//   return res.redirect('/')
// }
// res.render('signup', { title: 'Create Account' })
// }

exports.postSignup = async (req, res) => {
  const { username, email, password } = req.body
  if (!username || !email || !password)
    return res
      .status(400)
      .json({ message: 'Username, email and password are required.' })

  // check for duplicate usernames in the db
  const duplicateUsername = await User.findOne({
    userName: username,
  }).exec()
  if (duplicateUsername) {
    return res.status(409).json({ message: 'Username already in use.' })
  }

  // check for duplicate emails in the db
  const duplicateEmail = await User.findOne({ email }).exec()
  if (duplicateEmail) {
    return res.status(409).json({ message: 'Email already in use.' })
  }

  try {
    //encrypt the password
    const hashedPassword = await bcrypt.hash(password, 10)

    //create and store the new user
    const result = await User.create({
      userName: username,
      email: email,
      password: hashedPassword,
    })

    // console.log('User created', result)

    res.status(201).json({ success: `New user ${username} created!`, username })
  } catch (err) {
    res.status(500).json({ message: err.message })
  }
}
