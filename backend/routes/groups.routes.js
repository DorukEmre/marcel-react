const express = require('express')
const router = express.Router()
const groupsController = require('../controllers/groups.controllers')
// const { ensureAuth, ensureGuest } = require('../middleware/auth')

router.get('/:id', groupsController.getGroup)

router.post('/createGroup', groupsController.createGroup)

module.exports = router
