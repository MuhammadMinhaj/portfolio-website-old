import React, { useEffect, useState } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { Link, useParams } from 'react-router-dom'
import { format } from 'timeago.js'
import {
	Grid,
	Card,
	CardContent,
	CardActionArea,
	CardMedia,
	Container,
	Button,
	ButtonGroup,
	IconButton,
	Typography,
	Select,
	MenuItem,
	TextField,
	FormControl,
	AppBar,
	useScrollTrigger,
	Zoom,
	Fab,
	useMediaQuery,
	Divider,
	Grow,
	Snackbar,
} from '@material-ui/core'
import { makeStyles } from '@material-ui/core/styles'
import { Pagination, Skeleton } from '@material-ui/lab'

import { Editor } from 'react-draft-wysiwyg'
import '../../../node_modules/react-draft-wysiwyg/dist/react-draft-wysiwyg.css'

import {
	Notifications as NotificationsIcon,
	KeyboardArrowUp as KeyboardArrowUpIcon,
	Visibility as VisibilityIcon,
	Info as InfoIcon,
	Refresh as RefreshIcon,
	Replay as ReplayIcon,
	ArrowBackIos as ArrowBackIosIcon,
	Home as HomeIcon,
	Close as CloseIcon,
} from '@material-ui/icons'
import { SocialIcons } from '../../common'
import SEO from '../../common/seo'
import './style.css'
import SearchBar from 'material-ui-search-bar'
import {
	getDataFromServer,
	handleClearMessage,
	handleChangeSearch,
	clearSearchHistory,
	selectTopicHandler,
	selectLangugaeHandler,
	handleChangePageNo,
	handleFilterPosts,
	handleChangeItemPerPage,
	handleChangeFilterDatePosts,
	handleChangeSubscriberMail,
	handleSubmitSubscriberMail,
	handleIncrementAndDecrement,
} from '../../redux/actions/blog'

