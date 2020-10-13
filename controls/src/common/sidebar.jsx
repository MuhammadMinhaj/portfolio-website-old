import React from 'react'
import { Link } from 'react-router-dom'
import { useSelector, useDispatch } from 'react-redux'
import clsx from 'clsx'
import { useTheme } from '@material-ui/core/styles'
import { Drawer, List, Divider, IconButton, ListItem, ListItemText, ListItemIcon, Avatar } from '@material-ui/core'

import {
	ChevronLeft as ChevronLeftIcon,
	ChevronRight as ChevronRightIcon,
	MoveToInbox as InboxIcon,
	Dashboard as DashboardIcon,
	Subscriptions as SubscriptionsIcon,
	BorderColor as BorderColorIcon,
	LibraryBooks as LibraryBooksIcon,
	Settings as SettingsIcon,
	PersonAdd as PersonAddIcon,
	Security as SecurityIcon,
	PieChart as PieChartIcon,
	// AddCircleOutline as AddCircleOutlineIcon,
	NoteAdd as NoteAddIcon,
} from '@material-ui/icons'

import useStyle from './style'

// Imported Actions
import { handleDrawerToggle } from '../redux/actions/app'

const dataLinks = [
	{
		name: 'Dashboard',
		icon: DashboardIcon,
		url: '',
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
		name: 'Blog Creation',
		icon: BorderColorIcon,
		url: '/blogs/creation',
	},
	{
		name: 'All Blog',
		icon: LibraryBooksIcon,
		url: '/blogs',
	},
	{
		name: 'Mail',
		icon: InboxIcon,
		url: '',
	},
	{
		name: 'User Management',
		icon: PersonAddIcon,
		url: '/users',
	},
	{
		name: 'Security',
		icon: SecurityIcon,
		url: '',
	},
	{
		name: 'Setting',
		icon: SettingsIcon,
		url: '',
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

// const CollapseItem = ({ name }) => (
// 	<ListItem button>
// 		<ListItemText primary={name} />
// 	</ListItem>
// )

export default () => {
	const classes = useStyle()
	const theme = useTheme()
	const state = useSelector(state => state.app)

	const dispatch = useDispatch()

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
				<h4>Muhammad Minhaj</h4>
				<IconButton onClick={() => dispatch(handleDrawerToggle())}>
					{theme.direction === 'rtl' ? <ChevronRightIcon /> : <ChevronLeftIcon />}
				</IconButton>
			</div>
			<Divider />
			<List>
				{dataLinks.map((list, index) => (
					<Link to={list.url} className={classes.link} key={index}>
						<CustomListItem Icon={list.icon} name={list.name} />
						{index === 5 && <Divider />}
					</Link>
				))}
			</List>
		</Drawer>
	)
}
