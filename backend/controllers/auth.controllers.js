const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')
const User = require('../models/User.model')
require('dotenv').config()

exports.postLogin = async (req, res) => {
  const { email, password } = req.body

  if (!email || !password)
    return res.status(400).json({ message: 'Email and password are required.' })

  const foundUser = await User.findOne({ email }).exec()

  if (!foundUser) return res.sendStatus(401) //Unauthorized

  // evaluate password
  const match = await bcrypt.compare(password, foundUser.password)
  console.log('match', match)

  if (match) {
    // create JWTs
    const accessToken = jwt.sign(
      // {
      //   UserInfo: {
      //     email: foundUser.email,
      //   },
      // },
      { email: foundUser.email },
      process.env.ACCESS_TOKEN_SECRET,
      { expiresIn: '15m' },
    )
    const refreshToken = jwt.sign(
      { email: foundUser.email },
      process.env.REFRESH_TOKEN_SECRET,
      { expiresIn: '5d' },
    )
    // Saving refreshToken with current user
    foundUser.refreshToken = refreshToken
    // const currentUser = { ...foundUser, refreshToken}
    const result = await foundUser.save()
    console.log(result.userName)

    // Creates Secure Cookie with refresh token (httpOnly -> not available to JS)
    res.cookie('jwt', refreshToken, {
      httpOnly: true,
      secure: true,
      sameSite: 'None',
      maxAge: 5 * 24 * 60 * 60 * 1000,
    })

    // Send access token to user
    res.json({ accessToken })
  } else {
    console.log('else res.sendStatus(401)')
    res.sendStatus(401)
  }
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
    //create and store the new user
    // Password is encrypted in user.model
    const result = await User.create({
      userName: username,
      email: email,
      password: password,
    })
    // console.log('User created', result)

    res.status(201).json({ success: `New user ${username} created!`, username })
  } catch (err) {
    res.status(500).json({ message: err.message })
  }
}
