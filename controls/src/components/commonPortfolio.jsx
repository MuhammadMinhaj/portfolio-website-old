import React from 'react'
import { useSelector } from 'react-redux'
import { makeStyles, useTheme } from '@material-ui/core/styles'
import {
	Grid,
	Paper,
	FormControl,
	TextField,
	Button,
	Typography,
	Stepper,
	Step,
	StepButton,
	Checkbox,
	MobileStepper,
	Card,
	CardContent,
	CardMedia,
	CardActions,
	Divider,
} from '@material-ui/core'
import { Autocomplete } from '@material-ui/lab'
import { DropzoneArea, DropzoneDialog } from 'material-ui-dropzone'
import { CustomSelectionItem, CustomLoader } from '../common'
import {
	Send as SendIcon,
	NavigateNext as NavigateNextIcon,
	NavigateBefore as NavigateBeforeIcon,
	Done as DoneIcon,
	CheckBoxOutlineBlank as CheckBoxOutlineBlankIcon,
	CheckBox as CheckBoxIcon,
	CloudUpload as CloudUploadIcon,
	KeyboardArrowLeft,
	KeyboardArrowRight,
	Edit as EditIcon,
	Delete as DeleteIcon,
} from '@material-ui/icons'
import styled from './style.module.css'

// Imported JSON data
import data from './data.json'

const useStyles = makeStyles(theme => ({
	root: {
		width: '100%',
	},
	button: {
		marginRight: theme.spacing(1),
	},
	completed: {
		display: 'inline-block',
	},
}))

export const CheckboxesTags = ({ defaultValues, getValues }) => {
	return (
		<Autocomplete
			multiple
			id="checkboxes-tags-demo"
			options={data.tools}
			disableCloseOnSelect
			getOptionLabel={option => option}
			renderOption={(option, { selected }) => (
				<>
					<Checkbox
						icon={<CheckBoxOutlineBlankIcon fontSize="small" />}
						checkedIcon={<CheckBoxIcon fontSize="small" />}
						style={{ marginRight: 8 }}
						checked={selected}
					/>
					{option}
				</>
			)}
			// style={{ width: 500 }}
			renderInput={params => <TextField {...params} variant="outlined" label="Select tools..." placeholder="Created by..." />}
			onChange={(event, newValue) => getValues(newValue)}
			value={defaultValues}
		/>
	)
}

const InlineFormControl = ({ field, isMultiple, rows, value, handleChange }) => (
	<FormControl margin="dense" fullWidth>
		<TextField
			name={field.name}
			label={field.label}
			value={value}
			variant="outlined"
			multiline={isMultiple || false}
			rows={rows}
			onChange={handleChange}
		/>
	</FormControl>
)

const SliderImage = ({ UploadButton, previewImages, handleChangeImageTitle, handleDeleteImage, isPreview, isUpdate }) => {
	const theme = useTheme()
	const [activeStep, setActiveStep] = React.useState(0)

	const maxSteps = previewImages.length

	const handleNext = () => {
		setActiveStep(prevActiveStep => prevActiveStep + 1)
	}

	const handleBack = () => {
		setActiveStep(prevActiveStep => prevActiveStep - 1)
	}

	const mobileStepper = (
		<MobileStepper
			steps={maxSteps}
			position="static"
			variant="text"
			activeStep={activeStep}
			nextButton={
				<Button size="small" onClick={handleNext} disabled={activeStep === maxSteps - 1}>
					Next
					{theme.direction === 'rtl' ? <KeyboardArrowLeft /> : <KeyboardArrowRight />}
				</Button>
			}
			backButton={
				<Button size="small" onClick={handleBack} disabled={activeStep === 0}>
					{theme.direction === 'rtl' ? <KeyboardArrowRight /> : <KeyboardArrowLeft />}
					Back
				</Button>
			}
		/>
	)

	if (previewImages[activeStep]) {
		return (
			<>
				<Paper square elevation={0}>
					<FormControl margin="dense" fullWidth>
						<Grid container>
							<Grid item sm={isUpdate ? 4 : 2}>
								<div style={{ display: 'flex', justifyContent: 'space-evenly' }}>
									{UploadButton}
									{isUpdate && (
										<Button startIcon={<DeleteIcon />} variant="contained" color="secondary" onClick={() => handleDeleteImage(activeStep)}>
											Delete
										</Button>
									)}
								</div>
							</Grid>
							<Grid item sm={isUpdate ? 8 : 10}>
								<TextField
									value={previewImages.length !== 0 ? previewImages[activeStep].title : ''}
									name="title"
									variant="outlined"
									fullWidth
									size="small"
									label="Title"
									onChange={e => handleChangeImageTitle(e, activeStep)}
									disabled={isPreview || false}
								/>
							</Grid>
						</Grid>
					</FormControl>
				</Paper>
				<div className={styled.imgParent}>
					{isUpdate
						? previewImages.length !== 0 && (
								<img
									className={styled.img}
									src={
										typeof previewImages[activeStep].path === 'string'
											? previewImages[activeStep].path
											: URL.createObjectURL(previewImages[activeStep].path)
									}
									alt={previewImages[activeStep].title}
								/>
						  )
						: previewImages.length !== 0 && (
								<img className={styled.img} src={URL.createObjectURL(previewImages[activeStep].file)} alt={previewImages[activeStep].title} />
						  )}
				</div>

				{mobileStepper}
			</>
		)
	} else {
		return (
			<>
				{UploadButton}
				{mobileStepper}
			</>
		)
	}
}

