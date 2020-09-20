import React from 'react'
import { makeStyles } from '@material-ui/core/styles'
// Imported Core Components Of Material UI
import { Paper } from '@material-ui/core'
import Typography from '@material-ui/core/Typography'
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
import FormatQuoteIcon from '@material-ui/icons/FormatQuote'
import FastfoodIcon from '@material-ui/icons/Fastfood'
import LaptopMacIcon from '@material-ui/icons/LaptopMac'
import HotelIcon from '@material-ui/icons/Hotel'
import RepeatIcon from '@material-ui/icons/Repeat'

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

const ItemOfTimeLine = ({ IconName, iconColor, iconVariant, title, message, Connector, connectorClass }) => {
	const classes = useStyles()
	return (
		<TimelineItem>
			<TimelineOppositeContent>
				<Typography variant="body2" color="textSecondary">
					9:30 am
				</Typography>
			</TimelineOppositeContent>
			<TimelineSeparator>
				<TimelineDot color={iconColor} variant={iconVariant}>
					<IconName />
				</TimelineDot>
				{Connector ? <Connector className={connectorClass} /> : null}
			</TimelineSeparator>
			<TimelineContent>
				<Paper elevation={3} className={classes.paper}>
					<Typography variant="h6" component="h1" style={{ textTransform: 'uppercase', fontWeight: 'bold', color: '#607d8b' }}>
						{title}
					</Typography>
					<Typography className={styled.textBlock}>{message}</Typography>
				</Paper>
			</TimelineContent>
		</TimelineItem>
	)
}

const Services = () => {
	const classes = useStyles()

	const services = [
		{
			title: 'Web Design',
			message: 'I will awesome design your website like modern application and using latest & powerfull technology. I always follow design pattern.',
			iconName: WebIcon,
			connector: TimelineConnector,
		},
		{
			title: 'Web Development',
			message:
				'I will convert your website static to dynamic following best coding structure and I also try to optimized coding structure to make your web application. I can develop rest api for your spa application.',
			iconName: CodeIcon,
			iconColor: 'primary',
			connector: TimelineConnector,
			connectorClass: classes.primaryMain,
		},
		{
			title: 'Android Development',
			message: 'I can make android application using by react native,It is very good performence.',
			iconName: DeveloperModeIcon,
			iconColor: 'secondary',
			connector: TimelineConnector,
			connectorClass: classes.secondaryTail,
		},
		{
			title: 'IOS Development',
			message: 'I can make IOS application using by react native,It is also very good performence.',
			iconName: AppleIcon,
			iconColor: 'primary',
			iconVariant: 'outlined',
			connector: TimelineConnector,
			connectorClass: classes.secondaryTail,
		},
		{
			title: 'Bugs Fixing',
			message: 'I will solve any kind of problem of your web application.',
			iconName: ErrorIcon,
			iconColor: 'secondary',
			connector: TimelineConnector,
			connectorClass: classes.primaryMain,
		},
		{
			title: 'Optimized Website',
			message: 'I will optimized your website to make very fast loading your website and application.',
			iconName: SpeedIcon,
			iconColor: 'primary',
			connector: TimelineConnector,
		},
		{
			title: 'Dyploy To Server',
			message: 'I will dyploy your application any kind of hosting server if you like.',
			iconName: PublicIcon,
		},
	]

	return (
		<div>
			<Title title="My" subTitle="Services" />
			<Timeline align="alternate">
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
					/>
				))}
			</Timeline>
		</div>
	)
}
export default Services
