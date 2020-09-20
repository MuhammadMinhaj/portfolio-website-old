import React from 'react'
import { Container, Grow } from '@material-ui/core'
import styled from './style.module.css'
import FormatQuoteIcon from '@material-ui/icons/FormatQuote'
import { Title } from '../common'

const About = () => {
	return (
		<div>
			<Container>
				<Title title="About" subTitle="Me!" />
				<div className={styled.aboutContainer}>
					<div className={styled.wrapper}>
						<div className={styled.img}>
							<Grow in>
								<img src="mypic.jpg" alt="" />
							</Grow>
						</div>

						<div className={styled.content}>
							<h2 className={styled.title}>Muhammad Minhaj</h2>
							<div className={styled.textContent}>
								<div className={styled.left}>
									<FormatQuoteIcon />
								</div>
								<h3>
									<p style={{ color: '#e91e63' }}>Welcome To You!</p> I'm Muhammad Minhaj, a full-stack web and mobile application developer. I
									develop mobile and web based applications. I'm an expert in Javascript. I have the core skill in Javascript and I love to do most of
									the things developed using Javascript. All most, I am a Javascript lover. And I also an expert in Django framework of python for use
									in the back-end. Thank you so much for read about.
								</h3>
								<div className={styled.right}>
									<FormatQuoteIcon />
								</div>
							</div>
						</div>
					</div>
				</div>
			</Container>
		</div>
	)
}

export default About
