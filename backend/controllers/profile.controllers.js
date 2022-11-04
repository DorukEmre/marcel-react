const cloudinary = require('../middleware/cloudinary')
// const Post = require("../models/Post.model");
const User = require('../models/User.model')

module.exports = {
  getMyProfile: async (req, res) => {
    console.log('req.body', req.body)
    console.log('req.user', req.user)
    try {
      const foundUser = await User.findOne({ email: req.user })

      res
        .status(200)
        .json({
          profilePicUrl: foundUser.profilePicUrl,
          username: foundUser.username,
        })
    } catch (err) {
      console.log(err)
    }
  },
  updatePicture: async (req, res) => {
    // console.log('req.file', req.file)
    console.log('req.body', req.body)
    console.log('req.user', req.user)
    try {
      const result = await cloudinary.uploader.upload(req.file.path)

      const userId = req.body.currentUserId

      // .findOneAndUpdate({filter parameter}, {update}, {new:true returns the updated document} )
      let foundUser = await User.findOneAndUpdate(
        {
          // _id: userId,
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
      console.log('Profile pic updated')
      res.status(200).json({ profilePicUrl: foundUser.profilePicUrl })
    } catch (err) {
      console.log(err)
    }
  },
}
