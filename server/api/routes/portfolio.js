const router = require('express').Router()

// Require all middlewares
const { isValidApiKey, isAuthenticated } = require('../middlewares/auth')
const uploads = require('../middlewares/upload')
// Require all controllers
const {
	getAllPostfolioGroupGetController,
	createPortfolioGroupPostController,
	updatePortfolioGroupPutController,
	deletePortfolioGroupDeleteController,
	getAllPostfolioProjectGetController,
	createPortfolioItemPostController,
	updatePortfolioItemPutController,
	deletePortfolioItemDeleteController,
} = require('../controllers/portfolio')

router.get('/', isValidApiKey(), isAuthenticated(), getAllPostfolioGroupGetController)
router.post('/create', isValidApiKey(), isAuthenticated(), createPortfolioGroupPostController)
router.put('/update/:id', isValidApiKey(), isAuthenticated(), updatePortfolioGroupPutController)
router.delete('/delete/:id', isValidApiKey(), isAuthenticated(), deletePortfolioGroupDeleteController)
router.get('/projects', isValidApiKey(), isAuthenticated(), getAllPostfolioProjectGetController)
router.post(
	'/project/create/:id',
	isValidApiKey(),
	isAuthenticated(),
	uploads.fields([
		{ name: 'thumbnail', maxCount: 1 },
		{ name: 'images', maxCount: 30 },
	]),
	createPortfolioItemPostController
)
router.put(
	'/project/update/:id',
	isValidApiKey(),
	isAuthenticated(),
	uploads.fields([
		{ name: 'thumbnail', maxCount: 1 },
		{ name: 'images', maxCount: 30 },
	]),
	updatePortfolioItemPutController
)
router.delete('/project/delete/:id', isValidApiKey(), isAuthenticated(), deletePortfolioItemDeleteController)
module.exports = router
