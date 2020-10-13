import React, { useEffect, useState } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import {
	Grid,
	Container,
	Paper,
	AppBar,
	Tabs,
	Tab,
	Card,
	CardActionArea,
	CardMedia,
	CardContent,
	CardActions,
	Typography,
	Button,
	FormControl,
	TextField,
	Collapse,
	Switch,
} from '@material-ui/core'
import { Skeleton } from '@material-ui/lab'
import { Delete as DeleteIcon, Edit as EditIcon } from '@material-ui/icons'
import {
	handleChangeGroupIndex,
	handleTabSelectedGroupId,
	getBlogsHandle,
	getAllPostsRequest,
	selectedPostUpdateModal,
	postUpdateHandleChange,
	handleUpdateBlogsPost,
	alertHandleClose,
	handleDeleteBlogsPost,
} from '../redux/actions/blog'
import { Loader, CustomModal, CustomAlert, ConfimDialog, CustomFileUploadUI } from '../common'
import ReactEditor from '../common/react-editor'
import styled from './style.module.css'

const CustomTab = () => {
	const dispatch = useDispatch()
	const { group, groupIndex } = useSelector(state => state.blog)
	useEffect(() => {
		if (group.length !== 0) {
			dispatch(handleTabSelectedGroupId(group[groupIndex]._id))
		}
	}, [dispatch, group, groupIndex])
	return (
		<AppBar position="static" color="default">
			<Tabs
				value={groupIndex}
				onChange={(e, newIndex) => dispatch(handleChangeGroupIndex(newIndex))}
				indicatorColor="primary"
				textColor="primary"
				variant="scrollable"
				scrollButtons="auto"
				aria-label="scrollable auto tabs example"
			>
				{group.map((g, i) => (
					<Tab label={g.title} key={i} onClick={() => dispatch(handleTabSelectedGroupId(g._id))} />
				))}
			</Tabs>
		</AppBar>
	)
}

const BlogItem = ({ post, handleClick }) => {
	const dispatch = useDispatch()
	const [open, setOpen] = useState(false)
	const [error, setError] = useState('')
	const [text, setText] = useState('')
	const handleToggle = () => {
		setOpen(!open)
	}
	const handleChange = event => {
		event.persist()
		setText(event.target.value)
	}
	const handleConfirm = () => {
		if (text === 'CONFIRM') {
			dispatch(handleDeleteBlogsPost(post))
		} else {
			setError('Failed To Confirmation Latter')
		}
	}

	return (
		<Grid item sm={4}>
			<Card raised>
				<ConfimDialog
					isOpen={open}
					contentText="Delete the post permanently,so you can't back the post after the deleted post.Please confirm us for delete post"
					handleToggle={handleToggle}
					handleChange={handleChange}
					handleConfirm={handleConfirm}
					error={error}
					clearError={() => setError('')}
				/>
				<CardActionArea onClick={() => dispatch(handleClick(post))}>
					<CardMedia component="img" alt="Contemplative Reptile" height="140" image={post.thumbnail} title="Contemplative Reptile" />
					<CardContent>
						<Typography gutterBottom variant="h5" component="h2">
							{post.title}
						</Typography>
					</CardContent>
				</CardActionArea>
				<CardActions>
					<Button startIcon={<EditIcon />} size="small" color="primary" variant="outlined" onClick={() => dispatch(handleClick(post))}>
						Update
					</Button>
					<Button startIcon={<DeleteIcon />} size="small" color="secondary" variant="outlined" onClick={handleToggle}>
						Delete
					</Button>
				</CardActions>
			</Card>
		</Grid>
	)
}

const EditForm = () => {
	const dispatch = useDispatch()
	const state = useSelector(state => state.blog)
	const [isOpen, setOpen] = useState(false)
	const handleClick = () => {
		setOpen(!isOpen)
	}

	return (
		<>
			<b>SEO</b>

			<Switch onChange={handleClick} checked={isOpen} />
			<Collapse in={isOpen}>
				<FormControl margin="dense" fullWidth>
					<TextField
						value={state.updatePost.title || ''}
						name="title"
						label="Title"
						variant="outlined"
						onChange={e => dispatch(postUpdateHandleChange(e))}
					/>
				</FormControl>
				<FormControl margin="dense" fullWidth>
					<Grid container spacing={2}>
						<Grid item sm={6}>
							<TextField
								value={state.updatePost.keywords || ''}
								name="keywords"
								label="Keywords"
								variant="outlined"
								multiline
								onChange={e => dispatch(postUpdateHandleChange(e))}
								fullWidth
								rows={10}
							/>
						</Grid>
						<Grid item sm={6}>
							<Card variant="outlined">
								<div
									style={{
										padding: '0.25rem',
										height: '225px',
										display: 'flex',
										justifyContent: 'center',
										alignItems: 'center',
										color: ' #3f51b599',
									}}
								>
									{state.updatePost.thumbnail || state.updatePost.file ? (
										<img
											src={state.updatePost.file ? URL.createObjectURL(state.updatePost.file) : state.updatePost.thumbnail}
											alt="Images"
											width="100%"
											height="100%"
										/>
									) : (
										<h1>Thumbnail</h1>
									)}
								</div>
							</Card>
						</Grid>
					</Grid>
				</FormControl>
				<FormControl margin="dense" fullWidth>
					<CustomFileUploadUI handleChange={e => dispatch(postUpdateHandleChange(e))} file={state.updatePost.file} />
				</FormControl>
			</Collapse>

			<FormControl margin="dense" fullWidth>
				<ReactEditor
					data={state.updatePost.content && JSON.parse(state.updatePost.content)}
					handleChange={(api, newData) => dispatch(postUpdateHandleChange(newData))}
				/>
			</FormControl>
		</>
	)
}

const BlogsPost = () => {
	const state = useSelector(state => state.blog)
	const dispatch = useDispatch()
	useEffect(() => {
		dispatch(getBlogsHandle())
		dispatch(getAllPostsRequest())
	}, [dispatch])
	return (
		<Container>
			{state.isLoading ? (
				<Typography variant="h2" component="h2">
					<Skeleton />
				</Typography>
			) : (
				<CustomTab />
			)}

			{state.success || state.error ? (
				<CustomAlert closeHandle={() => dispatch(alertHandleClose())} isError={state.success ? false : true} value={state.success || state.error} />
			) : (
				<br />
			)}

			<CustomModal
				open={state.isEditPostOpen}
				title="Update Modal"
				handleClick={() => dispatch(selectedPostUpdateModal())}
				bodyComponent={() => <EditForm />}
				handleSubmit={e => dispatch(handleUpdateBlogsPost(e))}
			/>
			<Paper className={styled.padding} square={true} variant="outlined">
				{state.isLoading && <Loader />}
				<Grid container spacing={2}>
					{!state.isLoading &&
						state.posts
							.filter(post => post.group.toString() === state.selectedTabGroupId.toString())
							.map((post, ind) => <BlogItem post={post} key={ind} handleClick={selectedPostUpdateModal} />)}
				</Grid>
			</Paper>
		</Container>
	)
}

export default BlogsPost
