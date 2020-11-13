import React from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { Container, Typography, Divider, Snackbar, IconButton, Button } from '@material-ui/core'

import { Facebook as FacebookIcon, GitHub as GitHubIcon, LinkedIn as LinkedInIcon, Close as CloseIcon } from '@material-ui/icons'
import { handleClearMessage } from '../redux/actions/app'
const socialLists = [
	{
		icon: <FacebookIcon style={{ color: '#3578E5' }} />,
		href: 'https://www.facebook.com/profile.php?id=100014744408169',
	},
	{
		icon: <GitHubIcon style={{ color: 'black' }} />,
		href: 'https://github.com/muhammad-minhaj',
	},
	{
		icon: <LinkedInIcon style={{ color: '#1994e0' }} />,
		href: 'https://github.com/muhammad-minhaj',
	},
]

const SocialIcons = () => (
	<div style={{ marginTop: '0.5rem' }}>
		{socialLists.map((social, i) => (
			<IconButton key={i} href={social.href} target="blank" >
				{social.icon}
			</IconButton>
		))}
	</div>
)

const Dashboard = () => {
	const { msg } = useSelector(state => state.app)
	const dispatch = useDispatch()
	return (
		<Container>
			<Typography variant="h2">DASHBOARD</Typography>
			<Divider />
			<Typography variant="overline" color="textSecondary" display="block">
				More futures comming soon...
			</Typography>

			<Button size="large" color="primary" variant="outlined" href="/">
				Website
			</Button>

			<SocialIcons />
			<Snackbar
				message={msg}
				open={msg ? true : false}
				autoHideDuration={8000}
				onClose={() => dispatch(handleClearMessage())}
				action={
					<IconButton color="secondary" onClick={() => dispatch(handleClearMessage())}>
						<CloseIcon />
					</IconButton>
				}
			/>
		</Container>
	)
}
export default Dashboard
