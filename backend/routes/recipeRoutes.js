const express = require('express')

const router = express.Router()

const recipeController = require('../controllers/recipeController')

const { authorize, confirmUserAccess } = require('../middleware/authMiddleware')

router.post('/', authorize, recipeController.add)

module.exports = router