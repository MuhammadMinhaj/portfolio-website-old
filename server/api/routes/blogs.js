const router = require('express').Router()

// Require middlewares
const { isValidApiKey, isAuthenticated } = require('../middlewares/auth')
const upload = require('../middlewares/upload')

// Require controllers
const {
	getPublicDataGetController,
	getBlogsGroupGetController,
	createBlogsPostController,
	updateBlogsPutController,
	deleteBlogsDeleteController,
	getAllBlogsPostsGetController,
	createPostPostController,
	updatePostPutController,
	deletePostDeleteController,
	subscriberDataGetController,
	subscribePostPostController,
	deleteSubscriberDeleteController,
	updateSubscriberPutController,
	mailSenderPostController,
} = require('../controllers/blogs')

router.get('/data', isValidApiKey(), getPublicDataGetController)
router.get('/', isValidApiKey(), isAuthenticated(), getBlogsGroupGetController)
router.get('/posts', isValidApiKey(), isAuthenticated(), getAllBlogsPostsGetController)
router.post('/create', isValidApiKey(), isAuthenticated(), upload.single('thumbnail'), createBlogsPostController)
router.put('/update/:id', isValidApiKey(), isAuthenticated(), upload.single('thumbnail'), updateBlogsPutController)
router.delete('/delete/:id', isValidApiKey(), isAuthenticated(), deleteBlogsDeleteController)
router.post('/post/create/:id', isValidApiKey(), isAuthenticated(), upload.single('thumbnail'), createPostPostController)
router.put('/post/update/:id', isValidApiKey(), isAuthenticated(), upload.single('thumbnail'), updatePostPutController)
router.delete('/post/delete/:id', isValidApiKey(), isAuthenticated(), deletePostDeleteController)

router.get('/subscribe', isAuthenticated(), isValidApiKey(), subscriberDataGetController)
router.post('/subscribe', isValidApiKey(), subscribePostPostController)
router.delete('/subscribe/delete/:id', isAuthenticated(), isValidApiKey(), deleteSubscriberDeleteController)
router.put('/subscribe/update/:id', isAuthenticated(), isValidApiKey(), updateSubscriberPutController)
router.post('/mail/send', isAuthenticated(), isValidApiKey(), mailSenderPostController)
module.exports = router
