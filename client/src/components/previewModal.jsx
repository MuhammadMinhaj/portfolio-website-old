import React, { useState } from 'react'
import { makeStyles } from '@material-ui/core/styles'

import { useMediaQuery, Grid, Dialog, Divider, AppBar, Toolbar, IconButton, Typography, Slide, Fab, Chip } from '@material-ui/core'
import {
	Close as CloseIcon,
	OpenInNew as OpenInNewIcon,
	NavigateNext as NavigateNextIcon,
	NavigateBefore as NavigateBeforeIcon,
} from '@material-ui/icons'
import styled from './modal.module.css'

const useStyles = makeStyles(theme => ({
	appBar: {
		position: 'relative',
	},
	title: {
		marginLeft: theme.spacing(2),
		flex: 1,
	},
}))

const Transition = React.forwardRef(function Transition(props, ref) {
	return <Slide direction="up" ref={ref} {...props} />
})

export default ({ handleClose, state }) => {
	const { isOpenModal, modalItem, groups } = state

	const [count, setCount] = useState(0)

	const totalImages = modalItem.images ? modalItem.images.length : 0

	const isMobileWidth = useMediaQuery('(min-width:600px)')
	const classes = useStyles()

	const handleImageNextAndPrev = is => {
		if (is) {
			totalImages - 1 === count ? setCount(totalImages - 1) : setCount(count + 1)
		} else {
			count === 0 ? setCount(0) : setCount(count - 1)
		}
	}

	let type = null
	if (modalItem.group) {
		groups.forEach(g => {
			if (g._id.toString() === modalItem.group.toString()) {
				type = g.title
			}
		})
	}

	return (
		<div>
			<Dialog fullScreen open={isOpenModal} onClose={handleClose} TransitionComponent={Transition}>
				<div>
					<div style={{ height: isMobileWidth ? '64px' : '56px' }}>
						<AppBar>
							<Toolbar>
								<IconButton edge="start" color="inherit" onClick={handleClose} aria-label="close">
									<CloseIcon />
								</IconButton>

								<Typography variant="h6" className={classes.title}>
									{modalItem.images && modalItem.images[count].title && modalItem.images[count].title.toUpperCase()}
								</Typography>
								<Typography variant="h6" component="h6">
									{`${count + 1}/${totalImages}`}
								</Typography>

								<IconButton color="inherit" variant="contained" href={modalItem.link} target="blank">
									<OpenInNewIcon />
								</IconButton>
							</Toolbar>
						</AppBar>
					</div>
				</div>

				<Grid container>
					<Grid item sm={8}>
						<div className={styled.previewer}>
							<div className={styled.prev}>
								<div className={styled.icon}>
									<Fab onClick={() => handleImageNextAndPrev(false)}>
										<NavigateBeforeIcon />
									</Fab>
								</div>
							</div>
							{modalItem.images && <img src={modalItem.images[count].path} alt={modalItem.images[count].title} style={{ width: '100%' }} />}

							<div className={styled.stepper}></div>

							<div className={styled.next}>
								<div className={styled.icon}>
									<Fab onClick={() => handleImageNextAndPrev(true)}>
										<NavigateNextIcon />
									</Fab>
								</div>
							</div>
						</div>
					</Grid>
					<Grid item sm={4}>
						<div className={styled.content}>
							<Typography variant="h4" component="h5">
								{modalItem.title}
							</Typography>
							<Divider />

							<Typography variant="h6" component="h5">
								DESCRIPTION
							</Typography>

							<Typography paragraph>{modalItem.description}</Typography>

							<Typography variant="h6" component="h5">
								DETAILES
							</Typography>
							<Divider />
							<br />

							<Typography paragraph color="textPrimary">
								<strong>Client: </strong> {modalItem.client}
							</Typography>

							<Typography paragraph color="textPrimary">
								<strong>Industry: </strong> {modalItem.industry}
							</Typography>
							<Typography paragraph color="textPrimary">
								<strong>Type: </strong>
								{type}
							</Typography>

							<Typography paragraph component="div" color="textPrimary">
								<strong>Technologies: </strong>
								{modalItem.tools && modalItem.tools.split(',').map((t, i) => <Chip size="small" clickable variant="outlined" label={t} key={i} />)}
							</Typography>

							<Typography paragraph color="textPrimary">
								<strong>Time: </strong> {modalItem.time}
							</Typography>
							<Typography paragraph color="textPrimary">
								<strong>Date: </strong> {modalItem.createdAt}
							</Typography>

							<Typography paragraph color="textPrimary">
								<strong>URL: </strong> {modalItem.link}
							</Typography>

							<Fab variant="extended" color="primary" href={modalItem.link} target="blank">
								<OpenInNewIcon />
								Live Demo
							</Fab>
						</div>
					</Grid>
				</Grid>
			</Dialog>
		</div>
	)
}
