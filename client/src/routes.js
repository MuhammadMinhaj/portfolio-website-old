import React, { useEffect } from 'react'
import { Switch, Route, useLocation } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import Header from './common/header'
import Home from './components'
import About from './components/about'
import Skills from './components/skills'
import Contact from './components/contact'
import Portfolio from './components/portfolio'
import Services from './components/services'
import Blog from './components/blog'

import { getDataFromServer } from './redux/actions/portfolio'

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
		path: '/services',
		component: Services,
	},
	{
		path: '/blogs',
		component: Blog,
	},
]

const Routes = () => {
	const dispatch = useDispatch()
	const isLocation = useLocation()
	const { portfolio } = useSelector(state => state)

	useEffect(() => {
		if (isLocation.pathname.slice(0, 6) !== '/blogs') {
			if (portfolio.groups.length === 0 && portfolio.projects.length === 0) {
				dispatch(getDataFromServer())
			}
		}
	}, [dispatch, isLocation.pathname, portfolio.groups.length, portfolio.projects.length])

	return (
		<>
			{isLocation.pathname.slice(0, 6) !== '/blogs' && <Header />}
			<Switch>
				{routes.map((r, ind) =>
					r.path === '/' ? <Route key={ind} exact path={r.path} component={r.component} /> : <Route key={ind} path={r.path} component={r.component} />
				)}
			</Switch>
		</>
	)
}
export default Routes
