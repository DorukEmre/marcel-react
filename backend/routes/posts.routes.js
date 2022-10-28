const express = require('express')
const router = express.Router()
const upload = require('../middleware/multer')
const postsController = require('../controllers/posts.controllers')
const verifyJWT = require('../middleware/verifyJWT')

router.use(verifyJWT)

// router.get('/:postid', postsController.getPost)
router.get('/getComments/:postid', postsController.getComments)
router.post('/createComment/:postid', postsController.createComment)

// POST new cat pictures, upload and checks through Multer 'upload.single("file")'
router.post('/createPost', upload.single('file'), postsController.createPost)

router.put('/likePost/:postid', postsController.likePost)

module.exports = router
