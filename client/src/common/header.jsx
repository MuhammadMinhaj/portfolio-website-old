import React, { useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'
// import LoadingBar from 'react-top-loading-bar'

import { Link } from 'react-router-dom'
import { Container, useMediaQuery, Grow, Typography, AppBar, Toolbar, CssBaseline, useScrollTrigger, Slide } from '@material-ui/core'

import { Menu as MenuIcon, RestaurantMenu as RestaurantMenuIcon } from '@material-ui/icons'

import styled from './style.module.css'

// Imported Actions
import { handleMenu, handleNavAnimationBar } from '../redux/actions'

const Item = props => {
	return (
		<li>
			<Link to={props.path} style={props.style}>
				<Typography variant="button">{props.value}</Typography>
			</Link>
		</li>
	)
}

const Menu = () => {
	const state = useSelector(state => state.web)
	const isMatchedWidth = useMediaQuery('(min-width:576px)')
	return (
		<Grow in>
			<ul>
				{state.navItems.map((item, ind) => (
					<Item
						key={ind}
						path={item.path}
						value={item.name}
						style={state.navItems.length === ind + 1 ? (!isMatchedWidth ? { borderBottom: 'none' } : {}) : {}}
					/>
				))}
			</ul>
		</Grow>
	)
}

const HideOnScroll = props => {
	const { children, window } = props
	const trigger = useScrollTrigger({ target: window ? window() : undefined })
	return (
		<Slide appear={false} direction="down" in={!trigger}>
			{children}
		</Slide>
	)
}

export default props => {
	const { isOpenMenu } = useSelector(state => state.web)
	const dispatch = useDispatch()
	const isMatchedWidth = useMediaQuery('(min-width:576px)')

	useEffect(() => {
		handleNavAnimationBar()
	}, [])

	return (
		<>
			<CssBaseline />
			<HideOnScroll {...props}>
				<AppBar className={styled.header} position="sticky">
					<Toolbar>
						<Container>
							<div className={styled.brand}>
								{!isMatchedWidth && (
									<>
										<Typography variant="h5" component="h6" style={{ color: '#ffffff' }}>
											Muhammad Minhaj
										</Typography>
										<div className={styled.mobileMenuIcon}>
											{isOpenMenu ? (
												<RestaurantMenuIcon onClick={() => dispatch(handleMenu())} />
											) : (
												<MenuIcon onClick={() => dispatch(handleMenu())} />
											)}
											MENU
										</div>
									</>
								)}
							</div>
							<nav className={styled.nav}>{!isMatchedWidth ? isOpenMenu && <Menu /> : <Menu />}</nav>
							<div id="navCirculer" className={styled.navCirculer}>
								{[...new Array(10)].map((e, i) => (
									<span key={i}></span>
								))}
							</div>
						</Container>
					</Toolbar>
				</AppBar>
			</HideOnScroll>
			{/* <Toolbar style={{ minHeight: isMatchedWidth ? '102px' : '87px' }} /> */}
		</>
	)
}
