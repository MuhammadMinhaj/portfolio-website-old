import axios from 'axios'

import {
	IS_LOADING_OPENED,
	LOAD_PORTFOLIO_DATA_SUCCESS,
	LOAD_PORTFOLIO_DATA_FAILED,
	HANDLE_ITEM_MODAL,
	HANDLE_TAB_CLICK,
	HANDLE_TAB_CLICK_SELECTED_GROUP,
	HANDLE_PAGINATION,
	HANDLE_PORTFOLIO_SEARCH,
} from '../constants/type'

export const getDataFromServer = () => {
	return async (dispatch, selector) => {
		dispatch({
			type: IS_LOADING_OPENED,
		})

		try {
			const res = await axios.get(process.env.REACT_APP_URI_GET_PORTFOLIO, {
				headers: {
					'x-api-key': process.env.REACT_APP_API_KEY,
				},
			})
			dispatch({
				type: LOAD_PORTFOLIO_DATA_SUCCESS,
				payload: res.data,
			})
		} catch (error) {
			dispatch({
				type: LOAD_PORTFOLIO_DATA_FAILED,
				payload: error.message,
			})
		}
	}
}

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
export const handleTabClickSelectedGroup = id => {
	return dispatch => {
		dispatch({
			type: HANDLE_TAB_CLICK_SELECTED_GROUP,
			payload: id,
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

export const handlePortfolioSearch = value => {
	return dispatch => {
		dispatch({
			type: HANDLE_PORTFOLIO_SEARCH,
			payload: value,
		})
	}
}
