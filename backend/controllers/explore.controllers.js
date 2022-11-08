const Post = require('../models/Post.model')
// const User = require('../models/User.model')
// const Comment = require('../models/Comment.model')

module.exports = {
  getExplore: async (req, res) => {
    const posts = await Post.find().populate('user').lean()
    let catsWithLocation = posts.filter((post) => post.showLocation === true)

    res.status(200).json({ catsWithLocation })
  },
}
