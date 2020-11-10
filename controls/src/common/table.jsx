import React from 'react'
import { makeStyles } from '@material-ui/core/styles'

import {
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
	IconButton,
	Tooltip,
	FormControlLabel,
	Switch,
	Avatar,
	LinearProgress,
} from '@material-ui/core'

import { FilterList as FilterListIcon } from '@material-ui/icons'

function descendingComparator(a, b, orderBy) {
	if (b[orderBy] < a[orderBy]) {
		return -1
	}
	if (b[orderBy] > a[orderBy]) {
		return 1
	}
	return 0
}

function getComparator(order, orderBy) {
	return order === 'desc' ? (a, b) => descendingComparator(a, b, orderBy) : (a, b) => -descendingComparator(a, b, orderBy)
}

function stableSort(array, comparator) {
	const stabilizedThis = array.map((el, index) => [el, index])
	stabilizedThis.sort((a, b) => {
		const order = comparator(a[0], b[0])
		if (order !== 0) return order
		return a[1] - b[1]
	})
	return stabilizedThis.map(el => el[0])
}

const EnhancedTableHead = ({ classes, headCells, order, orderBy, onRequestSort }) => {
	const createSortHandler = property => event => {
		onRequestSort(event, property)
	}

	return (
		<TableHead>
			<TableRow>
				{headCells.map((headCell, i) => (
					<TableCell
						key={i}
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
				<TableCell padding="checkbox" align="center">
					Actions
				</TableCell>
			</TableRow>
		</TableHead>
	)
}

const useToolbarStyles = makeStyles(theme => ({
	root: {
		paddingLeft: theme.spacing(2),
		paddingRight: theme.spacing(1),
	},

	title: {
		flex: '1 1 100%',
	},
}))

const EnhancedTableToolbar = props => {
	const classes = useToolbarStyles()

	return (
		<Toolbar className={classes.root}>
			<Typography className={classes.title} variant="h6" id="tableTitle" component="div">
				Users
			</Typography>

			<Tooltip title="Filter list">
				<IconButton aria-label="filter list">
					<FilterListIcon />
				</IconButton>
			</Tooltip>
		</Toolbar>
	)
}

const useStyles = makeStyles(theme => ({
	container: {
		maxHeight: 440,
	},
	paper: {
		width: '100%',

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

export default function EnhancedTable({ rows, headCells, control, isLoading }) {
	const classes = useStyles()
	const [order, setOrder] = React.useState('asc')
	const [orderBy, setOrderBy] = React.useState('calories')
	const [page, setPage] = React.useState(0)
	const [dense, setDense] = React.useState(false)
	const [rowsPerPage, setRowsPerPage] = React.useState(5)

	const handleRequestSort = (event, property) => {
		const isAsc = orderBy === property && order === 'asc'
		setOrder(isAsc ? 'desc' : 'asc')
		setOrderBy(property)
	}

	const handleChangePage = (event, newPage) => {
		setPage(newPage)
	}

	const handleChangeRowsPerPage = event => {
		setRowsPerPage(parseInt(event.target.value, 10))
		setPage(0)
	}

	const handleChangeDense = event => {
		setDense(event.target.checked)
	}

	const emptyRows = rowsPerPage - Math.min(rowsPerPage, rows.length - page * rowsPerPage)

	return (
		<>
			<Paper className={classes.paper}>
				<EnhancedTableToolbar />
				<TableContainer className={classes.container}>
					<Table stickyHeader className={classes.table} aria-labelledby="tableTitle" size={dense ? 'small' : 'medium'} aria-label="enhanced table">
						<EnhancedTableHead
							headCells={headCells}
							classes={classes}
							order={order}
							orderBy={orderBy}
							onRequestSort={handleRequestSort}
							rowCount={rows.length}
						/>

						<TableBody>
							{isLoading && (
								<TableRow>
									<TableCell colSpan={100} padding="none" size="small">
										<LinearProgress />
									</TableCell>
								</TableRow>
							)}
							{stableSort(rows, getComparator(order, orderBy))
								.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
								.map((row, index) => {
									return (
										<TableRow hover role="checkbox" tabIndex={-1} key={row._id}>
											{Object.entries(row).map(
												(r, i) =>
													r[0] !== '_id' &&
													r[0] !== '__v' && (
														<TableCell key={i}>
															{r[0] === 'thumbnail' ? (
																<Avatar alt="Remy Sharp" src={r[1]} variant="rounded" style={{ width: '150px', height: '100px' }} />
															) : (
																r[1]
															)}
														</TableCell>
													)
											)}

											<TableCell align="right">
												<div style={{ display: 'flex', justifyContent: 'space-between' }}>{control && control(row)}</div>
											</TableCell>
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
					count={rows.length}
					rowsPerPage={rowsPerPage}
					page={page}
					onChangePage={handleChangePage}
					onChangeRowsPerPage={handleChangeRowsPerPage}
				/>
			</Paper>
			<FormControlLabel control={<Switch checked={dense} onChange={handleChangeDense} />} label="Dense padding" />
		</>
	)
}
