import React from 'react'
import { Typography } from '@material-ui/core'
import styled from './style.module.css'

const Footer = () => {
	return (
		<footer className={styled.footer}>
			<Typography variant="subtitle1">Copyright ©2020 All Rights Reserved</Typography>
			<Typography variant="subtitle2">Developed By Muhammad Minhaj</Typography>
		</footer>
	)
}

export default Footer
