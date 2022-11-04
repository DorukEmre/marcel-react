const express = require('express')
const router = express.Router()
const upload = require('../middleware/multer')
const profileController = require('../controllers/profile.controllers')
const verifyJWT = require('../middleware/verifyJWT')

router.use(verifyJWT)

router.get('/getMyProfile', profileController.getMyProfile)
router.put(
  '/updatePicture',
  upload.single('file'),
  profileController.updatePicture,
)

// router.get('/getComments/:postid', profileController.getComments)
// router.post('/createComment/:postid', profileController.createComment)

// router.put('/likePost/:postid', profileController.likePost)

module.exports = router
