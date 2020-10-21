import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import {
	Container,
	Grid,
	Paper,
	AppBar,
	Tabs,
	Tab,
	Card,
	CardMedia,
	CardContent,
	CardActionArea,
	CardActions,
	Button,
	Typography,
	Grow,
} from '@material-ui/core'
import {
	handleClearationAll,
	getPortfolioGroup,
	getPortfolioProjects,
	handleChangeGroupIndex,
	handleGroupSelection,
	handleClickModal,
	handleChangeUpdateProject,
	handleChangeFileUpdate,
	handleChangeFilesUpdate,
	handleChangeUpdateImgTitle,
	handleChangeDeleteImg,
	updateHandleSubmit,
	handleClickDeleteProject,
} from '../redux/actions/portfolio'
import { CustomLoader, CustomModal, CustomAlert, ConfimDialog } from '../common'

import { Edit as EditIcon, Delete as DeleteIcon } from '@material-ui/icons'
import { ProjectStepper } from './commonPortfolio'
const TabBar = () => {
	const { group, groupIndex } = useSelector(state => state.portfolio)
	const dispatch = useDispatch()
	useEffect(() => {
		if (group.length !== 0) {
			dispatch(handleGroupSelection(group[groupIndex]._id))
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
				{group.map((g, ind) => (
					<Tab label={g.title} key={ind} onClick={() => dispatch(handleGroupSelection(g._id))} />
				))}
			</Tabs>
		</AppBar>
	)
}

const ListItem = ({ list, handleToggleDeleteProject }) => {
	const dispatch = useDispatch()
	return (
		<Grid item sm={6}>
			<Grow in>
				<Card raised>
					<CardActionArea onClick={() => dispatch(handleClickModal(list))}>
						<CardMedia style={{ height: '250px' }} image={list.thumbnail} title={list.title} />
						<CardContent>
							<Typography gutterBottom variant="h5" component="h2">
								{list.title}
							</Typography>
						</CardContent>
					</CardActionArea>
					<CardActions>
						<Button startIcon={<EditIcon />} variant="contained" size="small" color="primary" onClick={() => dispatch(handleClickModal(list))}>
							Edit
						</Button>
						<Button
							startIcon={<DeleteIcon />}
							variant="contained"
							size="small"
							color="secondary"
							onClick={e => handleToggleDeleteProject(e, list._id)}
						>
							Delete
						</Button>
					</CardActions>
				</Card>
			</Grow>
		</Grid>
	)
}

const ProjectsList = () => {
	const { projects, selectedGroup } = useSelector(state => state.portfolio)
	const dispatch = useDispatch()
	const [open, setOpen] = useState(false)
	const [text, setText] = useState('')
	const [error, setError] = useState('')
	const [id, setId] = useState(null)
	const handleConfirm = () => {
		if (text === 'CONFIRM') {
			dispatch(handleClickDeleteProject(id))
			setOpen(false)
		} else {
			setError('Failed to confirmation! Invalid confirm text')
		}
	}
	const handleToggleProjectDelete = (e, id) => {
		setOpen(!open)
		setId(id)
	}
	return (
		<Grid container spacing={2}>
			<ConfimDialog
				isOpen={open}
				error={error}
				clearError={() => setError('')}
				handleToggle={handleToggleProjectDelete}
				handleChange={e => setText(e.target.value)}
				contentText="Delete all projects images and thumbnail permanently!You can't back the project after deleting or deleted.Type the "
				handleConfirm={handleConfirm}
			/>
			{projects
				.filter(p => p.group.toString() === selectedGroup)
				.map((p, ind) => (
					<ListItem list={p} key={ind} handleToggleDeleteProject={handleToggleProjectDelete} />
				))}
		</Grid>
	)
}

const UpdateForm = () => {
	const { success, error, updateProject, isLoadingTow } = useSelector(state => state).portfolio
	const dispatch = useDispatch()
	return (
		<>
			{success || error ? (
				<CustomAlert isError={error ? true : false} value={success || error} closeHandle={() => dispatch(handleClearationAll())} />
			) : null}

			<ProjectStepper
				handleChange={e => dispatch(handleChangeUpdateProject(e))}
				fieldsObject={{
					title: updateProject.title,
					description: updateProject.description,
					link: updateProject.link,
					client: updateProject.client,
					industry: updateProject.industry,
					time: updateProject.time,
				}}
				previewImages={updateProject.images}
				tagsValues={updateProject.tools.split(',')}
				defaultFileThumbnail={updateProject.thumbnail}
				project={updateProject}
				selectedGroup={updateProject.group}
				isUpdate={true}
				isLoading={isLoadingTow}
				loaderText="Updating..."
				handleChangeFile={files => dispatch(handleChangeFileUpdate(files[0]))}
				handleSaveFiles={files => dispatch(handleChangeFilesUpdate(files))}
				getTagsValues={tags => dispatch(handleChangeUpdateProject(tags))}
				handleChangeImageTitle={(e, index) => dispatch(handleChangeUpdateImgTitle(e, index))}
				handleDeleteImage={activeStep => dispatch(handleChangeDeleteImg(activeStep))}
			/>
		</>
	)
}

const Portfolio = () => {
	const state = useSelector(state => state.portfolio)
	const dispatch = useDispatch()

	useEffect(() => {
		dispatch(getPortfolioGroup())
		dispatch(getPortfolioProjects())
	}, [dispatch])
	return (
		<Container>
			<CustomLoader isLoader={state.isLoading} text="Loading..." />
			<TabBar />
			<br />
			<div style={{ maxWidth: '800px' }}>
				{state.updateProject && (
					<CustomModal
						open={state.isUpdateModal}
						title="Update Project"
						bodyComponent={() => <UpdateForm />}
						handleClick={() => dispatch(handleClickModal())}
						handleSubmit={e => dispatch(updateHandleSubmit(e))}
					/>
				)}
			</div>
			<Paper variant="outlined" style={{ padding: '1rem' }}>
				<ProjectsList />
			</Paper>
		</Container>
	)
}
export default Portfolio
