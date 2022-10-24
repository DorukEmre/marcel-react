const express = require('express')
const router = express.Router()
const authController = require('../controllers/auth.controllers')
const homeController = require('../controllers/home.controllers')
const groupsController = require('../controllers/groups.controllers')
const exploreController = require('../controllers/explore.controllers')
const postsController = require('../controllers/posts.controllers')
const profileController = require('../controllers/profile.controllers')
const { ensureAuth, ensureGuest } = require('../middleware/auth')
const verifyJWT = require('../middleware/verifyJWT')

router.post('/signup', authController.postSignup)
router.post('/login', authController.postLogin)

// GET posts from all users
/////////////////////////
// router.get('/feed', verifyJWT, postsController.getFeed)
/////////////////////////
router.get('/feed', postsController.getFeed)

// //////////////

// router.get('/', homeController.getIndex)

router.get('/demo', homeController.getDemo)

// router.get('/login', authController.getLogin)
router.get('/logout', authController.logout)
// router.get('/signup', authController.getSignup)

// GET specific post
// router.get('/posts/:id', ensureAuth, postsController.getPost)

// GET page to post new cat pictures
router.get('/spot', ensureAuth, postsController.getSpot)

// GET page to explore map of cats in the neighborhood
router.get('/explore', ensureAuth, exploreController.getExplore)

// GET page to manage groups
router.get('/groups', ensureAuth, groupsController.getGroups)
// POST to join new group
// router.post("/groups", ensureAuth, groupsController.getGroups);
// DELETE to remove group
// router.delete("/groups", ensureAuth, groupsController.getGroups);

// GET profile page
router.get('/profile', ensureAuth, profileController.getProfile)
// PUT update profile page
// router.put("/profile", ensureAuth, profileController.getProfile);
// DELETE profile
// router.delete("/profile", ensureAuth, profileController.getProfile);

module.exports = router
