import axios from 'axios'
import {
	SUBS_IS_LOADING,
	CLEAR_MESSAGE,
	HANDLE_LOADER,
	SUBS_ERROR_OCCURRED,
	SUBS_LOAD_DATA_SUCCESS,
	SUBS_HANDLE_CHANGE_FORM,
	SUBS_HANDLE_SUBMIT_SUCCESS,
	SUBS_HANDLE_SUBMIT_FAILED,
	SUBS_MAIL_DELETED_SUCCESS,
	SUBS_EDIT_EMAIL_HANDLE_CLICK,
	SUBS_EDIT_EMAIL_HANDLE_CHANGE,
	SUBS_EDIT_EMAIL_SUCCESS,
} from '../constants'
// const Token = localStorage.getItem('token')
export const handleClearMessage = () => {
	return dispatch => {
		dispatch({ type: CLEAR_MESSAGE })
	}
}

export const getDataFromServer = () => {
	return async (dispatch, selector) => {
		const state = selector(state => state)
		const Token = localStorage.getItem('token')
		if (state.subscriptions.subscribers.length === 0) {
			dispatch({
				type: HANDLE_LOADER,
			})
			try {
				const res = await axios.get(process.env.REACT_APP_SUBS_GET_DATA, {
					headers: {
						'x-api-key': process.env.REACT_APP_API_KEY,
						'x-auth-token': Token,
					},
				})
				dispatch({
					type: SUBS_LOAD_DATA_SUCCESS,
					payload: res.data,
				})
			} catch (e) {
				dispatch({
					type: SUBS_ERROR_OCCURRED,
					payload: e.message,
				})
			}
		}
	}
}

export const handleChangeForm = event => {
	event.persist()

	return dispatch => {
		dispatch({
			type: SUBS_HANDLE_CHANGE_FORM,
			payload: event,
		})
	}
}

export const handleSubmitForm = event => {
	event.preventDefault()
	return async (dispatch, selector) => {
		const state = selector(state => state)
		const Token = localStorage.getItem('token')
		const {
			emailSender: { subject, message },
		} = state.subscriptions
		dispatch({
			type: HANDLE_LOADER,
		})
		try {
			const res = await axios.post(
				process.env.REACT_APP_SUBS_SEND_MAIL,
				{
					subject,
					message,
				},
				{
					headers: {
						'x-api-key': process.env.REACT_APP_API_KEY,
						'x-auth-token': Token,
					},
				}
			)
			dispatch({
				type: SUBS_HANDLE_SUBMIT_SUCCESS,
				payload: res.data.message,
			})
		} catch (e) {
			dispatch({
				type: SUBS_HANDLE_SUBMIT_FAILED,
				payload: e.message,
			})
		}
	}
}

export const handleDeleteMail = id => {
	return async (dispatch, selector) => {
		const state = selector(state => state)
		const Token = localStorage.getItem('token')
		dispatch({
			type: HANDLE_LOADER,
		})
		try {
			const res = await axios.delete(`${process.env.REACT_APP_SUBS_DELETE_MAIL}/${id}`, {
				headers: {
					'x-api-key': process.env.REACT_APP_API_KEY,
					'x-auth-token': Token,
				},
			})

			const subscribers = state.subscriptions.subscribers.filter(sub => sub._id !== res.data.subscriber._id)
			dispatch({
				type: SUBS_MAIL_DELETED_SUCCESS,
				payload: { subscribers, message: res.data.message },
			})
		} catch (e) {
			dispatch({
				type: SUBS_ERROR_OCCURRED,
				payload: e.message,
			})
		}
	}
}

export const handleClickEditEmail = subscriber => {
	return dispatch => {
		dispatch({
			type: SUBS_EDIT_EMAIL_HANDLE_CLICK,
			payload: subscriber,
		})
	}
}

export const handleChangeEditEmail = e => {
	e.persist()
	return dispatch => {
		dispatch({
			type: SUBS_EDIT_EMAIL_HANDLE_CHANGE,
			payload: e.target.value,
		})
	}
}

export const handleSubmitEditEmail = e => {
	e.preventDefault()
	return async (dispatch, selector) => {
		const state = selector(state => state)
		const Token = localStorage.getItem('token')
		const {
			editSubscriber: { email, _id },
		} = state.subscriptions
		dispatch({
			type: SUBS_IS_LOADING,
		})
		try {
			const res = await axios.put(
				`${process.env.REACT_APP_SUBS_UPDATE_MAIL}/${_id}`,
				{ email },
				{
					headers: {
						'x-api-key': process.env.REACT_APP_API_KEY,
						'x-auth-token': Token,
					},
				}
			)
			let subscribers = state.subscriptions.subscribers

			subscribers.forEach(s => {
				if (s._id.toString() === res.data.subscriber._id) {
					s.email = res.data.subscriber.email
				}
			})
			dispatch({
				type: SUBS_EDIT_EMAIL_SUCCESS,
				payload: { message: res.data.message, subscribers },
			})
		} catch (e) {
			dispatch({
				type: SUBS_ERROR_OCCURRED,
				payload: e.response ? e.response.data.message : e.message,
			})
		}
	}
}
