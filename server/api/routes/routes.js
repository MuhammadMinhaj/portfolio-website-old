const authRoutes = require('./auth')
const portfolioRoutes = require('./portfolio')
const blogsRoute = require('./blogs')
const contactRoute = require('./contact')

const routes = [
	{
		path: '/api/auth',
		handle: authRoutes,
	},

	{
		path: '/api/portfolio',
		handle: portfolioRoutes,
	},
	{
		path: '/api/blogs',
		handle: blogsRoute,
	},
	{
		path: '/api/contact',
		handle: contactRoute,
	},
	{
		path: '/',
		handle: (req, res, next) => {
			res.send('<h1>Assalamu Alaikum</h1>')
		},
	},
]

module.exports = app => {
	routes.forEach(route => {
		if (route.path === '/') {
			app.get(route.path, route.handle)
		} else {
			app.use(route.path, route.handle)
		}
	})
}
