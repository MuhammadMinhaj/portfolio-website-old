import React from 'react'
import { Button, Container, Grow } from '@material-ui/core'
import Confetti from 'react-confetti'
import styled from './style.module.css'
import ArrowForwardIcon from '@material-ui/icons/ArrowForward'
import FacebookIcon from '@material-ui/icons/Facebook'
import InstagramIcon from '@material-ui/icons/Instagram'
import TwitterIcon from '@material-ui/icons/Twitter'
import GitHubIcon from '@material-ui/icons/GitHub'

// Imported Common Components
import { Typer } from '../common'

// Imported Components
import About from './about'
import Skills from './skills'
import Contact from './contact'
import Portfolio from './portfolio'
import Services from './services'
// Import All Actions
import { drawShape } from '../redux/actions'

const SocialLink = props => <a href={props.href}>{props.icon}</a>

const Slider = () => {
	return (
		<>
			<div className={styled.sliderContainer}>
				<Confetti height="450px" initialVelocityX={15} opacity={0.6} drawShape={drawShape} />
				<Container>
					<div className={styled.container}>
						<Grow in>
							<div className={styled.middleContainer}>
								<div className={styled.iconsContainer}>
									<SocialLink icon={<FacebookIcon style={{ color: '#3578E5' }} />} href="https://www.facebook.com/profile.php?id=100014744408169" />

									<SocialLink icon={<InstagramIcon style={{ color: '#b51a0e' }} />} href="https://instagram.com/" />

									<SocialLink icon={<TwitterIcon style={{ color: '#1da1f2' }} />} href="https://twitter.com/" />
									<SocialLink icon={<GitHubIcon style={{ color: 'black' }} />} href="https://github.com/muhammad-minhaj" />
									<h4 style={{ color: '#ffffffbd' }}>
										<span style={{ color: 'red' }}>I'm</span> Muhammad Minhaj
									</h4>
								</div>
								<h1>I'm</h1>
								<h1 className={styled.animateText} style={{ height: '120px' }}>
									<Typer
										// heading="I'm"
										dataText={['A Web Designer', 'A Full-Stack Javascript Developer', 'A Full-Stack Web & Mobile Application Developer']}
									/>
								</h1>
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