const SortedPost = () => {
	const { isLoading, blogs, topic, lang, day, itemPerPage } = useSelector(state => state.blog)
	const dispatch = useDispatch()
	return (
		<>
			<Typography variant="overline" color="textSecondary" display="block">
				Choose Day
			</Typography>

			<ButtonGroup variant="outlined" size="small" color="primary" aria-label="contained primary button group">
				<Button variant={day === 'latest' && 'contained'} onClick={e => dispatch(handleChangeFilterDatePosts('latest'))}>
					Latest
				</Button>
				<Button variant={day === 'week' && 'contained'} onClick={e => dispatch(handleChangeFilterDatePosts('week'))}>
					This Week
				</Button>
				<Button variant={day === 'month' && 'contained'} onClick={e => dispatch(handleChangeFilterDatePosts('month'))}>
					This Month
				</Button>
			</ButtonGroup>

			<Typography variant="overline" color="textSecondary" display="block">
				Select Topic
			</Typography>
			{isLoading ? (
				<Skeleton variant="rect" height={50} width="100%" />
			) : (
				<Select value={topic || 'all'} fullWidth variant="outlined" onChange={e => dispatch(selectTopicHandler(e))}>
					<MenuItem value="all">
						<em>All Topic</em>
					</MenuItem>
					<Divider />
					{blogs.map((n, i) => (
						<MenuItem key={i} value={n._id}>
							{n.title}
						</MenuItem>
					))}
				</Select>
			)}

			<Typography variant="overline" color="textSecondary" display="block">
				Post Per Page & Language
			</Typography>
			<div style={{ display: 'flex', justifyContent: 'space-between' }}>
				<Select
					value={itemPerPage}
					fullWidth
					variant="outlined"
					style={{ marginRight: '0.25rem' }}
					onChange={event => dispatch(handleChangeItemPerPage(event))}
				>
					{new Array(10).fill('').map((n, i) => (
						<MenuItem key={i} value={i * 10 + 10}>
							{i * 10 + 10}
						</MenuItem>
					))}
				</Select>
				<Select value={lang || 'all'} onChange={e => dispatch(selectLangugaeHandler(e))} fullWidth variant="outlined">
					<MenuItem value="all">
						<em>All Language</em>
					</MenuItem>
					<Divider />
					<MenuItem value="en">English</MenuItem>
					<MenuItem value="bn">Bangla</MenuItem>
				</Select>
			</div>

			<div>
				<br />
				<Link to="/" style={{ textDecoration: 'none' }}>
					<Button startIcon={<InfoIcon />} color="primary" variant="contained" fullWidth>
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

function spaceToDash(path) {
	return path.toLowerCase().replaceAll(' ', '-')
}

// Post Item UI View
const PostUI = ({ post }) => {
	const dispatch = useDispatch()
	const classes = usePostUiStyles()

	return (
		<Grid item md={4} sm={6} style={{ width: '100%' }}>
			<Grow in>
				<Card className={classes.root} elevation={3}>
					<CardMedia className={classes.cover} image={post.thumbnail || post.groupThumbnail} />
					<div className={classes.details}>
						<CardActionArea onClick={() => dispatch(clearSearchHistory())}>
							<Link style={{ textDecoration: 'none', color: 'inherit' }} to={`/blogs/${spaceToDash(post.title)}`}>
								<CardContent className={classes.content}>
									<Typography variant="caption" color="textSecondary">
										{post.readTime}
									</Typography>
									<Typography component="h5" variant="subtitle1">
										{post.title}
									</Typography>
								</CardContent>
							</Link>
						</CardActionArea>
						<Divider />
						<div style={{ display: 'flex', justifyContent: 'space-around', alignItems: 'center', padding: '0.25rem' }}>
							<Link style={{ textDecoration: 'none' }} to={`/blogs/${spaceToDash(post.title)}`}>
								<Button startIcon={<VisibilityIcon />} color="primary" size="small">
									read
								</Button>
							</Link>
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
const ErrorOccurred = ({ msg }) => {
	const { title } = useParams()
	return (
		<>
			<Typography variant="h4" component="h5" color="textSecondary" align="center">
				{msg}
				<br />
				<IconButton href={`${title ? '/blogs/' + title : '/blogs'}`}>
					Refresh
					<RefreshIcon />
				</IconButton>
			</Typography>
		</>
	)
}

const MainContent = props => {
	const {
		isLoading,
		error,
		subsError,
		success,
		posts,
		totalPages,
		pageNo,
		itemPerPage,
		search,
		filteredPosts,
		topic,
		lang,
		day,
		subscriberEmail,
	} = useSelector(state => state.blog)
	const [message, setMessage] = useState(null)
	const dispatch = useDispatch()
	const isWidth = useMediaQuery('(min-width:500px)')
	const isMobileWidth = useMediaQuery('(min-width:600px)')
	useEffect(() => {
		dispatch(getDataFromServer())
	}, [dispatch])

	useEffect(() => {
		dispatch(handleFilterPosts())
	}, [dispatch, search, topic, lang, posts, itemPerPage, pageNo, totalPages, day])

	useEffect(() => {
		setMessage(error)
	}, [error])

	// Error Popup Handle Close
	const handleClose = () => {
		setMessage(null)
	}
	return (
		<>
			<Container style={{ paddingLeft: isMobileWidth ? '0px' : '24px' }}>
				<span id="back-to-top-anchor"></span>
				<Grid container spacing={1}>
					<Grid item sm={3} style={{ borderRight: isMobileWidth ? '1px solid #0000001f' : 'none' }}>
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

							<Card variant={isMobileWidth ? 'elevation' : 'outlined'} elevation={0}>
								<CardContent>{props.relatedPost ? <props.relatedPost /> : <SortedPost />}</CardContent>
							</Card>
							<FormControl margin="dense" fullWidth>
								<Typography variant="h5" component="h2" align="center">
									Subscribe for new updates
								</Typography>
								<Typography variant="subtitle2" align="center" color="textSecondary">
									Subscribe my blog for upload new post to get notify with your email every weekly.
								</Typography>
							</FormControl>
							<form onSubmit={e => dispatch(handleSubmitSubscriberMail(e))}>
								<FormControl margin="dense" fullWidth>
									<TextField
										placeholder="example@example.com"
										label="Email"
										fullWidth
										variant="filled"
										value={subscriberEmail}
										onChange={e => dispatch(handleChangeSubscriberMail(e))}
									/>
								</FormControl>
								<div style={{ textAlign: 'center' }}>
									<Button type="submit" startIcon={<NotificationsIcon />} variant="contained" color="primary">
										Subscribe
									</Button>
								</div>
							</form>
						</div>
					</Grid>

					<Grid item sm={9} style={{ width: '100%' }}>
						<ElevationScroll {...props}>
							<AppBar position="sticky" color="transparent">
								<SearchBar
									value={search || ''}
									onChange={value => dispatch(handleChangeSearch(value))}
									onCancelSearch={() => dispatch(clearSearchHistory())}
								/>
							</AppBar>
						</ElevationScroll>
						<br />
						<Typography align="center" variant="overline" color="secondary" display="block">
							Total Posts : {filteredPosts.length}
						</Typography>

						{error ? (
							<ErrorOccurred msg="Internal Server Error" />
						) : (
							<Card variant={isMobileWidth ? 'elevation' : 'outlined'} elevation={0}>
								<CardContent>
									<ScrollTop {...props}>
										<Fab color="secondary" size="small" aria-label="scroll back to top">
											<KeyboardArrowUpIcon />
										</Fab>
									</ScrollTop>
									{!props.PostsContent ? (
										<>
											<Grid container spacing={2}>
												{isLoading
													? new Array(18).fill('').map((e, i) => <CustomSkeleton key={i} />)
													: filteredPosts.slice(itemPerPage * pageNo - itemPerPage, itemPerPage * pageNo).map((p, i) => <PostUI key={i} post={p} />)}
											</Grid>
											<div style={{ display: 'flex', justifyContent: 'center', marginTop: '1rem' }}>
												<Pagination
													count={totalPages}
													page={pageNo}
													variant="outlined"
													color="primary"
													shape="rounded"
													size={isWidth ? 'large' : 'small'}
													onChange={(e, no) => dispatch(handleChangePageNo(no))}
												/>
											</div>
										</>
									) : (
										<props.PostsContent />
									)}
								</CardContent>
							</Card>
						)}
					</Grid>
				</Grid>
				<Snackbar
					anchorOrigin={{
						vertical: 'bottom',
						horizontal: 'left',
					}}
					open={message || subsError || success ? true : false}
					autoHideDuration={6000}
					onClose={() => dispatch(handleClearMessage())}
					message={message || subsError || success}
					action={
						<IconButton onClick={message ? handleClose : () => dispatch(handleClearMessage())} size="small" aria-label="close" color="secondary">
							<CloseIcon fontSize="small" />
						</IconButton>
					}
				/>
			</Container>
		</>
	)
}

const PostContent = ({ post }) => {
	const { posts, counter } = useSelector(state => state.blog)
	const dispatch = useDispatch()
	// console.log('postIndex', postIndex)
	return (
		<div>
			<Grow in>
				<div>
					<Typography variant="h4" component="h6">
						{post.title}
					</Typography>

					<div style={{ display: 'flex', justifyContent: 'space-between' }}>
						<Typography variant="caption" color="textSecondary">
							{post.readTime}
						</Typography>
						<Typography variant="caption" color="textSecondary">
							{format(post.createdAt)}
						</Typography>
					</div>

					<Margin height="5px" />
					<img
						src={post.thumbnail || post.groupThumbnail}
						style={{ width: '100%', maxHeight: '450px', borderRadius: '0.5rem' }}
						alt="Something went to wrong"
					/>
					<Editor toolbarHidden initialContentState={JSON.parse(post.content)} readOnly />
					<div style={{ display: 'flex', justifyContent: 'space-between' }}>
						<Link
							onClick={() => dispatch(handleIncrementAndDecrement(counter === 0 ? 0 : counter - 1))}
							to={`/blogs/${spaceToDash(posts[counter].title)}`}
							style={{ textDecoration: 'none' }}
						>
							<IconButton>
								<ArrowBackIosIcon />
								Prev
							</IconButton>
						</Link>

						<Link onClick={() => dispatch(handleIncrementAndDecrement(null))} to="/blogs">
							<IconButton>
								<HomeIcon />
							</IconButton>
						</Link>
						<Link
							onClick={() => dispatch(handleIncrementAndDecrement(counter === posts.length - 1 ? posts.length - 1 : counter + 1))}
							to={`/blogs/${spaceToDash(posts[counter].title)}`}
							style={{ textDecoration: 'none' }}
						>
							<IconButton>
								Next
								<ArrowBackIosIcon style={{ transform: 'rotate(180deg)' }} />
							</IconButton>
						</Link>
					</div>
				</div>
			</Grow>
		</div>
	)
}
const PostContentAnimation = () => {
	return (
		<>
			<Skeleton variant="rect" width="100%" height="50px" />
			<br />
			<Skeleton variant="rect" width="100%" height="300px" />
			<br />
			<Skeleton variant="rect" width="100%" height="100px" />
		</>
	)
}

const PageNotFound = () => (
	<Typography color="textSecondary" variant="h4" component="h5" align="center">
		404 PAGE NOT FOUND
		<br />
		<Link to="/blogs" style={{ textDecoration: 'none', color: 'inherit' }}>
			<Button endIcon={<ReplayIcon />} size="large" color="inherit">
				Back To Home
			</Button>
		</Link>
	</Typography>
)

const RelatedPost = () => {
	const { isLoading, posts } = useSelector(state => state.blog)
	const dispatch = useDispatch()
	return (
		<>
			<Typography variant="overline" color="secondary">
				Latest Posts
			</Typography>
			<Divider />
			<Margin height="10px" />
			<ul style={{ marginLeft: '1rem', listStyle: 'square url("/default/sqpurple.gif")' }}>
				{!isLoading
					? posts
							.reverse()
							.slice(0, 12)
							.map((p, i) => (
								<li key={i}>
									<Link
										onClick={() => dispatch(clearSearchHistory())}
										to={`/blogs/${p.title.toLowerCase().replaceAll(' ', '-')}`}
										style={{ textDecoration: 'none' }}
									>
										<Typography variant="subtitle2" display="block" color="primary" key={i}>
											{p.title.length > 37 ? p.title.slice(0, 37) + '...' : p.title}
										</Typography>
									</Link>
								</li>
							))
					: new Array(15).fill(' ').map((e, i) => (
							<li key={i}>
								<Skeleton variant="text" />
							</li>
					  ))}
			</ul>
		</>
	)
}

export const Posts = props => {
	const { search, posts, isLoading, counter } = useSelector(state => state.blog)
	const { title } = useParams()
	const dispatch = useDispatch()
	let [hasSearch, setSearch] = useState(false)
	let [post, setPost] = useState(null)

	useEffect(() => {
		if (search) {
			setSearch(true)
		} else {
			setSearch(false)
		}
	}, [search])

	useEffect(() => {
		let hasPost = false
		posts.forEach((p, i) => {
			if (spaceToDash(p.title) === title) {
				hasPost = p
				if (counter === null) {
					dispatch(handleIncrementAndDecrement(i))
				}

				return false
			}
		})
		setPost(hasPost)
	}, [dispatch, title, posts, counter])
	return (
		<>
			<SEO
				title={isLoading ? 'Loading...' : post === false ? '404 Page Not Found' : title.charAt(0).toUpperCase() + title.slice(1).replaceAll('-', ' ')}
				content={post ? post.keywords : '404 Page Not Found'}
				link={`http://localhost:3000/blogs/${title}`}
			/>
			<MainContent
				{...props}
				PostsContent={isLoading ? () => <PostContentAnimation /> : !hasSearch ? () => (!post ? <PageNotFound /> : <PostContent post={post} />) : null}
				isBorderLess={true}
				relatedPost={RelatedPost}
			/>
		</>
	)
}

export default props => (
	<>
		<SEO title="Learn With Minhaj || Blog" content="learn with minhaj,blog of minhaj" link="http://localhost:3000/blogs" />
		<MainContent {...props} />
	</>
)
