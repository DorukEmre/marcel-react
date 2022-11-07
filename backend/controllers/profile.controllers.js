const resizeAndCloudinary = require('../middleware/resize')
const User = require('../models/User.model')
// const Post = require("../models/Post.model");

module.exports = {
  getMyProfile: async (req, res) => {
    // console.log('req.body', req.body)
    // console.log('req.user', req.user)
    try {
      const foundUser = await User.findOne({ email: req.user })

      res.status(200).json({
        profilePicUrl: foundUser.profilePicUrl,
        username: foundUser.username,
      })
    } catch (err) {
      console.log(err)
    }
  },

  updatePicture: async (req, res) => {
    // console.log('req.file', req.file)
    // console.log('req.body', req.body)
    // console.log('req.user', req.user)
    try {
      const result = await resizeAndCloudinary(req, 300, 'profile')

      // console.log('result', result)

      // .findOneAndUpdate({filter parameter}, {update}, {new:true returns the updated document} )
      let foundUser = await User.findOneAndUpdate(
        {
          email: req.user,
        },
        {
          profilePicUrl: result.secure_url,
          cloudinaryId: result.public_id,
        },
        {
          new: true,
        },
      )
      // console.log('Profile pic updated')
      res.status(200).json({ profilePicUrl: foundUser.profilePicUrl })
    } catch (err) {
      console.log(err)
    }
  },
}
