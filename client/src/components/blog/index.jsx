import React, { useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { Link } from 'react-router-dom'
import { format } from 'timeago.js'
import {
	Grid,
	Card,
	CardContent,
	CardActionArea,
	CardMedia,
	Container,
	Button,
	IconButton,
	ButtonGroup,
	Typography,
	Select,
	MenuItem,
	Paper,
	Toolbar,
	TextField,
	FormControl,
	AppBar,
	useScrollTrigger,
	Zoom,
	Fab,
	useMediaQuery,
	Chip,
	Divider,
	Grow,
} from '@material-ui/core'
import { makeStyles, useTheme } from '@material-ui/core/styles'
import { Pagination, Skeleton } from '@material-ui/lab'

import {
	Loyalty as LoyaltyIcon,
	Notifications as NotificationsIcon,
	KeyboardArrowUp as KeyboardArrowUpIcon,
	SkipPrevious as SkipPreviousIcon,
	PlayArrow as PlayArrowIcon,
	SkipNext as SkipNextIcon,
	Visibility as VisibilityIcon,
} from '@material-ui/icons'
import { SocialIcons } from '../../common'
import SearchBar from 'material-ui-search-bar'
import { getDataFromServer, handleChangeSearch } from '../../redux/actions/blog'
const names = [
	'Javascript',
	'Java',
	'Python',
	'Typescript',
	'React Js & React Native',
	'Vue Js ',
	'PHP',
	'C/C++',
	'Programming Concept',
	'Data Structure & Algorithm',
]

const SortedPost = () => {
	const { isLoading, blogs } = useSelector(state => state.blog)
	return (
		<>
			<Typography variant="overline" color="textSecondary" display="block">
				Choose Day
			</Typography>

			<ButtonGroup variant="outlined" color="primary" aria-label="contained primary button group">
				<Button>Latest</Button>
				<Button variant="contained">Weekly</Button>
				<Button>Monthly</Button>
			</ButtonGroup>

			<Typography variant="overline" color="textSecondary" display="block">
				Select Topic
			</Typography>
			{isLoading ? (
				<Skeleton variant="rect" height={50} width="100%" />
			) : (
				<Select fullWidth variant="outlined">
					<MenuItem value="all">
						<em>All Post</em>
					</MenuItem>
					<Divider />
					{blogs.map((n, i) => (
						<MenuItem key={i} value={n.title}>
							{n.title}
						</MenuItem>
					))}
				</Select>
			)}

			<Typography variant="overline" color="textSecondary" display="block">
				Post Per Page & Language
			</Typography>
			<div style={{ display: 'flex', justifyContent: 'space-between' }}>
				<Select fullWidth variant="outlined" style={{ marginRight: '0.25rem' }}>
					{new Array(10).fill('').map((n, i) => (
						<MenuItem key={i} value={i * 5}>
							{i * 5 + 5}
						</MenuItem>
					))}
				</Select>
				<Select fullWidth variant="outlined">
					<MenuItem value="en">English</MenuItem>
					<MenuItem value="bn">Bangla</MenuItem>
				</Select>
			</div>

			<div>
				<br />
				<Link to="/" style={{ textDecoration: 'none' }}>
					<Button fullWidth color="primary" variant="contained">
						About Me
					</Button>
				</Link>
			</div>
		</>
	)
}
function ElevationScroll(props) {
	const { children, window } = props
	// Note that you normally won't need to set the window ref as useScrollTrigger
	// will default to window.
	// This is only being set here because the demo is in an iframe.
	const trigger = useScrollTrigger({
		disableHysteresis: true,
		threshold: 0,
		target: window ? window() : undefined,
	})

	return React.cloneElement(children, {
		elevation: trigger ? 4 : 0,
	})
}
const useStyles = makeStyles(theme => ({
	root: {
		position: 'fixed',
		bottom: theme.spacing(2),
		right: theme.spacing(2),
	},
}))
function ScrollTop(props) {
	const { children, window } = props
	const classes = useStyles()
	// Note that you normally won't need to set the window ref as useScrollTrigger
	// will default to window.
	// This is only being set here because the demo is in an iframe.
	const trigger = useScrollTrigger({
		target: window ? window() : undefined,
		disableHysteresis: true,
		threshold: 100,
	})

	const handleClick = event => {
		const anchor = (event.target.ownerDocument || document).querySelector('#back-to-top-anchor')

		if (anchor) {
			anchor.scrollIntoView({ behavior: 'smooth', block: 'center' })
		}
	}

	return (
		<Zoom in={trigger}>
			<div onClick={handleClick} role="presentation" className={classes.root}>
				{children}
			</div>
		</Zoom>
	)
}

const usePostUiStyles = makeStyles(theme => ({
	root: {
		display: 'flex',
	},
	details: {
		display: 'flex',
		flexDirection: 'column',
	},
	content: {
		flex: '1 0 auto',
	},
	cover: {
		width: 151,
	},
	controls: {
		display: 'flex',
		alignItems: 'center',
		paddingLeft: theme.spacing(1),
		paddingBottom: theme.spacing(1),
	},
	playIcon: {
		height: 38,
		width: 38,
	},
}))

// Post Item UI View
const PostUI = ({ post }) => {
	const classes = usePostUiStyles()
	const theme = useTheme()
	// https://www.filepicker.io/api/file/BFMMlbcQvml9HSqXcvNp
	return (
		<Grid item md={4} sm={6}>
			<Grow in>
				<Card className={classes.root} elevation={3}>
					<CardMedia className={classes.cover} image={post.thumbnail || post.groupThumbnail} />
					<div className={classes.details}>
						<CardActionArea>
							<CardContent className={classes.content}>
								<Typography variant="caption" color="textSecondary">
									{post.readTime}
								</Typography>
								<Typography component="h5" variant="subtitle1">
									{post.title}
								</Typography>
							</CardContent>
						</CardActionArea>
						<Divider />
						<div style={{ display: 'flex', justifyContent: 'space-around', alignItems: 'center', padding: '0.25rem' }}>
							{/* <Chip label="Javascript" size="small" variant="outlined" /> */}
							<Button startIcon={<VisibilityIcon />} color="primary" size="small">
								read
							</Button>
							<Typography variant="caption" color="textSecondary">
								{format(post.createdAt)}
							</Typography>
						</div>
					</div>
				</Card>
			</Grow>
		</Grid>
	)
}

const Margin = ({ height }) => <div style={{ height: height, width: '100%' }}></div>

// Animation For Load Data
export const CustomSkeleton = () => {
	const classes = usePostUiStyles()

	return (
		<Grid item sm={6} md={4} style={{ width: '100%' }}>
			<Card elevation={3} className={classes.root}>
				<div style={{ width: '30%' }}>
					<Skeleton variant="rect" height="100%" />
				</div>

				<div style={{ width: '69%', paddingLeft: '1rem', paddingTop: '0.75rem', paddingRight: '1rem' }}>
					<Skeleton variant="text" width="40%" />
					<Margin height="10px" />
					<Skeleton variant="text" width="100%" />
					<Margin height="5px" />
					<Skeleton variant="text" width="100%" />
					<Margin height="20px" />
					<Divider />
					<Margin height="5px" />
					<div style={{ display: 'flex', justifyContent: 'space-between' }}>
						<Button disabled startIcon={<VisibilityIcon />} color="primary" size="small">
							read
						</Button>
						<Skeleton variant="text" width="40%" />
					</div>
					<Margin height="5px" />
				</div>
			</Card>
		</Grid>
	)
}

const FilteredPosts = () => {
	const { isLoading, posts, search } = useSelector(state => state.blog)

	if (search) {
		return posts.filter(p => p.title.toLowerCase().includes(search.toLowerCase())).map((p, i) => <PostUI post={p} />)
	}
	return posts.map((p, i) => <PostUI post={p} />)
}

export default props => {
	const { isLoading, posts, search } = useSelector(state => state.blog)
	const dispatch = useDispatch()
	const isWidth = useMediaQuery('(min-width:500px)')
	useEffect(() => {
		dispatch(getDataFromServer())
	}, [dispatch])
	return (
		<Container>
			<span id="back-to-top-anchor"></span>
			<Grid container spacing={1}>
				<Grid item sm={3}>
					<div style={{ position: 'sticky', top: '0' }}>
						<Typography variant="h5" color="textSecondary" align="center" style={{ textTransform: 'uppercase' }}>
							Learn With Minhaj
						</Typography>
						<div style={{ textAlign: 'center', marginBottom: '0.25rem' }}>
							<Typography variant="button" color="textSecondary">
								Follow Me
							</Typography>
							<SocialIcons />
						</div>

						<Card variant="outlined">
							<CardContent>
								<SortedPost />
							</CardContent>
						</Card>
						<FormControl margin="dense" fullWidth>
							<Typography variant="h5" component="h2" align="center">
								Subscribe for new updates
							</Typography>
							<Typography variant="subtitle2" align="center" color="textSecondary">
								Subscribe my blog for upload new post to get notify with your email every weekly.
							</Typography>
						</FormControl>
						<FormControl margin="dense" fullWidth>
							<TextField placeholder="example@example.com" label="Email" fullWidth variant="filled" />
						</FormControl>
						<div style={{ textAlign: 'center' }}>
							<Button startIcon={<NotificationsIcon />} variant="contained" color="primary">
								Subscribe
							</Button>
						</div>
					</div>
				</Grid>

				<Grid item sm={9}>
					<ElevationScroll {...props}>
						<AppBar position="sticky" color="transparent">
							<SearchBar value={search} onChange={value => dispatch(handleChangeSearch(value))} />
						</AppBar>
					</ElevationScroll>
					<br />
					<Card variant="outlined">
						<CardContent>
							<Grid container spacing={2}>
								{isLoading ? new Array(18).fill('').map((e, i) => <CustomSkeleton />) : <FilteredPosts />}
							</Grid>
							<ScrollTop {...props}>
								<Fab color="secondary" size="small" aria-label="scroll back to top">
									<KeyboardArrowUpIcon />
								</Fab>
							</ScrollTop>
							<div style={{ display: 'flex', justifyContent: 'center', marginTop: '1rem' }}>
								<Pagination count={10} variant="outlined" color="primary" shape="rounded" size={isWidth ? 'large' : 'small'} />
							</div>
						</CardContent>
					</Card>
				</Grid>
			</Grid>
		</Container>
	)
}
