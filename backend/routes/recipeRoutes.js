const express = require('express')

const router = express.Router()

const recipeController = require('../controllers/recipeController')

const { authorize, confirmUserAccess } = require('../middleware/authMiddleware')

router.post('/', authorize, recipeController.add)

router.get('/myrecipes/:name',authorize,recipeController.show)

module.exports = router