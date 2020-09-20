import React from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { Title, Search } from '../common'
import styled from './style.module.css'
import {
	Container,
	Grid,
	Paper,
	CardActionArea,
	CardContent,
	CardActions,
	Typography,
	CardMedia,
	Button,
	AppBar,
	Tabs,
	Tab,
	makeStyles,
	IconButton,
	Dialog,
	DialogTitle,
	DialogActions,
	DialogContent,
	Grow,
} from '@material-ui/core'

import { withStyles } from '@material-ui/core/styles'
import VisibilityIcon from '@material-ui/icons/Visibility'
import { Pagination, Autocomplete } from '@material-ui/lab'

// Imported Icons
import CloseIcon from '@material-ui/icons/Close'

// Imported Actions
import { handleClickItemModal, handleTabClick, handlePagination, handleModalPage, handlePortfolioSearch } from '../redux/actions/portfolio'

const useStyles = makeStyles(theme => ({
	root: {
		flexGrow: 1,
		width: '100%',
		backgroundColor: theme.palette.background.paper,
	},
}))
const styles = theme => ({
	root: {
		margin: 0,
		padding: theme.spacing(2),
	},
	closeButton: {
		position: 'absolute',
		right: theme.spacing(1),
		top: theme.spacing(1),
		color: theme.palette.grey[500],
	},
})

const CustomDialogTitle = withStyles(styles)(props => {
	const { children, classes, onClose, ...other } = props
	return (
		<DialogTitle disableTypography className={classes.root} {...other}>
			<Typography variant="h5">{children}</Typography>
			{onClose ? (
				<IconButton aria-label="close" className={classes.closeButton} onClick={onClose}>
					<CloseIcon />
				</IconButton>
			) : null}
		</DialogTitle>
	)
})

const CustomDialogContent = withStyles(theme => ({
	root: {
		padding: theme.spacing(2),
	},
}))(DialogContent)

const CustomDialogActions = withStyles(theme => ({
	root: {
		margin: 0,
		padding: theme.spacing(1),
		justifyContent: 'center',
	},
}))(DialogActions)

const CustomizedDialogs = () => {
	const { isOpenModal, modalItem, correntModalPage } = useSelector(state => state.portfolio)

	const dispatch = useDispatch()
	const { img, title } = modalItem.pages ? modalItem.pages[correntModalPage - 1] : 0
	return (
		<div>
			<Dialog maxWidth="md" onClose={() => dispatch(handleClickItemModal(null))} aria-labelledby="customized-dialog-title" open={isOpenModal}>
				<CustomDialogTitle id="customized-dialog-title" onClose={() => dispatch(handleClickItemModal(null))}>
					{title}
				</CustomDialogTitle>
				<CustomDialogContent dividers>
					<img src={img} alt={title} width="100%" />
				</CustomDialogContent>
				<CustomDialogActions>
					<Pagination
						count={modalItem.pages ? modalItem.pages.length : 0}
						siblingCount={0}
						boundaryCount={1}
						onChange={(event, newPage) => dispatch(handleModalPage(newPage))}
					/>
				</CustomDialogActions>
			</Dialog>
		</div>
	)
}

function a11yProps(index) {
	return {
		id: `scrollable-auto-tab-${index}`,
		'aria-controls': `scrollable-auto-tabpanel-${index}`,
	}
}

const ScrollableTabsButtonAuto = () => {
	const classes = useStyles()
	const { correntTab, wrappers } = useSelector(state => state.portfolio)
	const dispatch = useDispatch()
	return (
		<div className={classes.root}>
			<AppBar position="static" color="default">
				<Tabs
					value={correntTab}
					onChange={(event, newTab) => dispatch(handleTabClick(newTab))}
					indicatorColor="primary"
					textColor="primary"
					variant="scrollable"
					scrollButtons="auto"
					aria-label="scrollable auto tabs example"
				>
					{wrappers.map((wrapper, index) => (
						<Tab label={wrapper.name} {...a11yProps(index)} key={index} />
					))}
				</Tabs>
			</AppBar>
		</div>
	)
}

const Item = props => {
	const dispatch = useDispatch()
	return (
		<Grid item sm={4}>
			<Grow in>
				<Paper elevation={3}>
					<CardActionArea onClick={() => dispatch(handleClickItemModal(props.item))}>
						<CardMedia component="img" alt={props.item.title} height="200" image={props.item.img} title={props.item.title} />
						<CardContent>
							<Typography gutterBottom variant="h5" component="h2">
								{props.item.title}
							</Typography>
						</CardContent>
					</CardActionArea>
					<CardActions>
						<Button startIcon={<VisibilityIcon />} variant="contained" size="small" fullWidth color="primary" href="https://jasa.edu.bd">
							Visit To
						</Button>
					</CardActions>
				</Paper>
			</Grow>
		</Grid>
	)
}

function isFloat(n) {
	return Number(n) === n && n % 1 !== 0
}

const SearchItems = () => {
	const { correntTab, wrappers, searchTerms } = useSelector(state => state.portfolio)
	const items = wrappers[correntTab].items
	const itemsSearch = items.filter(item => item.title.toLowerCase().includes(searchTerms.toLowerCase()) && item)

	if (itemsSearch.length === 0) {
		return (
			<Grid container className={styled.notFoundMsg}>
				<Grow in>
					<h2>Not Available Content</h2>
				</Grow>
			</Grid>
		)
	} else {
		return itemsSearch.map((item, index) => <Item key={index} item={item} />)
	}
}

const Portfolio = () => {
	const { correntTab, wrappers, avoidPage, exactPage, itemPerPage, searchTerms } = useSelector(state => state.portfolio)
	const dispatch = useDispatch()
	const items = wrappers[correntTab].items
	return (
		<div>
			<Container>
				<Title title="My" subTitle="Portfolio" />
				<CustomizedDialogs />
				<Paper variant="outlined" style={{ padding: '1rem' }}>
					<div className={styled.search}>
						<Search handleChange={handlePortfolioSearch} suggestLists={items} />
					</div>
					<ScrollableTabsButtonAuto />

					<Grid container spacing={3} style={{ marginTop: '0.25rem' }}>
						{!searchTerms ? (
							items.length > 6 ? (
								items.slice(avoidPage, itemPerPage * exactPage).map((item, index) => <Item key={index} item={item} />)
							) : (
								items.map((item, index) => <Item key={index} item={item} />)
							)
						) : (
							<SearchItems />
						)}
					</Grid>
					{items.length > 6 && (
						<div className={styled.pagination}>
							<Pagination
								count={parseInt(isFloat(items.length / itemPerPage) ? items.length / itemPerPage + 1 : items.length / itemPerPage)}
								siblingCount={0}
								boundaryCount={1}
								onChange={(event, newPage) => dispatch(handlePagination(newPage))}
							/>
						</div>
					)}
				</Paper>
			</Container>
		</div>
	)
}

export default Portfolio
