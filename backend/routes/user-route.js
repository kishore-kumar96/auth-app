const express = require('express')
const router = express.Router()
const userController = require("../controllers/user-controller")
const auth = require("../middleware/auth")
router.get('/:id', [auth], userController.getUser)
router.post('/new', userController.createUser)

module.exports = router;