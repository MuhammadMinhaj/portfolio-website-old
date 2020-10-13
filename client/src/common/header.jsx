import React, { useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'

import { Link } from 'react-router-dom'
import { Container, useMediaQuery, Grow } from '@material-ui/core'
import MenuIcon from '@material-ui/icons/Menu'
import RestaurantMenuIcon from '@material-ui/icons/RestaurantMenu'
import styled from './style.module.css'

// Imported Actions
import { handleMenu, handleNavAnimationBar } from '../redux/actions'
const Span = <span></span>
const Item = props => {
	return (
		<li>
			<Link to={props.path} style={props.style}>
				{props.value}
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

const Header = () => {
	const { isOpenMenu } = useSelector(state => state.web)
	const dispatch = useDispatch()
	const isMatchedWidth = useMediaQuery('(min-width:576px)')

	useEffect(() => {
		handleNavAnimationBar()
	}, [])
	return (
		<header style={{ height: isMatchedWidth ? '136px' : '96px', background: '#364253' }}>
			<div id="navContainer" className={styled.navContainer}>
				<Container>
					<div className={styled.brand}>
						<h2>Muhammad Minhaj</h2>
						{!isMatchedWidth && (
							<div className={styled.mobileMenuIcon}>
								{isOpenMenu ? <RestaurantMenuIcon onClick={() => dispatch(handleMenu())} /> : <MenuIcon onClick={() => dispatch(handleMenu())} />}{' '}
								MENU
							</div>
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

export default Header
