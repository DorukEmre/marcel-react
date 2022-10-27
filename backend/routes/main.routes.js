const express = require('express')
const router = express.Router()
const homeController = require('../controllers/home.controllers')
const groupsController = require('../controllers/groups.controllers')
const exploreController = require('../controllers/explore.controllers')
const postsController = require('../controllers/posts.controllers')
const profileController = require('../controllers/profile.controllers')
const verifyJWT = require('../middleware/verifyJWT')

router.use(verifyJWT)

// GET posts from all users
router.get('/feed', postsController.getFeed)
// GET page to manage groups
router.get('/groups', groupsController.getGroups)

// //////////////

// router.get('/', homeController.getIndex)

router.get('/demo', homeController.getDemo)

// GET page to post new cat pictures
router.get('/spot', postsController.getSpot)

// GET page to explore map of cats in the neighborhood
router.get('/explore', exploreController.getExplore)

// POST to join new group
// router.post("/groups", ensureAuth, groupsController.getGroups);
// DELETE to remove group
// router.delete("/groups", ensureAuth, groupsController.getGroups);

// GET profile page
router.get('/profile', profileController.getProfile)
// PUT update profile page
// router.put("/profile", ensureAuth, profileController.getProfile);
// DELETE profile
// router.delete("/profile", ensureAuth, profileController.getProfile);

module.exports = router
