const cloudinary = require('../middleware/cloudinary')
const sharp = require('sharp')
let streamifier = require('streamifier')
// const Post = require("../models/Post.model");
const User = require('../models/User.model')

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
    // console.log('req.file.path', req.file.path)
    // console.log('req.body', req.body)
    // console.log('req.user', req.user)

    try {
      // Sharp transforms to buffer
      const data = await sharp(req.file.path)
        .resize({ width: 300 })
        .toFormat('jpeg')
        .toBuffer()

      // Convert buffer to stream before upload to cloudinary with .pipe() method
      let uploadFromBuffer = (req) => {
        return new Promise((resolve, reject) => {
          let cld_upload_stream = cloudinary.uploader.upload_stream(
            (error, result) => {
              if (result) {
                resolve(result)
              } else {
                reject(error)
              }
            },
          )
          streamifier.createReadStream(data).pipe(cld_upload_stream)
        })
      }
      let result = await uploadFromBuffer(req)

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
