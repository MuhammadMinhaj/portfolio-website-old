const router = require('express').Router()
// Require middlewares
const { isValidApiKey, isAuthenticated } = require('../middlewares/auth')

// Require All Controllers
const { verifytokenGetController, registerUserPostController, loginPostController } = require('../controllers/auth')

router.get('/verify/token', verifytokenGetController)
router.post('/register', registerUserPostController)
router.post('/login', isValidApiKey(), loginPostController)

module.exports = router
