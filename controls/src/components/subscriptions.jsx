import React from 'react'
import { useSelector, useDispatch } from 'react-redux'
import clsx from 'clsx'
import { lighten, makeStyles } from '@material-ui/core/styles'

import {
	Grid,
	Container,
	Table,
	TableBody,
	TableCell,
	TableContainer,
	TableHead,
	TablePagination,
	TableRow,
	TableSortLabel,
	Toolbar,
	Typography,
	Paper,
	Checkbox,
	IconButton,
	Tooltip,
	FormControlLabel,
	Switch,
	FormControl,
	TextField,
	Button,
} from '@material-ui/core'

import { Delete as DeleteIcon, FilterList as FilterListIcon, Send as SendIcon } from '@material-ui/icons'

// Imported Actions
import {
	handleRequestSort,
	handleSelectAllClick,
	handleClick,
	handleChangePage,
	handleChangeRowsPerPage,
	handleChangeDense,
	handleChangeForm,
	handleSubmitForm,
} from '../redux/actions/subscriptions'
// import TextEditor from '../common/slate-editor'
import styled from './style.module.css'

const descendingComparator = (a, b, orderBy) => {
	if (b[orderBy] < a[orderBy]) {
		return -1
	}
	if (b[orderBy] > a[orderBy]) {
		return 1
	}
	return 0
}

const getComparator = (order, orderBy) => {
	return order === 'desc' ? (a, b) => descendingComparator(a, b, orderBy) : (a, b) => -descendingComparator(a, b, orderBy)
}

const stableSort = (array, comparator) => {
	const stabilizedThis = array.map((el, index) => [el, index])
	stabilizedThis.sort((a, b) => {
		const order = comparator(a[0], b[0])
		if (order !== 0) return order
		return a[1] - b[1]
	})
	return stabilizedThis.map(el => el[0])
}

const headCells = [
	{ id: 'email', numeric: false, disablePadding: true, label: 'Emails' },
	{ id: 'actions', numeric: false, disablePadding: false, label: 'Status' },
]

const EnhancedTableHead = ({ classes }) => {
	const state = useSelector(state => state.subscriptions)
	const dispatch = useDispatch()
	const { selected, order, orderBy, emails } = state

	const createSortHandler = property => event => {
		dispatch(handleRequestSort(event, property))
	}

	return (
		<TableHead>
			<TableRow>
				<TableCell padding="checkbox">
					<Checkbox
						indeterminate={selected.length > 0 && selected.length < emails.length}
						checked={emails.length > 0 && selected.length === emails.length}
						onChange={event => dispatch(handleSelectAllClick(event))}
						inputProps={{ 'aria-label': 'select all desserts' }}
					/>
				</TableCell>
				{headCells.map(headCell => (
					<TableCell
						key={headCell.id}
						align={headCell.numeric ? 'right' : 'left'}
						padding={headCell.disablePadding ? 'none' : 'default'}
						sortDirection={orderBy === headCell.id ? order : false}
					>
						<TableSortLabel
							active={orderBy === headCell.id}
							direction={orderBy === headCell.id ? order : 'asc'}
							onClick={createSortHandler(headCell.id)}
						>
							{headCell.label}
							{orderBy === headCell.id ? (
								<span className={classes.visuallyHidden}>{order === 'desc' ? 'sorted descending' : 'sorted ascending'}</span>
							) : null}
						</TableSortLabel>
					</TableCell>
				))}
			</TableRow>
		</TableHead>
	)
}

const useToolbarStyles = makeStyles(theme => ({
	root: {
		paddingLeft: theme.spacing(2),
		paddingRight: theme.spacing(1),
	},
	highlight:
		theme.palette.type === 'light'
			? {
					color: theme.palette.secondary.main,
					backgroundColor: lighten(theme.palette.secondary.light, 0.85),
			  }
			: {
					color: theme.palette.text.primary,
					backgroundColor: theme.palette.secondary.dark,
			  },
	title: {
		flex: '1 1 100%',
	},
}))

const EnhancedTableToolbar = () => {
	const state = useSelector(state => state.subscriptions)
	const { selected } = state
	const classes = useToolbarStyles()

	return (
		<Toolbar
			className={clsx(classes.root, {
				[classes.highlight]: selected.length > 0,
			})}
		>
			{selected.length > 0 ? (
				<Typography className={classes.title} color="inherit" variant="subtitle1" component="div">
					{selected.length} selected
				</Typography>
			) : (
				<Typography className={classes.title} variant="h6" id="tableTitle" component="div">
					Subscrptions
				</Typography>
			)}

			{selected.length > 0 ? (
				<Tooltip title="Delete">
					<IconButton aria-label="delete">
						<DeleteIcon />
					</IconButton>
				</Tooltip>
			) : (
				<Tooltip title="Filter list">
					<IconButton aria-label="filter list">
						<FilterListIcon />
					</IconButton>
				</Tooltip>
			)}
			<Switch value="checkedA" inputProps={{ 'aria-label': 'Switch A' }} />
		</Toolbar>
	)
}

