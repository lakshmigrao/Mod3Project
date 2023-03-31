const express = require('express')
const router = express.Router()
const userCtrl = require('../controllers/userController')

router.get('/', userCtrl.show)

router.put('/profile/edit', userCtrl.updateProfile)

router.delete('/profile',userCtrl.deleteProfile)

module.exports = router