const GetStepContent = ({
	step,
	handleChangeFile,
	handleSaveFiles,
	handleChange,
	fieldsObject,
	tagsValues,
	getTagsValues,
	defaultFileThumbnail,
	previewImages,
	handleChangeImageTitle,
	selectedGroup,
	isUpdate,
	handleDeleteImage,
}) => {
	const [open, setOpen] = React.useState(false)
	const state = useSelector(state => state.portfolio)
	switch (step) {
		case 0:
			return (
				<Grid item sm={12}>
					<InlineFormControl field={{ name: 'title', label: 'Title' }} handleChange={handleChange} value={fieldsObject.title} />
					<FormControl margin="dense" fullWidth>
						<DropzoneArea
							acceptedFiles={['image/*']}
							dropzoneText={'Drag and drop an image here or click'}
							onChange={handleChangeFile}
							filesLimit={1}
							initialFiles={[defaultFileThumbnail]}
						/>
					</FormControl>
				</Grid>
			)
		case 1:
			return (
				<>
					<Grid item sm={6}>
						<InlineFormControl field={{ name: 'industry', label: 'Industry' }} handleChange={handleChange} value={fieldsObject.industry} />
						<InlineFormControl field={{ name: 'client', label: 'Client' }} handleChange={handleChange} value={fieldsObject.client} />
						<InlineFormControl
							field={{ name: 'description', label: 'Description' }}
							isMultiple={true}
							rows={6}
							handleChange={handleChange}
							value={fieldsObject.description}
						/>
					</Grid>
					<Grid item sm={6}>
						<InlineFormControl field={{ name: 'time', label: 'Time' }} handleChange={handleChange} value={fieldsObject.time} />

						<InlineFormControl field={{ name: 'link', label: 'Link' }} handleChange={handleChange} value={fieldsObject.link} />
						<FormControl margin="dense" fullWidth>
							<CheckboxesTags defaultValues={tagsValues} getValues={getTagsValues} />
						</FormControl>

						<FormControl margin="dense" fullWidth>
							<CustomSelectionItem handleChange={handleChange} lists={state.group} value={selectedGroup} />
						</FormControl>
					</Grid>
				</>
			)
		case 2:
			return (
				<div style={{ width: '100%' }}>
					<SliderImage
						UploadButton={
							<Button startIcon={<CloudUploadIcon />} variant="contained" color="primary" onClick={() => setOpen(true)}>
								Upload
							</Button>
						}
						previewImages={previewImages}
						handleChangeImageTitle={handleChangeImageTitle}
						isUpdate={isUpdate}
						handleDeleteImage={handleDeleteImage}
					/>
					<DropzoneDialog
						acceptedFiles={['image/*']}
						cancelButtonText={'cancel'}
						submitButtonText={'Save'}
						maxFileSize={5000000}
						open={open}
						onClose={() => setOpen(false)}
						onSave={files => {
							handleSaveFiles(files)
							setOpen(false)
						}}
						showPreviews={true}
						showFileNamesInPreview={true}
						filesLimit={30}
					/>
				</div>
			)
		default:
			return 'Unknown step'
	}
}

