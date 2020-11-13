import React, { useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { Switch, Route, Redirect, useLocation } from 'react-router-dom'
import { Typography, IconButton } from '@material-ui/core'
import { Replay as ReplayIcon } from '@material-ui/icons'

import Dashboard from './pages/dashboard'
import Subscriptions from './pages/subscriptions'
import PortfolioCreation from './pages/portfolioCreation'
import Portfolio from './pages/portfolio'
import AllBlogs from './pages/allBlogs'
import BlogCreation from './pages/blogCreation'
import Contact from './pages/contact'
import Login from './pages/login'

// Imported Redux Actions
import { tokenVarifyMiddleware } from './redux/actions/app'

// Insert here All Routes and Components
const routes = [
	{
		path: '/login',
		component: Login,
	},
	{
		path: '/dashboard',
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
		path: '/blogs',
		component: AllBlogs,
	},
	{
		path: '/contact',
		component: Contact,
	},
]

const ProtectedRoute = props => {
	return <Route path={props.path} render={data => (localStorage.getItem('token') ? <props.component {...data} /> : <Redirect to="/login" />)}></Route>
}

const UnProtectedRoute = props => {
	return (
		<Route path={props.path} render={data => (localStorage.getItem('token') ? <Redirect to="/dashboard" /> : <props.component {...data} />)}></Route>
	)
}

export default () => {
	const dispatch = useDispatch()
	const location = useLocation()
	const { isLoggedIn } = useSelector(state => state.app)
	useEffect(() => {
		dispatch(tokenVarifyMiddleware())
	}, [dispatch, location.pathname])

	useEffect(() => {
		window.addEventListener('storage', function (e) {
			localStorage.removeItem('token')
			window.location.reload()
		})
	}, [])
	return (
		<Switch>
			{routes.map((route, index) =>
				route.path === '/login' ? (
					<UnProtectedRoute path={route.path} component={route.component} key={index} />
				) : (
					<ProtectedRoute path={route.path} component={route.component} key={index} />
				)
			)}
			{isLoggedIn && <Redirect to="/dashboard" />}
			<Route path="*">
				<div>
					<Typography align="center" variant="h2" component="h6" color="textSecondary">
						404 PAGE NOT FOUND
					</Typography>
					<br />
					<div style={{ textAlign: 'center' }}>
						<IconButton color="primary" href="/login">
							Back To Home
							<ReplayIcon />
						</IconButton>
					</div>
				</div>
			</Route>
		</Switch>
	)
}
