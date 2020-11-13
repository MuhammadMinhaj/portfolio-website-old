import axios from 'axios'
import {
	CLEAR_MESSAGE,
	LOGIN_HANDLE_LOADER,
	HANDLE_DRAWER_TOGGLE,
	LOGIN_HANDLE_CHANGE,
	LOGIN_ERRORS_OCCURRED,
	LOGIN_SUCCESS,
	LOGIN_FAILED,
} from '../constants'

export const handleDrawerToggle = () => {
	return dispatch => {
		dispatch({
			type: HANDLE_DRAWER_TOGGLE,
		})
	}
}
export const loginHandleChange = e => {
	return dispatch => {
		dispatch({
			type: LOGIN_HANDLE_CHANGE,
			payload: e,
		})
	}
}

export const loginHandleSubmit = e => {
	e.preventDefault()
	return async (dispatch, selector) => {
		const {
			loginInfo: { email, password },
		} = selector(state => state).app

		const errors = {}
		if (!email) {
			errors.email = 'Please provied your email'
		} else if (!email.includes('@')) {
			errors.email = 'Invalid email'
		} else if (!email.includes('.')) {
			errors.email = 'Invalid email'
		}
		if (!password) {
			errors.password = 'Please provied your password'
		}

		if (Object.keys(errors).length !== 0) {
			dispatch({
				type: LOGIN_ERRORS_OCCURRED,
				payload: errors,
			})
			return false
		}

		dispatch({
			type: LOGIN_HANDLE_LOADER,
		})
		try {
			const {
				data: { message, token },
			} = await axios.post(
				process.env.REACT_APP_LOGIN_URI,
				{
					email,
					password,
				},
				{
					headers: {
						'x-api-key': process.env.REACT_APP_API_KEY,
					},
				}
			)
			localStorage.setItem('token', token)
			dispatch({
				type: LOGIN_SUCCESS,
				payload: message,
			})
		} catch (e) {
			dispatch({
				type: LOGIN_FAILED,
				payload: e.response.data.message || e.message,
			})
		}
	}
}
export const handleClearMessage = () => {
	return dispatch => {
		dispatch({
			type: CLEAR_MESSAGE,
		})
	}
}

export const tokenVarifyMiddleware = () => {
	return async dispatch => {
		const token = localStorage.getItem('token')
		try {
			const res = await axios.get(process.env.REACT_APP_TOKEN_VERIFY, {
				headers: {
					'x-auth-token': token,
				},
			})
			if (!res.data) {
				localStorage.removeItem('token')
			}
		} catch (e) {
			dispatch({
				type: '',
				payload: e.message,
			})
		}
	}
}
