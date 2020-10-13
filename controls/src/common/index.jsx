import React, { useState } from 'react'
import { useDispatch } from 'react-redux'
import { withStyles } from '@material-ui/core/styles'
import {
	Grid,
	Paper,
	Tabs,
	Tab,
	Card,
	CardContent,
	CardActions,
	CircularProgress,
	FormControl,
	TextField,
	Button,
	IconButton,
	Dialog,
	DialogActions,
	DialogContent,
	DialogContentText,
	DialogTitle,
	Divider,
	Typography,
	InputLabel,
	Select,
	MenuItem,
} from '@material-ui/core'
import Autocomplete, { createFilterOptions } from '@material-ui/lab/Autocomplete'
import { Alert } from '@material-ui/lab'
import { PulseLoader, ScaleLoader } from 'react-spinners'

import {
	Close as CloseIcon,
	Update as UpdateIcon,
	Fullscreen as FullscreenIcon,
	FullscreenExit as FullscreenExitIcon,
	NoteAdd as NoteAddIcon,
	Edit as EditIcon,
	Delete as DeleteIcon,
} from '@material-ui/icons'
import styled from './style.module.css'
const filter = createFilterOptions()

export const Search = ({ suggestLists, handleChange, width, size }) => {
	const [value, setValue] = React.useState(null)
	const dispatch = useDispatch()
	return (
		<Autocomplete
			value={value}
			onChange={(event, newValue) => {
				if (typeof newValue === 'string') {
					setValue({
						title: newValue,
					})
				} else if (newValue && newValue.inputValue) {
					// Create a new value from the user input

					setValue({
						title: newValue.inputValue,
					})
				} else {
					setValue(newValue)
				}
			}}
			filterOptions={(options, params) => {
				const filtered = filter(options, params)

				// Suggest the creation of a new value
				if (params.inputValue !== '') {
					filtered.push({
						inputValue: params.inputValue,
						title: `Add "${params.inputValue}"`,
					})
				}

				return filtered
			}}
			selectOnFocus
			clearOnBlur
			handleHomeEndKeys
			id="free-solo-with-text-demo"
			options={suggestLists}
			getOptionLabel={option => {
				// Value selected with enter, right from the input
				if (typeof option === 'string') {
					return option
				}
				// Add "xxx" option created dynamically
				if (option.inputValue) {
					return option.inputValue
				}
				// Regular option
				return option.title
			}}
			renderOption={option => option.title}
			style={{ width }}
			freeSolo
			includeInputInList={true}
			renderInput={params => (
				<TextField
					{...params}
					label="Search Here"
					placeholder="Search..."
					variant="outlined"
					onChange={event => dispatch(handleChange(event.target.value))}
					onKeyPress={event => dispatch(handleChange(event.target.value))}
					size={size}
				/>
			)}
		/>
	)
}

export const Loader = ({ isLoading }) => (
	<div style={{ textAlign: 'center' }}>
		<PulseLoader size={25} color={'#123abc'} loading={isLoading} />
	</div>
)
export const CustomAlert = ({ isError, value, closeHandle }) => (
	<div style={{ margin: '0.5rem 0rem' }}>
		<Alert color={isError ? 'error' : 'success'} onClose={closeHandle} severity={isError ? 'error' : 'success'}>
			{value}
		</Alert>
	</div>
)

export const ConfimDialog = ({ isOpen, error, contentText, clearError, handleToggle, handleConfirm, handleChange }) => {
	return (
		<div>
			<Dialog open={isOpen} onClose={handleToggle} aria-labelledby="form-dialog-title">
				<DialogTitle id="form-dialog-title">Confirmation</DialogTitle>
				{error && (
					<div style={{ margin: '0rem 0.5rem' }}>
						<CustomAlert isError={true} value={error} closeHandle={clearError} />{' '}
					</div>
				)}
				<DialogContent>
					<DialogContentText>
						{contentText}
						<b>
							<strong>CONFIRM</strong>
						</b>
					</DialogContentText>
					<TextField autoFocus margin="dense" id="name" label="Confirm" type="text" fullWidth onChange={e => handleChange(e)} />
				</DialogContent>
				<DialogActions>
					<Button onClick={handleToggle} color="primary">
						Cancel
					</Button>
					<Button onClick={handleConfirm} color="secondary" variant="contained">
						Delete
					</Button>
				</DialogActions>
			</Dialog>
		</div>
	)
}

const styles = theme => ({
	root: {
		margin: 0,
		padding: theme.spacing(2),
	},
	closeButton: {
		position: 'absolute',
		right: theme.spacing(1),
		top: theme.spacing(1),
		color: theme.palette.grey[500],
	},
})

const CustomDialogTitle = withStyles(styles)(props => {
	const { children, classes, onClose, ...other } = props
	return (
		<DialogTitle disableTypography className={classes.root} {...other}>
			<Typography variant="h6">{children}</Typography>
			{onClose ? (
				<IconButton aria-label="close" className={classes.closeButton} onClick={onClose}>
					<CloseIcon />
				</IconButton>
			) : null}
		</DialogTitle>
	)
})

const CustomDialogContent = withStyles(theme => ({
	root: {
		padding: theme.spacing(2),
	},
}))(DialogContent)

const CustomDialogActions = withStyles(theme => ({
	root: {
		margin: 0,
		padding: theme.spacing(1),
	},
}))(DialogActions)

