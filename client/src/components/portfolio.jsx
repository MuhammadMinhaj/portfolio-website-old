import React from 'react'
import { useSelector, useDispatch } from 'react-redux'

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
	Grow,
	Chip,
	IconButton,
} from '@material-ui/core'

import { Visibility as VisibilityIcon, Refresh as RefreshIcon } from '@material-ui/icons'
import { Pagination, Skeleton, Alert } from '@material-ui/lab'

import { Title, Search } from '../common'
import CustomizedDialogs from './previewModal'
// Imported Actions
import {
	getDataFromServer,
	handleClickItemModal,
	handleTabClick,
	handlePagination,
	handleTabClickSelectedGroup,
	handlePortfolioSearch,
} from '../redux/actions/portfolio'

const useStyles = makeStyles(theme => ({
	root: {
		flexGrow: 1,
		width: '100%',
		backgroundColor: theme.palette.background.paper,
	},
	chipRoot: {
		display: 'flex',
		justifyContent: 'center',
		flexWrap: 'wrap',
		'& > *': {
			margin: theme.spacing(0.5),
		},
	},
}))

function a11yProps(index) {
	return {
		id: `scrollable-auto-tab-${index}`,
		'aria-controls': `scrollable-auto-tabpanel-${index}`,
	}
}

const GroupListBar = () => {
	const classes = useStyles()
	const { isLoading, groups, correntTab } = useSelector(state => state.portfolio)
	const dispatch = useDispatch()
	return (
		<div className={classes.root}>
			{!isLoading && groups.length!==0 ? (
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
						{groups.map((g, i) => (
							<Tab label={g.title} {...a11yProps(i)} onClick={() => dispatch(handleTabClickSelectedGroup(g._id))} key={i} />
						))}
					</Tabs>
				</AppBar>
			) : groups.length!==0 && (
				<Skeleton variant="rect" height={40} />
			)}
		</div>
	)
}

const ProjectsAnimation = () => {
	return (
		<Grid item sm={4}>
			<Grow in>
				<Paper elevation={3}>
					<CardContent>
						<Skeleton variant="rect" height={130} />
						<br />
						<Skeleton variant="text" height={30} />
						<Skeleton variant="text" width={100} height={30} />
						<br />
						<Skeleton variant="text" height={25} />
					</CardContent>

					<CardActions>
						<Button startIcon={<VisibilityIcon />} variant="contained" size="small" fullWidth color="primary" disabled>
							Visit To
						</Button>
					</CardActions>
				</Paper>
			</Grow>
		</Grid>
	)
}

const Item = ({ project }) => {
	const dispatch = useDispatch()
	const classes = useStyles()
	return (
		<Grid item sm={4}>
			<Grow in>
				<Paper elevation={3}>
					<CardActionArea onClick={() => dispatch(handleClickItemModal(project))}>
						<CardMedia style={{ height: '200px' }} image={project.thumbnail} title={project.title} />

						<CardContent>
							<Typography gutterBottom variant="h5" component="h2">
								{project.title}
							</Typography>
						</CardContent>
					</CardActionArea>

					<div style={{ padding: '0rem 1rem' }}>
						<Typography color="textSecondary" variant="overline" display="block">
							<strong> Date: </strong>
							{project.createdAt}
						</Typography>
						<Typography color="textSecondary" variant="overline" align="center">
							<strong> Technologies: </strong>
						</Typography>
						<div className={classes.chipRoot}>
							{project.tools.split(',').map((t, i) => (
								<Chip size="small" clickable variant="outlined" label={t} key={i} />
							))}
						</div>
					</div>

					<CardActions>
						<Button startIcon={<VisibilityIcon />} variant="contained" size="small" fullWidth color="primary" href={project.link} target="blank">
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
	const { projects, groupId, searchTerms } = useSelector(state => state.portfolio)
	let projectLists = projects.filter(p => p.group.toString() === groupId.toString())

	const itemsSearch = projectLists.filter(item => item.title.toLowerCase().includes(searchTerms.toLowerCase()) && item)
	console.log(itemsSearch)
	if (itemsSearch.length === 0) {
		return (
			<Grid container className={styled.notFoundMsg}>
				<Grow in>
					<h2>Not Available Content</h2>
				</Grow>
			</Grid>
		)
	} else {
		return itemsSearch.map((item, index) => <Item key={index} project={item} />)
	}
}

const Portfolio = () => {
	const state = useSelector(state => state.portfolio)
	const { isLoading, error, projects, groupId, avoidPage, exactPage, itemPerPage, searchTerms } = state
	let projectLists = projects.filter(p => p.group.toString() === groupId.toString())

	const dispatch = useDispatch()
	return (
		<div>
			<Container>
				<Title title="My" subTitle="Portfolio" />
				<CustomizedDialogs handleClose={() => dispatch(handleClickItemModal(null))} state={state} />

				<Paper variant="outlined" style={{ padding: '1rem' }}>
					{error && (
						<Alert color="error" severity="error" style={{ marginBottom: '1rem' }}>
							{error} — <strong>Please refresh!</strong>
						</Alert>
					)}

					<div className={styled.search}>
						<Search handleChange={handlePortfolioSearch} suggestLists={projectLists} width="500px" size="medium" />
					</div>

					<GroupListBar />

					<Grid container spacing={3} style={{ marginTop: '0.25rem' }}>
						{!isLoading ? (
							!searchTerms ? (
								projectLists.length > 6 ? (
									projectLists.slice(avoidPage, itemPerPage * exactPage).map((p, index) => <Item key={index} project={p} />)
								) : (
									projectLists.map((p, index) => <Item key={index} project={p} />)
								)
							) : (
								<SearchItems />
							)
						) : (
							new Array(13).fill('.').map((e, i) => <ProjectsAnimation key={i} />)
						)}
					</Grid>
					{error && (
						<div style={{ textAlign: 'center' }}>
							<IconButton onClick={() => dispatch(getDataFromServer())}>
								Refresh
								<RefreshIcon />
							</IconButton>
						</div>
					)}

					{projectLists.length > 6 && (
						<div className={styled.pagination}>
							<Pagination
								count={parseInt(
									isFloat(projectLists.length / itemPerPage) ? projectLists.length / itemPerPage + 1 : projectLists.length / itemPerPage
								)}
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
