import React from 'react'
import { useSelector, useDispatch } from 'react-redux'

import { makeStyles, withStyles } from '@material-ui/core/styles'
import clsx from 'clsx'
import Stepper from '@material-ui/core/Stepper'
import Step from '@material-ui/core/Step'
import StepLabel from '@material-ui/core/StepLabel'
import StepConnector from '@material-ui/core/StepConnector'
import Button from '@material-ui/core/Button'
import { Title } from '../common'
import { Container, Grow, Modal, IconButton } from '@material-ui/core'
import StepButton from '@material-ui/core/StepButton'
import SEO from '../common/seo'
// Imported Icons
import AppsIcon from '@material-ui/icons/Apps'
import WebIcon from '@material-ui/icons/Web'
import BuildIcon from '@material-ui/icons/Build'
import LanguageIcon from '@material-ui/icons/Language'
import ChevronLeftIcon from '@material-ui/icons/ChevronLeft'
import ChevronRightIcon from '@material-ui/icons/ChevronRight'
import CloseIcon from '@material-ui/icons/Close'

import styled from './style.module.css'

// Imported Actions
import { stepHandleClick, handleModal } from '../redux/actions'

const ColorlibConnector = withStyles({
	alternativeLabel: {
		top: 22,
	},
	active: {
		'& $line': {
			backgroundImage: 'linear-gradient( 95deg,rgb(242,113,33) 0%,rgb(233,64,87) 50%,rgb(138,35,135) 100%)',
		},
	},
	completed: {
		'& $line': {
			backgroundImage: 'linear-gradient( 95deg,rgb(242,113,33) 0%,rgb(233,64,87) 50%,rgb(138,35,135) 100%)',
		},
	},
	line: {
		height: 3,
		border: 0,
		backgroundColor: '#eaeaf0',
		borderRadius: 1,
	},
})(StepConnector)

const useColorlibStepIconStyles = makeStyles({
	root: {
		backgroundColor: '#ccc',
		zIndex: 1,
		color: '#fff',
		width: 50,
		height: 50,
		display: 'flex',
		borderRadius: '50%',
		justifyContent: 'center',
		alignItems: 'center',
	},
	active: {
		backgroundImage: 'linear-gradient( 136deg, rgb(242,113,33) 0%, rgb(233,64,87) 50%, rgb(138,35,135) 100%)',
		boxShadow: '0 4px 10px 0 rgba(0,0,0,.25)',
	},
	completed: {
		backgroundImage: 'linear-gradient( 136deg, rgb(242,113,33) 0%, rgb(233,64,87) 50%, rgb(138,35,135) 100%)',
	},
})

function ColorlibStepIcon(props) {
	const classes = useColorlibStepIconStyles()
	const { active, completed } = props

	const icons = {
		1: <BuildIcon />,
		2: <LanguageIcon />,
		3: <WebIcon />,
		4: <AppsIcon />,
	}
	return (
		<div
			className={clsx(classes.root, {
				[classes.active]: active,
				[classes.completed]: completed,
			})}
		>
			{icons[String(props.icon)]}
		</div>
	)
}

const SkillInnerItem = ({ iconSrc, text, ind }) => {
	const dispatch = useDispatch()
	return (
		<Grow in>
			<div className={styled.item}>
				<div className={styled.icon} onClick={() => dispatch(handleModal(ind))}>
					<img src={iconSrc} alt="Icon" />
				</div>
				<div className={styled.content}>
					<h1>{text}</h1>
				</div>
			</div>
		</Grow>
	)
}

const SkillsItem = () => {
	const {
		skills: { activeStep, skillList, isOpenModal, index },
	} = useSelector(state => state.web)

	const dispatch = useDispatch()

	return (
		<div className={styled.skillsContainer}>
			<Modal open={isOpenModal} onClose={() => dispatch(handleModal(null))}>
				<div className={styled.description}>
					{skillList[activeStep][index] && (
						<>
							<div style={{ textAlign: 'right' }}>
								<IconButton style={{ padding: '2px' }} onClick={() => dispatch(handleModal(null))}>
									<CloseIcon />
								</IconButton>
							</div>
							<h1 className={styled.backgroundTitle}>{skillList[activeStep][index].progress}</h1>
							<img src={skillList[activeStep][index].src} alt={skillList[activeStep][index].title} style={{ width: '100%', height: '100px' }} />
							<h2>{skillList[activeStep][index].title}</h2>

							<p>{skillList[activeStep][index].text}</p>
							<a href={skillList[activeStep][index].url} target="blank">
								<Button startIcon={<ChevronRightIcon />} style={{ marginTop: '1rem' }} variant="outlined" color="primary">
									More Details
								</Button>
							</a>
						</>
					)}
				</div>
			</Modal>

			<div className={styled.left}>
				{skillList[activeStep].map((skill, ind) => ind % 2 === 0 && <SkillInnerItem key={ind} iconSrc={skill.src} text={skill.progress} ind={ind} />)}
			</div>

			<div className={styled.line}>
				<h1>SKILLS</h1>
			</div>

			<div className={styled.right}>
				{skillList[activeStep].map((skill, ind) => ind % 2 === 1 && <SkillInnerItem key={ind} iconSrc={skill.src} text={skill.progress} ind={ind} />)}
			</div>
		</div>
	)
}

export const Skills = () => {
	const {
		skills: { activeStep, steps },
	} = useSelector(state => state.web)

	const dispatch = useDispatch()

	return (
		<Container>
			<div>
				<Title title="My" subTitle="Skills" />
				<Stepper style={{ justifyContent: 'center' }} alternativeLabel activeStep={activeStep} connector={<ColorlibConnector />}>
					{steps.map((label, index) => (
						<Step key={label}>
							<StepButton disabled={false} onClick={() => dispatch(stepHandleClick(index))}>
								<StepLabel StepIconComponent={ColorlibStepIcon}>{label}</StepLabel>
							</StepButton>
						</Step>
					))}
				</Stepper>

				<SkillsItem step={activeStep} />

				<div className={styled.skillsBtnContainer}>
					<Button
						startIcon={<ChevronLeftIcon />}
						variant="outlined"
						color="secondary"
						disabled={activeStep === 0}
						onClick={() => dispatch(stepHandleClick('decrement'))}
					>
						{steps[activeStep - 1]}
					</Button>

					<Button
						endIcon={<ChevronRightIcon />}
						variant="outlined"
						color="primary"
						onClick={() => dispatch(stepHandleClick('increment'))}
						disabled={activeStep === steps.length - 1}
					>
						{steps[activeStep + 1]}
					</Button>
				</div>
			</div>
		</Container>
	)
}

export default () => (
	<>
		<SEO title="My Skill" content="skill of md minhaj,skill of muhammad minhaj" link="https://mdminhaj.com/skill" />
		<Skills />
	</>
)
