import React from 'react'
import { Link } from 'react-router-dom'
import { useSelector, useDispatch } from 'react-redux'
import clsx from 'clsx'
import { useTheme } from '@material-ui/core/styles'
import { Drawer, List, Divider, IconButton, ListItem, ListItemText, ListItemIcon, Avatar, Typography } from '@material-ui/core'

import {
	ChevronLeft as ChevronLeftIcon,
	ChevronRight as ChevronRightIcon,
	MoveToInbox as InboxIcon,
	Dashboard as DashboardIcon,
	Subscriptions as SubscriptionsIcon,
	LibraryBooks as LibraryBooksIcon,
	ExitToApp as ExitToAppIcon,
	PieChart as PieChartIcon,
	// AddCircleOutline as AddCircleOutlineIcon,
	NoteAdd as NoteAddIcon,
	PostAdd as PostAddIcon,
} from '@material-ui/icons'

import useStyle from './style'

// Imported Actions
import { handleDrawerToggle } from '../redux/actions/app'

const dataLinks = [
	{
		name: 'Dashboard',
		icon: DashboardIcon,
		url: '/dashboard',
	},
	{
		name: 'Subscriptions',
		icon: SubscriptionsIcon,
		url: '/subscriptions',
	},
	{
		name: ' Add Portfolio',
		icon: NoteAddIcon,
		url: '/portfolio/creation',
	},
	{
		name: 'Portfolio',
		icon: PieChartIcon,
		url: '/portfolio',
	},
	{
		name: 'Contact',
		icon: InboxIcon,
		url: '/contact',
	},
	{
		name: 'Blog Creation',
		icon: PostAddIcon,
		url: '/blogs/creation',
	},
	{
		name: 'All Blog',
		icon: LibraryBooksIcon,
		url: '/blogs',
	},

	{
		name: 'Logout',
		icon: ExitToAppIcon,
		url: 'logout',
	},
]

const CustomListItem = ({ Icon, name }) => (
	<ListItem button>
		<ListItemIcon>
			<Icon />
		</ListItemIcon>
		<ListItemText primary={name} />
	</ListItem>
)

export default () => {
	const classes = useStyle()
	const theme = useTheme()
	const state = useSelector(state => state.app)

	const dispatch = useDispatch()

	const handleClickLogout = () => {
		localStorage.removeItem('token')
		window.location.reload()
	}
	return (
		<Drawer
			variant="permanent"
			className={clsx(classes.drawer, {
				[classes.drawerOpen]: state.isOpenDrawer,
				[classes.drawerClose]: !state.isOpenDrawer,
			})}
			classes={{
				paper: clsx({
					[classes.drawerOpen]: state.isOpenDrawer,
					[classes.drawerClose]: !state.isOpenDrawer,
				}),
			}}
		>
			<div className={classes.toolbar}>
				<Avatar />
				<Typography style={{ marginLeft: '0.75rem' }} variant="subtitle2" color="textSecondary">
					Muhammad Minhaj
				</Typography>
				<IconButton onClick={() => dispatch(handleDrawerToggle())}>
					{theme.direction === 'rtl' ? <ChevronRightIcon /> : <ChevronLeftIcon />}
				</IconButton>
			</div>
			<Divider />
			<List>
				{dataLinks.map((list, index) => {
					if (list.url === 'logout') {
						return (
							<ListItem button onClick={handleClickLogout} key={index}>
								<ListItemIcon>{<list.icon />}</ListItemIcon>
								<ListItemText primary={list.name} />
							</ListItem>
						)
					} else {
						return (
							<Link to={list.url} className={classes.link} key={index}>
								<CustomListItem Icon={list.icon} name={list.name} />
								{index === 3 && <Divider />}
							</Link>
						)
					}
				})}
			</List>
		</Drawer>
	)
}
