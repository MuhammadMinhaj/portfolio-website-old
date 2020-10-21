import React, { useEffect, useState } from 'react'
import { useSelector, useDispatch } from 'react-redux'
// import LoadingBar from 'react-top-loading-bar'
import { Link, useLocation } from 'react-router-dom'
import { Container, useMediaQuery, Grow, Typography } from '@material-ui/core'
import MenuIcon from '@material-ui/icons/Menu'
import RestaurantMenuIcon from '@material-ui/icons/RestaurantMenu'
import styled from './style.module.css'

// Import Blogs Header
import { BlogsHeader } from '../components/blogs'

// Imported Actions
import { handleMenu, handleNavAnimationBar } from '../redux/actions'
const Span = <span></span>
const Item = props => {
	return (
		<li>
			<Link to={props.path} style={props.style}>
				<Typography variant="button">
					{props.value}
				</Typography>
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

const WebHeader = () => {
	const { isOpenMenu } = useSelector(state => state.web)
	const [scrollPos, setScrollPos] = useState()
	const dispatch = useDispatch()
	const isMatchedWidth = useMediaQuery('(min-width:576px)')

	useEffect(() => {
		handleNavAnimationBar()
	}, [])

	const handleScroll = () => {
		let correntScrollPosition = window.pageYOffset

		const navbar = document.getElementById('navContainer')

		if (scrollPos > correntScrollPosition) {
			navbar.style.top = '0px'
		} else {
			navbar.style.top = isMatchedWidth ? '-115px' : '-97px'
		}

		setScrollPos(correntScrollPosition)
	}
	useEffect(() => {
		window.addEventListener('scroll', handleScroll)
		return () => {
			window.removeEventListener('scroll', handleScroll)
		}
	})

	//  <LoadingBar color="#f11946" progress={progress} />

	return (
		<header style={{ height: isMatchedWidth ? '115px' : '96px', background: '#364253' }}>
			<div id="navContainer" className={styled.navContainer}>
				<Container>
					<div className={styled.brand}>
						{!isMatchedWidth && (
							<>
								<Typography variant="h5" component="h6" style={{ color: '#ffffff' }}>
									Muhammad Minhaj
								</Typography>
								<div className={styled.mobileMenuIcon}>
									{isOpenMenu ? <RestaurantMenuIcon onClick={() => dispatch(handleMenu())} /> : <MenuIcon onClick={() => dispatch(handleMenu())} />}{' '}
									MENU
								</div>
							</>
						)}
					</div>
					<nav className={styled.nav}>{!isMatchedWidth ? isOpenMenu && <Menu /> : <Menu />}</nav>

					<div id="navCirculer" className={styled.navCirculer}>
						{Span}
						{Span}
						{Span}
						{Span}
						{Span}
						{Span}
						{Span}
						{Span}
						{Span}
						{Span}
					</div>
				</Container>
			</div>
		</header>
	)
}

export default () => {
	const location = useLocation()
	return location.pathname.slice(0, 6) !== '/blogs' ? <WebHeader /> : <BlogsHeader />
}