const PreviewProject = ({ project, handleReset, handleSubmit, isUpdate }) => {
	return (
		<Card raised>
			{isUpdate && typeof project.thumbnail === 'string' ? (
				<CardMedia style={{ height: '400px' }} image={project.thumbnail} title="Thumbnail image" />
			) : (
				Object.keys(project.thumbnail).length !== 0 && (
					<CardMedia style={{ height: '400px' }} image={URL.createObjectURL(project.thumbnail)} title="Thumbnail image" />
				)
			)}

			<CardContent>
				<Typography gutterBottom variant="h5" component="h2">
					{project.title}
				</Typography>
				<Divider />
				<h4> Link :- </h4>
				<Typography variant="body2" color="textSecondary" component="p">
					{project.link}
				</Typography>
				<h4>Description :- </h4>
				<Typography variant="body2" color="textSecondary" component="p">
					{project.description}
				</Typography>
				<h4>Tools :- </h4>
				<Typography variant="body2" color="textSecondary" component="p">
					{project.tools.toString()}
				</Typography>
				<SliderImage previewImages={project.images} UploadButton={<h4>Images</h4>} isPreview={true} isUpdate={isUpdate} />
			</CardContent>

			<CardActions>
				<Button startIcon={<EditIcon />} color="secondary" variant="contained" onClick={handleReset}>
					Back To Edit
				</Button>
				{!isUpdate && (
					<Button onClick={handleSubmit} startIcon={<SendIcon />} color="primary" variant="contained">
						Submit
					</Button>
				)}
			</CardActions>
		</Card>
	)
}

export const ProjectStepper = ({
	handleChangeFile,
	handleSaveFiles,
	handleChange,
	fieldsObject,
	tagsValues,
	getTagsValues,
	defaultFileThumbnail,
	previewImages,
	handleChangeImageTitle,
	project,
	handleSubmit,
	selectedGroup,
	isLoading,
	loaderText,
	isUpdate,
	handleDeleteImage,
}) => {
	const classes = useStyles()
	const [activeStep, setActiveStep] = React.useState(0)
	const [completed, setCompleted] = React.useState({})
	const steps = ['THUMBNAIL', 'ABOUT PROJECT', 'PROJECT VIEW']
	const totalSteps = () => {
		return steps.length
	}

	const completedSteps = () => {
		return Object.keys(completed).length
	}

	const isLastStep = () => {
		return activeStep === totalSteps() - 1
	}

	const allStepsCompleted = () => {
		return completedSteps() === totalSteps()
	}

	const handleNext = () => {
		const newActiveStep = isLastStep() && !allStepsCompleted() ? steps.findIndex((step, i) => !(i in completed)) : activeStep + 1
		setActiveStep(newActiveStep)
	}

	const handleBack = () => {
		setActiveStep(prevActiveStep => prevActiveStep - 1)
	}

	const handleStep = step => () => {
		setActiveStep(step)
	}

	const handleComplete = () => {
		const newCompleted = completed
		newCompleted[activeStep] = true
		setCompleted(newCompleted)
		handleNext()
	}

	const handleReset = () => {
		setActiveStep(0)
		setCompleted({})
	}

	return (
		<div className={classes.root}>
			<Stepper nonLinear activeStep={activeStep}>
				{steps.map((label, index) => (
					<Step key={label}>
						<StepButton onClick={handleStep(index)} completed={completed[index]}>
							{label}
						</StepButton>
					</Step>
				))}
			</Stepper>

			<CustomLoader isLoader={isLoading} text={loaderText} />

			<div>
				{allStepsCompleted() ? (
					<PreviewProject project={project} handleReset={handleReset} handleSubmit={handleSubmit} isUpdate={isUpdate} />
				) : (
					<>
						<Grid container spacing={1}>
							<GetStepContent
								step={activeStep}
								handleChangeFile={handleChangeFile}
								handleSaveFiles={handleSaveFiles}
								handleChange={handleChange}
								fieldsObject={fieldsObject}
								tagsValues={tagsValues}
								getTagsValues={getTagsValues}
								defaultFileThumbnail={defaultFileThumbnail}
								previewImages={previewImages}
								handleChangeImageTitle={handleChangeImageTitle}
								selectedGroup={selectedGroup}
								isUpdate={isUpdate}
								handleDeleteImage={handleDeleteImage}
							/>
						</Grid>
						<div style={{ textAlign: 'center', marginTop: '0.5rem' }}>
							<Button startIcon={<NavigateBeforeIcon />} disabled={activeStep === 0} onClick={handleBack} className={classes.button}>
								Back
							</Button>
							<Button endIcon={<NavigateNextIcon />} variant="contained" color="primary" onClick={handleNext} className={classes.button}>
								Next
							</Button>
							{activeStep !== steps.length &&
								(completed[activeStep] ? (
									<Typography variant="caption" className={classes.completed}>
										Step {activeStep + 1} already completed
									</Typography>
								) : (
									<Button startIcon={<DoneIcon />} variant="contained" color="primary" onClick={handleComplete}>
										Complete Step
									</Button>
								))}
						</div>
					</>
				)}
			</div>
		</div>
	)
}
