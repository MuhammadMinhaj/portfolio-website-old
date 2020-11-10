import React from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { Container, Grid, TextField, Button, IconButton, useMediaQuery, Snackbar, LinearProgress } from '@material-ui/core'
import { Title } from '../common'
import SEO from '../common/seo'
import styled from './style.module.css'

import {
	Send as SendIcon,
	Email as EmailIcon,
	LocationOn as LocationOnIcon,
	DoubleArrow as DoubleArrowIcon,
	Phone as PhoneIcon,
	Duo as DuoIcon,
	Close as CloseIcon,
} from '@material-ui/icons'

import { handleChange, handleSubmit, handleClearAlertMessage } from '../redux/actions'

const Item = props => (
	<div className={styled.item}>
		<div className={styled.icon}>
			<props.icon />
		</div>

		<div className={styled.content}>
			<h2>{props.title}</h2>
			<h4>
				<DoubleArrowIcon />
				{props.text}
			</h4>
		</div>
	</div>
)

export const Contact = () => {
	const { name, email, subject, message, errors, alertMessage, isLoading } = useSelector(state => state).web.contact
	const dispatch = useDispatch()
	const isMatchedWidth = useMediaQuery('(min-width:576px)')
	const contactLists = [
		{
			icon: EmailIcon,
			title: 'Email',
			text: 'mdminhajctg24@gmail.com',
		},
		{
			icon: PhoneIcon,
			title: 'Phone',
			text: '+8801831-137771',
		},
		{
			icon: DuoIcon,
			title: 'Skype',
			text: '@muhammadminhaj',
		},
		{
			icon: LocationOnIcon,
			title: 'Address',
			text: 'Amin textile colony,Chittagong,Bangladesh-4042',
		},
	]
	return (
		<Container>
			<Title title="Contact" subTitle="Me" />
			{isMatchedWidth && <h3 style={{ textAlign: 'center', color: '#607d8b' }}>OR</h3>}

			<Snackbar
				message={alertMessage}
				open={alertMessage ? true : false}
				autoHideDuration={8000}
				onClose={() => dispatch(handleClearAlertMessage())}
				action={
					<IconButton color="secondary" size="small" onClick={() => dispatch(handleClearAlertMessage())}>
						<CloseIcon />
					</IconButton>
				}
			/>
			<Grid container>
				<Grid container item sm={6}>
					<div className={styled.contactAddress}>
						{contactLists.map((list, ind) => (
							<Item key={ind} icon={list.icon} title={list.title} text={list.text} />
						))}
					</div>
				</Grid>
				{!isMatchedWidth && <h3 style={{ margin: 'auto', color: '#607d8b' }}>OR</h3>}
				<Grid container item sm={6}>
					<div className={styled.contactForm}>
						<form onSubmit={e => dispatch(handleSubmit(e))}>
							<TextField
								label="Name"
								fullWidth
								name="name"
								placeholder="Name"
								margin="normal"
								size="medium"
								value={name}
								onChange={e => dispatch(handleChange(e))}
								error={errors.name ? true : false}
								helperText={errors.name}
							/>
							<TextField
								label="Email"
								fullWidth
								name="email"
								placeholder="example@example.com"
								margin="normal"
								size="medium"
								type="email"
								value={email}
								onChange={e => dispatch(handleChange(e))}
								error={errors.email ? true : false}
								helperText={errors.email}
							/>

							<TextField
								label="Subject"
								fullWidth
								multiline
								rowsMax={2}
								name="subject"
								placeholder="Subject"
								margin="normal"
								size="medium"
								value={subject}
								onChange={e => dispatch(handleChange(e))}
								error={errors.subject ? true : false}
								helperText={errors.subject}
							/>

							<TextField
								label="Message"
								fullWidth
								multiline
								rows={10}
								name="message"
								placeholder="Message"
								margin="normal"
								size="medium"
								value={message}
								onChange={e => dispatch(handleChange(e))}
								error={errors.message ? true : false}
								helperText={errors.message}
							/>
							{isLoading && (
								<div style={{ marginBottom: '0.5rem' }}>
									<LinearProgress />
								</div>
							)}

							<Button type="submit" variant="contained" color="primary" endIcon={<SendIcon>send</SendIcon>} size="large">
								Submit
							</Button>
						</form>
					</div>
				</Grid>
			</Grid>
		</Container>
	)
}

export default () => (
	<>
		<SEO title="Contact Me" content="contact with md minhaj,contact info of muhammad minhaj" link="https://mdminhaj.com/contact" />
		<Contact />
	</>
)
