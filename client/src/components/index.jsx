import React from 'react'
import SEO from '../common/seo'
import { Button, Container, Grow, Typography } from '@material-ui/core'
import styled from './style.module.css'
import ArrowForwardIcon from '@material-ui/icons/ArrowForward'

// Imported Common Components
import { Typer, SocialIcons } from '../common'

// Imported Components
import { About } from './about'
import { Skills } from './skills'
import { Contact } from './contact'
import { Portfolio } from './portfolio'
import { Services } from './services'


const Slider = () => {
	return (
		<>
			<div className={styled.sliderContainer}>
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
		</>
	)
}

const Home = () => {
	return (
		<>
			<SEO
				title="Muhammad Minhaj || Full-Stack Software Developer"
				content="Muhammad Minhaj,Md Minhaj,Web Developer Md Minhaj,Web Developer Muhammad Minhaj,Software Developer Md Mnhaj"
				link="http://localhost:3000/"
			/>
			<main>
				<Slider />
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
			</main>
		</>
	)
}

export default Home
