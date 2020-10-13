import React from 'react'
import { makeStyles } from '@material-ui/core/styles'
// Imported Core Components Of Material UI
import { Container, Paper, Grow, Typography, Divider } from '@material-ui/core'

// Imported Lab Components Of Material Ui
import { Timeline, TimelineItem, TimelineSeparator, TimelineConnector, TimelineContent, TimelineOppositeContent, TimelineDot } from '@material-ui/lab'

// Imported Icons
import WebIcon from '@material-ui/icons/Web'
import CodeIcon from '@material-ui/icons/Code'
import DeveloperModeIcon from '@material-ui/icons/DeveloperMode'
import AppleIcon from '@material-ui/icons/Apple'
import ErrorIcon from '@material-ui/icons/Error'
import SpeedIcon from '@material-ui/icons/Speed'
import PublicIcon from '@material-ui/icons/Public'

// Imported Common Components
import { Title } from '../common'

import styled from './style.module.css'

const useStyles = makeStyles(theme => ({
	paper: {
		padding: '6px 16px',
	},
	secondaryTail: {
		backgroundColor: theme.palette.secondary.main,
	},
	primaryMain: {
		backgroundColor: theme.palette.primary.main,
	},
}))

const ItemOfTimeLine = ({ stepNumber, IconName, iconColor, iconVariant, title, message, Connector, connectorClass }) => {
	const classes = useStyles()
	return (
		<TimelineItem>
			<TimelineOppositeContent>
				<Typography variant="body2" color="textSecondary">
					00.0{stepNumber}
				</Typography>
			</TimelineOppositeContent>
			<TimelineSeparator>
				<TimelineDot color={iconColor} variant={iconVariant}>
					<IconName />
				</TimelineDot>
				{Connector ? <Connector className={connectorClass} /> : null}
			</TimelineSeparator>
			<Grow in>
				<TimelineContent>
					<Paper elevation={3} className={classes.paper}>
						<Typography variant="h6" component="h1" style={{ textTransform: 'uppercase', fontWeight: 'bold', color: '#607d8b' }}>
							{title}
						</Typography>
						<Divider />
						<Typography className={styled.textBlock}>{message}</Typography>
					</Paper>
				</TimelineContent>
			</Grow>
		</TimelineItem>
	)
}

const Services = () => {
	const classes = useStyles()

	const services = [
		{
			title: 'Web Design',
			message:
				'I can do an excellent UI/UX design using the latest and powerful technologys for web design and also can responsive design of the web pages.',
			iconName: WebIcon,
			connector: TimelineConnector,
		},
		{
			title: 'Web Development',
			message:
				'I can make API or rest API for spa applications and mobile applications and I also can connect API with your spa application or any other application to make the dynamic web application.',
			iconName: CodeIcon,
			iconColor: 'primary',
			connector: TimelineConnector,
			connectorClass: classes.primaryMain,
		},
		{
			title: 'Android Development',
			message: 'I can make a cross-platform application using the react-native and I also can awesome design for any kind of android application.',
			iconName: DeveloperModeIcon,
			iconColor: 'secondary',
			connector: TimelineConnector,
			connectorClass: classes.secondaryTail,
		},
		{
			title: 'IOS Development',
			message: 'I can make a cross-platform application using the react-native and I also can awesome design for any kind of IOS application.',
			iconName: AppleIcon,
			iconColor: 'primary',
			iconVariant: 'outlined',
			connector: TimelineConnector,
			connectorClass: classes.secondaryTail,
		},
		{
			title: 'Bugs Fixing',
			message: 'I can easily fixed bugs of any kind of web application and also can optimize web application.',
			iconName: ErrorIcon,
			iconColor: 'secondary',
			connector: TimelineConnector,
			connectorClass: classes.primaryMain,
		},
		{
			title: 'Structure Of Coding',
			message:
				'I always following strong and best coding structure to make any kind of applications,and my coding styles is very manageable and upgradable and also readable.',
			iconName: SpeedIcon,
			iconColor: 'primary',
			connector: TimelineConnector,
		},
		{
			title: 'Dyploy To Server',
			message: 'I can deploy applications or websites in any kind of hosting server.',
			iconName: PublicIcon,
		},
	]

	return (
		<Container className={styled.services}>
			<Title title="My" subTitle="Services" />
			<Timeline align="alternate" className={styled.services}>
				{services.map(({ title, message, iconName, iconColor, iconVariant, connector, connectorClass }, ind) => (
					<ItemOfTimeLine
						key={ind}
						title={title}
						message={message}
						IconName={iconName}
						iconVariant={iconVariant}
						iconColor={iconColor}
						Connector={connector}
						connectorClass={connectorClass}
						stepNumber={ind + 1}
					/>
				))}
			</Timeline>
		</Container>
	)
}
export default Services
