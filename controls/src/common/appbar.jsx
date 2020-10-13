import React from 'react'
import { useSelector, useDispatch } from 'react-redux'
import clsx from 'clsx'
import { AppBar, Toolbar, Typography, IconButton } from '@material-ui/core'
import { Menu as MenuIcon } from '@material-ui/icons'
import useStyle from './style'

// Redux Utils Imported
import { handleDrawerToggle } from '../redux/actions/app'

export default () => {
	const classes = useStyle()
	const state = useSelector(state => state.app)
	const dispatch = useDispatch()

	return (
		<AppBar
			position="fixed"
			className={clsx(classes.appBar, {
				[classes.appBarShift]: state.isOpenDrawer,
			})}
		>
			<Toolbar>
				<IconButton
					color="inherit"
					aria-label="open drawer"
					onClick={() => dispatch(handleDrawerToggle())}
					edge="start"
					className={clsx(classes.menuButton, {
						[classes.hide]: state.isOpenDrawer,
					})}
				>
					<MenuIcon />
				</IconButton>
				<Typography variant="h6" noWrap>
					Welcome To Dashboard
				</Typography>
			</Toolbar>
		</AppBar>
	)
}
