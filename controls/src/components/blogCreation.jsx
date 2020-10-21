import React, { useEffect, useState } from 'react'
import { useSelector, useDispatch } from 'react-redux'
// import CKEditor from 'ckeditor4-react'
import {
	Grow,
	Container,
	Grid,
	Paper,
	TextField,
	FormControl,
	Collapse,
	Switch,
	FormControlLabel,
	Button,
	Card,
	CircularProgress,
	IconButton,
} from '@material-ui/core'
import { Send as SendIcon, Delete as DeleteIcon, Edit as EditIcon } from '@material-ui/icons'

import styled from './style.module.css'

// Imported Common Components
import { CustomTabs, CustomInlineForm, CustomSelectionItem, CustomFileUploadUI, Loader, CustomAlert, CustomModal, ConfimDialog } from '../common'
import CustomTable from '../common/table'
import ReactEditor from '../common/react-editor'
// Imported All Actions
import {
	getBlogsHandle,
	alertHandleClose,
	handleTabChange,
	handleSeoChange,
	handleMenuChange,
	createBlogHandleChange,
	createBlogHandleSubmit,
	handleGroupNameChange,
	handleGroupNameSubmit,
	handleClickUpdateGroup,
	handleChangeUpdateGroup,
	handleSubmitUpdateGroup,
	handleClickDeleteGroup,
} from '../redux/actions/blog'

const BlogCreation = () => {
	const dispatch = useDispatch()
	const state = useSelector(state => state.blog)
	const {
		isSeo,
		group,
		selectedGroup,
		createBlog: { title, keywords, content, file },
	} = state
	return (
		<>
			<FormControlLabel
				value="SEO"
				control={<Switch onChange={() => dispatch(handleSeoChange())} checked={isSeo} />}
				label="PAGE SEO"
				labelPlacement="start"
			/>
			<div>
				<Grow in>
					<Paper className={styled.padding} square={true} variant="outlined">
						<form onSubmit={e => dispatch(createBlogHandleSubmit(e))}>
							<Collapse in={isSeo}>
								<h4>SEO</h4>
								<FormControl fullWidth margin="dense">
									<TextField variant="outlined" label="Title" value={title} name="title" onChange={e => dispatch(createBlogHandleChange(e))} />
								</FormControl>
								<FormControl fullWidth margin="dense">
									<Grid container spacing={2}>
										<Grid item sm={6}>
											<TextField
												variant="outlined"
												label="Keyword"
												rows={10}
												multiline
												value={keywords}
												name="keywords"
												onChange={e => dispatch(createBlogHandleChange(e))}
												fullWidth
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
													{file ? <img src={URL.createObjectURL(file)} alt="Images" width="100%" height="100%" /> : <h1>Thumbnail</h1>}
												</div>
											</Card>
										</Grid>
									</Grid>
								</FormControl>

								<FormControl fullWidth margin="dense">
									<CustomFileUploadUI handleChange={e => dispatch(createBlogHandleChange(e))} file={file} />
								</FormControl>
							</Collapse>
							<FormControl fullWidth margin="dense">
								<ReactEditor data={content} handleChange={(api, data) => dispatch(createBlogHandleChange(data))} />
							</FormControl>
							{/* Selection Item */}
							<FormControl margin="dense" fullWidth>
								<CustomSelectionItem handleChange={e => dispatch(handleMenuChange(e))} value={selectedGroup} lists={group} />
							</FormControl>

							<FormControl margin="dense">
								<Button color="primary" variant="contained" startIcon={<SendIcon />} type="submit">
									Send
								</Button>
							</FormControl>
							{state.isLoading && (
								<FormControl margin="dense">
									<CircularProgress size="2rem" style={{ marginLeft: '1rem' }} />
								</FormControl>
							)}
						</form>
					</Paper>
				</Grow>
			</div>
		</>
	)
}

const CreateGroup = () => {
	const dispatch = useDispatch()
	const state = useSelector(state => state.blog)
	const { groupname, group, updateGroup, isUpdateLoading } = state

	const [open, setOpen] = useState(false)
	const [settings, setSettings] = useState({
		isOpen: false,
		error: '',
		text: '',
		id: null,
	})

	useEffect(() => {
		dispatch(getBlogsHandle())
	}, [dispatch])

	const handleClick = item => {
		setOpen(!open)
		dispatch(handleClickUpdateGroup(item))
	}

	const handleToggle = id => {
		setSettings({
			...settings,
			isOpen: !settings.isOpen,
			id,
		})
	}
	const handleChane = e => {
		e.persist()
		setSettings({
			...settings,
			text: e.target.value,
		})
	}
	const handleSubmit = () => {
		if (settings.text === 'CONFIRM') {
			dispatch(handleClickDeleteGroup(settings.id))
			setSettings({
				isOpen: false,
				error: '',
				text: '',
				id: null,
			})
		} else {
			setSettings({
				...settings,
				error: 'Failed to confirmation,Cannot delete without valid confirmation!',
			})
		}
	}

	return (
		<>
			<CustomInlineForm
				value={groupname}
				handleChange={e => dispatch(handleGroupNameChange(e))}
				handleSubmit={e => dispatch(handleGroupNameSubmit(e))}
			/>
			<Paper className={styled.padding} square variant="outlined">
				<Loader isLoading={state.isLoading} />
				<ConfimDialog
					isOpen={settings.isOpen}
					error={settings.error}
					handleToggle={handleToggle}
					clearError={() => setSettings({ ...settings, error: '' })}
					handleChange={handleChane}
					contentText="Confirm us if you want to delete group and after the deleted group can't back the group,It will permanently delete."
					handleConfirm={handleSubmit}
				/>
				<CustomModal
					title="Update"
					open={open}
					handleClick={() => handleClick()}
					bodyComponent={() => (
						<TextField
							variant="outlined"
							value={updateGroup ? updateGroup.title : ''}
							onChange={e => dispatch(handleChangeUpdateGroup(e))}
							fullWidth
						/>
					)}
					width="sm"
					handleSubmit={e => dispatch(handleSubmitUpdateGroup(e))}
					isLoading={isUpdateLoading}
				/>

				<CustomTable
					rows={group}
					headCells={[{ id: 'name', numeric: false, disablePadding: false, label: 'Group' }]}
					control={item => (
						<>
							<IconButton color="primary" onClick={() => handleClick(item)}>
								<EditIcon />
							</IconButton>
							<IconButton color="secondary" onClick={() => handleToggle(item._id)}>
								<DeleteIcon />
							</IconButton>
						</>
					)}
					handleSelectedDelete={list => console.log(list)}
				/>
			</Paper>
		</>
	)
}

const Creation = () => {
	const state = useSelector(state => state.blog)
	const dispatch = useDispatch()
	const { tabIndex } = state

	return (
		<Container>
			<CustomTabs index={tabIndex} handleChange={(e, value) => dispatch(handleTabChange(value))} tabNames={['Blog Creation', 'Group Creation']} />

			{state.error && <CustomAlert closeHandle={() => dispatch(alertHandleClose())} isError={true} value={state.error} />}

			{state.success && <CustomAlert closeHandle={() => dispatch(alertHandleClose())} isError={false} value={state.success} />}

			{tabIndex === 0 ? <BlogCreation /> : <CreateGroup />}
		</Container>
	)
}
export default Creation
