const routes = [
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
