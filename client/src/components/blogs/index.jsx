import React, { useEffect } from 'react'
import { Link } from 'react-router-dom'
import { useSelector, useDispatch } from 'react-redux'
import clsx from 'clsx'
import { makeStyles, useTheme } from '@material-ui/core/styles'
import {
	Drawer,
	CssBaseline,
	AppBar,
	Toolbar,
	List,
	Divider,
	IconButton,
	ListItem,
	ListItemText,
	Collapse,
	useMediaQuery,
	Grow,
	Typography,
	Grid,
	Card,
	CardContent,
	CardActions,
	Button,
} from '@material-ui/core'
import Rating from '@material-ui/lab/Rating'

import {
	Menu as MenuIcon,
	ChevronLeft as ChevronLeftIcon,
	ChevronRight as ChevronRightIcon,
	FiberManualRecord as FiberManualRecordIcon,
	FormatQuote as FormatQuoteIcon,
	Visibility as VisibilityIcon,
} from '@material-ui/icons'

import { Search, Title, SocialIcons } from '../../common'

// Actions
import { handleDrawer, handleDrawerMobile, handleCollapse, handleSelectedPost, handleSearch, handleClearSearch } from '../../redux/actions/blog'

import styled from '../style.module.css'

const drawerWidth = 240

export const useStyles = makeStyles(theme => ({
	container: {
		maxWidth: '1500px',
		margin: 'auto',
	},
	root: {
		display: 'flex',
		position: 'relative',
		marginTop: '0.25rem',
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
		minHeight: '500px',
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
		<Link style={{ textDecoration: 'none', color: '#0a384e' }} to={`/blogs/${title.toLowerCase()}/${post.title.toLowerCase().replace(/ /g, '-')}`}>
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
				<h3 style={{ color: '#0d3c52' }}>{list.title}</h3>
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

export const AppAndDrawer = () => {
	const classes = useStyles()
	const theme = useTheme()
	const dispatch = useDispatch()
	const state = useSelector(state => state.blog)
	const isMatchedWidth = useMediaQuery('(min-width:800px)')
	let contents = []
	state.contents.map(e => {
		contents.push(...e.posts)
		return null
	})
	return (
		<>
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
					<Search suggestLists={contents} handleChange={handleSearch} size="small" width="700px" />
					{isMatchedWidth ? (
						<>
							<h3 style={{ marginLeft: '0.5rem' }}>Follow Me</h3>
							<SocialIcons />
						</>
					) : (
						''
					)}
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
					<Title title="My" subTitle="Blogs" />

					<IconButton onClick={e => dispatch(handleDrawer(e))}>{theme.direction === 'ltr' ? <ChevronLeftIcon /> : <ChevronRightIcon />}</IconButton>
				</div>
				<Divider />
				<List>
					<Link style={{ textDecoration: 'none', color: '#0d3c52' }} to="/blogs">
						<ListItem button onClick={() => dispatch(handleCollapse(0))}>
							<h3>Welcome</h3>
						</ListItem>
					</Link>
					<Divider />
					{state.contents.map((list, index) => (
						<CustomListItem list={list} index={index} key={index} />
					))}
				</List>
			</Drawer>
		</>
	)
}

const WelcomContent = () => {
	const isMatchedWidth = useMediaQuery('(min-width:800px)')
	return (
		<>
			<Typography variant="h2" style={{ textAlign: 'center', textTransform: 'uppercase', color: '#003955' }}>
				Welcome
			</Typography>
			<br />
			<Divider />
			<div className={styled.blog__welcome}>
				<FormatQuoteIcon className={styled.left} />
				<p>
					Lorem ipsum dolor sit amet consectetur adipisicing elit. Tempore libero dolore placeat expedita maiores. Earum, quisquam fuga rem
					dignissimos placeat maxime quod. Veniam asperiores animi officia, quas ullam odio consectetur mollitia cupiditate quisquam. Nostrum magnam
					quos ea unde harum fuga voluptatibus dolorum iure laboriosam quod error sit illo voluptatum aperiam hic consectetur, praesentium vero
					repellat sapiente? Quisquam ducimus quas magnam placeat magni iusto voluptatem, quae, laudantium labore, doloremque laborum minus harum!
					Laudantium quos eaque ex cumque suscipit possimus sequi impedit commodi rerum ducimus quia reiciendis enim quibusdam temporibus cupiditate
					veritatis architecto molestias rem repellat odio officiis, soluta quas quod adipisci.
				</p>

				<Rating name="size-large" defaultValue={1} size="large" />
				<FormatQuoteIcon className={styled.right} />
			</div>
			{!isMatchedWidth ? (
				<div style={{ textAlign: 'center', marginTop: '0.5rem' }}>
					<h3 style={{ marginLeft: '0.5rem' }}>FOLLOW ME</h3>
					<SocialIcons />
				</div>
			) : (
				''
			)}
		</>
	)
}

const SearchItem = ({ post }) => {
	const dispatch = useDispatch()

	return (
		<Grid style={{ width: '100%' }} item sm={6} md={3}>
			<Grow in>
				<Card raised>
					<CardContent>
						<h2>{post.title}</h2>
					</CardContent>
					<CardActions>
						<Link
							style={{ textDecoration: 'none', color: '#e91e63', width: '100%' }}
							to={`/blogs/${post.group.toLowerCase()}/${post.title.toLowerCase().replace(/ /g, '-')}`}
						>
							<Button
								onClick={() => dispatch(handleClearSearch())}
								startIcon={<VisibilityIcon />}
								fullWidth
								variant="outlined"
								size="small"
								color="secondary"
							>
								Visit
							</Button>
						</Link>
					</CardActions>
				</Card>
			</Grow>
		</Grid>
	)
}

export const SearchContents = () => {
	const state = useSelector(state => state.blog)
	let searchContents = []
	state.contents.forEach(content => {
		let foundedBlogs = content.posts.filter(blog => blog.title.toLowerCase().includes(state.querySearch.toLowerCase()) && blog)
		foundedBlogs.forEach(p => {
			p.group = content.title
		})
		searchContents.push(...foundedBlogs)
	})
	console.log(searchContents)
	return (
		<Grid container spacing={3}>
			{searchContents.length !== 0 ? (
				searchContents.map((post, ind) => <SearchItem post={post} key={ind} />)
			) : (
				<Grid item sm={12}>
					<Typography variant="h3" style={{ textAlign: 'center', color: '#607d8bab' }}>
						Search For Not Available
					</Typography>
				</Grid>
			)}
		</Grid>
	)
}

const Blogs = () => {
	const state = useSelector(state => state.blog)
	const dispatch = useDispatch()

	const classes = useStyles()
	const isMatchedWidth = useMediaQuery('(min-width:576px)')

	useEffect(() => {
		dispatch(handleDrawerMobile(isMatchedWidth))
	}, [isMatchedWidth, dispatch])

	return (
		<div className={classes.container}>
			<div className={classes.root}>
				<CssBaseline />
				<AppAndDrawer />

				<main
					className={clsx(classes.content, {
						[classes.contentShift]: state.isOpneDrawer,
					})}
				>
					<div className={classes.drawerHeader} />
					{state.querySearch ? <SearchContents /> : <WelcomContent />}
				</main>
			</div>
		</div>
	)
}

export default Blogs
