const router = require('express').Router()
const { isAuthenticated, isValidApiKey } = require('../middlewares/auth')
const {
	contactGetDataGetController,
	contactSendPostController,
	contactDeleteDeleteController,
	contactSendMailPostController,
} = require('../controllers/contact')

router.get('/', isValidApiKey(), isAuthenticated(), contactGetDataGetController)
router.post('/', isValidApiKey(), contactSendPostController)
router.delete('/:id', isValidApiKey(), isAuthenticated(), contactDeleteDeleteController)
router.post('/send/mail/:email', isValidApiKey(), isAuthenticated(), contactSendMailPostController)

module.exports = router
