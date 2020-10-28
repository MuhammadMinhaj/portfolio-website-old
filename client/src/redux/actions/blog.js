import axios from 'axios'
import { IS_LOADING_OPENED, LOAD_BLOG_DATA_SUCCESS, LOAD_BLOG_DATA_FAILED, SEARCH_BLOG_HANDLE_CHANGE } from '../constants/type'

export const getDataFromServer = () => {
	return async (dispatch, selector) => {
		dispatch({
			type: IS_LOADING_OPENED,
		})
		try {
			const res = await axios.get(process.env.REACT_APP_URI_GET_DATA_BLOGS, {
				headers: {
					'x-api-key': process.env.REACT_APP_API_KEY,
				},
			})
			dispatch({
				type: LOAD_BLOG_DATA_SUCCESS,
				payload: res.data,
			})
		} catch (e) {
			dispatch({
				type: LOAD_BLOG_DATA_FAILED,
				payload: e.message,
			})
		}
	}
}

export const handleChangeSearch = value => {
	return dispatch => {
		dispatch({
			type: SEARCH_BLOG_HANDLE_CHANGE,
			payload: value,
		})
	}
}
