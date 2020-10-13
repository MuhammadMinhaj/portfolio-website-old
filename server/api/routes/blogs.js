const router = require('express').Router()

// Require middlewares
const { isValidApiKey, isAuthenticated } = require('../middlewares/auth')
const upload = require('../middlewares/upload')

// Require controllers
const {
	getBlogsGroupGetController,
	createBlogsPostController,
	updateBlogsPutController,
	deleteBlogsDeleteController,
	getAllBlogsPostsGetController,
	createPostPostController,
	updatePostPutController,
	deletePostDeleteController,
} = require('../controllers/blogs')

router.get('/', isValidApiKey(), isAuthenticated(), getBlogsGroupGetController)
router.get('/posts', isValidApiKey(), isAuthenticated(), getAllBlogsPostsGetController)
router.post('/create', isValidApiKey(), isAuthenticated(), createBlogsPostController)
router.put('/update/:id', isValidApiKey(), isAuthenticated(), updateBlogsPutController)
router.delete('/delete/:id', isValidApiKey(), isAuthenticated(), deleteBlogsDeleteController)
router.post('/post/create/:id', isValidApiKey(), isAuthenticated(), upload.single('thumbnail'), createPostPostController)
router.put('/post/update/:id', isValidApiKey(), isAuthenticated(), upload.single('thumbnail'), updatePostPutController)
router.delete('/post/delete/:id', isValidApiKey(), isAuthenticated(), deletePostDeleteController)

module.exports = router
