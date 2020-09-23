import React from 'react'
import { Switch, Route } from 'react-router-dom'
import Home from './components'
import About from './components/about'
import Skills from './components/skills'
import Contact from './components/contact'
import Portfolio from './components/portfolio'
import Services from './components/services'
import Blogs from './components/blogs/'
import ContentBlog from './components/blogs/blogContent'

const routes = [
	{
		path: '/',
		component: Home,
	},
	{
		path: '/about',
		component: About,
	},
	{
		path: '/skills',
		component: Skills,
	},
	{
		path: '/contact',
		component: Contact,
	},
	{
		path: '/portfolio',
		component: Portfolio,
	},
	{
		path: '/blogs/:groupid/:postid',
		component: ContentBlog,
	},
	{
		path: '/blogs',
		component: Blogs,
	},

	{
		path: '/services',
		component: Services,
	},
]

const Routes = () => {
	return (
		<>
			<Switch>
				{routes.map((r, ind) =>
					r.path === '/' ? <Route key={ind} exact path={r.path} component={r.component} /> : <Route key={ind} path={r.path} component={r.component} />
				)}
			</Switch>
		</>
	)
}
export default Routes
