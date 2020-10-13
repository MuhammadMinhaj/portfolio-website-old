import React, { useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { Grid, Paper, Typography } from '@material-ui/core'

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
import { CustomTabs, CustomInlineForm, CustomItem, CustomAlert, Loader } from '../common'
import { ProjectStepper } from './commonPortfolio'
// Style
import styled from './style.module.css'

const CreateGroup = () => {
	const { isLoading, isLoadingTow, groupname, group, updateGroup } = useSelector(state => state.portfolio)
	const dispatch = useDispatch()
	return (
		<>
			<CustomInlineForm
				value={groupname}
				handleChange={e => dispatch(createGroupHandleChange(e))}
				handleSubmit={e => dispatch(createGroupHandleSubmit(e))}
			/>
			<Paper className={styled.padding} square variant="outlined">
				<Loader isLoading={isLoading} />

				<Grid container spacing={2}>
					{group.map((g, i) => (
						<CustomItem
							key={i}
							isLoading={isLoadingTow}
							item={g}
							updateItem={updateGroup}
							selectUpdateHandle={() => dispatch(handleSelectUpdateGroup(g))}
							updateHandleChange={e => dispatch(handleChangeUpdateGroup(e))}
							updateHandleSubmit={e => dispatch(handleSubmitUpdateGroup(e))}
							handleClickDelete={id => dispatch(handleClickDeleteGroup(id))}
						/>
					))}
				</Grid>
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
				fieldsObject={{ title: createProject.title, link: createProject.link, description: createProject.description }}
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
