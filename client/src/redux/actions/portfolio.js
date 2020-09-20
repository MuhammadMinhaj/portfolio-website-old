import {
	HANDLE_ITEM_MODAL,
	HANDLE_TAB_CLICK,
	HANDLE_PAGINATION,
	MODAL_PAGE_INCREMENT_AND_DECREMENT,
	HANDLE_PORTFOLIO_SEARCH,
} from '../constants/type'

export const handleClickItemModal = item => {
	return dispatch => {
		dispatch({
			type: HANDLE_ITEM_MODAL,
			payload: item,
		})
	}
}

export const handleTabClick = newTab => {
	return dispatch => {
		dispatch({
			type: HANDLE_TAB_CLICK,
			payload: newTab,
		})
	}
}

export const handlePagination = newPage => {
	return dispatch => {
		dispatch({
			type: HANDLE_PAGINATION,
			payload: newPage,
		})
	}
}

export const handleModalPage = newPage => {
	return dispatch => {
		dispatch({
			type: MODAL_PAGE_INCREMENT_AND_DECREMENT,
			payload: newPage,
		})
	}
}

export const handlePortfolioSearch = value => {
	return dispatch => {
		dispatch({
			type: HANDLE_PORTFOLIO_SEARCH,
			payload: value,
		})
	}
}
