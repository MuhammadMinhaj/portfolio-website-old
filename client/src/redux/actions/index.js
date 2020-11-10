import axios from 'axios'
import {
	HANDLE_MENU,
	INCREMENT_STEP,
	DECREMENT_STEP,
	DYNAMIC_ACTIVE_STEP,
	HANDLE_MODAL,
	HANDLE_CHANGE_CONTACT_FIELDS,
	HANDLE_SUBMIT_CONTACT_FORM_SUCCESS,
	HANDLE_SUBMIT_CONTACT_FORM_FAILED,
	HANDLE_LOADER_CONTACT_FORM,
	HANDLE_CHANGE_CONTACT_FIELDS_ERROR,
	HANDLE_CLICK_CONTACT_ALERT_MESSAGE_CLEAR,
} from '../constants/type'

// Page Scroll Progress

// Menu Toggle
export const handleMenu = () => {
	return dispatch => {
		dispatch({
			type: HANDLE_MENU,
		})
	}
}

// Navbar Circuler Animation
export const handleNavAnimationBar = () => {
	let circuler = document.getElementById('navCirculer')
	let count = 0
	setInterval(() => {
		count++
		circuler.childNodes.forEach((span, ind) => {
			if (circuler.childNodes.length + 1 === count) {
				count = 1
			}
			if (ind + 1 === count) {
				span.style.background = '#ffc107'
				span.style.transform = 'scale(1.2)'
				span.style.transition = 'all 0.75s'
			} else {
				span.style.transform = 'scale(1)'
				span.style.transition = 'all 0.75s'
				span.style.background = 'none'
			}
		})
	}, 1000)
}

// Skills Steps
export const stepHandleClick = type => {
	return dispatch => {
		if (type === 'increment') {
			dispatch({
				type: INCREMENT_STEP,
			})
		} else if (type === 'decrement') {
			dispatch({
				type: DECREMENT_STEP,
			})
		} else {
			dispatch({
				type: DYNAMIC_ACTIVE_STEP,
				payload: type,
			})
		}
	}
}
// Click One Skill Item To Handle Modal
export const handleModal = index => {
	return dispatch => {
		dispatch({
			type: HANDLE_MODAL,
			payload: index,
		})
	}
}

export const handleChange = e => {
	e.persist()
	return dispatch => {
		dispatch({
			type: HANDLE_CHANGE_CONTACT_FIELDS,
			payload: e,
		})
	}
}

export const handleSubmit = e => {
	e.preventDefault()
	return async (dispatch, selector) => {
		dispatch({
			type: HANDLE_LOADER_CONTACT_FORM,
		})
		const { name, email, subject, message } = selector(state => state).web.contact
		let errors = {}
		if (!name) {
			errors.name = 'Please provied your name'
		}
		if (!email) {
			errors.email = 'Please provied your email'
		}
		if (!subject) {
			errors.subject = 'Please provied your subject'
		}
		if (!message) {
			errors.message = 'Please provied your message'
		}
		if (Object.keys(errors).length !== 0) {
			dispatch({
				type: HANDLE_CHANGE_CONTACT_FIELDS_ERROR,
				payload: errors,
			})
			return false
		}

		try {
			const res = await axios.post(
				process.env.REACT_APP_URI_POST_SEND_CONTACT,
				{ name, email, subject, message },
				{
					headers: {
						'x-api-key': process.env.REACT_APP_API_KEY,
					},
				}
			)

			dispatch({
				type: HANDLE_SUBMIT_CONTACT_FORM_SUCCESS,
				payload: res.data.message,
			})
		} catch (e) {
			dispatch({
				type: HANDLE_SUBMIT_CONTACT_FORM_FAILED,
				payload: e.response ? e.response.data.message : e.message,
			})
		}
	}
}
export const handleClearAlertMessage = () => {
	return dispatch => {
		dispatch({
			type: HANDLE_CLICK_CONTACT_ALERT_MESSAGE_CLEAR,
		})
	}
}
