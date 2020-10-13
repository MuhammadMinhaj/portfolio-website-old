import React from 'react'
import { Switch, Route } from 'react-router-dom'
import Dashboard from './components/dashboard'
import Subscriptions from './components/subscriptions'
import PortfolioCreation from './components/portfolioCreation'
import Portfolio from './components/portfolio'
import Users from './components/users'
import AllBlogs from './components/allBlogs'
import BlogCreation from './components/blogCreation'
// Insert here All Routes and Components
const routes = [
	{
		path: '/',
		component: Dashboard,
	},
	{
		path: '/subscriptions',
		component: Subscriptions,
	},
	{
		path: '/portfolio/creation',
		component: PortfolioCreation,
	},
	{
		path: '/portfolio',
		component: Portfolio,
	},
	{
		path: '/blogs/creation',
		component: BlogCreation,
	},
	{
		path: '/users',
		component: Users,
	},
	{
		path: '/blogs',
		component: AllBlogs,
	},
]
export default () => {
	return (
		<Switch>
			{routes.map((route, index) =>
				route.path === '/' ? (
					<Route path={route.path} exact component={route.component} key={index} />
				) : (
					<Route path={route.path} component={route.component} key={index} />
				)
			)}
		</Switch>
	)
}
