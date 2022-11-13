const Post = require('../models/Post.model')
const User = require('../models/User.model')
// const Comment = require('../models/Comment.model')

module.exports = {
  getExplore: async (req, res) => {
    const foundUser = await User.findOne({ email: req.user })

    const posts = await Post.find({
      user: { $nin: foundUser.blockedUsers },
      hiddenBy: { $ne: foundUser.id },
      showLocation: true,
    })
      .populate('user')
      .lean()

    res.status(200).json({ posts })
  },
}
