import axios from 'axios'
import {
	CONTACT_CLEAR_MESSAGE,
	CONTACT_HANDLE_LOADER,
	CONTACT_GET_DATA_SUCCESS,
	CONTACT_GET_DATA_FAILED,
	CONTACT_HANDLE_SELECTED_CONTACT_FOR_VIEW,
	CONTACT_HANDLE_SELECTED_ID_REMOVE,
	CONTACT_HANDLE_SUBMIT_DELETE_SUCCESS,
	CONTACT_HANDLE_SUBMIT_DELETE_FAILED,
	CONTACT_HANDLE_SELECTED_MAIL,
	CONTACT_HANDLE_UNSELECT_MAIL,
	CONTACT_HANDLE_CHANGE_SEND_MAIL,
	CONTACT_HANDLE_SUBMIT_SEND_MAIL_LOADING,
	CONTACT_HANDLE_SUBMIT_SEND_MAIL_ERRORS,
	CONTACT_HANDLE_SUBMIT_SEND_MAIL_SUCCESS,
	CONTACT_HANDLE_SUBMIT_SEND_MAIL_FAILED,
} from '../constants'

export const handleClearMessage = () => {
	return dispatch => {
		dispatch({
			type: CONTACT_CLEAR_MESSAGE,
		})
	}
}

export const getDataFromServer = () => {
	return async (dispatch, selector) => {
		const Token = localStorage.getItem('token')
		dispatch({
			type: CONTACT_HANDLE_LOADER,
		})
		try {
			const res = await axios.get(process.env.REACT_APP_CONTACT_CRUD, {
				headers: {
					'x-api-key': process.env.REACT_APP_API_KEY,
					'x-auth-token': Token,
				},
			})
			dispatch({
				type: CONTACT_GET_DATA_SUCCESS,
				payload: res.data,
			})
		} catch (e) {
			dispatch({
				type: CONTACT_GET_DATA_FAILED,
				payload: e.message,
			})
		}
	}
}

export const handleClick = id => {
	return dispatch => {
		dispatch({
			type: CONTACT_HANDLE_SELECTED_CONTACT_FOR_VIEW,
			payload: id,
		})
	}
}
export const handleClearId = () => {
	return dispatch => {
		dispatch({
			type: CONTACT_HANDLE_SELECTED_ID_REMOVE,
		})
	}
}

export const handleSubmitDeleteContact = id => {
	return async (dispatch, selector) => {
		const state = selector(state => state)
		const Token = localStorage.getItem('token')
		dispatch({
			type: CONTACT_HANDLE_LOADER,
		})
		try {
			const res = await axios.delete(`${process.env.REACT_APP_CONTACT_CRUD}/${id}`, {
				headers: {
					'x-api-key': process.env.REACT_APP_API_KEY,
					'x-auth-token': Token,
				},
			})

			let filteredMails = state.contact.mails.filter(m => m._id.toString() !== res.data.mail._id.toString())

			dispatch({
				type: CONTACT_HANDLE_SUBMIT_DELETE_SUCCESS,
				payload: {
					mails: filteredMails,
					msg: res.data.message,
				},
			})
		} catch (e) {
			dispatch({
				type: CONTACT_HANDLE_SUBMIT_DELETE_FAILED,
				payload: e.message,
			})
		}
	}
}

export const handleSelectedMail = id => {
	return dispatch => {
		if (id) {
			dispatch({
				type: CONTACT_HANDLE_SELECTED_MAIL,
				payload: id,
			})
		} else {
			dispatch({
				type: CONTACT_HANDLE_UNSELECT_MAIL,
			})
		}
	}
}

export const handleChangeMailSender = e => {
	e.persist()
	return dispatch => {
		dispatch({
			type: CONTACT_HANDLE_CHANGE_SEND_MAIL,
			payload: e,
		})
	}
}

export const handleSubmitSendMail = e => {
	e.preventDefault()
	return async (dispatch, selector) => {
		const state = selector(state => state)
		const Token = localStorage.getItem('token')
		const {
			isSelectedMail,
			mailSender: { subject, message },
		} = state.contact

		let errors = {}
		if (!subject) {
			errors.subject = 'Please provied subject'
		}
		if (!message) {
			errors.message = 'Please provied message'
		}
		if (Object.keys(errors).length !== 0) {
			dispatch({
				type: CONTACT_HANDLE_SUBMIT_SEND_MAIL_ERRORS,
				payload: errors,
			})
			return false
		}

		dispatch({
			type: CONTACT_HANDLE_SUBMIT_SEND_MAIL_LOADING,
		})
		try {
			const res = await axios.post(
				`${process.env.REACT_APP_CONTACT_SEND_MAIL}/${isSelectedMail}`,
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
				type: CONTACT_HANDLE_SUBMIT_SEND_MAIL_SUCCESS,
				payload: res.data.message,
			})
		} catch (e) {
			dispatch({
				type: CONTACT_HANDLE_SUBMIT_SEND_MAIL_FAILED,
				payload: e.message,
			})
		}
	}
}
