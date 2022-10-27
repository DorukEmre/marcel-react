const express = require('express')
const router = express.Router()
const groupsController = require('../controllers/groups.controllers')
const verifyJWT = require('../middleware/verifyJWT')

router.use(verifyJWT)

router.get('/:id', groupsController.getGroup)

router.post('/createGroup', groupsController.createGroup)

module.exports = router
