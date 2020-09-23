import React, { useEffect } from 'react'
import { useParams, Link } from 'react-router-dom'
import { useSelector, useDispatch } from 'react-redux'
import clsx from 'clsx'
import { makeStyles, useTheme } from '@material-ui/core/styles'
import {
	Drawer,
	CssBaseline,
	AppBar,
	Toolbar,
	List,
	Typography,
	Divider,
	IconButton,
	ListItem,
	ListItemText,
	Collapse,
	useMediaQuery,
	Grow,
} from '@material-ui/core'

import {
	Menu as MenuIcon,
	ChevronLeft as ChevronLeftIcon,
	ChevronRight as ChevronRightIcon,
	FiberManualRecord as FiberManualRecordIcon,
} from '@material-ui/icons'

import { Search } from '../../common'

// Actions
import { handleDrawer, handleDrawerMobile, handleCollapse, handleSelectedPost, handleSearchQuery } from '../../redux/actions/blog'

const drawerWidth = 240

const useStyles = makeStyles(theme => ({
	root: {
		display: 'flex',
		position: 'relative',
	},
	appBar: {
		transition: theme.transitions.create(['margin', 'width'], {
			easing: theme.transitions.easing.sharp,
			duration: theme.transitions.duration.leavingScreen,
		}),
	},
	appBarShift: {
		width: `calc(100% - ${drawerWidth}px)`,
		marginLeft: drawerWidth,
		transition: theme.transitions.create(['margin', 'width'], {
			easing: theme.transitions.easing.easeOut,
			duration: theme.transitions.duration.enteringScreen,
		}),
	},
	menuButton: {
		marginRight: theme.spacing(2),
	},
	hide: {
		display: 'none',
	},
	drawer: {
		width: drawerWidth,
		flexShrink: 0,
		minHeight: '400px',
	},
	drawerPaper: {
		width: drawerWidth,
		position: 'absolute',
	},
	drawerHeader: {
		display: 'flex',
		alignItems: 'center',
		padding: theme.spacing(0, 1),
		// necessary for content to be below app bar
		...theme.mixins.toolbar,
		justifyContent: 'flex-end',
	},
	content: {
		flexGrow: 1,
		padding: theme.spacing(3),
		transition: theme.transitions.create('margin', {
			easing: theme.transitions.easing.sharp,
			duration: theme.transitions.duration.leavingScreen,
		}),
		marginLeft: -drawerWidth,
		// overflowY: 'auto',
		// maxHeight: '550px',
	},
	contentShift: {
		transition: theme.transitions.create('margin', {
			easing: theme.transitions.easing.easeOut,
			duration: theme.transitions.duration.enteringScreen,
		}),
		marginLeft: 0,
	},
	iconWidth: {
		minWidth: '0px',
	},
}))

const CustomListItemContent = ({ post, index, title }) => {
	const state = useSelector(state => state.blog)
	const dispatch = useDispatch()
	return (
		<Link to={`/blogs/${title.toLowerCase()}/${post.title.toLowerCase().replace(/ /g, '-')}`}>
			<ListItem button dense onClick={() => dispatch(handleSelectedPost(index))}>
				<FiberManualRecordIcon style={{ marginRight: '0.25rem', color: state.selectedPost === index ? '#607d8b' : '#b1c2ca' }} />
				<ListItemText primary={post.title} />
			</ListItem>
		</Link>
	)
}

const CustomListItem = ({ list, index }) => {
	const state = useSelector(state => state.blog)
	const dispatch = useDispatch()
	return (
		<>
			<ListItem button key={list.title} onClick={() => dispatch(handleCollapse(index))}>
				<h3>{list.title}</h3>
			</ListItem>

			<Collapse in={state.collapseIndex === index ? true : false} timeout="auto" unmountOnExit>
				<Grow in>
					<List component="div" disablePadding>
						{list.posts.map((post, index) => (
							<CustomListItemContent post={post} title={list.title} key={index} index={index} />
						))}
					</List>
				</Grow>
			</Collapse>
			<Divider />
		</>
	)
}

const GetStartedPage = () => <h2>Assalamu Alaikum,Welcome To Blogs</h2>

const ContentPage = () => {
	const { post } = useSelector(state => state.blog)
}

const Blogs = props => {
	const state = useSelector(state => state.blog)
	const dispatch = useDispatch()

	const classes = useStyles()
	const theme = useTheme()
	const isMatchedWidth = useMediaQuery('(min-width:576px)')
	const { groupid, postid } = useParams()
	useEffect(() => {
		if (groupid && postid) {
			const queryString = postid.replace(/-/g, ' ')
			dispatch(handleSearchQuery(groupid, queryString))
		}
	}, [groupid, postid, dispatch])

	useEffect(() => {
		dispatch(handleDrawerMobile(isMatchedWidth))
	}, [isMatchedWidth, dispatch])

	return (
		<div className={classes.root}>
			<CssBaseline />
			<AppBar
				position="absolute"
				className={clsx(classes.appBar, {
					[classes.appBarShift]: state.isOpneDrawer,
				})}
				color="inherit"
			>
				<Toolbar>
					<IconButton
						color="inherit"
						aria-label="open drawer"
						onClick={e => dispatch(handleDrawer(e))}
						edge="start"
						className={clsx(classes.menuButton, state.isOpneDrawer && classes.hide)}
					>
						<MenuIcon />
					</IconButton>
					<Search suggestLists={[]} size="small" width="700px" />
				</Toolbar>
			</AppBar>
			<Drawer
				className={classes.drawer}
				variant="persistent"
				anchor="left"
				open={state.isOpneDrawer}
				classes={{
					paper: classes.drawerPaper,
				}}
			>
				<div className={classes.drawerHeader}>
					<Typography variant="h4" noWrap>
						My Blogs
					</Typography>

					<IconButton onClick={e => dispatch(handleDrawer(e))}>{theme.direction === 'ltr' ? <ChevronLeftIcon /> : <ChevronRightIcon />}</IconButton>
				</div>
				<Divider />
				<List>
					<ListItem button onClick={() => dispatch(handleCollapse(null))}>
						<h3>Getting Started</h3>
					</ListItem>
					<Divider />
					{state.contents.map((list, index) => (
						<CustomListItem list={list} index={index} key={index} />
					))}
				</List>
			</Drawer>

			<main
				className={clsx(classes.content, {
					[classes.contentShift]: state.isOpneDrawer,
				})}
			>
				<div className={classes.drawerHeader} />
				{/* <Typography paragraph>{state.contents[state.collapseIndex].posts[state.selectedPost || 0].content}</Typography> */}
				{/* <ContentPage /> */}
			</main>
		</div>
	)
}

export default Blogs