const useStyles = makeStyles(theme => ({
	container: {
		maxHeight: 405,
	},
	paper: {
		maxWidth: 1200,
		marginBottom: theme.spacing(2),
	},
	table: {
		width: '100%',
	},
	visuallyHidden: {
		border: 0,
		clip: 'rect(0 0 0 0)',
		height: 1,
		margin: -1,
		overflow: 'hidden',
		padding: 0,
		position: 'absolute',
		top: 20,
		width: 1,
	},
}))

const EnhancedTable = () => {
	const state = useSelector(state => state.subscriptions)
	const dispatch = useDispatch()
	const { order, orderBy, selected, page, emails, dense, rowsPerPage } = state
	const classes = useStyles()

	const isSelected = email => selected.indexOf(email) !== -1

	const emptyRows = rowsPerPage - Math.min(rowsPerPage, emails.length - page * rowsPerPage)

	return (
		<>
			<Paper className={classes.paper}>
				<EnhancedTableToolbar />

				<TableContainer className={classes.container}>
					<Table stickyHeader className={classes.table} aria-labelledby="tableTitle" size={dense ? 'small' : 'medium'} aria-label="enhanced table">
						<EnhancedTableHead classes={classes} />
						<TableBody>
							{stableSort(emails, getComparator(order, orderBy))
								.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
								.map((row, index) => {
									const isItemSelected = isSelected(row.email)
									const labelId = `enhanced-table-checkbox-${index}`

									return (
										<TableRow
											hover
											onClick={event => dispatch(handleClick(event, row.email))}
											role="checkbox"
											aria-checked={isItemSelected}
											tabIndex={-1}
											key={row.email}
											selected={isItemSelected}
										>
											<TableCell padding="checkbox">
												<Checkbox checked={isItemSelected} inputProps={{ 'aria-labelledby': labelId }} />
											</TableCell>

											<TableCell component="th" id={labelId} scope="row" padding="none">
												{row.email}
											</TableCell>

											<TableCell align="right">Test</TableCell>
										</TableRow>
									)
								})}
							{emptyRows > 0 && (
								<TableRow style={{ height: (dense ? 33 : 53) * emptyRows }}>
									<TableCell colSpan={6} />
								</TableRow>
							)}
						</TableBody>
					</Table>
				</TableContainer>
				<TablePagination
					rowsPerPageOptions={[5, 10, 25]}
					component="div"
					count={emails.length}
					rowsPerPage={rowsPerPage}
					page={page}
					onChangePage={(event, name) => dispatch(handleChangePage(name))}
					onChangeRowsPerPage={event => dispatch(handleChangeRowsPerPage(event))}
				/>
			</Paper>
			<FormControlLabel control={<Switch checked={dense} onChange={event => dispatch(handleChangeDense(event))} />} label="To Short" />
		</>
	)
}

const MailForm = () => {
	const dispatch = useDispatch()
	const state = useSelector(state => state.subscriptions)
	return (
		<Paper className={styled.padding}>
			<Typography variant="h6" component="div">
				Send Mail
			</Typography>

			<form onSubmit={e => dispatch(handleSubmitForm(e))}>
				<FormControl margin="dense" fullWidth>
					<TextField
						label="Subject"
						variant="outlined"
						name="subject"
						multiline
						rows={2}
						onChange={e => dispatch(handleChangeForm(e))}
						value={state.emailSender.subject}
					/>
				</FormControl>
				<FormControl margin="dense" fullWidth>
					<TextField
						label="Message"
						variant="outlined"
						name="message"
						multiline
						rows={10}
						onChange={e => dispatch(handleChangeForm(e))}
						value={state.emailSender.message}
					/>
				</FormControl>
				<FormControl margin="dense">
					<Button type="submit" startIcon={<SendIcon />} color="primary" variant="contained">
						Submit
					</Button>
				</FormControl>
			</form>
		</Paper>
	)
}

const Subscriptions = () => {
	return (
		<Container>
			<Grid container spacing={2}>
				<Grid item sm={6}>
					<MailForm />
				</Grid>
				<Grid item sm={6}>
					<EnhancedTable />
				</Grid>
			</Grid>
		</Container>
	)
}

export default Subscriptions
