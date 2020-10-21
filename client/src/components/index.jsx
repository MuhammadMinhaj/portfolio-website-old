import React from 'react'
import { Button, Container, Grow, Typography } from '@material-ui/core'
import Confetti from 'react-confetti'
import styled from './style.module.css'
import ArrowForwardIcon from '@material-ui/icons/ArrowForward'

// Imported Common Components
import { Typer, SocialIcons } from '../common'

// Imported Components
import About from './about'
import Skills from './skills'
import Contact from './contact'
import Portfolio from './portfolio'
import Services from './services'
// Import All Actions
import { drawShape } from '../redux/actions'

const Slider = () => {
	return (
		<>
			<div className={styled.sliderContainer}>
				<Confetti height="450px" initialVelocityX={15} opacity={0.6} drawShape={drawShape} />
				<Container>
					<div className={styled.container}>
						<Grow in>
							<div className={styled.middleContainer}>
								<SocialIcons />
								<Typography variant="h6" style={{ color: '#ffffffbd' }}>
									<span style={{ color: 'red' }}>I'm</span> Muhammad Minhaj
								</Typography>
								<Typography variant="h4">I'm</Typography>
								<Typography variant="h4" style={{ height: '120px' }}>
									<Typer
										// heading="I'm"
										dataText={['A Web Designer', 'A Full-Stack Javascript Developer', 'A Full-Stack Web & Mobile Application Developer']}
									/>
								</Typography>
								<Button size="large" startIcon={<ArrowForwardIcon />} variant="outlined" color="secondary">
									Hire Me
								</Button>
							</div>
						</Grow>
					</div>
				</Container>
			</div>
			{/* About Component */}
			<About />
			{/* Skills Component */}
			<Skills />
			{/* Portfolio Component */}
			<Portfolio />
			{/* Services Component */}
			<Services />
			{/* Contact Component */}
			<Contact />
		</>
	)
}

const Home = () => {
	return (
		<main>
			<Slider />
		</main>
	)
}

export default Home
