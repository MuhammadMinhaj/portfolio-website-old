import React, { useEffect, useState } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { IconButton, Button, Typography, Divider, Snackbar, TextField, FormControl } from '@material-ui/core'
import { CustomModal, ConfimDialog } from '../common'
import CustomTable from '../common/table'

import { Send as SendIcon, Visibility as VisibilityIcon, Delete as DeleteIcon, Close as CloseIcon } from '@material-ui/icons'

// Imported all actions
import {
	handleClearMessage,
	getDataFromServer,
	handleClick,
	handleClearId,
	handleSubmitDeleteContact,
	handleSelectedMail,
	handleChangeMailSender,
	handleSubmitSendMail,
} from '../redux/actions/contact'

const MailViewer = ({ contact }) => {
	return (
		<>
			<div style={{ display: 'flex', justifyContent: 'space-between' }}>
				<div>
					<Typography variant="button">Name </Typography>
					<Typography paragraph>{contact.name}</Typography>
				</div>
				<Typography variant="button">~{contact.createdAt}</Typography>
			</div>

			<Typography variant="button">Email </Typography>
			<Typography paragraph>{contact.email}</Typography>

			<Typography variant="button">Subject </Typography>
			<Typography paragraph>{contact.subject}</Typography>

			<Typography variant="button">Message </Typography>
			<Divider />
			<div
				style={{
					borderRadius: '0.25rem',
					background: '#f1f1f1',
					padding: '0.25rem',
				}}
			>
				<Typography paragraph>{contact.message}</Typography>
			</div>
		</>
	)
}

const MailForm = () => {
	const {
		isSelectedMail,
		mailSender: { subject, message },
		mailSenderErrors,
	} = useSelector(state => state.contact)
	const dispatch = useDispatch()
	return (
		<>
			<Typography variant="button" display="initial">
				Sent To : ~
			</Typography>
			<Typography variant="body2" display="inline">
				{isSelectedMail}
			</Typography>
			<FormControl fullWidth margin="dense">
				<TextField
					label="Subject"
					name="subject"
					value={subject}
					onChange={e => dispatch(handleChangeMailSender(e))}
					error={mailSenderErrors.subject ? true : false}
					helperText={mailSenderErrors.subject}
				/>
			</FormControl>

			<FormControl fullWidth margin="dense">
				<TextField
					rows={10}
					name="message"
					label="Message"
					value={message}
					multiline
					onChange={e => dispatch(handleChangeMailSender(e))}
					error={mailSenderErrors.message ? true : false}
					helperText={mailSenderErrors.message}
				/>
			</FormControl>
		</>
	)
}

export default () => {
	const dispatch = useDispatch()
	const { isLoading, isSendingMail, mails, isSelectedForView, isSelectedMail, msg } = useSelector(state => state.contact)
	const [contact, setContact] = useState(null)

	const [confirmation, setConfirmation] = useState({
		isOpen: false,
		error: '',
		confirmText: '',
		id: '',
	})

	useEffect(() => {
		dispatch(getDataFromServer())
	}, [dispatch])

	let contactMails = mails.map(m => {
		return {
			_id: m._id,
			email: m.email,
			subject: m.subject.length > 100 ? m.subject.slice(0, 50) + '...' : m.subject,
			createdAt: m.createdAt,
		}
	})
	useEffect(() => {
		if (isSelectedForView) {
			mails.map(m => {
				if (m._id.toString() === isSelectedForView.toString()) {
					setContact(m)
				}
				return m
			})
		}
	}, [isSelectedForView, mails])

	const handleToggle = id => {
		setConfirmation({
			...confirmation,
			isOpen: !confirmation.isOpen,
			id: id,
		})
	}
	const handleClearError = () => {
		setConfirmation({
			...confirmation,
			error: '',
		})
	}
	const handleChange = e => {
		e.persist()
		setConfirmation({
			...confirmation,
			confirmText: e.target.value,
		})
	}

	const handleConfirm = () => {
		if (confirmation.confirmText === 'CONFIRM') {
			dispatch(handleSubmitDeleteContact(confirmation.id))
			setConfirmation({
				...confirmation,
				error: '',
				confirmText: '',
				isOpen: false,
			})
		} else {
			setConfirmation({
				...confirmation,
				error: 'Dose not matched your confirmation',
			})
		}
	}
	return (
		<>
			{/* This component for view contact message */}
			{contact && (
				<CustomModal
					title="CONTACT MAIL"
					width="sm"
					open={isSelectedForView ? true : false}
					bodyComponent={() => <MailViewer contact={contact} />}
					handleClick={() => dispatch(handleClearId())}
				/>
			)}
			{/* This component for send mail to client */}
			{isSelectedMail && (
				<CustomModal
					title="CONTACT MAIL"
					width="sm"
					open={isSelectedMail ? true : false}
					bodyComponent={MailForm}
					handleClick={() => dispatch(handleSelectedMail())}
					handleSubmit={e => dispatch(handleSubmitSendMail(e))}
					submitButton={() => (
						<Button type="submit" variant="contained" color="primary" startIcon={<SendIcon />}>
							Send
						</Button>
					)}
					isLoading={isSendingMail}
				/>
			)}
			<Snackbar
				autoHideDuration={8000}
				message={msg}
				open={msg ? true : false}
				onClose={() => dispatch(handleClearMessage())}
				action={
					<IconButton size="small" color="secondary" onClick={() => dispatch(handleClearMessage())}>
						<CloseIcon />
					</IconButton>
				}
			/>
			<ConfimDialog
				isOpen={confirmation.isOpen}
				error={confirmation.error}
				contentText="WARNING! You cannot back the deleted message please confirm to delete the message "
				clearError={handleClearError}
				handleToggle={handleToggle}
				handleChange={handleChange}
				handleConfirm={handleConfirm}
			/>

			<CustomTable
				rows={contactMails}
				headCells={[
					{ id: 'email', numeric: false, disablePadding: false, label: 'EMAIL' },
					{ id: 'subject', numeric: false, disablePadding: false, label: 'SUBJECT' },
					{ id: 'createdAt', numeric: false, disablePadding: false, label: 'Date' },
				]}
				control={item => (
					<>
						<IconButton color="primary" onClick={() => dispatch(handleClick(item._id, true))}>
							<VisibilityIcon />
						</IconButton>

						<IconButton color="secondary" onClick={() => handleToggle(item._id)}>
							<DeleteIcon />
						</IconButton>

						<IconButton color="primary" onClick={() => dispatch(handleSelectedMail(item.email))}>
							<SendIcon />
						</IconButton>
					</>
				)}
				isLoading={isLoading}
			/>
		</>
	)
}
