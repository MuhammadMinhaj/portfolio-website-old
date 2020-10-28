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
	Select,
	MenuItem,
	InputLabel,
} from '@material-ui/core'
import { Skeleton } from '@material-ui/lab'
import { Delete as DeleteIcon, Edit as EditIcon } from '@material-ui/icons'
import { DropzoneArea } from 'material-ui-dropzone'

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
import { Loader, CustomModal, CustomAlert, ConfimDialog, CustomSelectionItem } from '../common'
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
	const state = useSelector(state => state.blog)
	const dispatch = useDispatch()
	const [open, setOpen] = useState(false)
	const [error, setError] = useState('')
	const [text, setText] = useState('')
	const [thumbnail, setThumbnail] = useState('')
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
	useEffect(() => {
		state.group.forEach(g => {
			if (g._id.toString() === state.selectedTabGroupId.toString()) {
				setThumbnail(g.thumbnail)
			}
		})
	}, [state.group, state.selectedTabGroupId])
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
					<CardMedia component="img" alt="Contemplative Reptile" height="140" image={post.thumbnail || thumbnail} title="Contemplative Reptile" />
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
								rows={11}
							/>
						</Grid>
						<Grid item sm={6}>
							<DropzoneArea
								acceptedFiles={['image/*']}
								dropzoneText={'Drag and drop an image here or click'}
								onChange={e => dispatch(postUpdateHandleChange(e, true))}
								filesLimit={1}
								initialFiles={[state.updatePost.thumbnail]}
							/>
						</Grid>
					</Grid>
				</FormControl>
			</Collapse>

			<FormControl margin="dense" fullWidth>
				<ReactEditor
					data={state.updatePost.content && JSON.parse(state.updatePost.content)}
					handleChange={(api, newData) => dispatch(postUpdateHandleChange(newData))}
				/>
			</FormControl>

			<Grid container spacing={3}>
				<Grid item sm={6}>
					<FormControl margin="dense" fullWidth>
						<CustomSelectionItem
							handleChange={e => dispatch(postUpdateHandleChange({ target: { name: 'group', value: e.target.value } }))}
							value={state.updatePost.group}
							lists={state.group}
						/>
					</FormControl>
				</Grid>
				<Grid item sm={6}>
					<FormControl margin="dense" fullWidth>
						<InputLabel id="update-language-selection-list">Select Language</InputLabel>

						<Select
							value={state.updatePost.lang}
							label="Select Language"
							labelId="update-language-selection-list"
							id="demo-controlled-open-select"
							onChange={e => dispatch(postUpdateHandleChange(e))}
						>
							<MenuItem value="en">English</MenuItem>
							<MenuItem value="bn">Bangla</MenuItem>
						</Select>
					</FormControl>
				</Grid>
			</Grid>
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
