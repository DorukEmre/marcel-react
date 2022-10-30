const cloudinary = require('../middleware/cloudinary')
const Post = require('../models/Post.model')
const Comment = require('../models/Comment.model')
const User = require('../models/User.model')

module.exports = {
  getFeed: async (req, res) => {
    try {
      const active = ['active', 'mid', 'mid', 'mid', 'mid']
      const posts = await Post.find()
        .sort({ createdAt: 'desc' })
        .populate('user')
        .lean() // .lean() tells Mongoose to skip instantiating a full Mongoose document and just give a JS object

      // res.render('feed.ejs', { posts, user: req.user, active })
      // console.log(
      //   'catNames',
      //   posts.map((x) => x.catName),
      // )
      res.status(200).json(posts)
    } catch (err) {
      console.log(err)
    }
  },
  getPost: async (req, res) => {
    const active = ['active', 'mid', 'mid', 'mid', 'mid']

    if (!req?.params?.postid)
      return res.status(400).json({ message: 'Post ID required.' })

    const post = await Post.findById(req.params.postid).populate('user').lean()

    if (!post) {
      return res
        .status(204)
        .json({ message: `No post matches ID ${req.params.postid}.` })
    }

    // const comments = await Comment.find({ postId: req.params.postid })
    //   .sort({ createdAt: 'asc' })
    //   .populate('user')
    //   .lean()

    res.json(post)
    // res.render('post.ejs', { post, comments, user: req.user, active })
  },
  createPost: async (req, res) => {
    try {
      // console.log('req.user', req.user)
      // console.log('req.file', req.file)
      // console.log('req.body', req.body)
      // Upload image to cloudinary
      const result = await cloudinary.uploader.upload(req.file.path)

      const foundUser = await User.findOne({ email: req.user })

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
        user: foundUser.id,
      })

      res.sendStatus(201)
    } catch (err) {
      console.log(err)
    }
  },
  likePost: async (req, res) => {
    try {
      const likedPost = await Post.findById(req.params.postid).lean()
      if (likedPost.greatCat.find((x) => x == req.user.id) == undefined) {
        await Post.findOneAndUpdate(
          { _id: req.params.postid },
          { $push: { greatCat: req.user.id } },
        )
        console.log('Likes +1')
      } else {
        await Post.findOneAndUpdate(
          { _id: req.params.postid },
          { $pull: { greatCat: req.user.id } },
        )
        console.log('Likes -1')
      }
      // res.redirect(`/post/${req.params.postid}`)
      res.redirect(`/feed`)
    } catch (err) {
      console.log(err)
    }
  },
  getComments: async (req, res) => {
    try {
      // console.log('req.params', req.params.postid)
      // const post = await Post.findById(req.params.postid).populate('user').lean()

      const comments = await Comment.find({ postId: req.params.postid })
        .sort({ createdAt: 'asc' })
        .populate('user')
        .lean()

      // const data = { post, comments }
      // console.log('data_getComments', comments)

      res.status(200).json(comments)
    } catch (err) {
      console.log(err)
    }
  },
  createComment: async (req, res) => {
    try {
      // console.log(req.body)
      // console.log(req.user)

      const foundUser = await User.findOne({ email: req.user })
      // console.log('foundUser', foundUser)
      await Comment.create({
        comment: req.body.newComment,
        user: foundUser.id,
        postId: req.params.postid,
      })
      const comments = await Comment.find({ postId: req.params.postid })
        .sort({ createdAt: 'asc' })
        .populate('user')
        .lean()

      res.status(201).json(comments)
    } catch (err) {
      console.log(err)
    }
  },
}
