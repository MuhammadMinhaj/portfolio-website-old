import React, { useEffect, useState } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { Paper, Typography, TextField, IconButton } from '@material-ui/core'

import { Edit as EditIcon, Delete as DeleteIcon } from '@material-ui/icons'

import {
	handleClearationAll,
	handleTabIndex,
	getPortfolioGroup,
	createGroupHandleChange,
	createGroupHandleSubmit,
	handleSelectUpdateGroup,
	handleChangeUpdateGroup,
	handleSubmitUpdateGroup,
	handleClickDeleteGroup,
	// Project Creation
	createHandleChange,
	createHandleChangeFile,
	createHandleSaveFiles,
	handleChangeImageTitle,
	createHandleSubmit,
} from '../redux/actions/portfolio'

// Common Components Imported
import { CustomTabs, CustomInlineForm, CustomAlert, Loader, CustomModal, ConfimDialog } from '../common'
import CustomTable from '../common/table'
import { ProjectStepper } from './commonPortfolio'
// Style
import styled from './style.module.css'

const CreateGroup = () => {
	const { isLoading, isLoadingTow, groupname, group, updateGroup } = useSelector(state => state.portfolio)
	const dispatch = useDispatch()
	const [open, setOpen] = useState(false)
	const [settings, setSettings] = useState({
		isOpen: false,
		error: '',
		text: '',
		id: null,
	})

	const handleClick = item => {
		setOpen(!open)
		dispatch(handleSelectUpdateGroup(item))
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
				handleChange={e => dispatch(createGroupHandleChange(e))}
				handleSubmit={e => dispatch(createGroupHandleSubmit(e))}
			/>
			<Paper className={styled.padding} square variant="outlined">
				<Loader isLoading={isLoading} />
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
						<TextField variant="outlined" value={updateGroup.title} onChange={e => dispatch(handleChangeUpdateGroup(e))} fullWidth />
					)}
					width="sm"
					handleSubmit={e => dispatch(handleSubmitUpdateGroup(e))}
					isLoading={isLoadingTow}
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
				/>
			</Paper>
		</>
	)
}

const AddPortfolioProject = () => {
	const { isLoading, createProject } = useSelector(state => state.portfolio)
	const dispatch = useDispatch()
	return (
		<Paper variant="outlined" style={{ marginTop: '0.5rem', padding: '1rem' }}>
			<Typography variant="h4" component="h6" align="center" color="textSecondary">
				CREATE PROJECT
			</Typography>
			<ProjectStepper
				handleChangeFile={files => dispatch(createHandleChangeFile(files))}
				handleSaveFiles={files => dispatch(createHandleSaveFiles(files))}
				handleChange={event => dispatch(createHandleChange(event))}
				fieldsObject={{
					title: createProject.title,
					link: createProject.link,
					description: createProject.description,
					client: createProject.client,
					industry: createProject.industry,
					time: createProject.time,
				}}
				tagsValues={createProject.tools}
				getTagsValues={tags => dispatch(createHandleChange(tags))}
				defaultFileThumbnail={createProject.thumbnail}
				previewImages={createProject.images}
				handleChangeImageTitle={(e, index) => dispatch(handleChangeImageTitle(e, index))}
				project={createProject}
				selectedGroup={createProject.group}
				loaderText="Creating..."
				isLoading={isLoading}
				handleSubmit={() => dispatch(createHandleSubmit())}
				isUpdate={false}
			/>
		</Paper>
	)
}

const PortfolioCreation = () => {
	const { error, success, tabIndex } = useSelector(state => state.portfolio)
	const dispatch = useDispatch()
	useEffect(() => {
		dispatch(getPortfolioGroup())
	}, [dispatch])
	return (
		<>
			<CustomTabs index={tabIndex} handleChange={(e, value) => dispatch(handleTabIndex(value))} tabNames={['Portfolio Creation', 'Group Creation']} />

			{error || success ? (
				<CustomAlert isError={error ? true : false} value={error || success} closeHandle={() => dispatch(handleClearationAll())} />
			) : (
				''
			)}
			{tabIndex === 0 ? <AddPortfolioProject /> : <CreateGroup />}
		</>
	)
}

export default PortfolioCreation
