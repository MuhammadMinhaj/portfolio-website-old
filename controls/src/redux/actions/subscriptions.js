import {
	SUBS_HANDLE_REQ_SORT,
	SUBS_HANDLE_SELECTED_ALL_CLICK,
	SUBS_HANDLE_CLICK,
	SUBS_HANDLE_CHANGE_PAGE,
	SUBS_HANDLE_CHANGE_ROWS_PER_PAGE,
	SUBS_HANDLE_CHANGE_DENSE,
	SUBS_HANDLE_CHANGE_FORM,
	SUBS_HANDLE_SUBMIT_FORM,
} from '../constants'

export const handleRequestSort = (event, property) => {
	return (dispatch, selector) => {
		const state = selector(state => state).subscriptions

		const isAsc = state.orderBy === property && state.order === 'asc'
		dispatch({
			type: SUBS_HANDLE_REQ_SORT,
			payload: {
				order: isAsc ? 'desc' : 'asc',
				orderBy: property,
			},
		})
	}
}

export const handleSelectAllClick = event => {
	return (dispatch, selector) => {
		const state = selector(state => state).subscriptions
		console.log(state)
		const newSelecteds = state.emails.map(e => e.email)

		dispatch({
			type: SUBS_HANDLE_SELECTED_ALL_CLICK,
			payload: event.target.checked ? newSelecteds : [],
		})
	}
}

export const handleClick = (event, name) => {
	return (dispatch, selector) => {
		const { selected } = selector(state => state).subscriptions
		const selectedIndex = selected.indexOf(name)
		let newSelected = []

		if (selectedIndex === -1) {
			newSelected = newSelected.concat(selected, name)
		} else if (selectedIndex === 0) {
			newSelected = newSelected.concat(selected.slice(1))
		} else if (selectedIndex === selected.length - 1) {
			newSelected = newSelected.concat(selected.slice(0, -1))
		} else if (selectedIndex > 0) {
			newSelected = newSelected.concat(selected.slice(0, selectedIndex), selected.slice(selectedIndex + 1))
		}
		dispatch({
			type: SUBS_HANDLE_CLICK,
			payload: newSelected,
		})
	}
}

export const handleChangePage = newPage => {
	return dispatch => {
		dispatch({
			type: SUBS_HANDLE_CHANGE_PAGE,
			payload: newPage,
		})
	}
}

export const handleChangeRowsPerPage = event => {
	return dispatch => {
		dispatch({
			type: SUBS_HANDLE_CHANGE_ROWS_PER_PAGE,
			payload: parseInt(event.target.value, 10),
		})
	}
}

export const handleChangeDense = event => {
	return dispatch => {
		dispatch({
			type: SUBS_HANDLE_CHANGE_DENSE,
			payload: event.target.checked,
		})
	}
}

export const handleChangeForm = event => {
	let obj = {
		target: {},
	}
	if (!event.target) {
		obj.target.name = 'message'
		obj.target.value = event.editor.getData()
	} else {
		event.persist()
	}
	return dispatch => {
		dispatch({
			type: SUBS_HANDLE_CHANGE_FORM,
			payload: !event.target ? obj : event,
		})
	}
}

export const handleSubmitForm = event => {
	event.preventDefault()
	return dispatch => {
		dispatch({
			type: SUBS_HANDLE_SUBMIT_FORM,
		})
	}
}
