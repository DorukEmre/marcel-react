const cloudinary = require('../middleware/cloudinary')
const Post = require('../models/Post.model')
const Comment = require('../models/Comment.model')

module.exports = {
  getFeed: async (req, res) => {
    try {
      const active = ['active', 'mid', 'mid', 'mid', 'mid']
      const posts = await Post.find()
        .sort({ createdAt: 'desc' })
        .populate('user')
        .lean() // .lean() tells Mongoose to skip instantiating a full Mongoose document and just give a JS object

      // res.render('feed.ejs', { posts, user: req.user, active })
      // console.log('posts', posts)
      res.json(posts)
    } catch (err) {
      console.log(err)
    }
  },
  getSpot: (req, res) => {
    const active = ['mid', 'mid', 'active', 'mid', 'mid']
    res.render('spot.ejs', { active })
  },
  getPost: async (req, res) => {
    const active = ['active', 'mid', 'mid', 'mid', 'mid']
    const post = await Post.findById(req.params.id).populate('user').lean()
    const comments = await Comment.find({ postId: req.params.id })
      .sort({ createdAt: 'asc' })
      .populate('user')
      .lean()

    res.render('post.ejs', { post, comments, user: req.user, active })
  },
  createPost: async (req, res) => {
    try {
      // Upload image to cloudinary
      const result = await cloudinary.uploader.upload(req.file.path)

      await Post.create({
        catName: req.body.catName,
        // image: [
        //   {
        //     url: result.secure_url,
        //     cloudinaryId: result.public_id,
        //     // GPS: ,
        //   },
        // ],
        imageUrl: result.secure_url,
        cloudinaryId: result.public_id,
        caption: req.body.comment,
        user: req.user.id,
      })
      console.log('Post has been added!')
      res.redirect('/feed')
    } catch (err) {
      console.log(err)
    }
  },
  likePost: async (req, res) => {
    try {
      const likedPost = await Post.findById(req.params.id).lean()
      if (likedPost.greatCat.find((x) => x == req.user.id) == undefined) {
        await Post.findOneAndUpdate(
          { _id: req.params.id },
          { $push: { greatCat: req.user.id } },
        )
        console.log('Likes +1')
      } else {
        await Post.findOneAndUpdate(
          { _id: req.params.id },
          { $pull: { greatCat: req.user.id } },
        )
        console.log('Likes -1')
      }
      // res.redirect(`/post/${req.params.id}`)
      res.redirect(`/feed`)
    } catch (err) {
      console.log(err)
    }
  },
  getComments: async (req, res) => {
    try {
      const post = await Post.findById(req.params.id).populate('user').lean()

      const comments = await Comment.find({ postId: req.params.id })
        .sort({ createdAt: 'asc' })
        .populate('user')
        .lean()
      console.log('comments', comments)

      // const { cloudinaryId, GPS, reports, ...others } = post

      const data = { post, comments }
      console.log('data_getComments', data)

      res.json(data)
    } catch (err) {
      console.log(err)
    }
  },
  createComment: async (req, res) => {
    try {
      console.log('createComment')
      console.log(req.body)
      console.log(req.body.comment)
      await Comment.create({
        comment: req.body.comment,
        user: req.user.id,
        postId: req.params.id,
      })
      console.log('Comment has been added!')
      res.redirect(`/posts/${req.params.id}`)
    } catch (err) {
      console.log(err)
    }
  },
}
