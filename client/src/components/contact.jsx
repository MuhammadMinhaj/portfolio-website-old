import React from 'react'
import { Container, Grid, TextField, Button, useMediaQuery } from '@material-ui/core'
import { Title } from '../common'
import styled from './style.module.css'

import {
	Send as SendIcon,
	Email as EmailIcon,
	LocationOn as LocationOnIcon,
	DoubleArrow as DoubleArrowIcon,
	Phone as PhoneIcon,
	Duo as DuoIcon,
} from '@material-ui/icons'

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

const Contact = () => {
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
						<form>
							<TextField label="Name" fullWidth name="name" placeholder="Name" margin="normal" size="medium" />
							<TextField label="Email" fullWidth name="email" placeholder="example@example.com" margin="normal" size="medium" type="email" />
							<TextField label="Subject" fullWidth multiline rowsMax={2} name="subject" placeholder="Subject" margin="normal" size="medium" />
							<TextField label="Message" fullWidth multiline rows={10} name="message" placeholder="Message" margin="normal" size="medium" />
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

export default Contact
