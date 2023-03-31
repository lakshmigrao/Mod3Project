const express = require('express')

const router = express.Router()

const recipeController = require('../controllers/recipeController')

const { authorize, confirmUserAccess } = require('../middleware/authMiddleware')

router.post('/', authorize, recipeController.add)

router.get('/myrecipes/:name',authorize,recipeController.show)

router.put('/myrecipes/:name/edit/:rid',authorize,recipeController.updateRecipe)

router.delete('/myrecipes/:name/:recipeId',authorize,recipeController.delete)

router.get('/myrecipes/:name/edit/:rid',authorize,recipeController.showRecipe)
module.exports = router