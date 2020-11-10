import React, { useEffect, useState } from 'react'
import { useSelector, useDispatch } from 'react-redux'

import { Grid, Container, Typography, Paper, IconButton, FormControl, TextField, Button } from '@material-ui/core'

import { Delete as DeleteIcon, Send as SendIcon, Edit as EditIcon } from '@material-ui/icons'
import CustomTable from '../common/table'
import { CustomLoader, CustomMessage, ConfimDialog, CustomModal } from '../common'
// Imported Actions
import {
	handleClearMessage,
	getDataFromServer,
	handleChangeForm,
	handleSubmitForm,
	handleDeleteMail,
	handleClickEditEmail,
	handleChangeEditEmail,
	handleSubmitEditEmail,
} from '../redux/actions/subscriptions'
// import TextEditor from '../common/slate-editor'
import styled from './style.module.css'

const MailForm = () => {
	const dispatch = useDispatch()
	const state = useSelector(state => state.subscriptions)
	return (
		<Paper className={styled.padding}>
			<Typography variant="h6" component="div">
				Send Mail
			</Typography>

			<form onSubmit={e => dispatch(handleSubmitForm(e))}>
				<FormControl margin="dense" fullWidth>
					<TextField
						label="Subject"
						variant="outlined"
						name="subject"
						multiline
						rows={2}
						onChange={e => dispatch(handleChangeForm(e))}
						value={state.emailSender.subject}
					/>
				</FormControl>
				<FormControl margin="dense" fullWidth>
					<TextField
						label="Message"
						variant="outlined"
						name="message"
						multiline
						rows={10}
						onChange={e => dispatch(handleChangeForm(e))}
						value={state.emailSender.message}
					/>
				</FormControl>
				<FormControl margin="dense">
					<Button type="submit" startIcon={<SendIcon />} color="primary" variant="contained">
						Submit
					</Button>
				</FormControl>
			</form>
		</Paper>
	)
}

const Subscriptions = () => {
	const { isLoading, isUpdating, error, success, subscribers, editSubscriber } = useSelector(state => state.subscriptions)

	const [confirmDialog, setConfirmDialog] = useState({
		isOpen: false,
		error: '',
		text: '',
		selectedId: '',
	})

	const dispatch = useDispatch()
	useEffect(() => {
		dispatch(getDataFromServer())
	}, [dispatch])

	const handleToggle = i => {
		setConfirmDialog({
			...confirmDialog,
			isOpen: !confirmDialog.isOpen,
			selectedId: i._id,
		})
	}
	const handleClearError = () => {
		setConfirmDialog({
			...confirmDialog,
			error: '',
		})
	}
	const handleChange = e => {
		e.persist()
		setConfirmDialog({
			...confirmDialog,
			error: '',
			text: e.target.value,
		})
	}
	const handleConfirm = () => {
		if (confirmDialog.text === 'CONFIRM') {
			dispatch(handleDeleteMail(confirmDialog.selectedId))
			setConfirmDialog({
				...confirmDialog,
				isOpen: false,
			})
		} else {
			setConfirmDialog({
				...confirmDialog,
				error: 'Failed To Confirmation',
			})
		}
	}
	return (
		<Container>
			<CustomLoader isLoader={isLoading} text="Loading..." />
			<CustomMessage text={error || success} handleClose={() => dispatch(handleClearMessage())} />
			<ConfimDialog
				isOpen={confirmDialog.isOpen}
				error={confirmDialog.error}
				contentText="Please confirm to delete the email for write in the field  "
				clearError={handleClearError}
				handleToggle={handleToggle}
				handleChange={handleChange}
				handleConfirm={handleConfirm}
			/>
			<CustomModal
				title="Update"
				open={Object.keys(editSubscriber).length !== 0 ? true : false}
				handleClick={() => dispatch(handleClickEditEmail({}))}
				bodyComponent={() => (
					<TextField variant="outlined" fullWidth value={editSubscriber.email} label="Email" onChange={e => dispatch(handleChangeEditEmail(e))} />
				)}
				handleSubmit={e => dispatch(handleSubmitEditEmail(e))}
				isLoading={isUpdating}
				width="sm"
			/>
			<Grid container spacing={2}>
				<Grid item sm={6}>
					<MailForm />
				</Grid>
				<Grid item sm={6}>
					<CustomTable
						rows={subscribers}
						headCells={[{ id: 'name', numeric: false, disablePadding: false, label: 'Email' }]}
						control={item => (
							<>
								<IconButton onClick={() => dispatch(handleClickEditEmail(item))} color="primary">
									<EditIcon />
								</IconButton>
								<IconButton color="secondary" onClick={() => handleToggle(item)}>
									<DeleteIcon />
								</IconButton>
							</>
						)}
						
					/>
				</Grid>
			</Grid>
		</Container>
	)
}

export default Subscriptions