export const CustomModal = ({ open, handleClick, bodyComponent, title, handleSubmit }) => {
	const [screen, setScreen] = useState(false)
	const handleClickScreen = () => {
		setScreen(!screen)
	}
	return (
		<div>
			<Dialog
				onClose={handleClick}
				aria-labelledby="update-modal"
				open={open}
				disableEnforceFocus={true}
				fullWidth={true}
				maxWidth="md"
				fullScreen={screen}
			>
				<form onSubmit={handleSubmit}>
					<CustomDialogTitle id="update-modal" onClose={handleClick}>
						{title}
					</CustomDialogTitle>

					<CustomDialogContent dividers>{bodyComponent()}</CustomDialogContent>
					<CustomDialogActions style={{ justifyContent: 'space-between' }}>
						<IconButton onClick={handleClickScreen}>{screen ? <FullscreenExitIcon /> : <FullscreenIcon />}</IconButton>
						<Button autoFocus type="submit" color="primary" variant="contained" startIcon={<UpdateIcon />}>
							Update
						</Button>
					</CustomDialogActions>
				</form>
			</Dialog>
		</div>
	)
}
export const CustomFileUploadUI = ({ handleChange, file }) => {
	return (
		<div className={styled.fileUploaderUI}>
			<h2>{file ? file.name : 'Choose File'}</h2>
			<input type="file" onChange={handleChange} name="file" />
		</div>
	)
}

// Custom Tab Pannel
export const CustomTabs = ({ index, handleChange, tabNames }) => {
	return (
		<Paper elevation={2}>
			<Tabs value={index} onChange={handleChange} indicatorColor="primary" textColor="primary" variant="fullWidth" centered>
				{tabNames.map((name, i) => (
					<Tab label={name} key={i} />
				))}
			</Tabs>
		</Paper>
	)
}

export const CustomInlineForm = ({ value, handleChange, handleSubmit }) => {
	return (
		<Paper square variant="outlined" className={styled.padding} style={{ marginTop: '0.5rem', marginBottom: '0.5rem' }}>
			<form onSubmit={handleSubmit}>
				<FormControl margin="dense" fullWidth>
					<TextField label="Group Name" value={value} onChange={handleChange} name="name" />
				</FormControl>
				<FormControl margin="dense">
					<Button type="submit" color="primary" variant="contained" startIcon={<NoteAddIcon />}>
						Create
					</Button>
				</FormControl>
			</form>
		</Paper>
	)
}

export const CustomItem = ({ isLoading, item, updateItem, selectUpdateHandle, updateHandleChange, updateHandleSubmit, handleClickDelete }) => {
	const [isOpen, setOpen] = useState(false)
	const [confirm, setConfirm] = useState('')
	const [error, setError] = useState('')

	const handleDialogToggle = () => {
		setOpen(!isOpen)
	}
	const handleChange = e => {
		setConfirm(e.target.value)
	}
	const handleSubmitConfirm = () => {
		if (confirm === 'CONFIRM') {
			handleClickDelete(item._id)
			setError('')
			setConfirm('')
			setOpen(false)
		} else {
			setError('Invalid confirmation text')
		}
	}
	const clearError = () => {
		setError('')
	}
	return (
		<Grid item sm={3}>
			<Card raised style={{ height: '100%' }}>
				<CardContent>
					<form onSubmit={updateHandleSubmit}>
						{updateItem._id ? (
							updateItem._id.toString() !== item._id.toString() ? (
								<Typography variant="h5" component="h4">
									{item.title}
								</Typography>
							) : (
								<TextField value={updateItem.title} variant="outlined" onChange={updateHandleChange} />
							)
						) : (
							<Typography variant="h5" component="h4">
								{item.title}
							</Typography>
						)}
					</form>
				</CardContent>
				<Divider />
				<CardActions>
					<ConfimDialog
						isOpen={isOpen}
						handleToggle={handleDialogToggle}
						handleChange={handleChange}
						handleConfirm={handleSubmitConfirm}
						contentText="Are you sure?Blogs delete means remove all post of this blogs.Please Confirm us! write here "
						error={error}
						clearError={clearError}
					/>

					<Button color="primary" variant="outlined" size="small" startIcon={<EditIcon />} onClick={selectUpdateHandle}>
						Update
					</Button>
					<Button color="secondary" variant="outlined" size="small" startIcon={<DeleteIcon />} onClick={handleDialogToggle}>
						Delete
					</Button>
					{isLoading && updateItem._id === item._id ? <CircularProgress size="2rem" /> : ''}
				</CardActions>
			</Card>
		</Grid>
	)
}

export const CustomSelectionItem = ({ handleChange, value, lists }) => {
	const [open, setOpen] = useState(false)
	const handleMenu = () => {
		setOpen(!open)
	}
	return (
		<>
			<InputLabel id="demo-controlled-open-select-label">Select One</InputLabel>
			<Select
				labelId="demo-controlled-open-select-label"
				id="demo-controlled-open-select"
				open={open}
				onClose={handleMenu}
				onOpen={handleMenu}
				value={value}
				onChange={handleChange}
			>
				<MenuItem value="">
					<em>None</em>
				</MenuItem>
				{lists.map((l, ind) => (
					<MenuItem value={l._id} key={ind}>
						{l.title}
					</MenuItem>
				))}
			</Select>
		</>
	)
}
// CustomPacmanLoader
export const CustomLoader = ({ isLoader, text }) => {
	return (
		<Dialog
			fullScreen
			open={isLoader}
			PaperProps={{
				style: {
					backgroundColor: 'transparent',
					boxShadow: 'none',
				},
			}}
		>
			<div style={{ zIndex: '10000', display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center', height: '100%' }}>
				<ScaleLoader size={150} height={80} width={10} margin={5} radius={20} loading={true} color="#656b7c" />

				<Typography variant="h4" component="h6" style={{ color: '#ffffff' }}>
					{text}
				</Typography>
			</div>
		</Dialog>
	)
}
