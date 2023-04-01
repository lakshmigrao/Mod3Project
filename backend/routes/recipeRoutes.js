const express = require('express')

const router = express.Router()

const recipeController = require('../controllers/recipeController')

const { authorize, confirmUserAccess } = require('../middleware/authMiddleware')

router.post('/', authorize, recipeController.add)

router.delete('/:ridMeal',authorize,recipeController.deleteUsingIdmeal)

router.get('/myrecipes',authorize,recipeController.show)

router.put('/myrecipes/edit/:rid',authorize,recipeController.updateRecipe)

router.delete('/myrecipes/:rid',authorize,recipeController.delete)

router.get('/myrecipes/:rid',authorize,recipeController.showRecipe)
module.exports = router